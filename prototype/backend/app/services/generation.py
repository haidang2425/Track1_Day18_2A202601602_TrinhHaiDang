import openai, os, json, time, re
import google.generativeai as genai

# ─── PROVIDER CONFIGS ──────────────────────────────────────────────────────
GROQ_CLIENT = openai.OpenAI(
    base_url="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY", "")
) if os.getenv("GROQ_API_KEY") else None

OPENROUTER_CLIENT = openai.OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY", "")
) if os.getenv("OPENROUTER_API_KEY") else None

GEMINI_CONFIGURED = False
if os.getenv("GEMINI_API_KEY"):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    GEMINI_CONFIGURED = True

# Thứ tự ưu tiên: nhanh nhất trước
# Tên model được xác nhận còn tồn tại bằng cách gọi trực tiếp /models của từng provider
# (các tên gốc trong spec — llama-3.3-70b-versatile, gemini-2.0-flash-exp, gemini-1.5-flash-8b —
# đã bị provider gỡ bỏ khỏi catalog kể từ khi viết spec).
PROVIDER_CHAIN = [
    {"name": "groq",       "client": GROQ_CLIENT,       "model": "openai/gpt-oss-120b"},
    {"name": "openrouter", "client": OPENROUTER_CLIENT,  "model": "openai/gpt-oss-20b:free"},
    {"name": "gemini",     "client": None,               "model": "gemini-3.5-flash-lite"},
]

# ─── GUARDRAILS — áp trước khi gửi tới bất kỳ provider nào ─────────────────
BLOCKED_PATTERNS = [
    r"ignore (previous|above|prior|all) instructions",
    r"jailbreak|DAN|pretend you are|act as",
    r"system prompt|forget your",
]
MAX_QUESTION_LEN = 1000  # ký tự

def apply_input_guardrail(text: str) -> tuple[bool, str]:
    """
    Trả về (is_safe: bool, reason: str).
    Gọi trước khi gửi tới LLM.
    """
    if len(text) > MAX_QUESTION_LEN:
        return False, f"Câu hỏi quá dài (tối đa {MAX_QUESTION_LEN} ký tự)."
    for pat in BLOCKED_PATTERNS:
        if re.search(pat, text, re.IGNORECASE):
            return False, "Câu hỏi chứa nội dung không được phép."
    return True, ""

def apply_output_guardrail(answer: str) -> str:
    """
    Lọc output: strip PII placeholder, cảnh báo nếu answer chứa code đáng ngờ.
    """
    # Xóa bất kỳ chuỗi trông như API key trong output
    answer = re.sub(r'sk-[a-zA-Z0-9\-_]{20,}', '[API_KEY_REDACTED]', answer)
    answer = re.sub(r'AIza[a-zA-Z0-9\-_]{30,}', '[API_KEY_REDACTED]', answer)
    return answer.strip()


# ─── CALL LLM (OpenAI-compatible: Groq + OpenRouter) ───────────────────────
def _call_openai_compat(client: openai.OpenAI, model: str, prompt: str) -> str:
    resp = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1024,
        temperature=0.3
    )
    return resp.choices[0].message.content.strip()

def _call_gemini(model_name: str, prompt: str) -> str:
    model = genai.GenerativeModel(model_name)
    resp = model.generate_content(prompt)
    return resp.text.strip()


