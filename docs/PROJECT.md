# VLearn AI Tutor — Master Project Specification (v3.0 · Final)

> **Dành cho AI Agent:** Đây là tài liệu spec kỹ thuật DUY NHẤT và CUỐI CÙNG (v3.0 — đã tích hợp mọi patch trước đó). Đọc từ đầu đến cuối trước khi viết bất kỳ dòng code nào. Không được tự ý thêm/bỏ/thay đổi kiến trúc. Thực thi đúng thứ tự: DB → Auth → Seed → Services → Routers → Frontend.

---

## 0. MỤC TIÊU & TIÊU CHÍ CHẤM ĐIỂM

**Sản phẩm:** VLearn AI Tutor — Diagnostic Refresher
**Mục tiêu demo:** Chứng minh 3 cơ chế kiểm chứng câu trả lời AI khác nhau (Option A/B/C) trên cùng 1 content fixture, thỏa toàn bộ rubric bài Day 18 (Gate 1–5).

**Điều BGK chấm nặng nhất:**
1. Ba Option khác nhau có ý nghĩa ở cơ chế kiểm chứng (Gate 2) — không chỉ khác UI.
2. Mỗi Option thể hiện rõ 4 quyết định thiết kế Human-AI theo Gate 3.
3. Không Option nào để AI tự quyết hoàn toàn — luôn có đường User kiểm soát/phục hồi.
4. Sản phẩm chạy được local, testable bởi người không build (Gate 4).

**Màn hình `/compare` là tính năng chủ lực** — biến demo từ "3 chatbot khác skin" thành "thí nghiệm có dữ liệu chứng minh trade-off". Phải có phần bảng tĩnh "4 Quyết Định Thiết Kế × 3 Option" dù có hay không có phần gọi API.

---

## 1. TECH STACK

| Layer | Công nghệ | Ghi chú |
|---|---|---|
| Frontend | React 18 + Vite | CSS Modules, không Tailwind |
| Styling | Vanilla CSS + CSS Modules | Google Fonts: Inter + Outfit |
| Backend | Python FastAPI + SQLite | SQLAlchemy ORM |
| Server | Uvicorn | `--port 8001 --reload`, chạy từ thư mục `backend/` |
| AI LLM | **OpenRouter** (via OpenAI SDK) | Free model chain, fallback mock nếu no key |
| Embeddings | `intfloat/multilingual-e5-small` | Singleton, load 1 lần khi start |
| Vector Search | **NumPy + SQLite** | Embedding lưu trong cột `CourseChunk.embedding_json` |
| PDF Ingest | `pymupdf` (fitz) | Render slides thật, extract text theo trang |
| Auth | JWT (python-jose, HS256) | Header `Authorization: Bearer <token>` |
| Charts | recharts | Chỉ dùng ở `/compare` |
| Port Frontend | **3001** | Proxy Vite → `8001` |
| Port Backend | **8001** | |

> **KHÔNG có ChromaDB.** KHÔNG có Anthropic. KHÔNG có Docker/deploy config.

---

## 2. DESIGN SYSTEM

### 2.1. Color Palette (pixel-perfect từ ảnh mockup VLearn thực tế)
```css
/* File: src/index.css — khai báo dưới :root */
:root {
  --color-primary:       #1a4f8b;
  --color-primary-dark:  #153b69;
  --color-primary-light: #e8f0fb;
  --color-accent:        #ef4444;
  --color-accent-dark:   #dc2626;
  --color-bg:            #f0f2f5;
  --color-surface:       #ffffff;
  --color-sidebar:       #f8fafc;
  --color-topbar:        #ffffff;
  --color-text-primary:  #1f2937;
  --color-text-secondary:#374151;
  --color-text-muted:    #6b7280;
  --color-text-disabled: #9ca3af;
  --color-border:        #e5e7eb;
  --color-border-strong: #d1d5db;
  --color-success:       #16a34a;
  --color-success-bg:    #dcfce7;
  --color-warning:       #d97706;
  --color-warning-bg:    #fef3c7;
  --color-error:         #dc2626;
  --color-error-bg:      #fee2e2;
  --color-info-bg:       #e0f2fe;
  --color-info-text:     #0369a1;
  --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg:  0 10px 30px rgba(0,0,0,0.12);
  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  14px;
  --radius-full:9999px;
}
```

