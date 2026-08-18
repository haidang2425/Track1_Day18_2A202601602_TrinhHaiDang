# VLearn AI Tutor — Master Project Specification (v2.0 · Production-Grade)

> **Dành cho AI Agent:** Đây là tài liệu spec kỹ thuật DUY NHẤT và CUỐI CÙNG. Đọc từ đầu đến cuối trước khi viết bất kỳ dòng code nào. Mọi quyết định thiết kế, logic business, schema DB, UI/UX, AI pipeline đều đã được chốt cứng. Không được tự ý thêm/bỏ/thay đổi kiến trúc mà không có lý do rõ ràng từ spec.

---

## 0. MỤC TIÊU & TIÊU CHÍ CHẤM ĐIỂM

**Sản phẩm:** VLearn AI Tutor — Diagnostic Refresher  
**Mục tiêu demo:** Chứng minh 3 cơ chế kiểm chứng câu trả lời AI khác nhau (Option A/B/C) trên cùng 1 content fixture, thỏa toàn bộ rubric bài Day 18 (Gate 1–5).

**Điều BGK sẽ chấm nặng nhất (theo rubric Day 18):**
1. Ba Option khác nhau có ý nghĩa ở cơ chế kiểm chứng (Gate 2) — không chỉ khác UI/màu sắc.
2. Mỗi Option thể hiện rõ 4 quyết định thiết kế Human-AI (Expectation / Role & Agency / Evidence & Uncertainty / Control & Recovery) theo Gate 3.
3. Không Option nào để AI tự quyết hoàn toàn — luôn có đường User kiểm soát / phục hồi.
4. Sản phẩm chạy được, testable bởi người không build (Gate 4).

**Vì vậy, ngoài 3 mode chat, sản phẩm BẮT BUỘC phải có màn hình `/compare` để BGK thấy sự khác biệt trực quan (xem Mục 10).**

---

## 1. TECH STACK

| Layer | Công nghệ | Ghi chú |
|---|---|---|
| Frontend | React 18 + Vite | CSS Modules (`.module.css`), không Tailwind |
| Styling | Vanilla CSS + CSS Modules | Google Fonts: Inter + Outfit |
| Backend | Python FastAPI + SQLite | SQLAlchemy ORM |
| Server | Uvicorn | `--port 8000`, `--reload` |
| AI LLM | Anthropic Claude (claude-3-haiku-20240307) | Fallback mock nếu thiếu API key |
| Embeddings | `intfloat/multilingual-e5-small` | Singleton, load 1 lần khi start |
| Vector DB | ChromaDB (persistent client) | Collection `course_chunks` |
| PDF Ingest | `pymupdf` (fitz) | Render slides thật, extract text theo trang |
| Auth | JWT (python-jose, HS256) | Header `Authorization: Bearer <token>` |
| Charts | recharts | Chỉ dùng ở `/compare` |
| Port Frontend | **3001** | `strictPort: false` |
| Port Backend | **8000** | |

---

## 2. DESIGN SYSTEM

### 2.1. Color Palette (pixel-perfect từ ảnh mockup VLearn thực tế)
```css
/* File: src/index.css — khai báo dưới :root */
:root {
  /* Brand */
  --color-primary:       #1a4f8b;   /* VinUni Blue — button, active, link */
  --color-primary-dark:  #153b69;   /* Hover primary */
  --color-primary-light: #e8f0fb;   /* Selected background */
  --color-accent:        #ef4444;   /* Red — logo chevron, highlight chữ */
  --color-accent-dark:   #dc2626;

  /* Surface */
  --color-bg:            #f0f2f5;   /* Page background */
  --color-surface:       #ffffff;   /* Card, panel, modal */
  --color-sidebar:       #f8fafc;   /* Left sidebar background */
  --color-topbar:        #ffffff;   /* Topbar background */

  /* Text */
  --color-text-primary:  #1f2937;
  --color-text-secondary:#374151;
  --color-text-muted:    #6b7280;
  --color-text-disabled: #9ca3af;

  /* Border */
  --color-border:        #e5e7eb;
  --color-border-strong: #d1d5db;

  /* Status */
  --color-success:       #16a34a;
  --color-success-bg:    #dcfce7;
  --color-warning:       #d97706;
  --color-warning-bg:    #fef3c7;
  --color-error:         #dc2626;
  --color-error-bg:      #fee2e2;

  /* Citation/Info */
  --color-info-bg:       #e0f2fe;
  --color-info-text:     #0369a1;

  /* Shadow */
  --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg:  0 10px 30px rgba(0,0,0,0.12);

  /* Radius */
  --radius-sm:  6px;
  --radius-md:  10px;
  --radius-lg:  14px;
  --radius-full:9999px;
}
```

### 2.2. Typography
```css
/* Import phải đặt ở đầu index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap');

body { font-family: 'Inter', sans-serif; font-size: 14px; }
h1,h2,h3,h4,h5,h6 { font-family: 'Outfit', sans-serif; }
```

---

## 3. CẤU TRÚC THƯ MỤC (Chính xác tới từng file)