# ─── MAIN FUNCTION ──────────────────────────────────────────────────────────
def generate_with_citations(question: str, chunks: list[dict], task_context: str = "") -> dict:
    start = time.time()

    # 1. Input guardrail
    is_safe, reason = apply_input_guardrail(question)
    if not is_safe:
        return {
            "answer_text": f"⚠️ {reason} Vui lòng đặt câu hỏi liên quan đến nội dung bài học.",
            "claims": [], "retrieval_score": 0.0, "grounded_ratio": 0.0,
            "latency_ms": int((time.time() - start) * 1000),
            "provider": "guardrail_blocked"
        }

    # 2. Build prompt (đánh số [1][2][3])
    numbered = [f"[{i+1}] {c['source_label']} — {c['content']}" for i, c in enumerate(chunks)]
    prompt = f"""Bạn là AI Tutor hỗ trợ học viên VinUniversity. CHỈ dựa vào tài liệu bên dưới.

TÌNH HUỐNG: {task_context or "Đang làm lab AI."}
CÂU HỎI / LỖI: {question}

TÀI LIỆU:
{chr(10).join(numbered)}

Trả về JSON (không text ngoài JSON):
{{
  "answer": "câu trả lời tiếng Việt, rõ ràng, dưới 200 từ",
  "claims": [
    {{"claim": "mệnh đề cụ thể", "source_chunk_index": 1}},
    {{"claim": "không có trong tài liệu", "source_chunk_index": null}}
  ]
}}"""

    # 3. Provider rotation
    raw_response, used_provider = None, "mock"
    for p in PROVIDER_CHAIN:
        try:
            if p["name"] == "gemini":
                if not GEMINI_CONFIGURED: continue
                raw_response = _call_gemini(p["model"], prompt)
            else:
                if not p["client"]: continue
                raw_response = _call_openai_compat(p["client"], p["model"], prompt)
            used_provider = p["name"]
            break
        except openai.RateLimitError:
            continue  # 429 → thử provider kế tiếp
        except Exception as e:
            print(f"[{p['name']}] Error: {e}")
            continue  # lỗi khác cũng thử provider kế (network, timeout)

    if raw_response is None:
        return _mock_generate(question, chunks, start)

    # 4. Parse JSON
    try:
        parsed = json.loads(raw_response)
    except json.JSONDecodeError:
        match = re.search(r'\{.*\}', raw_response, re.DOTALL)
        parsed = json.loads(match.group()) if match else {"answer": raw_response, "claims": []}

    # 5. Output guardrail
    answer_text = apply_output_guardrail(parsed.get("answer", ""))

    # 6. Map index → source_label
    claims = []
    for c in parsed.get("claims", []):
        idx = c.get("source_chunk_index")
        if idx and 1 <= idx <= len(chunks):
            claims.append({"claim": c["claim"], "source_label": chunks[idx-1]["source_label"], "chunk_id": chunks[idx-1]["db_chunk_id"]})
        else:
            claims.append({"claim": c["claim"], "source_label": None, "chunk_id": None})

    grounded = sum(1 for c in claims if c["source_label"])
    grounded_ratio = grounded / len(claims) if claims else 0.0

    return {
        "answer_text": answer_text,
        "claims": claims,
        "retrieval_score": chunks[0]["score"] if chunks else 0.0,
        "grounded_ratio": grounded_ratio,
        "latency_ms": int((time.time() - start) * 1000),
        "provider": used_provider  # Log provider đã dùng để debug
    }


MOCK_GROUNDED_HIGH_THRESHOLD = 0.82  # ngưỡng dựa trên phân bố cosine thực tế của E5-small

def _mock_generate(question: str, chunks: list[dict], start: float) -> dict:
    latency_ms = int((time.time() - start) * 1000) + 300
    if chunks:
        top_score = chunks[0]["score"]
        # Không gán cứng 0.5: nếu top_score thấp (câu lạc đề), grounded_ratio phải thấp
        # theo để confidence_score (= 0.5*retrieval + 0.5*grounded) vẫn tách biệt rõ
        # ngay cả khi không có provider LLM nào khả dụng (rate-limit/mất mạng lúc demo).
        grounded_ratio = 1.0 if top_score >= MOCK_GROUNDED_HIGH_THRESHOLD else 0.4
        return {
            "answer_text": f"[DEMO] Dựa vào tài liệu ({chunks[0]['source_label']}): Lỗi liên quan đến '{question[:40]}...' có thể tìm thấy tại {chunks[0]['source_label']}. Kiểm tra lại file `.env` và biến API key.",
            "claims": [
                {"claim": f"Tham khảo {chunks[0]['source_label']}", "source_label": chunks[0]["source_label"], "chunk_id": chunks[0]["db_chunk_id"]},
                {"claim": "Thông tin bổ sung chưa có trong tài liệu", "source_label": None, "chunk_id": None}
            ],
            "retrieval_score": top_score,
            "grounded_ratio": grounded_ratio,
            "latency_ms": latency_ms,
            "provider": "mock"
        }
    return {"answer_text": "[DEMO] Không tìm thấy tài liệu liên quan. Đề nghị hỏi Coach.", "claims": [], "retrieval_score": 0.0, "grounded_ratio": 0.0, "latency_ms": latency_ms, "provider": "mock"}
