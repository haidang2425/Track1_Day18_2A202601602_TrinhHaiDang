from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db, User, Question, Answer, Escalation
from ..auth import get_current_user
from ..schemas import QueueItem, ApproveRequest, RejectRequest
from ..services.library import add_to_library

router = APIRouter(prefix="/coach", tags=["coach"])

def require_coach(current_user: User = Depends(get_current_user)):
    if current_user.role != "coach":
        raise HTTPException(status_code=403, detail="Forbidden")
    return current_user

@router.get("/queue", response_model=List[QueueItem])
def get_queue(db: Session = Depends(get_db), current_user: User = Depends(require_coach)):
    escalations = db.query(Escalation).filter(Escalation.resolved_at == None).all()
    results = []
    for esc in escalations:
        answer = db.query(Answer).filter(Answer.id == esc.answer_id).first()
        if not answer:
            continue  # answer đã bị xoá/không tồn tại — bỏ qua thay vì crash cả hàng đợi
        question = db.query(Question).filter(Question.id == answer.question_id).first()
        user = db.query(User).filter(User.id == question.user_id).first() if question else None
        
        item = {
            "escalation_id": esc.id,
            "answer_id": answer.id,
            "question_text": question.error_text if question else "",
            "answer_text": answer.answer_text,
            "mode": answer.mode,
            "confidence_score": answer.confidence_score,
            "is_anonymous": esc.is_anonymous,
            "sent_at": esc.sent_at
        }
        
        if not esc.is_anonymous and user:
            item["user_id"] = user.id
            item["display_name"] = user.display_name
            
        results.append(item)
    return results

@router.post("/approve")
def approve_answer(request: ApproveRequest, db: Session = Depends(get_db), current_user: User = Depends(require_coach)):
    answer = db.query(Answer).filter(Answer.id == request.answer_id).first()
    esc = db.query(Escalation).filter(Escalation.answer_id == request.answer_id, Escalation.resolved_at == None).first()
    if not answer or not esc:
        raise HTTPException(status_code=404, detail="Not found")

    question = db.query(Question).filter(Question.id == answer.question_id).first()

    answer.status = "approved"
    esc.resolved_at = datetime.utcnow()

    if question:
        entry = add_to_library(
            question_text=question.error_text,
            answer_text=answer.answer_text,
            source_answer_id=answer.id,
            approved_by_id=current_user.id,
            db_session=db
        )
        return {"status": "approved", "library_entry_id": entry.id}

    # answer.question_id là None: đây là câu trả lời Mode C lấy thẳng từ library
    # (không có Question riêng) bị feedback tiêu cực — nội dung đã có sẵn trong
    # library rồi nên không tạo entry trùng lặp, chỉ đóng escalation.
    db.commit()
    return {"status": "approved", "library_entry_id": None}

@router.post("/reject")
def reject_answer(request: RejectRequest, db: Session = Depends(get_db), current_user: User = Depends(require_coach)):
    answer = db.query(Answer).filter(Answer.id == request.answer_id).first()
    esc = db.query(Escalation).filter(Escalation.answer_id == request.answer_id, Escalation.resolved_at == None).first()
    if not answer or not esc:
        raise HTTPException(status_code=404, detail="Not found")

    answer.status = "rejected"
    esc.resolved_at = datetime.utcnow()
    esc.coach_reply = request.reply_text
    db.commit()

    return {"status": "rejected"}
