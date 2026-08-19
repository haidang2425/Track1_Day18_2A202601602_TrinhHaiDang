import json, time
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from ..db import get_db, User, Question, Answer, InteractionLog, Escalation, Feedback
from ..auth import get_current_user
from ..schemas import AnswerRequest, ModeCAnswerResponse, FeedbackRequest
from ..services.retrieval import get_relevant_chunks
from ..services.generation import generate_with_citations
from ..services.library import match_library
from ..services.guardrails import check_rate_limit

router = APIRouter(prefix="/api/mode-c", tags=["mode-c"])

@router.post("/answer", response_model=ModeCAnswerResponse)
def mode_c_answer(request: AnswerRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ok, msg = check_rate_limit(current_user.id)
    if not ok:
        raise HTTPException(status_code=429, detail=msg)
    return run_mode_c(request, db, current_user)


def run_mode_c(request: AnswerRequest, db: Session, current_user: User) -> dict:
    """Logic thật của Mode C, tách riêng khỏi route để compare.py gọi thẳng mà
    không đi qua check_rate_limit lần nữa (đã kiểm tra 1 lần ở compare_answer)."""
    start = time.time()

    # 1. Match library
    matched_entry = match_library(request.error_text, db)
    if matched_entry:
        coach = db.query(User).filter(User.id == matched_entry.approved_by).first()
        log = InteractionLog(
            mode="C",
            question_text=request.error_text,
            latency_ms=int((time.time() - start) * 1000),
            from_library=True
        )
        db.add(log)
        db.commit()

        # create a virtual answer ID for feedback purposes
        answer = Answer(
            question_id=None,
            mode="C",
            answer_text=matched_entry.answer_text,
            status="approved"
        )
        db.add(answer)
        db.commit()
        db.refresh(answer)

        return {
            "answer_id": answer.id,
            "answer_text": matched_entry.answer_text,
            "status": "from_library",
            "matched_question": matched_entry.question_text,
            "approved_by_name": coach.display_name if coach else "Coach",
            "approved_at": str(matched_entry.approved_at),
            "reuse_count": matched_entry.reuse_count,
            "latency_ms": int((time.time() - start) * 1000)
        }

    # 2. Câu hỏi giống hệt (đã chuẩn hoá) của CHÍNH user này đang chờ duyệt rồi?
    # → trả lại luôn kết quả đang chờ, không tạo thêm Question/Answer/Escalation
    # trùng lặp, không gọi lại LLM (tránh spam hàng chờ Coach + tốn API free-tier).
    normalized_text = request.error_text.strip().lower()
    pending_duplicate = (
        db.query(Answer)
        .join(Question, Question.id == Answer.question_id)
        .join(Escalation, Escalation.answer_id == Answer.id)
        .filter(
            Question.user_id == current_user.id,
            func.lower(func.trim(Question.error_text)) == normalized_text,
            Escalation.resolved_at.is_(None),
        )
        .order_by(Answer.id.desc())
        .first()
    )
    if pending_duplicate:
        return {
            "answer_id": pending_duplicate.id,
            "answer_text": pending_duplicate.answer_text,
            "status": "sent_to_coach",
            "latency_ms": 0
        }

    # 3. Không trùng — chạy pipeline thật và gửi Coach
    chunks = get_relevant_chunks(request.error_text, request.day, db)
    result = generate_with_citations(request.error_text, chunks, request.task_context)

    question = Question(
        user_id=current_user.id,
        error_text=request.error_text,
        task_context=request.task_context,
        day=request.day
    )
    db.add(question)
    db.commit()
    db.refresh(question)

    answer = Answer(
        question_id=question.id,
        mode="C",
        answer_text=result["answer_text"],
        claims_json=json.dumps(result["claims"]),
        retrieval_score=result["retrieval_score"],
        grounded_ratio=result["grounded_ratio"],
        status="sent_to_coach"
    )
    db.add(answer)
    db.commit()
    db.refresh(answer)

    esc = Escalation(
        answer_id=answer.id,
        is_anonymous=False  # Mode C is NOT anonymous
    )
    db.add(esc)

    log = InteractionLog(
        mode="C",
        question_text=request.error_text,
        latency_ms=result["latency_ms"],
        escalated=True,
        from_library=False
    )
    db.add(log)
    db.commit()

    return {
        "answer_id": answer.id,
        "answer_text": result["answer_text"],
        "status": "sent_to_coach",
        "latency_ms": result["latency_ms"]
    }

@router.post("/feedback")
def submit_feedback(request: FeedbackRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    fb = Feedback(answer_id=request.answer_id, helpful=request.helpful)
    db.add(fb)
    if not request.helpful:
        # Create an escalation if feedback is negative
        answer = db.query(Answer).filter(Answer.id == request.answer_id).first()
        if answer:
            answer.status = "sent_to_coach"
            esc = Escalation(
                answer_id=request.answer_id,
                is_anonymous=False
            )
            db.add(esc)
    db.commit()
    return {"status": "ok"}
