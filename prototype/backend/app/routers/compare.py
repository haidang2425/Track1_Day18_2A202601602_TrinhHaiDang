from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db, User, InteractionLog, Escalation, LibraryEntry
from ..auth import get_current_user
from ..schemas import AnswerRequest, CompareResponse, StatsResponse
from ..services.guardrails import check_rate_limit
from .mode_a import run_mode_a
from .mode_b import run_mode_b
from .mode_c import run_mode_c

router = APIRouter(prefix="/api/compare", tags=["compare"])

@router.post("/answer", response_model=CompareResponse)
def compare_answer(request: AnswerRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # 1 request Compare = 1 đơn vị rate-limit (không phải 3x) — gọi thẳng logic
    # run_mode_* thay vì route để không bị check_rate_limit 3 lần.
    ok, msg = check_rate_limit(current_user.id)
    if not ok:
        raise HTTPException(status_code=429, detail=msg)

    # Note: SQLite doesn't natively support full concurrency well with the same session,
    # but for this demo, sequential is safer or we use thread pools.
    # Since FastAPI def handles threads, we'll just run them sequentially to avoid DB locks.

    resp_a = run_mode_a(request, db, current_user)
    resp_b = run_mode_b(request, db, current_user)
    resp_c = run_mode_c(request, db, current_user)

    return {
        "mode_a": resp_a,
        "mode_b": resp_b,
        "mode_c": resp_c
    }

@router.get("/stats", response_model=StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    logs = db.query(InteractionLog).order_by(InteractionLog.id.asc()).all()
    
    total = len(logs)
    mode_a_logs = [l for l in logs if l.mode == "A"]
    mode_b_logs = [l for l in logs if l.mode == "B"]
    mode_c_logs = [l for l in logs if l.mode == "C"]

    def avg(lst, attr):
        vals = [getattr(x, attr) for x in lst if getattr(x, attr) is not None]
        return sum(vals) / len(vals) if vals else 0.0

    stat_a = {
        "count": len(mode_a_logs),
        "avg_retrieval_score": avg(mode_a_logs, "retrieval_score"),
        "avg_latency_ms": int(avg(mode_a_logs, "latency_ms"))
    }

    stat_b = {
        "count": len(mode_b_logs),
        "avg_confidence": avg(mode_b_logs, "confidence_score"),
        "escalation_rate": sum(1 for l in mode_b_logs if l.escalated) / len(mode_b_logs) if mode_b_logs else 0.0,
        "avg_latency_ms": int(avg(mode_b_logs, "latency_ms"))
    }

    stat_c = {
        "count": len(mode_c_logs),
        "from_library_rate": sum(1 for l in mode_c_logs if l.from_library) / len(mode_c_logs) if mode_c_logs else 0.0,
        "total_reuses": sum(e.reuse_count for e in db.query(LibraryEntry).all()),
        "avg_latency_ms": int(avg(mode_c_logs, "latency_ms"))
    }

    escalation_over_time = []
    cumulative_esc = 0
    for log in logs:
        if log.escalated:
            cumulative_esc += 1
        escalation_over_time.append({
            "interaction_seq": log.id,
            "cumulative_escalations": cumulative_esc
        })

    # library growth: count library entries before/at the time of interaction
    # For demo simplicity, we just linearly map them
    library_entries = db.query(LibraryEntry).order_by(LibraryEntry.id.asc()).all()
    library_growth = []
    cumulative_lib = 0
    for log in logs:
        # a rough approx: count how many library entries were created before this log
        # actually, since LibraryEntry doesn't have created_at mapped directly to interaction log id,
        # we just map by time
        c = sum(1 for e in library_entries if e.approved_at <= log.created_at)
        library_growth.append({
            "interaction_seq": log.id,
            "total_library_entries": c
        })

    return {
        "total_interactions": total,
        "by_mode": {
            "A": stat_a,
            "B": stat_b,
            "C": stat_c
        },
        "escalation_over_time": escalation_over_time,
        "library_growth": library_growth
    }
