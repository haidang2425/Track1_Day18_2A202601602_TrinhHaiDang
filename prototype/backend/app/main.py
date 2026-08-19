import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .db import engine, Base
from .routers import auth_router, mode_a, mode_b, mode_c, coach, compare, history

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="VLearn AI Tutor API")

# CORS setup for local + production Vercel
# Lưu ý: allow_origins so khớp CHÍNH XÁC chuỗi, không hỗ trợ wildcard "*.vercel.app"
# (đây là hành vi của Starlette CORSMiddleware) — phải dùng allow_origin_regex.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",
        os.getenv("FRONTEND_URL", "http://localhost:3001"),
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def generic_handler(request, exc):
    print(f"Server Error: {exc}")
    return JSONResponse(status_code=500, content={"detail": "Lỗi server, vui lòng thử lại."})

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "4.0.0"}

# Include Routers
app.include_router(auth_router.router)
app.include_router(mode_a.router)
app.include_router(mode_b.router)
app.include_router(mode_c.router)
app.include_router(coach.router)
app.include_router(compare.router)
app.include_router(history.router)
