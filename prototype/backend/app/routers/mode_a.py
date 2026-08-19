import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db, User, Question, Answer, InteractionLog
from ..auth import get_current_user
from ..schemas import AnswerRequest, ModeAAnswerResponse
from ..services.retrieval import get_relevant_chunks
from ..services.generation import generate_with_citations
from ..services.guardrails import check_rate_limit

router = APIRouter(prefix="/api/mode-a", tags=["mode-a"])

@router.post("/answer", response_model=ModeAAnswerResponse)
def mode_a_answer(request: AnswerRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ok, msg = check_rate_limit(current_user.id)
    if not ok:
        raise HTTPException(status_code=429, detail=msg)
    return run_mode_a(request, db, current_user)


def run_mode_a(request: AnswerRequest, db: Session, current_user: User) -> dict:
    """Logic thật của Mode A, tách riêng khỏi route để compare.py gọi thẳng mà
    không đi qua check_rate_limit lần nữa (đã kiểm tra 1 lần ở compare_answer)."""
    # 1. Retrieve chunks
    chunks = get_relevant_chunks(request.error_text, request.day, db)

    # 2. Generate with citations
    result = generate_with_citations(request.error_text, chunks, request.task_context)

    # 3. Save to DB
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
        mode="A",
        answer_text=result["answer_text"],
        claims_json=json.dumps(result["claims"]),
        retrieval_score=result["retrieval_score"],
        grounded_ratio=result["grounded_ratio"],
        confidence_score=None,
        status="draft"
    )
    db.add(answer)

    log = InteractionLog(
        mode="A",
        question_text=request.error_text,
        latency_ms=result["latency_ms"],
        retrieval_score=result["retrieval_score"],
        grounded_ratio=result["grounded_ratio"],
        confidence_score=None,
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
        "latency_ms": result["latency_ms"]
    }