### 2.2. Typography
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap');
body { font-family: 'Inter', sans-serif; font-size: 14px; }
h1,h2,h3,h4,h5,h6 { font-family: 'Outfit', sans-serif; }
```

---

## 3. CẤU TRÚC THƯ MỤC

```
prototype/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app, CORS, router mounting, lifespan (load embedding model)
│   │   ├── db.py                # SQLAlchemy engine + Base + SessionLocal + tất cả ORM Models
│   │   ├── schemas.py           # Pydantic request/response schemas
│   │   ├── auth.py              # JWT, password hashing, get_current_user dependency
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── embedding.py     # singleton, embed_query(), embed_passage() — với đúng E5 prefix
│   │   │   ├── retrieval.py     # NumPy cosine search trên SQLite, get_relevant_chunks(q, day, db)
│   │   │   ├── generation.py    # OpenRouter client, fallback chain, parse JSON, map index → label
│   │   │   ├── confidence.py    # compute_confidence(), ESCALATION_THRESHOLD = 0.6
│   │   │   ├── library.py       # match_library(), add_to_library()
│   │   │   └── pdf_ingest.py    # ingest_pdf(path, day) → chunks + render PNG slides
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── auth_router.py
│   │       ├── mode_a.py
│   │       ├── mode_b.py
│   │       ├── mode_c.py
│   │       ├── coach.py
│   │       └── compare.py
│   ├── seed/
│   │   ├── seed_users.py           # Idempotent: skip nếu username đã tồn tại
│   │   ├── seed_course_docs.py     # Idempotent: skip theo day+page_number; gọi ingest_pdf
│   │   ├── seed_library.py         # Idempotent: skip theo question_text
│   │   └── seed_fallback_content.py # Hard-code nội dung dự phòng nếu PDF không tìm thấy
│   ├── data/
│   │   ├── day17.pdf               # ← FILE ĐÃ CÓ SẴN
│   │   └── day18.pdf               # ← FILE ĐÃ CÓ SẴN
│   ├── vlearn.db                   # SQLite (gitignored)
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   │   ├── slides/
│   │   │   ├── day17/              # page_1.png, page_2.png ... (render từ PDF khi seed)
│   │   │   └── day18/
│   │   ├── slide-placeholder.png   # Ảnh xám tĩnh, dùng khi slides chưa render (KHÔNG hotlink)
│   │   └── favicon.svg
│   ├── src/
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── App.jsx                 # Routes: Login | Home | Lesson | Compare | Coach
│   │   ├── api/
│   │   │   └── client.js           # fetch wrapper, BASE_URL = '' (dùng Vite proxy)
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SlideContext.jsx    # currentPage state + setCurrentPage
│   │   ├── components/
│   │   │   ├── Login/
│   │   │   ├── Home/
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Topbar.jsx
│   │   │   │   ├── LeftSidebar.jsx
│   │   │   │   ├── SlideViewer.jsx
│   │   │   │   └── AITutor/
│   │   │   │       ├── AITutor.jsx
│   │   │   │       ├── ModeSelector.jsx
│   │   │   │       ├── ChatMessage.jsx
│   │   │   │       ├── ChatInput.jsx
│   │   │   │       ├── SourcePanel.jsx      # click citation → SlideContext.setCurrentPage
│   │   │   │       ├── ConfidenceMeter.jsx  # bar + expandable breakdown
│   │   │   │       └── VerifiedBadge.jsx
│   │   │   ├── Compare/
│   │   │   ├── Coach/
│   │   │   └── shared/
│   │   │       ├── Spinner.jsx
│   │   │       ├── ErrorBoundary.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   └── hooks/
│   │       ├── useChat.js
│   │       └── useCompare.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── SETUP_GUIDE.md
└── README.md
```

---

## 4. DATABASE SCHEMA

```python
# backend/app/db.py — tất cả models ở đây

class User(Base):
    __tablename__ = "users"
    id            = Column(Integer, primary_key=True)
    username      = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role          = Column(String, nullable=False)  # "learner" | "coach"
    display_name  = Column(String, nullable=False)

class CourseChunk(Base):
    __tablename__ = "course_chunks"
    id             = Column(Integer, primary_key=True)
    day            = Column(Integer, nullable=False)    # 17 | 18
    page_number    = Column(Integer, nullable=False)    # số trang trong PDF
    title          = Column(String)
    content        = Column(Text, nullable=False)
    source_label   = Column(String, nullable=False)    # "Tr. {page_number}"
    embedding_json = Column(Text, nullable=False)      # JSON string của list[float]
    # KHÔNG CÓ chroma_id nữa

class Question(Base):
    __tablename__ = "questions"
    id           = Column(Integer, primary_key=True)
    user_id      = Column(Integer, ForeignKey("users.id"))
    error_text   = Column(Text, nullable=False)
    task_context = Column(Text)
    created_at   = Column(DateTime, default=datetime.utcnow)

class Answer(Base):
    __tablename__ = "answers"
    id               = Column(Integer, primary_key=True)
    question_id      = Column(Integer, ForeignKey("questions.id"))
    mode             = Column(String, nullable=False)   # "A" | "B" | "C"
    answer_text      = Column(Text)
    claims_json      = Column(Text)    # JSON: [{claim, source_label, chunk_id}]
    retrieval_score  = Column(Float)
    grounded_ratio   = Column(Float)
    confidence_score = Column(Float)
    status           = Column(String, default="draft")  # draft|sent_to_coach|approved|rejected
    created_at       = Column(DateTime, default=datetime.utcnow)

