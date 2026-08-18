from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(req: LoginRequest):
    # Mock login
    role = "coach" if "coach" in req.username else "learner"
    return {"token": "fake-jwt-token", "role": role, "username": req.username}

@router.post("/logout")
def logout():
    return {"status": "success"}

@router.get("/me")
def me():
    return {"username": "learner_demo", "role": "learner", "display_name": "Learner Demo"}
