# PROJECT.md — Single source of truth cho MVP thật (VLearn AI Tutor · Diagnostic Refresher)

> File này chỉ nói về **phần build kỹ thuật MVP**. Nó không thay thế [README.md](README.md) (bài nộp Chặng 1+2, đầy đủ evidence) và không thay thế [assignment-brief.md](assignment-brief.md) (đề gốc ban tổ chức). Khi cần chi tiết evidence hoặc rubric gốc, đọc hai file đó — ở đây chỉ tóm tắt đủ để hiểu context.

**Quyết định stack (đã hỏi lại người dùng trước khi viết file này):**
- Backend: **Python + FastAPI**, DB **SQLite**.
- Auth: có thật (bảng `users`, password hash, session cookie), 2 role `learner` / `coach`, chỉ seed sẵn tài khoản demo — không có trang tự đăng ký.
- Coach-approval: có UI/route riêng cho coach bấm Approve/Reject, không chỉ seed data tĩnh.
- LLM sinh câu trả lời: Anthropic API thật (Claude), không mock.
- Embedding: local, offline (lý do ở mục 3).

---

## 1. Tóm tắt đề bài (bản đầy đủ: [assignment-brief.md](assignment-brief.md))

Lab "Track 1 – Day 18: Multiple Prototypes · Human–AI Design" (VLearn Codelabs). Luật cốt lõi cần nhớ khi build:

