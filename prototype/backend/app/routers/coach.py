from fastapi import APIRouter
from ..models import CoachApproveRequest, CoachRejectRequest

router = APIRouter()

@router.get("/queue")
def get_queue():
    return [
        {"id": 1, "question": "Làm sao để set API Key?", "status": "pending"}
    ]

@router.post("/approve")
def approve(req: CoachApproveRequest):
    return {"status": "approved"}

@router.post("/reject")
def reject(req: CoachRejectRequest):
    return {"status": "rejected"}