```
prototype/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app, CORS, router mounting, lifespan event (load embedding model)
│   │   ├── db.py                # SQLAlchemy engine + Base + SessionLocal + tất cả ORM Models
│   │   ├── schemas.py           # Pydantic request/response schemas (không lẫn vào db.py)
│   │   ├── auth.py              # JWT encode/decode, password hashing (passlib bcrypt), get_current_user dependency
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── embedding.py     # singleton model load, embed_query(), embed_passage()
│   │       ├── retrieval.py     # ChromaDB init, add_chunk(), get_relevant_chunks()
│   │       ├── generation.py    # generate_with_citations() — real Claude + mock fallback
│   │       ├── confidence.py    # compute_confidence(), ESCALATION_THRESHOLD = 0.6
│   │       ├── library.py       # match_library(), add_to_library(), MATCH_THRESHOLD = 0.85
│   │       └── pdf_ingest.py    # ingest_pdf(path, day) -> List[ChunkData] dùng pymupdf
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth_router.py       # POST /auth/login, /auth/logout, GET /auth/me
│   │   ├── mode_a.py            # POST /api/mode-a/answer
│   │   ├── mode_b.py            # POST /api/mode-b/answer, POST /api/mode-b/escalate
│   │   ├── mode_c.py            # POST /api/mode-c/answer, POST /api/mode-c/feedback
│   │   ├── coach.py             # GET /coach/queue, POST /coach/approve, /coach/reject
│   │   └── compare.py           # POST /api/compare/answer, GET /api/compare/stats
│   ├── seed/
│   │   ├── seed_users.py        # Tạo 2 user demo
│   │   ├── seed_course_docs.py  # Gọi ingest_pdf cho day17.pdf + day18.pdf → seed ChromaDB + DB
│   │   ├── seed_library.py      # 2 cold-start entries cho Option C
│   │   └── seed_fallback_content.py  # Nội dung hard-code dự phòng nếu PDF không tìm thấy
│   ├── data/
│   │   ├── day17.pdf            # ← FILE ĐÃ CÓ SẴN
│   │   └── day18.pdf            # ← FILE ĐÃ CÓ SẴN
│   ├── chroma_db/               # ChromaDB persistent storage (gitignored)
│   ├── vlearn.db                # SQLite file (gitignored)
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   │   ├── slides/
│   │   │   ├── day17/           # page_1.png, page_2.png ... (render từ PDF khi seed)
│   │   │   └── day18/           # page_1.png, page_2.png ...
│   │   └── favicon.svg
│   ├── src/
│   │   ├── main.jsx
│   │   ├── index.css            # Global CSS Variables + Reset + base styles
│   │   ├── App.jsx              # Route: Login | Home | Lesson | Compare | Coach
│   │   ├── api/
│   │   │   └── client.js        # fetch wrapper: BASE_URL, auth header, error handling
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx  # user state, login/logout, JWT localStorage
│   │   │   └── SlideContext.jsx # currentPage state, setCurrentPage (dùng cho citation click)
│   │   ├── components/
│   │   │   ├── Login/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Login.module.css
│   │   │   ├── Home/
│   │   │   │   ├── Home.jsx
│   │   │   │   └── Home.module.css
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx        # Layout: Topbar + LeftSidebar + SlideViewer + AITutor
│   │   │   │   ├── Dashboard.module.css
│   │   │   │   ├── Topbar.jsx
│   │   │   │   ├── LeftSidebar.jsx
│   │   │   │   ├── SlideViewer.jsx      # img src từ /slides/dayN/page_P.png, subscribe SlideContext
│   │   │   │   └── AITutor/
│   │   │   │       ├── AITutor.jsx           # container: header + messages + input
│   │   │   │       ├── AITutor.module.css
│   │   │   │       ├── ModeSelector.jsx      # Dropdown Mode A/B/C trong header
│   │   │   │       ├── ChatMessage.jsx        # render theo mode
│   │   │   │       ├── ChatInput.jsx
│   │   │   │       ├── SourcePanel.jsx        # Mode A: citation list, click → SlideContext
│   │   │   │       ├── ConfidenceMeter.jsx    # Mode B: bar + breakdown
│   │   │   │       └── VerifiedBadge.jsx      # Mode C: coach-approved badge
│   │   │   ├── Compare/
│   │   │   │   ├── Compare.jsx              # 3-column + table + charts
│   │   │   │   └── Compare.module.css
│   │   │   ├── Coach/
│   │   │   │   ├── Coach.jsx
│   │   │   │   └── Coach.module.css
│   │   │   └── shared/
│   │   │       ├── Spinner.jsx
│   │   │       ├── ErrorBoundary.jsx
│   │   │       └── ProtectedRoute.jsx       # redirect nếu chưa login / sai role
│   │   └── hooks/
│   │       ├── useChat.js         # state + API calls cho AITutor
│   │       └── useCompare.js      # state + API call cho /compare
│   ├── index.html                # SEO meta tags
│   ├── vite.config.js            # port: 3001, proxy /api -> 8000, /auth -> 8000, /coach -> 8000
│   └── package.json
├── SETUP_GUIDE.md
└── README.md
```

---

## 4. DATABASE SCHEMA

```python
# Toàn bộ trong backend/app/db.py

class User(Base):
    __tablename__ = "users"
    id           = Column(Integer, primary_key=True)
    username     = Column(String, unique=True, index=True, nullable=False)
    password_hash= Column(String, nullable=False)
    role         = Column(String, nullable=False)  # "learner" | "coach"
    display_name = Column(String, nullable=False)

class CourseChunk(Base):
    __tablename__ = "course_chunks"
    id           = Column(Integer, primary_key=True)
    day          = Column(Integer, nullable=False)  # 17 | 18
    page_number  = Column(Integer, nullable=False)  # số trang trong PDF
    title        = Column(String)                   # heading nếu có, else null
    content      = Column(Text, nullable=False)
    source_label = Column(String, nullable=False)   # "Tr. {page_number}"
    chroma_id    = Column(String, unique=True)       # ID trong ChromaDB

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
    mode             = Column(String, nullable=False)  # "A" | "B" | "C"
    answer_text      = Column(Text)
    claims_json      = Column(Text)   # JSON: [{claim, source_label, chunk_id}]
    retrieval_score  = Column(Float)
    grounded_ratio   = Column(Float)
    confidence_score = Column(Float)
    status           = Column(String, default="draft")  # draft|sent_to_coach|approved|rejected
    created_at       = Column(DateTime, default=datetime.utcnow)

class LibraryEntry(Base):
    __tablename__ = "library_entries"
    id                  = Column(Integer, primary_key=True)
    question_text       = Column(Text)
    question_embedding  = Column(Text)  # JSON string của list[float]
    answer_text         = Column(Text)
    source_answer_id    = Column(Integer, ForeignKey("answers.id"), nullable=True)
    approved_by         = Column(Integer, ForeignKey("users.id"))
    approved_at         = Column(DateTime, default=datetime.utcnow)
    reuse_count         = Column(Integer, default=0)

class Escalation(Base):
    __tablename__ = "escalations"
    id           = Column(Integer, primary_key=True)
    answer_id    = Column(Integer, ForeignKey("answers.id"))
    is_anonymous = Column(Boolean, default=False)   # ← BẮT BUỘC có cột này
    sent_at      = Column(DateTime, default=datetime.utcnow)
    coach_id     = Column(Integer, ForeignKey("users.id"), nullable=True)
    resolved_at  = Column(DateTime, nullable=True)
    coach_reply  = Column(Text, nullable=True)

class Feedback(Base):
    __tablename__ = "feedback"
    id           = Column(Integer, primary_key=True)
    answer_id    = Column(Integer, ForeignKey("answers.id"))
    helpful      = Column(Boolean)
    created_at   = Column(DateTime, default=datetime.utcnow)

class InteractionLog(Base):
    __tablename__ = "interaction_logs"
    id               = Column(Integer, primary_key=True)
    mode             = Column(String)       # "A" | "B" | "C"
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

## 5. AUTH (JWT — Chốt cứng, không dùng cookie)

```python
# backend/app/auth.py
# Thư viện: python-jose[cryptography], passlib[bcrypt]

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "vlearn-dev-secret-change-in-prod")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 giờ — đủ dùng cả ngày demo

def create_access_token(data: dict) -> str:
    # encode với exp = utcnow + timedelta(minutes=...)
    ...

def verify_token(token: str) -> dict:
    # decode, trả về payload dict, raise HTTPException 401 nếu invalid
    ...

