from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .db import engine, Base
from .routers import auth_router, mode_a, mode_b, mode_c, coach

Base.metadata.create_all(bind=engine)

app = FastAPI(title="VLearn API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
app.include_router(mode_a.router, prefix="/api/mode-a", tags=["Mode A"])
app.include_router(mode_b.router, prefix="/api/mode-b", tags=["Mode B"])
app.include_router(mode_c.router, prefix="/api/mode-c", tags=["Mode C"])
app.include_router(coach.router, prefix="/coach", tags=["Coach"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
