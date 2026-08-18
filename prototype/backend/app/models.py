from pydantic import BaseModel
from typing import Optional, List

class UserCreate(BaseModel):
    username: str
    password: str
    role: str
    display_name: str

class LoginRequest(BaseModel):
    username: str
    password: str

class QuestionRequest(BaseModel):
    error_text: str
    task_context: Optional[str] = None

class ModeAResponse(BaseModel):
    answer_text: str
    claims: List[dict]

class ModeBResponse(BaseModel):
    answer_text: str
    claims: List[dict]
    confidence_score: float
    requires_escalation: bool

class ModeCResponse(BaseModel):
    answer_text: str
    status: str # from_library, sent_to_coach

class CoachApproveRequest(BaseModel):
    answer_id: int

class CoachRejectRequest(BaseModel):
    answer_id: int
    reply_text: str