def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)) -> User:
    # dùng làm FastAPI Dependency trong tất cả router yêu cầu auth
    ...

def get_password_hash(password: str) -> str: ...
def verify_password(plain: str, hashed: str) -> bool: ...
```

```javascript
// frontend: lưu token và user vào localStorage + AuthContext state
// Mọi API call qua client.js tự động đính kèm: headers["Authorization"] = "Bearer " + token
```

---

## 6. DEMO ACCOUNTS (Seed cứng)

| Role    | Username                       | Password     | Display Name        |
|---------|--------------------------------|--------------|---------------------|
| learner | `26ai.minhnh@vinuni.edu.vn`    | `demo1234`   | Nguyễn Hoàng Minh   |
| coach   | `coach.dangth@vinuni.edu.vn`   | `coach1234`  | Trịnh Hải Đăng      |

---

## 7. AI PIPELINE (Chi tiết kỹ thuật chuẩn xác)

### 7.1. Embedding (embedding.py)
```python
from sentence_transformers import SentenceTransformer
import numpy as np

_model: SentenceTransformer | None = None

def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer("intfloat/multilingual-e5-small")
    return _model

def embed_query(text: str) -> list[float]:
    """Dùng cho câu hỏi của user. E5 yêu cầu prefix 'query: '"""
    model = get_model()
    vec = model.encode("query: " + text, normalize_embeddings=True)
    return vec.tolist()

def embed_passage(text: str) -> list[float]:
    """Dùng cho nội dung chunk/tài liệu. E5 yêu cầu prefix 'passage: '"""
    model = get_model()
    vec = model.encode("passage: " + text, normalize_embeddings=True)
    return vec.tolist()

def cosine_similarity(a: list[float], b: list[float]) -> float:
    """Trả về float trong [0, 1] sau khi clamp (embeddings đã normalize)."""
    score = float(np.dot(a, b))
    return max(0.0, min(1.0, score))  # clamp để tránh float noise âm nhỏ
```

### 7.2. Retrieval (retrieval.py)
```python
import chromadb

_client = None
_collection = None

def get_collection():
    global _client, _collection
    if _collection is None:
        _client = chromadb.PersistentClient(path="./chroma_db")
        _collection = _client.get_or_create_collection("course_chunks")
    return _collection

def add_chunk(chroma_id: str, content: str, metadata: dict):
    """Gọi khi seed. metadata = {day, page_number, source_label, db_chunk_id}"""
    embedding = embed_passage(content)
    get_collection().add(
        ids=[chroma_id],
        embeddings=[embedding],
        documents=[content],
        metadatas=[metadata]
    )

def get_relevant_chunks(question_text: str, n_results: int = 3) -> list[dict]:
    """
    Trả về list[{content, source_label, db_chunk_id, score}]
    score = max(0, cosine_similarity) đã clamp
    """
    q_embedding = embed_query(question_text)
    results = get_collection().query(
        query_embeddings=[q_embedding],
        n_results=n_results,
        include=["documents", "metadatas", "distances"]
    )
    chunks = []
    for doc, meta, dist in zip(
        results["documents"][0],
        results["metadatas"][0],
        results["distances"][0]
    ):
        # ChromaDB trả distance (L2 hoặc cosine distance), convert sang similarity
        score = max(0.0, 1.0 - dist)  # với cosine distance: similarity = 1 - distance
        chunks.append({
            "content": doc,
            "source_label": meta["source_label"],
            "db_chunk_id": meta["db_chunk_id"],
            "score": score
        })
    return chunks  # đã sorted theo score desc (ChromaDB tự sort)
```

### 7.3. Generation (generation.py)
```python
import anthropic, os, json, time

def generate_with_citations(
    question: str,
    chunks: list[dict],  # từ get_relevant_chunks()
    task_context: str = ""
) -> dict:
    """
    Trả về: {answer_text, claims, retrieval_score, grounded_ratio, latency_ms}
    claims = [{claim, source_label, chunk_id}]
    """
    start = time.time()
    api_key = os.getenv("ANTHROPIC_API_KEY", "")

    if not api_key:
        return _mock_generate(question, chunks, start)

    # Đánh số lại chunk theo thứ tự [1],[2],[3] — KHÔNG dùng DB id
    numbered_chunks = [
        f"[{i+1}] {c['source_label']} — {c['content']}"
        for i, c in enumerate(chunks)
    ]

    prompt = f"""Bạn là AI Tutor hỗ trợ học viên VinUniversity trả lời câu hỏi trong buổi lab.
CHỈ dựa vào tài liệu khóa học bên dưới. Không bịa thông tin ngoài tài liệu.

TÌNH HUỐNG: {task_context or "Đang làm lab AI."}
CÂU HỎI / LỖI: {question}

TÀI LIỆU:
{chr(10).join(numbered_chunks)}

Trả về JSON hợp lệ (không có text ngoài JSON):
{{
  "answer": "câu trả lời tiếng Việt, rõ ràng, dưới 200 từ",
  "claims": [
    {{"claim": "mệnh đề cụ thể", "source_chunk_index": 1}},
    {{"claim": "mệnh đề không có trong tài liệu", "source_chunk_index": null}}
  ]
}}
source_chunk_index là số [1/2/3] hoặc null nếu không có trong tài liệu."""

    client = anthropic.Anthropic(api_key=api_key)
    message = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )
    latency_ms = int((time.time() - start) * 1000)
    raw = message.content[0].text.strip()

    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        # Fallback nếu Claude trả thêm text
        import re
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        parsed = json.loads(match.group()) if match else {"answer": raw, "claims": []}

    # Map index [1/2/3] -> source_label thật
    claims = []
    for c in parsed.get("claims", []):
        idx = c.get("source_chunk_index")
        source_label = chunks[idx-1]["source_label"] if idx and 1 <= idx <= len(chunks) else None
        chunk_id = chunks[idx-1]["db_chunk_id"] if idx and 1 <= idx <= len(chunks) else None
        claims.append({
            "claim": c["claim"],
            "source_label": source_label,
            "chunk_id": chunk_id
        })

    grounded = sum(1 for c in claims if c["source_label"] is not None)
    grounded_ratio = grounded / len(claims) if claims else 0.0
    retrieval_score = chunks[0]["score"] if chunks else 0.0

    return {
        "answer_text": parsed["answer"],
        "claims": claims,
        "retrieval_score": retrieval_score,
        "grounded_ratio": grounded_ratio,
        "latency_ms": latency_ms
    }


