import os
from sqlalchemy import create_engine, Column, Integer, String, Text, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./vlearn.db")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

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

class Question(Base):
    __tablename__ = "questions"
    id           = Column(Integer, primary_key=True)
    user_id      = Column(Integer, ForeignKey("users.id"))
    error_text   = Column(Text, nullable=False)
    task_context = Column(Text)
    day          = Column(Integer, nullable=True)  # buổi học (17|18) — thêm sau, NULL cho dữ liệu cũ
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

# Dependency để dùng trong FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
