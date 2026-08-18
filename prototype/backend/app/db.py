from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, Text, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./vlearn.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String) # learner, coach
    display_name = Column(String)

class CourseChunk(Base):
    __tablename__ = "course_chunks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    source_label = Column(String)

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    error_text = Column(Text)
    task_context = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Answer(Base):
    __tablename__ = "answers"
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    mode = Column(String) # A, B, C
    answer_text = Column(Text)
    claims_json = Column(Text)
    retrieval_score = Column(Float)
    grounded_ratio = Column(Float)
    confidence_score = Column(Float)
    status = Column(String) # draft, sent_to_coach, approved, rejected
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class LibraryEntry(Base):
    __tablename__ = "library_entries"
    id = Column(Integer, primary_key=True, index=True)
    question_embedding = Column(Text) # Store as JSON or string
    question_text = Column(Text)
    answer_text = Column(Text)
    source_answer_id = Column(Integer, ForeignKey("answers.id"))
    approved_by = Column(Integer, ForeignKey("users.id"))
    approved_at = Column(DateTime, default=datetime.datetime.utcnow)
    reuse_count = Column(Integer, default=0)

class Escalation(Base):
    __tablename__ = "escalations"
    id = Column(Integer, primary_key=True, index=True)
    answer_id = Column(Integer, ForeignKey("answers.id"))
    sent_at = Column(DateTime, default=datetime.datetime.utcnow)
    coach_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    coach_reply = Column(Text, nullable=True)

class Feedback(Base):
    __tablename__ = "feedback"
    id = Column(Integer, primary_key=True, index=True)
    answer_id = Column(Integer, ForeignKey("answers.id"))
    helpful = Column(Boolean)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