def _mock_generate(question: str, chunks: list[dict], start: float) -> dict:
    """Fallback khi không có API key. Trả dữ liệu đa dạng để test UI."""
    latency_ms = int((time.time() - start) * 1000) + 300
    if chunks:
        return {
            "answer_text": f"[MOCK] Dựa vào tài liệu ({chunks[0]['source_label']}): nội dung liên quan đến '{question[:40]}...' có thể tìm thấy ở phần {chunks[0]['source_label']}.",
            "claims": [
                {"claim": f"Thông tin từ {chunks[0]['source_label']}", "source_label": chunks[0]["source_label"], "chunk_id": chunks[0]["db_chunk_id"]},
                {"claim": "Thông tin bổ sung chưa có trong tài liệu", "source_label": None, "chunk_id": None}
            ],
            "retrieval_score": chunks[0]["score"],
            "grounded_ratio": 0.5,
            "latency_ms": latency_ms
        }
    return {
        "answer_text": "[MOCK - Không có tài liệu khớp] Câu hỏi này không tìm thấy trong tài liệu khóa học. Đề nghị hỏi Coach.",
        "claims": [],
        "retrieval_score": 0.0,
        "grounded_ratio": 0.0,
        "latency_ms": latency_ms
    }
```

### 7.4. Confidence (confidence.py)
```python
ESCALATION_THRESHOLD = 0.6

def compute_confidence(retrieval_score: float, grounded_ratio: float) -> float:
    """
    Công thức: weighted average
    retrieval_score: [0,1] — đã clamp từ cosine similarity
    grounded_ratio:  [0,1] — tỉ lệ claims có source
    """
    return round(0.5 * retrieval_score + 0.5 * grounded_ratio, 4)

def requires_escalation(confidence: float) -> bool:
    return confidence < ESCALATION_THRESHOLD
```

### 7.5. Library (library.py)
```python
import json, numpy as np
from .embedding import cosine_similarity

MATCH_THRESHOLD = 0.85

def match_library(question_text: str, db_session) -> LibraryEntry | None:
    q_emb = embed_query(question_text)
    entries = db_session.query(LibraryEntry).all()
    best, best_score = None, 0.0
    for entry in entries:
        entry_emb = json.loads(entry.question_embedding)
        score = cosine_similarity(q_emb, entry_emb)
        if score > best_score:
            best_score, best = score, entry
    if best and best_score >= MATCH_THRESHOLD:
        best.reuse_count += 1
        db_session.commit()
        return best
    return None

def add_to_library(question_text: str, answer_text: str, source_answer_id: int,
                   approved_by_id: int, db_session) -> LibraryEntry:
    q_emb = embed_query(question_text)
    entry = LibraryEntry(
        question_text=question_text,
        question_embedding=json.dumps(q_emb),
        answer_text=answer_text,
        source_answer_id=source_answer_id,
        approved_by=approved_by_id
    )
    db_session.add(entry)
    db_session.commit()
    return entry
```

### 7.6. PDF Ingest (pdf_ingest.py)
```python
# Cần: pip install pymupdf
import fitz  # pymupdf
from pathlib import Path

def ingest_pdf(pdf_path: str, day: int) -> list[dict]:
    """
    Đọc PDF, trả về list ChunkData:
    [{day, page_number, content, source_label, image_path}]
    Đồng thời render từng trang thành PNG lưu vào:
    frontend/public/slides/day{N}/page_{P}.png
    """
    doc = fitz.open(pdf_path)
    chunks = []
    slides_dir = Path(f"../frontend/public/slides/day{day}")
    slides_dir.mkdir(parents=True, exist_ok=True)

    for page_num, page in enumerate(doc, start=1):
        # Extract text
        text = page.get_text("text").strip()
        if len(text) < 30:  # Trang hình ảnh/quá ngắn, vẫn giữ nhưng content ngắn
            text = f"[Slide {page_num} - nội dung hình ảnh]"

        # Render ảnh slide
        mat = fitz.Matrix(2, 2)  # 2x zoom = ~150 DPI
        pix = page.get_pixmap(matrix=mat)
        img_path = slides_dir / f"page_{page_num}.png"
        pix.save(str(img_path))

        chunks.append({
            "day": day,
            "page_number": page_num,
            "content": text[:2000],  # giới hạn 2000 ký tự mỗi chunk
            "source_label": f"Tr. {page_num}",
            "image_filename": f"page_{page_num}.png"
        })
    doc.close()
    return chunks
```

---

## 8. API ENDPOINTS (Đầy đủ)

### Base URL: `http://localhost:8000`

### Auth
```
POST /auth/login
  Body: {username: str, password: str}
  Response 200: {access_token: str, token_type: "bearer", role: str, display_name: str}
  Response 401: {detail: "Tài khoản hoặc mật khẩu không đúng"}

GET  /auth/me
  Header: Authorization: Bearer <token>
  Response 200: {username: str, role: str, display_name: str}

GET  /health
  Response 200: {status: "ok", version: "1.0.0"}
```

### Mode A
```
POST /api/mode-a/answer
  Auth: Bearer token (learner)
  Body: {error_text: str, task_context?: str}
  Response: {
    answer_id: int,
    answer_text: str,
    claims: [{claim: str, source_label: str|null, chunk_id: int|null}],
    retrieval_score: float,  # [0,1]
    latency_ms: int
  }
  Side effects: Ghi Question + Answer (status=draft) + InteractionLog vào DB
```

### Mode B
```
POST /api/mode-b/answer
  Auth: Bearer token (learner)
  Body: {error_text: str, task_context?: str}
  Response: {
    answer_id: int,
    answer_text: str,
    claims: [...],
    retrieval_score: float,
    grounded_ratio: float,
    confidence_score: float,  # compute_confidence(retrieval_score, grounded_ratio)
    requires_escalation: bool,  # true nếu confidence < 0.6
    latency_ms: int
  }

POST /api/mode-b/escalate
  Auth: Bearer token (learner)
  Body: {answer_id: int}
  Response: {status: "sent_to_coach", escalation_id: int}
  Side effects:
    - Cập nhật Answer.status = "sent_to_coach"
    - Tạo Escalation(answer_id, is_anonymous=TRUE, sent_at=now)
    - Cập nhật InteractionLog.escalated = True
```

### Mode C
```
POST /api/mode-c/answer
  Auth: Bearer token (learner)
  Body: {error_text: str, task_context?: str}
  Response: {
    answer_id: int|null,
    answer_text: str,
    status: "from_library" | "sent_to_coach",
    matched_question: str|null,    # câu hỏi đã match trong library
    approved_by_name: str|null,    # display_name của coach duyệt
    approved_at: str|null,         # ISO datetime string
    reuse_count: int|null,
    latency_ms: int
  }
  Logic:
    1. match_library(error_text, db) → entry
    2. Nếu có entry (score >= 0.85):
       - trả from_library, không tốn Claude token
       - Ghi InteractionLog(from_library=True)
    3. Nếu không:
       - Chạy full pipeline A
       - Lưu Answer(status=sent_to_coach)
       - Tạo Escalation(is_anonymous=False)  ← Mode C không ẩn danh, cần coach biết để duyệt
       - Ghi InteractionLog(from_library=False)

POST /api/mode-c/feedback
  Auth: Bearer token (learner)
  Body: {answer_id: int, helpful: bool}
  Response: {status: "recorded"}
  Side effect: Nếu helpful=false → tạo Escalation mới (escalate câu trả lời từ library)
```

