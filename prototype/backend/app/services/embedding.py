import os
import numpy as np
import google.generativeai as genai

if os.getenv("GEMINI_API_KEY"):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

_EMBED_MODEL = "models/text-embedding-004"

def embed_query(text: str) -> list[float]:
    """Dùng cho CÂU HỎI user. Gọi Gemini embedding API (không load model local để tránh OOM khi deploy free tier)."""
    result = genai.embed_content(model=_EMBED_MODEL, content=text, task_type="retrieval_query")
    return result["embedding"]

def embed_passage(text: str) -> list[float]:
    """Dùng cho NỘI DUNG chunk/tài liệu."""
    result = genai.embed_content(model=_EMBED_MODEL, content=text, task_type="retrieval_document")
    return result["embedding"]

def cosine_sim(a: list[float], b: list[float]) -> float:
    """Gemini embedding không đảm bảo đã normalize sẵn, nên chia norm cho đúng cosine."""
    a_arr, b_arr = np.array(a), np.array(b)
    denom = np.linalg.norm(a_arr) * np.linalg.norm(b_arr)
    if denom == 0:
        return 0.0
    return max(0.0, float(np.dot(a_arr, b_arr) / denom))