class LibraryEntry(Base):
    __tablename__ = "library_entries"
    id                 = Column(Integer, primary_key=True)
    question_text      = Column(Text)
    question_embedding = Column(Text)   # JSON string list[float]
    answer_text        = Column(Text)
    source_answer_id   = Column(Integer, ForeignKey("answers.id"), nullable=True)
    approved_by        = Column(Integer, ForeignKey("users.id"))
    approved_at        = Column(DateTime, default=datetime.utcnow)
    reuse_count        = Column(Integer, default=0)

class Escalation(Base):
    __tablename__ = "escalations"
    id           = Column(Integer, primary_key=True)
    answer_id    = Column(Integer, ForeignKey("answers.id"))
    is_anonymous = Column(Boolean, default=False)   # Mode B: True, Mode C: False
    sent_at      = Column(DateTime, default=datetime.utcnow)
    coach_id     = Column(Integer, ForeignKey("users.id"), nullable=True)
    resolved_at  = Column(DateTime, nullable=True)
    coach_reply  = Column(Text, nullable=True)

class Feedback(Base):
    __tablename__ = "feedback"
    id         = Column(Integer, primary_key=True)
    answer_id  = Column(Integer, ForeignKey("answers.id"))
    helpful    = Column(Boolean)
    created_at = Column(DateTime, default=datetime.utcnow)

class InteractionLog(Base):
    __tablename__ = "interaction_logs"
    id               = Column(Integer, primary_key=True)  # tăng dần = thứ tự interaction
    mode             = Column(String)        # "A" | "B" | "C"
    question_text    = Column(Text)
    latency_ms       = Column(Integer)
    retrieval_score  = Column(Float, nullable=True)
    grounded_ratio   = Column(Float, nullable=True)
    confidence_score = Column(Float, nullable=True)
    escalated        = Column(Boolean, default=False)
    from_library     = Column(Boolean, default=False)
    created_at       = Column(DateTime, default=datetime.utcnow)
```

---

## 5. AUTH (JWT — Chốt cứng)

```python
# backend/app/auth.py
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "vlearn-dev-secret-change-in-prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 giờ

# Dùng python-jose + passlib[bcrypt]
# get_current_user(token) là FastAPI Dependency dùng ở tất cả router cần auth
```

```javascript
// frontend: lưu token vào localStorage + AuthContext
// client.js: mọi request tự đính headers["Authorization"] = "Bearer " + token
// BASE_URL = "" — dùng Vite proxy, không hardcode localhost:8001
```

---

## 6. DEMO ACCOUNTS (Seed cứng, idempotent)

| Role | Username | Password | Display Name |
|---|---|---|---|
| learner | `26ai.minhnh@vinuni.edu.vn` | `demo1234` | Nguyễn Hoàng Minh |
| coach | `coach.dangth@vinuni.edu.vn` | `coach1234` | Trịnh Hải Đăng |

---

## 7. AI PIPELINE

### 7.1. Embedding (services/embedding.py)

> **BẮT BUỘC dùng prefix E5.** Sai prefix làm retrieval score lệch nghiêm trọng.

```python
from sentence_transformers import SentenceTransformer
import numpy as np

_model = None

def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer("intfloat/multilingual-e5-small")
    return _model

def embed_query(text: str) -> list[float]:
    """Dùng cho CÂU HỎI user. Prefix 'query: ' theo convention E5."""
    vec = get_model().encode("query: " + text, normalize_embeddings=True)
    return vec.tolist()

def embed_passage(text: str) -> list[float]:
    """Dùng cho NỘI DUNG chunk/tài liệu. Prefix 'passage: ' theo convention E5."""
    vec = get_model().encode("passage: " + text, normalize_embeddings=True)
    return vec.tolist()

def cosine_sim(a: list[float], b: list[float]) -> float:
    """Đã normalize → dot product = cosine. Clamp để tránh float noise âm nhỏ."""
    return max(0.0, float(np.dot(np.array(a), np.array(b))))
```

### 7.2. Retrieval (services/retrieval.py) — NumPy + SQLite, KHÔNG ChromaDB

```python
import numpy as np, json
from ..db import CourseChunk
from .embedding import embed_query, cosine_sim

def get_relevant_chunks(question_text: str, day: int, db_session, n_results: int = 3) -> list[dict]:
    """
    Filter theo day trước, tính cosine với tất cả chunk còn lại.
    Trả về top-N theo score DESC.
    """
    q_emb = embed_query(question_text)
    chunks = db_session.query(CourseChunk).filter(CourseChunk.day == day).all()
    scored = []
    for c in chunks:
        c_emb = json.loads(c.embedding_json)
        score = cosine_sim(q_emb, c_emb)
        scored.append((c, score))
    scored.sort(key=lambda x: x[1], reverse=True)
    return [
        {"content": c.content, "source_label": c.source_label, "db_chunk_id": c.id, "score": s}
        for c, s in scored[:n_results]
    ]
```

### 7.3. Generation (services/generation.py) — OpenRouter + Fallback Chain

```python
import openai, os, json, time, re

client = openai.OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY", "")
)

FREE_MODELS_FALLBACK_CHAIN = [
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "qwen/qwen-2.5-72b-instruct:free",
]