### Coach
```
GET /coach/queue
  Auth: Bearer token (ROLE=coach BẮT BUỘC)
  Response: [{
    escalation_id: int,
    answer_id: int,
    question_text: str,
    answer_text: str,
    mode: str,
    confidence_score: float|null,
    is_anonymous: bool,
    # NẾU is_anonymous=True: KHÔNG CÓ user_id, display_name trong response
    # NẾU is_anonymous=False: có thể có display_name (tùy design)
    sent_at: str
  }]

POST /coach/approve
  Auth: Bearer token (coach)
  Body: {answer_id: int}
  Response: {status: "approved", library_entry_id: int}
  Side effects:
    - Lấy question_text từ question liên quan
    - Gọi add_to_library(question_text, answer_text, ...)
    - Cập nhật Answer.status = "approved"
    - Cập nhật Escalation.resolved_at, coach_id

POST /coach/reject
  Auth: Bearer token (coach)
  Body: {answer_id: int, reply_text: str}
  Response: {status: "rejected"}
  Side effects: Answer.status = "rejected", Escalation.coach_reply = reply_text, resolved_at = now
```

### Compare (Tính năng mới — quan trọng)
```
POST /api/compare/answer
  Auth: Bearer token (learner)
  Body: {error_text: str, task_context?: str}
  Response: {
    mode_a: { ...same as /api/mode-a/answer response... },
    mode_b: { ...same as /api/mode-b/answer response... },
    mode_c: { ...same as /api/mode-c/answer response... }
  }
  Logic: Gọi song song 3 pipeline dùng asyncio.gather() để giảm latency tổng

GET /api/compare/stats
  Auth: Bearer token (any)
  Response: {
    total_interactions: int,
    by_mode: {
      A: {count: int, avg_retrieval_score: float, avg_latency_ms: int},
      B: {count: int, avg_confidence: float, escalation_rate: float, avg_latency_ms: int},
      C: {count: int, from_library_rate: float, total_reuses: int, avg_latency_ms: int}
    },
    escalation_over_time: [{date: "YYYY-MM-DD", mode_b_escalations: int}],
    library_growth: [{date: "YYYY-MM-DD", total_entries: int}]
  }
```

---

## 9. SEED SCRIPTS (Chạy theo đúng thứ tự)

```bash
# 1. Tạo users
python seed/seed_users.py

# 2. Ingest PDF → seed course_chunks vào DB + ChromaDB + render slide images
python seed/seed_course_docs.py
# Script này gọi ingest_pdf("data/day17.pdf", 17) và ingest_pdf("data/day18.pdf", 18)
# Nếu không tìm thấy PDF → fallback sang seed_fallback_content.py

# 3. Seed library cold-start (2 entries: 1 match fixture + 1 không match)
python seed/seed_library.py
```

**seed_library.py cold-start entries:**
```python
# Entry 1: Match với fixture câu hỏi demo
{
    "question_text": "Tôi bị lỗi AuthenticationError khi gọi API model trong lab, phải làm gì?",
    "answer_text": "Lỗi AuthenticationError xảy ra khi OPENAI_API_KEY trong file .env bị sai hoặc chưa được load đúng. Hãy kiểm tra: (1) file .env có tồn tại trong thư mục project không; (2) biến OPENAI_API_KEY có được khai báo đúng cú pháp không (không có dấu cách quanh dấu '='); (3) chạy lại `python-dotenv` để reload. Nếu vẫn lỗi, in thử `print(os.getenv('OPENAI_API_KEY'))` để xác nhận giá trị.",
    "approved_by": "coach"  # approved_by coach demo
}
# Entry 2: Không match (decoy để test fallback)
{
    "question_text": "Cách cài đặt Docker Compose trên Ubuntu",
    "answer_text": "Câu hỏi này nằm ngoài phạm vi tài liệu khóa học hiện tại.",
    "approved_by": "coach"
}
```

---

## 10. FRONTEND — UI SPEC TỪNG MÀN HÌNH

### 10.1. Màn hình Login (`/`)

**Layout:** Split screen. LEFT 60% / RIGHT 40%.

**LEFT PANEL:**
- Background: `linear-gradient(135deg, rgba(26,79,139,0.88) 0%, rgba(15,48,87,0.95) 100%)` layered trên ảnh `https://vinuni.edu.vn/wp-content/uploads/2022/08/Vinuniversity-campus.jpg` (background-size: cover, background-position: center)
- Logo top-left: SVG chevron đỏ (20×20) + text "VLearn" (Outfit 700, 1.5rem, white)
- Top-right: 2 icon buttons (flag icon cho EN/VI toggle, moon icon cho dark mode) — `position: absolute; top: 1.5rem; right: 1.5rem`
- Main content (vertically centered, max-width 560px):
  - `h1` (Outfit 800, 3.25rem, white, line-height 1.2): "Học để hiểu, không chỉ để trả lời."
  - `p` (Inter 400, 1rem, white 85%, margin-top 1.5rem): "VLearn giúp bạn học theo từng ngày, hỏi tutor ngay trên tài liệu và luyện đúng knowledge component còn yếu."
  - Blockquote (border-left 3px solid white 40%, padding-left 1rem, margin-top 2.5rem, Inter 400 italic, white 70%): *"Chỗ nào em yếu, hệ thống biết và báo đúng chỗ đó."*
- Footer: `position: absolute; bottom: 1.5rem; left: 5rem; font-size: 0.75rem; color: rgba(255,255,255,0.55)`: "© 2026 VLearn · VinUni AI Thực Chiến. Adaptive Learning Platform."

**RIGHT PANEL:**
- Background: same ảnh campus, `backdrop-filter: blur(10px)`, overlay `rgba(255,255,255,0.15)`
- Form card: `background: #fff; padding: 2.5rem 3rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); width: 420px; margin: auto`
- `h2` (Outfit 700, 1.75rem): "CHÀO MỪNG **TRỞ LẠI**" — "TRỞ LẠI" được wrap trong `<span style="color: var(--color-accent)">`
- Subtitle (Inter 400, 0.875rem, muted): "Đăng nhập bằng tài khoản được cấp để tiếp tục"
- Label "Email đăng nhập" + Input (defaultValue từ localStorage nếu "remember" đã check)
- Label "Mật khẩu" (row với link "Quên mật khẩu?" float right) + Input type password + icon eye toggle (bật/tắt type)
- Checkbox "Ghi nhớ email của tôi"
- Button: "Đăng nhập hệ thống →" (full-width, primary)
- Row links: "ĐĂNG NHẬP LẦN ĐẦU?" | "✉ HỖ TRỢ"
- **Error state:** border input đỏ + text "Tài khoản hoặc mật khẩu không đúng." (color-error, font-size 0.8rem) — xuất hiện bên dưới form sau khi API trả 401

