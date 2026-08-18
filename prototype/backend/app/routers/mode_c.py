from fastapi import APIRouter
from ..models import QuestionRequest, ModeCResponse
from pydantic import BaseModel

router = APIRouter()

@router.post("/answer", response_model=ModeCResponse)
def get_answer(req: QuestionRequest):
    if "api key" in req.error_text.lower() or "authenticationerror" in req.error_text.lower():
        return {
            "answer_text": "Lỗi AuthenticationError xảy ra do API Key không hợp lệ. Đã được Coach Đăng xác nhận. Vui lòng kiểm tra lại file `.env`.",
            "status": "from_library"
        }
    return {
        "answer_text": "Câu hỏi của bạn đã được gửi cho Coach. Bạn sẽ nhận được phản hồi sau.",
        "status": "sent_to_coach"
    }

class FeedbackRequest(BaseModel):
    answer_id: int
    helpful: bool

@router.post("/feedback")
def feedback(req: FeedbackRequest):
    return {"status": "success"}
