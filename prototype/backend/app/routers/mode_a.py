from fastapi import APIRouter
from ..models import QuestionRequest, ModeAResponse

router = APIRouter()

@router.post("/answer", response_model=ModeAResponse)
def get_answer(req: QuestionRequest):
    return {
        "answer_text": "Dựa vào tài liệu, lỗi AuthenticationError xuất hiện khi API Key không hợp lệ hoặc thiếu trong biến môi trường. Bạn hãy kiểm tra lại file `.env` [1].",
        "claims": [
            {"claim": "lỗi AuthenticationError xuất hiện khi API Key không hợp lệ", "source_chunk_id": "Tr. 5"},
            {"claim": "kiểm tra lại file `.env`", "source_chunk_id": "Tr. 5"}
        ]
    }