def generate_with_citations(question: str, chunks: list[dict], task_context: str = "") -> dict:
    """
    Trả về: {answer_text, claims, retrieval_score, grounded_ratio, latency_ms}
    claims = [{claim, source_label, chunk_id}]
    """
    start = time.time()
    if not os.getenv("OPENROUTER_API_KEY", ""):
        return _mock_generate(question, chunks, start)

    # Đánh số [1][2][3] — KHÔNG dùng raw DB id
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
}}
source_chunk_index là số 1/2/3 hoặc null."""

    raw_response = None
    for model in FREE_MODELS_FALLBACK_CHAIN:
        try:
            resp = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1024
            )
            raw_response = resp.choices[0].message.content.strip()
            break  # Thành công → thoát vòng lặp
        except openai.RateLimitError:
            continue  # 429 → thử model tiếp theo
        # Các exception khác (network, auth, v.v.) KHÔNG bắt — để raise lên cho FastAPI xử lý

    if raw_response is None:
        return _mock_generate(question, chunks, start)

    # Parse JSON
    try:
        parsed = json.loads(raw_response)
    except json.JSONDecodeError:
        match = re.search(r'\{.*\}', raw_response, re.DOTALL)
        parsed = json.loads(match.group()) if match else {"answer": raw_response, "claims": []}

    # Map index → source_label thật
    claims = []
    for c in parsed.get("claims", []):
        idx = c.get("source_chunk_index")
        if idx and 1 <= idx <= len(chunks):
            claims.append({"claim": c["claim"], "source_label": chunks[idx-1]["source_label"], "chunk_id": chunks[idx-1]["db_chunk_id"]})
        else:
            claims.append({"claim": c["claim"], "source_label": None, "chunk_id": None})

    grounded = sum(1 for c in claims if c["source_label"])
    grounded_ratio = grounded / len(claims) if claims else 0.0
    retrieval_score = chunks[0]["score"] if chunks else 0.0

    return {
        "answer_text": parsed["answer"],
        "claims": claims,
        "retrieval_score": retrieval_score,
        "grounded_ratio": grounded_ratio,
        "latency_ms": int((time.time() - start) * 1000)
    }


def _mock_generate(question: str, chunks: list[dict], start: float) -> dict:
    """Fallback đa dạng để test UI 3 mode khác nhau."""
    latency_ms = int((time.time() - start) * 1000) + 300
    if chunks:
        return {
            "answer_text": f"[DEMO] Dựa vào tài liệu ({chunks[0]['source_label']}): Lỗi liên quan đến '{question[:40]}' có thể tìm hiểu tại {chunks[0]['source_label']}. Hãy kiểm tra lại file `.env` và đảm bảo API key đã được khai báo đúng.",
            "claims": [
                {"claim": f"Thông tin từ {chunks[0]['source_label']}", "source_label": chunks[0]["source_label"], "chunk_id": chunks[0]["db_chunk_id"]},
                {"claim": "Chi tiết bổ sung chưa có trong tài liệu hiện tại", "source_label": None, "chunk_id": None}
            ],
            "retrieval_score": chunks[0]["score"],
            "grounded_ratio": 0.5,
            "latency_ms": latency_ms
        }
    return {
        "answer_text": "[DEMO] Không tìm thấy tài liệu liên quan. Câu hỏi này nằm ngoài phạm vi nội dung bài học — đề nghị hỏi Coach để được giải đáp chính xác.",
        "claims": [],
        "retrieval_score": 0.0,
        "grounded_ratio": 0.0,
        "latency_ms": latency_ms
    }
```

### 7.4. Confidence (services/confidence.py)

```python
ESCALATION_THRESHOLD = 0.6

def compute_confidence(retrieval_score: float, grounded_ratio: float) -> float:
    return round(0.5 * retrieval_score + 0.5 * grounded_ratio, 4)

def requires_escalation(confidence: float) -> bool:
    return confidence < ESCALATION_THRESHOLD
```

### 7.5. Library (services/library.py)

```python
import json, numpy as np
from .embedding import embed_query, cosine_sim

MATCH_THRESHOLD = 0.85

def match_library(question_text: str, db_session):
    q_emb = embed_query(question_text)
    entries = db_session.query(LibraryEntry).all()
    best, best_score = None, 0.0
    for entry in entries:
        score = cosine_sim(q_emb, json.loads(entry.question_embedding))
        if score > best_score:
            best_score, best = score, entry
    if best and best_score >= MATCH_THRESHOLD:
        best.reuse_count += 1
        db_session.commit()
        return best
    return None

def add_to_library(question_text, answer_text, source_answer_id, approved_by_id, db_session):
    entry = LibraryEntry(
        question_text=question_text,
        question_embedding=json.dumps(embed_query(question_text)),
        answer_text=answer_text,
        source_answer_id=source_answer_id,
        approved_by=approved_by_id
    )
    db_session.add(entry)
    db_session.commit()
    return entry
```

### 7.6. PDF Ingest (services/pdf_ingest.py)

```python
import fitz  # pymupdf
from pathlib import Path

def ingest_pdf(pdf_path: str, day: int) -> list[dict]:
    """
    Trả về list[{day, page_number, content, source_label}].
    Đồng thời render PNG vào frontend/public/slides/day{N}/page_{P}.png.
    """
    # Tính output path tương đối từ vị trí file này
    slides_dir = Path(__file__).resolve().parents[3] / "frontend" / "public" / "slides" / f"day{day}"
    slides_dir.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf_path)
    chunks = []
    for page_num, page in enumerate(doc, start=1):
        text = page.get_text("text").strip()
        if len(text) < 30:
            text = f"[Slide {page_num} — nội dung hình ảnh]"

        mat = fitz.Matrix(2, 2)  # 2x zoom ≈ 150 DPI
        pix = page.get_pixmap(matrix=mat)
        pix.save(str(slides_dir / f"page_{page_num}.png"))

        chunks.append({
            "day": day,
            "page_number": page_num,
            "content": text[:2000],
            "source_label": f"Tr. {page_num}",
        })
    doc.close()
    return chunks
```

---

## 8. API ENDPOINTS

### Base URL (backend): `http://localhost:8001`
### Frontend fetch: dùng path `/api/...` — Vite proxy sẽ forward sang `8001`

### Auth
```
POST /auth/login    Body:{username,password} → {access_token,token_type,role,display_name}
GET  /auth/me       Header:Bearer → {username,role,display_name}
GET  /health        → {status:"ok",version:"1.0.0"}
```

### Mode A
```
POST /api/mode-a/answer
  Body: {error_text:str, task_context?:str, day:int}
  Response: {answer_id, answer_text, claims:[{claim,source_label,chunk_id}], retrieval_score, latency_ms}
  Side effects: Ghi Question + Answer(status=draft) + InteractionLog
```

### Mode B
```
POST /api/mode-b/answer
  Body: {error_text, task_context?, day:int}
  Response: {answer_id, answer_text, claims, retrieval_score, grounded_ratio, confidence_score,
             requires_escalation:bool, latency_ms}

POST /api/mode-b/escalate
  Body: {answer_id:int}
  Response: {status:"sent_to_coach", escalation_id}
  Side effects: Answer.status="sent_to_coach", Escalation(is_anonymous=TRUE),
                InteractionLog.escalated=True
```

### Mode C
```
POST /api/mode-c/answer
  Body: {error_text, task_context?, day:int}
  Response: {answer_id|null, answer_text, status:"from_library"|"sent_to_coach",
             matched_question|null, approved_by_name|null, approved_at|null, reuse_count|null, latency_ms}
  Logic:
    1. match_library() → nếu khớp (score≥0.85): trả from_library
    2. Không khớp: chạy pipeline A → Answer(status=sent_to_coach) + Escalation(is_anonymous=FALSE)

POST /api/mode-c/feedback
  Body: {answer_id:int, helpful:bool}
  Side effect: helpful=false → tạo Escalation mới
```

### Coach (chỉ role=coach)
```
GET /coach/queue
  Response: [{escalation_id, answer_id, question_text, answer_text, mode, confidence_score,
              is_anonymous:bool, sent_at}]
  ⚠️ NẾU is_anonymous=True → KHÔNG trả user_id/display_name trong response

POST /coach/approve   Body:{answer_id} → {status:"approved", library_entry_id}
  Side effects: add_to_library(), Answer.status="approved", Escalation.resolved_at=now

POST /coach/reject    Body:{answer_id, reply_text} → {status:"rejected"}
  Side effects: Answer.status="rejected", Escalation.coach_reply=reply_text
```

### Compare
```
POST /api/compare/answer
  Body: {error_text, task_context?, day:int}
  Logic: asyncio.gather() → gọi song song 3 pipeline A/B/C
  Response: {mode_a:{...}, mode_b:{...}, mode_c:{...}}

GET /api/compare/stats
  Response: {
    total_interactions: int,
    by_mode: {
      A: {count, avg_retrieval_score, avg_latency_ms},
      B: {count, avg_confidence, escalation_rate, avg_latency_ms},
      C: {count, from_library_rate, total_reuses, avg_latency_ms}
    },
    escalation_over_time: [                    ← ORDER BY interaction_log.id ASC (KHÔNG group theo date)
      {interaction_seq:int, cumulative_escalations:int}  ← cumulative count, mỗi row là 1 interaction
    ],
    library_growth: [
      {interaction_seq:int, total_library_entries:int}   ← cumulative, tương tự
    ]
  }
```

> **Lý do không group theo date:** Demo diễn ra trong 1 buổi ngắn. Group theo ngày sẽ chỉ ra 1 điểm dữ liệu — vô dụng khi trình bày trực tiếp. Dùng thứ tự interaction tăng dần để chart có nhiều điểm ngay trong buổi demo.

---

## 9. SEED SCRIPTS (Chạy theo thứ tự. Tất cả phải idempotent.)

```bash
# Từ thư mục backend/
python seed/seed_users.py        # 1. Users
python seed/seed_course_docs.py  # 2. PDF ingest → chunks + PNG slides
python seed/seed_library.py      # 3. Library cold-start
```

**Idempotent pattern cho mỗi script:**
```python
# Ví dụ seed_users.py
if not db.query(User).filter_by(username="26ai.minhnh@vinuni.edu.vn").first():
    db.add(User(...))
    db.commit()

# Ví dụ seed_course_docs.py
if not db.query(CourseChunk).filter_by(day=17, page_number=page_num).first():
    db.add(CourseChunk(...))
    db.commit()
```

**seed_course_docs.py logic:**
```python
from pathlib import Path
from app.services.pdf_ingest import ingest_pdf
from app.services.embedding import embed_passage

PDF_PATHS = {17: "data/day17.pdf", 18: "data/day18.pdf"}

for day, path in PDF_PATHS.items():
    if not Path(path).exists():
        print(f"[WARN] {path} không tìm thấy, dùng fallback content")
        from seed_fallback_content import get_fallback_chunks
        chunks = get_fallback_chunks(day)
    else:
        chunks = ingest_pdf(path, day)

    for chunk in chunks:
        if db.query(CourseChunk).filter_by(day=day, page_number=chunk["page_number"]).first():
            continue  # Skip nếu đã tồn tại
        embedding = embed_passage(chunk["content"])
        db.add(CourseChunk(
            day=chunk["day"],
            page_number=chunk["page_number"],
            content=chunk["content"],
            source_label=chunk["source_label"],
            embedding_json=json.dumps(embedding)
        ))
    db.commit()
```

**seed_library.py cold-start (idempotent theo question_text):**
```python
COLD_START = [
    {
        "question_text": "Tôi bị lỗi AuthenticationError khi gọi API model trong lab, phải làm gì?",
        "answer_text": "Lỗi AuthenticationError xảy ra khi OPENAI_API_KEY trong file .env bị sai hoặc chưa được load đúng. Hãy kiểm tra: (1) file .env có tồn tại không; (2) biến OPENAI_API_KEY khai báo đúng cú pháp (không có dấu cách quanh '='); (3) chạy lại để reload. Nếu vẫn lỗi, in thử `print(os.getenv('OPENAI_API_KEY'))` để xác nhận giá trị."
    },
    {
        "question_text": "Cách cài đặt Docker Compose trên Ubuntu",
        "answer_text": "Câu hỏi này nằm ngoài phạm vi tài liệu khóa học."  # decoy để test fallback
    }
]
```

---

## 10. FRONTEND — UI SPEC

### 10.1. vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:8001',
      '/auth': 'http://localhost:8001',
      '/coach': 'http://localhost:8001',
    }
  }
})
```

### 10.2. package.json dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "recharts": "^2.13.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5"
  }
}
```

### 10.3. Màn hình Login (`/`)

**Layout:** Split screen 60%/40%

**LEFT (60%):** Background ảnh VinUni campus + overlay gradient blue. Tagline, quote, footer.
- `h1` (Outfit 800, 3.25rem, white): "Học để hiểu, không chỉ để trả lời."
- Quote blockquote: *"Chỗ nào em yếu, hệ thống biết và báo đúng chỗ đó."*

**RIGHT (40%):** Same ảnh + blur 10px. Form card (white, 420px).
- Title: "CHÀO MỪNG **TRỞ LẠI**" — "TRỞ LẠI" màu `--color-accent`
- Input email, input password (với icon eye toggle), checkbox "Ghi nhớ email"
- Button "Đăng nhập hệ thống →" (primary, full-width)
- Error state: border đỏ + text "Tài khoản hoặc mật khẩu không đúng."

### 10.4. Màn hình Home (`/home`)

Clone pixel-perfect từ `assets/mockups/Screenshot 2026-08-18 120848.png`.

- Topbar: Logo VLearn, Nav (Trang chủ active), EN/VI toggle, bell, avatar
- Danh sách khóa học: Buổi 17 và 18 click vào → navigate `/lesson/17`, `/lesson/18`
- Section "SẮP CÓ": 4 card với badge "Sắp ra mắt"

### 10.5. Màn hình Lesson Viewer (`/lesson/:dayId`)

Clone từ `assets/mockups/Screenshot 2026-08-18 120912.png`.

**3 cột: LeftSidebar (280px) | SlideViewer (flex-1) | AITutor (400px)**

**SlideViewer:**
- `<img>` src = `/slides/day{dayId}/page_{currentPage}.png`
- Fallback nếu 404: dùng `/slide-placeholder.png` (file local, KHÔNG hotlink external URL)
- Toolbar: Đọc / Bút / Highlight / Khoanh / Tẩy
- Thumbnail strip để chuyển trang

**AITutor header:** ModeSelector dropdown chọn A/B/C (không reload trang)

**Mọi API call từ AITutor phải gửi kèm `day: dayId` trong body.**

### 10.6. Chat Message Rendering

**Mode A — Neo Nguồn:**
- Text trả lời + SourcePanel (citation list)
- Click citation `Tr. N` → `SlideContext.setCurrentPage(N)` → SlideViewer tự chuyển trang

**Mode B — Mức Chắc Chắn:**
- Text + ConfidenceMeter bar (màu đỏ nếu <0.6, xanh nếu ≥0.6)
- Expandable "Vì sao?": hiển thị riêng `retrieval_score` + `grounded_ratio` (không chỉ số gộp)
- Nút "📤 Gửi Coach (ẩn danh)" nếu `requires_escalation=true`

**Mode C — from_library:**
- Text + VerifiedBadge: "✅ Đã được Coach [tên] xác nhận · [ngày] · Đã giúp [N] học viên"
- Feedback: 👍 Giải quyết được | 👎 Chưa đủ

**Mode C — sent_to_coach:**
- Badge "⏳ Đang chờ Coach duyệt"
- Nút **"👁 Xem trước (chưa xác nhận)"** — khi click hiện answer_text kèm banner cảnh báo đỏ:
  `"⚠️ Chưa được Coach xác nhận — hãy tự đối chiếu với tài liệu"`
  → Đảm bảo Gate 3: user không bị khoá hoàn toàn

### 10.7. Màn hình Compare (`/compare`) — Tính năng Chủ Lực

**PHẦN 1 — Bảng tĩnh (KHÔNG gọi API, viết tay):**

| Quyết định | Option A — Neo Nguồn | Option B — Mức Chắc Chắn | Option C — Coach Đã Duyệt |
|---|---|---|---|
| **Expectation** | AI trả lời kèm trích dẫn tài liệu. Phần không có nguồn bị đánh dấu rõ. | AI tự đánh giá mức tin cậy. Mức thấp (<60%) = cần xác nhận thêm. | Chỉ đưa câu trả lời đã Coach duyệt. Learner biết đây là câu đã xác nhận. |
| **Role & Agency** | Learner tự đọc citation và tự quyết có tin hay không. AI không đánh giá thay. | AI khai báo giới hạn; Learner quyết định có gửi Coach không. | Coach quyết từ trước; Learner nhận kết quả và phản hồi 👍/👎. |
| **Evidence & Uncertainty** | Từng mệnh đề gắn "Tr. N" hoặc đánh dấu "⚠ không có trong tài liệu". | Confidence bar (%) + breakdown: độ khớp tài liệu / tỉ lệ claim có nguồn. | Badge "✅ Đã Coach duyệt" + tên + ngày. Không có uncertainty. |
| **Control & Recovery** | Click citation → tự động chuyển sang đúng trang slide để đối chiếu. | Nút "Gửi Coach ẩn danh". Learner vẫn đọc được câu trả lời nếu muốn. | Nút "Xem trước chưa xác nhận" khi đang chờ duyệt. User không bị khoá. |

**PHẦN 2 — Test 1 câu → 3 cột song song (gọi `/api/compare/answer`):**
```
[InputBox + Gửi →]

[Mode A 📎]          [Mode B 🎯]              [Mode C ✓]
answer text          answer text              from_library/pending
▼ Nguồn (N)          Confidence: 45% ██░░    ✅ / ⏳
latency: 1.2s        latency: 1.4s            latency: 0.3s
```

**PHẦN 3 — Charts (recharts, data từ `/api/compare/stats`):**
```jsx
// Chart 1: BarChart — so sánh số lượt hỏi và escalation rate theo mode
// Chart 2: LineChart — library entries tăng theo thứ tự interaction (KHÔNG theo date)
//   x-axis: interaction_seq (1, 2, 3, ...)
//   y-axis: cumulative library entries
```

**Ưu tiên khi hết giờ:** Giữ Phần 1 (bảng tĩnh) bằng mọi giá. Có thể bỏ Phần 2+3 nếu thực sự không còn thời gian.

### 10.8. Màn hình Coach (`/coach`) — chỉ role=coach

- Stats row: [Hàng chờ] [Đã duyệt hôm nay] [Đã từ chối]
- Table: question_text, answer_text, mode, confidence, is_anonymous (hiện ✓/✗), sent_at
- Nút [✅ Duyệt] → gọi `/coach/approve` → hàng biến mất + toast
- Modal từ chối: textarea lý do → `/coach/reject`

---

## 11. REQUIREMENTS.TXT

```
fastapi==0.115.0
uvicorn[standard]==0.30.6
sqlalchemy==2.0.35
pydantic==2.9.2
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
python-dotenv==1.0.1
openai>=1.50.0
sentence-transformers==3.2.1
numpy>=1.24.0
python-multipart==0.0.12
pymupdf==1.24.11
```

> **Không có `anthropic`, không có `chromadb`.**

---

## 12. .ENV.EXAMPLE

```
OPENROUTER_API_KEY=sk-or-...
JWT_SECRET_KEY=change-this-in-production-use-long-random-string
```

---

## 13. index.html (SEO)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VLearn AI Tutor — Diagnostic Refresher | VinUniversity</title>
  <meta name="description" content="VLearn AI Tutor giúp học viên VinUniversity có được câu trả lời đáng tin cậy, với 3 cơ chế kiểm chứng: Neo Nguồn, Mức Chắc Chắn, và Coach Đã Duyệt." />
  <meta name="robots" content="noindex, nofollow" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 14. DEMO SCRIPT

### Mở đầu (30 giây)
Mở `/compare` → chỉ vào bảng "4 Quyết Định × 3 Option": *"3 option không khác nhau ở giao diện, mà khác ở chỗ ai chịu trách nhiệm kiểm chứng và vào lúc nào."*

### Luồng 1 — Option A (3 phút)
1. Login learner `26ai.minhnh@vinuni.edu.vn` / `demo1234`
2. Vào Buổi 17, chọn Mode A
3. Gõ: *"Tôi bị lỗi AuthenticationError khi gọi API trong lab, phải làm gì?"*
4. Click citation "Tr. 5" → slide tự chuyển trang 5 → demonstrate Control
5. Gõ câu ngoài tài liệu → claims bị đánh dấu "⚠ không trong tài liệu"

### Luồng 2 — Option B (3 phút)
1. Chuyển Mode B (không reload)
2. Gõ câu trong tài liệu → Confidence ~70% (xanh), không escalate
3. Gõ câu khó → Confidence ~30% (đỏ) → click "Gửi Coach ẩn danh"
4. Click "Vì sao?" → breakdown 2 số riêng

### Luồng 3 — Option C + Coach (4 phút)
1. Chuyển Mode C
2. Gõ câu AuthenticationError → "✅ Đã được Coach xác nhận" (từ cold-start library)
3. Gõ câu lạ → "⏳ Đang chờ" → click "Xem trước" → thấy answer kèm cảnh báo
4. Tab 2: login coach → `/coach` → Duyệt câu hỏi
5. Tab 1: hỏi lại → giờ thấy "✅ Đã được Coach xác nhận"

### Kết thúc — Compare (2 phút)
- Gõ 1 câu → xem 3 cột, chú ý latency khác nhau (C nhanh nhất = không gọi LLM)
- Chỉ vào charts: "Đây là dữ liệu từ các lượt vừa thao tác"

---

## 15. SELF-TEST CHECKLIST (Agent phải tự thực hiện sau khi code xong)

```
□ 1. GET /health → {"status":"ok"}

□ 2. POST /auth/login với tài khoản learner → nhận access_token
     POST /auth/login với sai password → 401

□ 3. POST /api/mode-b/answer với câu CÓ trong tài liệu Day 17
     → confidence_score > 0.6
     POST /api/mode-b/answer với câu KHÔNG có trong tài liệu
     → confidence_score < 0.4
     Nếu 2 số gần nhau bất thường → kiểm tra lại embed_query/embed_passage prefix

□ 4. POST /api/mode-b/escalate với answer_id từ bước 3
     GET /coach/queue với coach token
     → response KHÔNG chứa user_id/display_name (is_anonymous=True)

□ 5. Chạy seed scripts 2 lần liên tiếp
     → Lần 2 không có IntegrityError, không có duplicate

□ 6. POST /api/mode-c/answer với câu "AuthenticationError khi gọi API"
     → status: "from_library" (khớp cold-start library)
     POST /api/mode-c/answer với câu hoàn toàn lạ
     → status: "sent_to_coach"

□ 7. POST /api/compare/answer → response có đủ 3 key: mode_a, mode_b, mode_c

□ 8. GET /api/compare/stats sau vài lượt hỏi
     → escalation_over_time có items với interaction_seq tăng dần
     → library_growth có items

□ 9. Frontend: click citation Tr. N trong Mode A
     → SlideViewer chuyển sang đúng trang N

□ 10. Frontend `/compare`: Bảng "4 Quyết Định × 3 Option" render đúng,
      không bị lỗi layout
```

---

## 16. GHI CHÚ CUỐI

1. **Không cloud deploy.** Chỉ chạy local: `uvicorn app.main:app --port 8001 --reload` + `npm run dev` (port 3001). Nếu cần link public khi demo: `ngrok http 3001` — không cần code gì thêm.
2. **slide-placeholder.png:** Tạo 1 ảnh tĩnh đơn giản màu xám nhạt với text "Slide đang tải..." dùng canvas API hoặc tạo thủ công. KHÔNG hotlink domain ngoài — tránh phụ thuộc mạng lúc demo.
3. **OpenRouter free models:** Rate limit thấp nhưng đủ cho demo. Nếu cả 3 model trong chain đều 429 (hiếm xảy ra) → fallback mock. Không build key rotation — vô nghĩa vì limit theo project.
4. **Routers phải trong app/routers/:** Import `from app.routers import mode_a`, chạy từ `backend/` — không phải từ `backend/app/`.
5. **InteractionLog.id là thứ tự tăng dần tự nhiên** — dùng trực tiếp làm `interaction_seq` cho charts, không cần field riêng.