- Ba option A/B/C phải dùng **chung 1 target user, situation, task, content/data fixture** — chỉ khác ở *mechanism* và cách chia quyền quyết định giữa user/AI (Gate 2).
- Vì đây là case "sai thì đắt và khó phát hiện" (learner tin nhầm kiến thức sai), **không option nào được để AI tự quyết hoàn toàn** — luôn phải nằm ở vùng "hỏi lại người dùng" hoặc "không tự quyết thay người dùng" (Gate 3).
- Mỗi option cần: Expectation rõ, Role/Agency rõ (Act/Ask/Don't Act), Evidence/Uncertainty được thể hiện, Control/Recovery có đường quay lại (Gate 3).
- Prototype phải test được bởi người không build, không cần facilitator giải thích, có đường reset về context chung (Gate 4).
- Deliverable bắt buộc theo tên file cố định: `three-option-design-sheet.md`, `prototype-link.md`, `prototype-feedback-note.md`, `group-feedback-synthesis.md`, `ai-support-log.md` — **không đổi tên/đường dẫn các file này**, khả năng nền tảng kiểm tra tự động theo path cố định.

## 2. Tóm tắt Hypothesis Problem + 3 Option (bản đầy đủ evidence: [README.md](README.md))

**Hypothesis Problem:** Khi đang học trong/sát buổi lab và gặp một khái niệm hoặc lỗi thao tác chưa hiểu, learner khó có được một câu trả lời đủ tin cậy để đi tiếp, vì kênh hỏi người thật bị nghẽn (giơ tay, ngại hỏi, coach chủ động ít can thiệp), còn kênh thay thế (bạn bè, AI ngoài nền tảng) trả lời không kiểm chứng được → learner đi tiếp trên câu trả lời không chắc, hoặc bỏ qua kiến thức.

**Fixture chung cho cả 3 option (giữ nguyên xuyên suốt MVP):** lỗi `AuthenticationError` khi gọi API model do sai `OPENAI_API_KEY` trong `.env`, ở bước 3 của một bài lab, đối chiếu với một bộ tài liệu khóa học mẫu (seed từ nội dung slide Day 17/18 — xem mục 5.2).

| Option | Cơ chế | Ai chịu trách nhiệm xác minh, lúc nào |
|---|---|---|
| A — Neo nguồn | Câu trả lời AI kèm trích dẫn đúng đoạn tài liệu; phần không có trong tài liệu bị đánh dấu rõ | Learner tự đọc, tự quyết định tin hay không, ngay lúc đó |
| B — Tự khai mức chắc | AI tự tính độ tin cậy (không dùng self-report cảm tính — xem mục 3), nếu thấp thì đề nghị chuyển ẩn danh sang coach | Hệ thống khai ra, learner quyết định có leo thang hay không, ngay lúc đó |
| C — Đã được duyệt trước | Khớp câu hỏi với thư viện đã coach duyệt; sinh mới + xếp hàng chờ duyệt nếu chưa có match | Coach đã quyết từ trước, learner chỉ nhận lại |

## 3. Đánh giá kỹ thuật ba option — lựa chọn công nghệ và lý do chốt

### Option A — RAG có trích dẫn

| Lớp | Lựa chọn xem xét | Nhận định cho scope "MVP lab, chạy local, ít phụ thuộc hạ tầng ngoài" |
|---|---|---|
| Retrieval framework | Hand-rolled (chunk + cosine similarity) | **Chốt.** Bộ tài liệu seed chỉ vài chục chunk — không cần framework |
| | LlamaIndex `CitationQueryEngine` | Có pattern trích dẫn sẵn nhưng dependency tree nặng so với quy mô |
| | LangChain | Ecosystem lớn nhất nhưng trừu tượng hoá dư thừa cho use case này |
| Embedding | Voyage AI (đối tác Anthropic khuyến nghị cho RAG+Claude) | Chất lượng tốt nhất nhưng thêm 1 API key/nhà cung cấp ngoài — Anthropic hiện chưa có embeddings API riêng |
| | OpenAI `text-embedding-3-small` | Thêm nhà cung cấp AI thứ hai chỉ để lấy embedding — không cần thiết |
| | **`intfloat/multilingual-e5-small` (local, sentence-transformers)** | **Chốt.** Offline, miễn phí, không cần key, hỗ trợ tiếng Việt đủ tốt ở quy mô nhỏ |
| Vector store | ChromaDB (persistent client) | **Chốt.** `pip install` là chạy, ổn định trên Windows, đúng chuẩn cho <1M vector |
| | sqlite-vec | Gọn hơn (1 file) nhưng native extension kém ổn định khi load trên Windows |
| | LanceDB | Overkill cho vài chục chunk |
| Đo "faithfulness" | RAGAS-style LLM-judge tách claim | Chuẩn học thuật nhưng tốn thêm 1 lượt gọi Claude riêng mỗi câu — dư cho MVP |
| | **Structured citation-tagging trong cùng lượt sinh câu trả lời** (Claude trả JSON `[{claim, source_chunk_id\|null}]`) | **Chốt.** Không tốn thêm lượt gọi; chính là dữ liệu UI cần để hiển thị "Tr. N" và đánh dấu phần thiếu nguồn |

### Option B — Tự khai mức chắc

Nghiên cứu (2025–2026) xác nhận: **verbalized/self-reported confidence của LLM bị miscalibrated có hệ thống** — model báo tin cậy cao trên câu trả lời sai, số dồn vào các mốc tròn, lệch khỏi xác suất token nội tại. Vì vậy KHÔNG hỏi model "bạn chắc bao nhiêu %".

| Tín hiệu proxy | Cách tính | Chốt? |
|---|---|---|
| Retrieval similarity score | Cosine similarity giữa câu hỏi và chunk khớp nhất | ✅ dùng — phản ánh đúng thất bại evidence chỉ ra (lỗi setup môi trường nằm ngoài tài liệu → similarity thấp) |
| Grounded-claim ratio | Từ output citation-tagging của Option A: số claim có nguồn / tổng claim | ✅ dùng — tái sử dụng output A, không tốn lượt gọi thêm |
| Self-reported confidence | Hỏi model tự chấm | ❌ không dùng làm tín hiệu quyết định (có thể hiển thị tham khảo, không dùng để escalate) |

**Chốt:** `confidence = f(retrieval_similarity, grounded_claim_ratio)`, ngưỡng dưới **0.6** → đề nghị escalate. Đây chính là phần "grounding-score của A làm input cho B" trong sơ đồ compose ở mục 4.

### Option C — Đã được duyệt trước

Nghiên cứu về ngưỡng duplicate-matching bằng embedding: không có số chuẩn universal, dao động 0.7–0.95 theo domain; domain lỗi kỹ thuật/code khá literal nên nghiêng ngưỡng cao.

**Chốt:**
- Dùng cùng embedding model với Option A (`multilingual-e5-small`) — nhất quán, không load thêm model.
- Ngưỡng match: **0.85** cosine similarity (binary cho MVP; ngưỡng "vùng xám" 0.7–0.85 là hướng mở rộng sau, chưa làm ở MVP này).
- Cold start: seed **2 entry** trước khi test — (1) đúng câu hỏi fixture (AuthenticationError/.env) đã đánh dấu "coach đã duyệt" để tái hiện đúng cảnh "nhiều learner đã dùng lại"; (2) một câu hỏi decoy không khớp, để chứng minh nhánh fallback generate-mới-rồi-xếp-hàng-chờ-duyệt cũng chạy được khi demo/test.

## 4. Quan hệ giữa ba cơ chế — không loại trừ nhau

Ba "mode" trong UI test chỉ là ba điểm dừng khác nhau trên **một pipeline chung**:

```
embed(question)
   → match_library()              [lõi của Option C]
        ├─ có match ≥ 0.85 → trả thẳng câu đã duyệt
        └─ không match →
             retrieve_course_chunks()
                → generate_with_citation_tags()   [lõi của Option A]
                     → compute_confidence(retrieval_score, grounded_ratio)   [lõi của Option B]
                          └─ confidence thấp → escalate to coach (ẩn danh)
```

MVP vẫn tách UI thành 3 mode chọn được ở màn hình chung (đúng yêu cầu Gate 2: phải test riêng được), nhưng cả 3 gọi vào cùng các service ở mục 5.3 — không viết 3 bản logic riêng.

## 5. Kiến trúc tổng thể MVP

### 5.1. Sơ đồ thư mục

```
prototype/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app, mount routers
│   │   ├── db.py                   # SQLite connection + schema init
│   │   ├── auth.py                 # session cookie, password hash (passlib)
│   │   ├── models.py               # dataclass/pydantic schema cho request/response
│   │   ├── services/
│   │   │   ├── embedding.py        # load multilingual-e5-small 1 lần, embed(text)
│   │   │   ├── retrieval.py        # ChromaDB query course_chunks
│   │   │   ├── generation.py       # gọi Anthropic API, ép output JSON claims+citation
│   │   │   ├── confidence.py       # compute_confidence()
│   │   │   └── library.py         # match_library(), add_to_library()
│   │   └── routers/
│   │       ├── auth_router.py      # /auth/login, /auth/logout, /me
│   │       ├── mode_a.py           # /api/mode-a/answer
│   │       ├── mode_b.py           # /api/mode-b/answer, /api/escalate
│   │       ├── mode_c.py           # /api/mode-c/answer, /api/feedback
│   │       └── coach.py            # /coach/queue, /coach/approve, /coach/reject
│   ├── seed/
│   │   ├── seed_users.py           # tạo 1 learner demo + 1 coach demo
│   │   ├── seed_course_docs.py     # nạp course_chunks từ nội dung slide Day 17/18
│   │   └── seed_library.py         # 2 entry cold-start cho Option C
│   ├── requirements.txt
│   └── .env.example                # ANTHROPIC_API_KEY=...
└── frontend/                       # static HTML/JS, gọi backend bằng fetch — không build step
    ├── index.html                  # common context + chọn mode (giữ, nối fetch thật)
    ├── login.html                  # màn hình login (learner/coach)
    ├── option-a/index.html
    ├── option-b/index.html
    ├── option-c/index.html
    ├── coach/index.html            # màn coach: queue + Approve/Reject
    └── shared/
        ├── styles.css
        ├── fixture.js               # vẫn giữ để render khung context — nay nội dung động do backend seed quyết định, fixture.js chỉ còn phần hiển thị tĩnh không đổi (task line...)
        ├── render.js
        └── api.js                   # helper fetch() dùng chung, kèm xử lý cookie session
```

`prototype/` cũ (bản demo tĩnh 3 option không backend) sẽ được **thay thế tại chỗ** khi Việc 2 chạy — không giữ song song hai bản để tránh lệch thông tin.

### 5.2. Data model (SQLite)

| Bảng | Cột chính | Ghi chú |
|---|---|---|
| `users` | id, username, password_hash, role (`learner`\|`coach`), display_name | Seed sẵn 1 learner + 1 coach, không có trang đăng ký |
| `course_chunks` | id, title (ví dụ "Lab 3.2"), content, source_label (ví dụ "Tr. 5") | Seed từ nội dung slide Day 17/18 do bạn cung cấp thêm |
| `questions` | id, user_id, error_text, task_context, created_at | |
| `answers` | id, question_id, mode (`A`\|`B`\|`C`), answer_text, claims_json, retrieval_score, grounded_ratio, confidence_score, status (`draft`\|`sent_to_coach`\|`approved`\|`rejected`), created_at | |
| `library_entries` | id, question_embedding, question_text, answer_text, source_answer_id, approved_by, approved_at, reuse_count | Nguồn cho `match_library()` |
| `escalations` | id, answer_id, sent_at, coach_id, resolved_at, coach_reply | Dùng cho cả nhánh B (chủ động escalate) và C (👎 fallback) |
| `feedback` | id, answer_id, helpful (bool), created_at | 👍/👎 ở Option C |

### 5.3. API endpoints

| Method & path | Vai trò | Dùng bởi |
|---|---|---|
| `POST /auth/login`, `POST /auth/logout`, `GET /me` | Đăng nhập session-based | Tất cả |
| `POST /api/mode-a/answer` | embed → retrieve chunks → generate_with_citation_tags → lưu answer | Option A |
| `POST /api/mode-b/answer` | như A, cộng thêm `compute_confidence()` | Option B |
| `POST /api/escalate` `{answer_id}` | tạo `escalations`, status=`sent_to_coach` | Option B |
| `POST /api/mode-c/answer` | `match_library()`; nếu không match → chạy lại pipeline A rồi tự tạo escalation chờ duyệt | Option C |
| `POST /api/feedback` `{answer_id, helpful}` | ghi `feedback`; nếu `helpful=false` → tạo `escalations` | Option C |
| `GET /coach/queue` | list `answers`/`escalations` đang chờ | Coach UI |
| `POST /coach/approve` `{answer_id}` | ghi vào `library_entries`, status=`approved` | Coach UI |
| `POST /coach/reject` `{answer_id, reply_text}` | status=`rejected`, lưu `coach_reply` | Coach UI |

### 5.4. Luồng dữ liệu (ví dụ Option C, nhánh không match)

```
Learner mở option-c/index.html
   → fetch POST /api/mode-c/answer {error_text}
        backend: embed() → match_library() → không đạt 0.85
                → retrieve_course_chunks() → generate_with_citation_tags() (Claude)
                → lưu answers(status=sent_to_coach) + escalations
   ← trả về answer_text + trạng thái "đang chờ coach duyệt"
Coach mở coach/index.html (đăng nhập role=coach)
   → fetch GET /coach/queue → thấy câu hỏi trên
   → bấm Approve → POST /coach/approve
        backend: ghi vào library_entries (embedding của question đã tính sẵn)
Lần sau có learner khác hỏi câu tương tự
   → match_library() đạt ≥0.85 → trả thẳng, không cần Claude sinh lại
```

## 6. Build plan theo giai đoạn

| Giai đoạn | Nội dung | Điều kiện xong |
|---|---|---|
| 0 | Scaffold FastAPI + SQLite schema + seed users/coach, health-check endpoint | `GET /me` trả đúng user sau login |
| 1 | Service `embedding.py`, `retrieval.py`, `generation.py` (citation-tagging) + `/api/mode-a/answer` + nối `option-a/index.html` vào backend thật | Option A trả lời thật, có trích dẫn "Tr. N" đúng từ course_chunks đã seed |
| 2 | `confidence.py` + `/api/mode-b/answer` + `/api/escalate` + nối `option-b/index.html` | Câu hỏi ngoài tài liệu (fixture) tự động cho confidence thấp, nút escalate hoạt động |
| 3 | `library.py` + `/api/mode-c/answer` + `/api/feedback` + seed 2 entry cold-start + nối `option-c/index.html` | Câu hỏi fixture trả thẳng "đã duyệt", câu decoy rơi vào nhánh chờ duyệt |
| 4 | `coach.py` router + `coach/index.html` (login coach → queue → Approve/Reject) | Coach approve một câu ở hàng chờ → câu đó xuất hiện lại đúng ở Option C cho câu hỏi tương tự |
| 5 | Seed `course_chunks` bằng nội dung slide Day 17/18 thật (thay placeholder) | Trích dẫn Option A trỏ đúng nội dung slide thật, không còn placeholder |
| 6 | Smoke test end-to-end cả 3 mode + vòng coach, cập nhật `PROJECT.md` mục 7 và `prototype-link.md` (script chạy, port, biến môi trường) | Người khác clone máy mới, làm theo `prototype-link.md`, chạy được không cần hỏi thêm |

## 7. Trạng thái hiện tại theo 6 chặng của đề bài

| Chặng | Trạng thái | Ghi chú |
|---|---|---|
| 1 — Evidence + Hypothesis Problem | ✅ Xong | [README.md](README.md) |
| 2 — Ba Solution Option | ✅ Xong ở README.md, ⚠️ `three-option-design-sheet.md` vẫn đang là file rỗng — nên chép bản rút gọn dạng bảng vào đó để đúng tên deliverable ban tổ chức yêu cầu | Không tự động hóa được, cần người điền |
| 3 — Human–AI Decision Table + Gate 3 | ❌ Chưa làm | **Không thể tự động hóa bằng code** — cần người viết mô tả Act/Ask/Don't-Act dựa trên hành vi backend thật sau khi Việc 2 xong |
| 4 — Build micro-prototype | 🔄 Đang chuyển từ demo tĩnh sang MVP thật (Việc 2) | |
| 5 — Chuẩn bị test (context/task, luật facilitation) | ❌ Chưa làm | **Không thể tự động hóa** — cần người chốt câu hỏi relevant-context và outcome-task cụ thể |
| 6 — Test với 3 người thật | ❌ Chưa làm | **Không thể tự động hóa** — cần 3 tester thật ngoài nhóm, theo đúng luật facilitation của đề bài |
| — `ai-support-log.md` | ❌ Còn rỗng | Cần khai báo minh bạch việc dùng Claude Code cho toàn bộ quá trình này (đề gốc yêu cầu) |

## 8. Giả định và rủi ro còn mở

- Ngưỡng số (similarity match 0.85, confidence escalate 0.6) là suy luận có lý do từ nghiên cứu tổng quan (mục 3), **chưa được tinh chỉnh bằng dữ liệu thật của lớp này** — cần validate lại sau Chặng 6.
- Nội dung `course_chunks` seed từ slide Day 17/18 hiện là placeholder chờ bạn cung cấp text/markdown thật của slide (bạn đã nói sẽ gửi khi cần) — build sẽ dùng nội dung placeholder trước, thay bằng thật ở Giai đoạn 5.
- Chất lượng `multilingual-e5-small` với tiếng Việt pha thuật ngữ kỹ thuật (biến môi trường, API key...) chưa được kiểm chứng thực nghiệm trong repo này — chỉ dựa trên benchmark tổng quát của model.
- Không tự thêm evidence/số liệu người dùng nào không có nguồn — mọi con số hành vi learner trong docs vẫn giữ đúng những gì 3 practice notes ở Chặng 1 đã ghi.

## AI Support Log (tóm tắt — bản đầy đủ cần điền vào [ai-support-log.md](ai-support-log.md))

Toàn bộ nội dung mục 3 (nghiên cứu công nghệ), kiến trúc mục 5, và code MVP ở Việc 2 được xây dựng với sự hỗ trợ của Claude Code (Anthropic), bao gồm tra cứu web cho các claim kỹ thuật (embedding provider, vector DB, calibration của LLM, ngưỡng similarity — có nguồn kèm khi báo cáo). Quyết định kiến trúc cuối (stack, auth, coach-approval) do người dùng chốt qua trả lời trực tiếp, không phải AI tự quyết.