### 10.2. Màn hình Home (`/home`)

Clone pixel-perfect màn hình VLearn Dashboard từ `assets/mockups/Screenshot 2026-08-18 120848.png`.

**Topbar (60px, border-bottom, white):**
- Logo VLearn (SVG + text, 1.25rem)
- Nav: "Trang chủ" (active: underline 2px primary, font-weight 600) | "Khóa học" | "VLearn Buddy" | "Luyện tập" | "Lab ▼"
- Right: `[EN | VI]` pill, moon icon, bell icon, avatar circle "T" + "TRỊNH HẢI ĐĂNG ∨"

**Main (2 columns: `flex: 1` left / `320px` right, gap 2rem, padding 2rem):**

**Column LEFT:**
- Greeting: `h1` "Chào [DISPLAY_NAME]! 👋" (Outfit 700, 1.75rem) + `p` "Hôm nay là một ngày tuyệt vời..."
- Section header "KHÓA HỌC CỦA TÔI" (Outfit 700, 0.8rem, tracking-wider) + link "▶ XEM TẤT CẢ" (primary)
- Card trắng, rounded: Tabs (Track 2 active + 3 tab khác), horizontal scroll
- Lesson list:
  - `● Buổi 16: Day16-Track2-CloudInfrastructure` — badge "ĐANG HỌC..." (primary bg)
  - `○ Buổi 17: Day17-Track2-Data-pipeline-engineering` — clickable → navigate `/lesson/17`
  - `○ Buổi 18: day18-data-lakehouse-architecture` — clickable → navigate `/lesson/18`
- Section "SẮP CÓ TRÊN TRANG CHỦ": 4 card grid, mỗi card có icon + title + subtitle + badge "Sắp ra mắt" (muted)

**Column RIGHT:**
- Section header "HOẠT ĐỘNG HỌC TẬP" + link "▶ XEM TẤT CẢ"
- Card trắng: empty state icon + "Chưa có hoạt động nào được ghi lại."

### 10.3. Màn hình Lesson Viewer (`/lesson/:dayId`)

Clone pixel-perfect từ `assets/mockups/Screenshot 2026-08-18 120912.png`.

**Layout: `height: 100vh; display: flex; flex-direction: column`**
- Topbar 60px (border-bottom)
- Main area: `display: flex; flex: 1; overflow: hidden`
  - LeftSidebar 280px
  - SlideViewer flex-1
  - AITutor 400px

**Topbar:**
- `← Bài [N] · [lessonName]` (Inter 600, 0.9rem)
- Right: `[0/N bài]` (muted) + `[+]` button (tạo note) + Avatar circle "T"

**LEFT SIDEBAR:**
- Header: "NỘI DUNG BÀI HỌC" (Outfit 700, 0.75rem, tracking-wider, muted) + `[×]` close
- Module 1: "Slides ▼" (expanded)
  - Active item: `[●]` day17-data-pipeline-engineering — gạch chân xanh trái 3px primary
  - Sub-label: "Slide" (muted, 0.75rem)
- Module 2: "Day 17 - Track 2: Data Pipeline Eng..." `[›]` (collapsed)
- (Render đúng nội dung theo `dayId` prop)

**SLIDE VIEWER:**
- Background `#f1f5f9`
- `<img>` src = `/slides/day{dayId}/page_{currentPage}.png` (từ SlideContext)
  - Fallback: hiển thị ảnh placeholder `https://vinuni.edu.vn/wp-content/uploads/2022/08/Vinuniversity-campus.jpg` nếu ảnh PNG chưa được render
  - `max-height: calc(100vh - 200px); object-fit: contain; border-radius: var(--radius-md); box-shadow: var(--shadow-lg)`
- Toolbar pill (white, shadow, rounded-full, margin-top 1rem): `[▶ Đọc (active)] [✏ Bút] [✏ Highlight] [○ Khoanh] [◇ Tẩy] [💡] [···]`
- Sub-toolbar: `[□ Từng trang] [□ Cuộn đọc] [🔍 100% 🔍] [↩] [🗑] [⛶]`
- Thumbnail strip (horizontal scroll, 80px height): mini versions của slide, click → setCurrentPage
- Bottom: `[← Bài trước]` | `[Đi tới bài tiếp theo →]` (button primary)

**AI TUTOR RIGHT SIDEBAR:**
Header (padding 1rem 1.25rem, border-bottom):
- Left: Icon ✦ (tím/indigo `#6366f1`, 1.25rem) + text "AI Tutor"
- Right: `[ModeSelector dropdown]` + `[+]` + `[⬜]` + `[×]`

**ModeSelector dropdown (quan trọng):**
```
[▼ Mode A: Neo Nguồn 📎] ← toggle button
  ↓ dropdown menu:
  [ ] Mode A: Neo Nguồn 📎        — Câu trả lời + citation tài liệu
  [ ] Mode B: Mức Chắc Chắn 🎯   — AI tự báo độ tin cậy
  [ ] Mode C: Coach Đã Duyệt ✓   — Từ thư viện đã xác nhận
  [──────────────────────]
  [ ] So sánh cả 3 (→ /compare)
```

**Default state (chưa chat):**
AI message tự động (không cần user gửi):
```
"Chào bạn, rất vui được hỗ trợ bạn trong buổi học hôm nay về [tên bài học].
Bạn đang vướng mắc ở nội dung cụ thể nào hay muốn tìm hiểu kỹ hơn về phần
nào trong bài? Hãy cho mình biết để chúng ta cùng thảo luận nhé."
```
Bên dưới: 2 "HỎI TIẾP" chips gợi ý (lấy từ context bài học)

**Chat input:**
- Input placeholder "Hỏi bất cứ điều gì..."
- Send button (arrow up icon, primary color)
- Footer: "*Trợ giảng AI có thể sai — hãy đối chiếu với bài giảng.*" (muted, italic, 0.75rem, center)

### 10.4. Chat Message Rendering (Theo Mode)

**Mode A — Neo Nguồn:**
```jsx
<div className={styles.messageAI}>
  <div className={styles.avatar}>✦</div>
  <div className={styles.content}>
    <p>{answer_text}</p>

    {/* Expandable source panel */}
    <SourcePanel claims={claims} onCitationClick={(pageNum) => setCurrentPage(pageNum)} />
    {/* SourcePanel hiển thị: ▼ Nguồn ({count}) → list item: 📄 source_label */}
    {/* Click citation → SlideContext.setCurrentPage(pageNum) */}

    <div className={styles.actions}>
      <button>👍</button>
      <button>👎</button>
    </div>

    {/* Suggested follow-ups */}
    <div className={styles.followUps}>
      <span>HỎI TIẾP</span>
      <button>[Gợi ý 1 >]</button>
      <button>[Gợi ý 2 >]</button>
    </div>
  </div>
</div>
```

