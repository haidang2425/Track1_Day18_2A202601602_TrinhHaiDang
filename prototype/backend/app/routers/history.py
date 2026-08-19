import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db, User, Question, Answer, Escalation
from ..auth import get_current_user

router = APIRouter(tags=["history"])


@router.get("/api/chat-history")
def get_chat_history(day: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Lịch sử hội thoại AI Tutor thật từ server, theo (user hiện tại + buổi học).
    Dùng để nạp lại chat khi mở trang trên máy/trình duyệt khác — localStorage chỉ
    còn là cache tạm, không phải nguồn dữ liệu chính."""
    questions = (
        db.query(Question)
        .filter(Question.user_id == current_user.id, Question.day == day)
        .order_by(Question.id.asc())
        .all()
    )

    messages = []
    for q in questions:
        answer = db.query(Answer).filter(Answer.question_id == q.id).order_by(Answer.id.asc()).first()
        if not answer:
            continue  # câu hỏi chưa có answer hoàn chỉnh (hiếm, lỗi giữa chừng) — bỏ qua

        messages.append({"id": f"q{q.id}", "question_id": q.id, "sender": "user", "text": q.error_text})

        claims = None
        if answer.claims_json:
            try:
                claims = json.loads(answer.claims_json)
            except (json.JSONDecodeError, TypeError):
                claims = None

        messages.append({
            "id": f"a{answer.id}",
            "question_id": q.id,
            "sender": "ai",
            "mode": answer.mode,
            "answer_id": answer.id,
            "text": answer.answer_text,
            "answer_text": answer.answer_text,
            "claims": claims,
            "retrieval_score": answer.retrieval_score,
            "grounded_ratio": answer.grounded_ratio,
            "confidence_score": answer.confidence_score,
            "status": answer.status,
            "requires_escalation": bool(answer.confidence_score is not None and answer.confidence_score < 0.6),
        })

    return {"messages": messages}


@router.get("/api/my-escalations")
def get_my_escalations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Các câu hỏi escalate của CHÍNH user này đã được Coach xử lý xong (duyệt/từ
    chối) — nguồn dữ liệu thật cho chuông thông báo phía học viên."""
    results = (
        db.query(Escalation, Question, Answer)
        .join(Answer, Answer.id == Escalation.answer_id)
        .join(Question, Question.id == Answer.question_id)
        .filter(Question.user_id == current_user.id, Escalation.resolved_at.isnot(None))
        .order_by(Escalation.resolved_at.desc())
        .limit(50)
        .all()
    )

    return [
        {
            "escalation_id": esc.id,
            "answer_id": answer.id,
            "question_text": question.error_text,
            "status": answer.status,
            "resolved_at": esc.resolved_at.isoformat() if esc.resolved_at else None,
            "coach_reply": esc.coach_reply,
        }
        for esc, question, answer in results
    ]
