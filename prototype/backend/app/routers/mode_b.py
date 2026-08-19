import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db, User, Question, Answer, InteractionLog, Escalation
from ..auth import get_current_user
from ..schemas import AnswerRequest, ModeBAnswerResponse, EscalateRequest
from ..services.retrieval import get_relevant_chunks
from ..services.generation import generate_with_citations
from ..services.confidence import compute_confidence, requires_escalation
from ..services.guardrails import check_rate_limit

router = APIRouter(prefix="/api/mode-b", tags=["mode-b"])

@router.post("/answer", response_model=ModeBAnswerResponse)
def mode_b_answer(request: AnswerRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ok, msg = check_rate_limit(current_user.id)
    if not ok:
        raise HTTPException(status_code=429, detail=msg)
    return run_mode_b(request, db, current_user)


def run_mode_b(request: AnswerRequest, db: Session, current_user: User) -> dict:
    """Logic thật của Mode B, tách riêng khỏi route để compare.py gọi thẳng mà
    không đi qua check_rate_limit lần nữa (đã kiểm tra 1 lần ở compare_answer)."""
    chunks = get_relevant_chunks(request.error_text, request.day, db)
    result = generate_with_citations(request.error_text, chunks, request.task_context)

    confidence = compute_confidence(result["retrieval_score"], result["grounded_ratio"])
    should_escalate = requires_escalation(confidence)

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
        mode="B",
        answer_text=result["answer_text"],
        claims_json=json.dumps(result["claims"]),
        retrieval_score=result["retrieval_score"],
        grounded_ratio=result["grounded_ratio"],
        confidence_score=confidence,
        status="draft"
    )
    db.add(answer)

    log = InteractionLog(
        mode="B",
        question_text=request.error_text,
        latency_ms=result["latency_ms"],
        retrieval_score=result["retrieval_score"],
        grounded_ratio=result["grounded_ratio"],
        confidence_score=confidence,
        escalated=False,
        from_library=False
    )
    db.add(log)
    db.commit()
    db.refresh(answer)

    return {
        "answer_id": answer.id,
        "answer_text": result["answer_text"],
        "claims": result["claims"],
        "retrieval_score": result["retrieval_score"],
        "grounded_ratio": result["grounded_ratio"],
        "confidence_score": confidence,
        "requires_escalation": should_escalate,
        "latency_ms": result["latency_ms"]
    }

@router.post("/escalate")
def escalate_answer(request: EscalateRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    answer = db.query(Answer).filter(Answer.id == request.answer_id).first()
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")

    # Chặn escalate hộ answer_id của người khác (chỉ chủ câu hỏi mới được gửi)
    owner_question = db.query(Question).filter(Question.id == answer.question_id).first()
    if not owner_question or owner_question.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Bạn không có quyền gửi câu trả lời này cho Coach")

    answer.status = "sent_to_coach"
    
    esc = Escalation(
        answer_id=answer.id,
        is_anonymous=True  # Mode B escalation is anonymous
    )
    db.add(esc)

    # update last log
    question = db.query(Question).filter(Question.id == answer.question_id).first()
    if question:
        log = db.query(InteractionLog).filter(
            InteractionLog.mode == "B",
            InteractionLog.question_text == question.error_text
        ).order_by(InteractionLog.id.desc()).first()
        if log:
            log.escalated = True

    db.commit()
    db.refresh(esc)
    return {"status": "sent_to_coach", "escalation_id": esc.id}