**Mode B — Mức Chắc Chắn:**
```jsx
<div className={styles.messageAI}>
  <p>{answer_text}</p>

  {/* ConfidenceMeter component */}
  <ConfidenceMeter
    confidence={confidence_score}       // số tổng hợp
    retrievalScore={retrieval_score}    // thành phần 1
    groundedRatio={grounded_ratio}      // thành phần 2
  />
  {/* Render:
      [Bar: 45% màu đỏ-cam nếu < 0.6, xanh nếu >= 0.6]
      "Độ tin cậy: 45%"
      [expandable "Vì sao?":
        - Độ khớp tài liệu: 35% (retrieval_score)
        - Tỉ lệ claim có nguồn: 55% (grounded_ratio)
      ]
  */}

  {requires_escalation && (
    <div className={styles.escalateBox}>
      <p>⚠️ Độ tin cậy thấp. Tôi đề nghị gửi câu hỏi này cho Coach xác nhận.</p>
      <button onClick={handleEscalate} className={styles.btnEscalate}>
        📤 Gửi Coach (ẩn danh)
      </button>
    </div>
  )}

  <SourcePanel claims={claims} onCitationClick={...} />
</div>
```

**Mode C — from_library:**
```jsx
<div className={styles.messageAI}>
  <p>{answer_text}</p>
  <VerifiedBadge coachName={approved_by_name} approvedAt={approved_at} reuseCount={reuse_count} />
  {/* Render: ✅ Đã được Coach [coachName] xác nhận · [date]
              "Đã giúp [N] học viên khác" */}
  <div className={styles.feedbackRow}>
    <button onClick={() => submitFeedback(true)}>👍 Giải quyết được</button>
    <button onClick={() => submitFeedback(false)}>👎 Chưa đủ</button>
  </div>
</div>
```

**Mode C — sent_to_coach (chờ duyệt):**
```jsx
<div className={styles.messageAI}>
  <div className={styles.pendingBadge}>⏳ Đang chờ Coach duyệt</div>
  <p>Câu hỏi của bạn chưa có trong thư viện. Tôi đã tạo câu trả lời và gửi Coach duyệt.
  Bạn có thể tiếp tục học trong lúc chờ.</p>

  {/* Control & Recovery — đảm bảo Gate 3 */}
  <button className={styles.btnShowAnyway} onClick={() => setShowUnverified(true)}>
    👁 Xem trước câu trả lời (chưa được xác nhận)
  </button>

  {showUnverified && (
    <div className={styles.unverifiedBox}>
      <div className={styles.warningBanner}>
        ⚠️ Chưa được Coach xác nhận — hãy tự đối chiếu với tài liệu trước khi tin.
      </div>
      <p>{answer_text}</p>
      <SourcePanel claims={claims} onCitationClick={...} />
    </div>
  )}
</div>
```

### 10.5. Màn hình Compare (`/compare`) — Tính năng Chủ Lực

**Layout: full page, 2 sections:**

**Section 1: Bảng 4 Quyết Định Thiết Kế × 3 Option (Static content — viết tay)**

| Quyết định | Option A — Neo Nguồn | Option B — Mức Chắc Chắn | Option C — Coach Đã Duyệt |
|---|---|---|---|
| **Expectation** | AI sẽ trả lời kèm trích dẫn tài liệu. Learner biết trước rằng phần không có nguồn sẽ được đánh dấu. | AI sẽ tự đánh giá mức tin cậy. Learner biết trước mức thấp (<60%) đồng nghĩa cần xác nhận thêm. | Hệ thống chỉ đưa ra câu trả lời đã có người thật duyệt. Learner biết đây là câu đã được xác nhận. |
| **Role & Agency** | Learner **tự đọc** citation và **tự quyết** có tin hay không — AI không đánh giá thay. | AI **khai báo** giới hạn và **mở đường** leo thang; Learner **quyết định** có gửi Coach không. | Coach **quyết từ trước**; Learner **nhận kết quả** và **phản hồi** có hữu ích không (👍/👎). |
| **Evidence & Uncertainty** | Từng mệnh đề gắn "Tr. N" hoặc đánh dấu "⚠ không có trong tài liệu". Learner thấy bằng chứng trực tiếp. | Confidence bar (%) + breakdown (độ khớp tài liệu / tỉ lệ claim có nguồn). Learner thấy số đo cụ thể. | Badge "✅ Đã Coach duyệt" + tên Coach + ngày. Không có uncertainty — đây là câu đã xác nhận. |
| **Control & Recovery** | Click citation → tự động chuyển sang đúng trang slide để đối chiếu. Learner kiểm chứng ngay tại chỗ. | Nút "Gửi Coach (ẩn danh)" khi confidence thấp. Learner có thể bỏ qua và vẫn đọc câu trả lời. | Nút "Xem trước (chưa xác nhận)" khi đang chờ duyệt. Learner không bị khoá hoàn toàn. |

**Section 2: Test 1 câu → xem 3 kết quả song song**

```
[InputBox: "Nhập câu hỏi để so sánh cả 3 mode..."] [Gửi →]
(khi submit → gọi POST /api/compare/answer)

[ Mode A 📎 ]         [ Mode B 🎯 ]              [ Mode C ✓ ]
[answer text]         [answer text]              [answer text / status]
[▼ Nguồn (2)]         [Confidence: 45% ██░░]     [✅ từ library / ⏳ chờ]
[latency: 1.2s]       [latency: 1.4s]            [latency: 0.3s]
```

**Section 3: Charts (recharts)**

```jsx
// Chart 1: BarChart — Phân phối theo Mode
<BarChart data={stats.by_mode}>
  <Bar dataKey="count" name="Số lượt hỏi" />
  <Bar dataKey="escalation_rate" name="Tỉ lệ escalate (B)" />
</BarChart>

// Chart 2: LineChart — Library reuse tăng dần
<LineChart data={stats.library_growth}>
  <Line dataKey="total_entries" name="Entries trong Library" />
</LineChart>
```

### 10.6. Màn hình Coach (`/coach`)

Chỉ truy cập được với role="coach" (ProtectedRoute kiểm tra).

- Topbar: "VLearn · Coach Dashboard" + "Đăng xuất" button
- Stats row: [Tổng hàng chờ] [Đã duyệt hôm nay] [Đã từ chối hôm nay]
- Table (responsive):
  | STT | Câu hỏi | AI trả lời | Mode | Confidence | Ẩn danh? | Thời gian | Thao tác |
  |---|---|---|---|---|---|---|---|
  | 1 | "Lỗi AuthError..." | "Kiểm tra .env..." | B | 45% | ✓ | 5 phút trước | [✅ Duyệt] [❌ Từ chối] |
