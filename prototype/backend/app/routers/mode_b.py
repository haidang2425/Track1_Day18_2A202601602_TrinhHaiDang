from fastapi import APIRouter
from ..models import QuestionRequest, ModeBResponse
from pydantic import BaseModel

router = APIRouter()

@router.post("/answer", response_model=ModeBResponse)
def get_answer(req: QuestionRequest):
    # Simulate low confidence for fixture
    return {
        "answer_text": "Lỗi AuthenticationError có thể do sai API Key. Tuy nhiên tôi không tìm thấy phần này trong tài liệu. Tôi đề nghị bạn gửi câu hỏi này cho Coach để đảm bảo chính xác.",
        "claims": [],
        "confidence_score": 0.45,
        "requires_escalation": True
    }

class EscalateRequest(BaseModel):
    answer_id: int

@router.post("/escalate")
def escalate(req: EscalateRequest):
    return {"status": "sent_to_coach"}
