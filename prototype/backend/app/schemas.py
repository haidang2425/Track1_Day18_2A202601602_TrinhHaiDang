from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    role: str
    display_name: str

class UserResponse(BaseModel):
    username: str
    role: str
    display_name: str

class ClaimItem(BaseModel):
    claim: str
    source_label: Optional[str] = None
    chunk_id: Optional[int] = None

class AnswerRequest(BaseModel):
    error_text: str
    task_context: Optional[str] = ""
    day: int

class ModeAAnswerResponse(BaseModel):
    answer_id: int
    answer_text: str
    claims: List[ClaimItem]
    retrieval_score: float
    latency_ms: int

class ModeBAnswerResponse(BaseModel):
    answer_id: int
    answer_text: str
    claims: List[ClaimItem]
    retrieval_score: float
    grounded_ratio: float
    confidence_score: float
    requires_escalation: bool
    latency_ms: int

class EscalateRequest(BaseModel):
    answer_id: int

class ModeCAnswerResponse(BaseModel):
    answer_id: Optional[int]
    answer_text: str
    status: str # "from_library" or "sent_to_coach"
    matched_question: Optional[str] = None
    approved_by_name: Optional[str] = None
    approved_at: Optional[str] = None
    reuse_count: Optional[int] = None
    latency_ms: int

class FeedbackRequest(BaseModel):
    answer_id: int
    helpful: bool

class QueueItem(BaseModel):
    escalation_id: int
    answer_id: int
    question_text: str
    answer_text: str
    mode: str
    confidence_score: Optional[float]
    is_anonymous: bool
    sent_at: datetime
    # Optionals depending on is_anonymous
    user_id: Optional[int] = None
    display_name: Optional[str] = None

class ApproveRequest(BaseModel):
    answer_id: int

class RejectRequest(BaseModel):
    answer_id: int
    reply_text: str

class CompareResponse(BaseModel):
    mode_a: ModeAAnswerResponse
    mode_b: ModeBAnswerResponse
    mode_c: ModeCAnswerResponse

class StatModeA(BaseModel):
    count: int
    avg_retrieval_score: float
    avg_latency_ms: int

class StatModeB(BaseModel):
    count: int
    avg_confidence: float
    escalation_rate: float
    avg_latency_ms: int

class StatModeC(BaseModel):
    count: int
    from_library_rate: float
    total_reuses: int
    avg_latency_ms: int

class StatsResponse(BaseModel):
    total_interactions: int
    by_mode: Dict[str, Any] # 'A': StatModeA, 'B': StatModeB, 'C': StatModeC
    escalation_over_time: List[Dict[str, int]]
    library_growth: List[Dict[str, int]]