- Modal Từ chối: input textarea "Lý do / phản hồi cho learner" + [Hủy] [Xác nhận từ chối]
- Sau approve: hàng biến mất khỏi table, toast "✅ Đã duyệt và thêm vào Library"

---

## 11. VITE CONFIG & PROXY

```javascript
// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:8000',
      '/auth': 'http://localhost:8000',
      '/coach': 'http://localhost:8000',
    }
  }
})
```
> **Với proxy này, tất cả fetch trong React chỉ cần gọi `/api/...`, `/auth/...` — không cần ghi đầy đủ `http://localhost:8000`. Không cần CORS header phức tạp.**

---

## 12. SEO — index.html

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VLearn AI Tutor — Diagnostic Refresher | VinUniversity</title>
  <meta name="description" content="VLearn AI Tutor giúp học viên VinUniversity có được câu trả lời đáng tin cậy ngay trong buổi lab, với 3 cơ chế kiểm chứng: Neo Nguồn, Mức Chắc Chắn, và Coach Đã Duyệt." />
  <meta name="robots" content="noindex, nofollow" />
  <meta property="og:title" content="VLearn AI Tutor — Prototype Nhóm 333" />
  <meta property="og:description" content="AI Tutor tin cậy cho học viên AI VinUniversity" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 13. REQUIREMENTS.TXT

```
fastapi==0.115.0
uvicorn[standard]==0.30.6
sqlalchemy==2.0.35
pydantic==2.9.2
passlib[bcrypt]==1.7.4
python-jose[cryptography]==3.3.0
python-dotenv==1.0.1
anthropic>=0.40.0
sentence-transformers==3.2.1
chromadb==0.5.20
python-multipart==0.0.12
pymupdf==1.24.11
```

---

## 14. .ENV.EXAMPLE

```
ANTHROPIC_API_KEY=sk-ant-...
JWT_SECRET_KEY=change-this-in-production-use-long-random-string
```

---

## 15. DEMO SCRIPT (Kịch bản cho Ban Giám Khảo)

### Mở đầu (30 giây)
Mở `/compare` trước. Chỉ vào bảng "4 Quyết Định Thiết Kế × 3 Option" và giải thích ngắn: "Ba option không khác nhau ở giao diện mà khác nhau ở chỗ ai chịu trách nhiệm kiểm chứng câu trả lời và vào lúc nào."

### Luồng 1 — Option A (3 phút)
1. Login `26ai.minhnh@vinuni.edu.vn` / `demo1234`
2. Vào Buổi 17 → Lesson Viewer, chọn **Mode A**
3. Gõ: *"Tôi bị lỗi AuthenticationError khi gọi API model trong lab, phải làm gì?"*
4. Xem response: AI trả lời kèm "▼ Nguồn (1) — Tr. 5" → **click "Tr. 5"** → slide tự chuyển sang trang 5
5. Gõ câu khó: *"So sánh Airflow và Prefect cho production pipeline?"*
6. Xem response: claims không có nguồn bị đánh dấu "⚠ không có trong tài liệu" — demonstrate limitation

### Luồng 2 — Option B (3 phút)
1. Chuyển **Mode B** trong dropdown (không cần reload)
2. Gõ lại: *"AuthenticationError khi gọi API do sai API key"*
3. Xem Confidence Meter ~70-75% (xanh, câu có trong tài liệu) → không cần escalate
4. Gõ: *"Giải thích khái niệm lakehouse architecture"*
5. Xem Confidence thấp (~35%, đỏ) → xuất hiện "📤 Gửi Coach (ẩn danh)"
6. Click "Gửi Coach" → toast "✓ Đã gửi ẩn danh. Bạn sẽ nhận phản hồi khi Coach duyệt."
7. Click "Vì sao?" → dropdown breakdown: "Độ khớp tài liệu: 20% / Tỉ lệ claim có nguồn: 50%"

### Luồng 3 — Option C + Coach Approval (4 phút)
1. Chuyển **Mode C**
2. Gõ: *"AuthenticationError khi gọi API do sai OPENAI_API_KEY"*
3. Xem: "✅ Đã được Coach Trịnh Hải Đăng xác nhận — Đã giúp 1 học viên khác" (từ cold-start library)
4. Gõ câu lạ: *"Giải thích lakehouse là gì?"*
5. Xem: "⏳ Đang chờ Coach duyệt" + nút "👁 Xem trước (chưa xác nhận)"
6. **Tab 2:** Login coach `coach.dangth@vinuni.edu.vn` / `coach1234` → `/coach`
7. Thấy câu hỏi ở queue, click **✅ Duyệt**
8. **Tab 1 (learner):** Gõ lại câu "lakehouse" → "✅ Đã được Coach xác nhận" ← library đã có

### Kết thúc: Compare Dashboard (2 phút)
- Vào `/compare`, gõ 1 câu hỏi → xem 3 cột kết quả song song
- Chỉ vào charts: "Đây là dữ liệu từ các lượt demo vừa rồi — Mode C có latency thấp nhất vì không gọi Claude."

---

## 16. LƯU Ý CUỐI CHO AI AGENT CODE

1. **Không bỏ qua bất kỳ mục nào** — spec này là đầy đủ, không cần tự sáng tạo thêm.
2. **Thứ tự code:** DB → Auth → Seed → Services → Routers → Frontend (theo chiều dependency).
3. **Test sau mỗi router:** Sau khi code xong từng router, gọi thử bằng `curl` hoặc FastAPI `/docs` trước khi chuyển sang router tiếp theo.
4. **E5 prefix bắt buộc:** `embed_query` dùng `"query: "` prefix, `embed_passage` dùng `"passage: "` prefix — sai prefix làm giảm retrieval quality đáng kể.
5. **Proxy Vite:** Với cấu hình proxy, frontend fetch `/api/...` không cần `http://localhost:8000` — CORS đã được xử lý bởi Vite dev server proxy.
6. **SlideViewer fallback:** Nếu ảnh PNG chưa có (chưa seed PDF), hiển thị placeholder VinUni campus. Không crash.
7. **asyncio.gather cho /compare:** Gọi 3 pipeline song song để giảm latency tổng (không gọi tuần tự).
8. **InteractionLog:** Ghi log ở TẤT CẢ 3 router (A, B, C) — đây là nguồn dữ liệu cho /compare/stats.
9. **is_anonymous:** Mode B escalation luôn `is_anonymous=True`. Mode C escalation `is_anonymous=False`.
10. **ProtectedRoute:** Route `/coach` chỉ cho role="coach". Route `/lesson/:dayId` và `/compare` chỉ cho learner đã đăng nhập (any role).
