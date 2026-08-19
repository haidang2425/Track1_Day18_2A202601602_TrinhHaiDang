from sentence_transformers import SentenceTransformer
import numpy as np

_model = None

def get_model():
    global _model
    if _model is None:
        _model = SentenceTransformer("intfloat/multilingual-e5-small")
    return _model

def embed_query(text: str) -> list[float]:
    """Dùng cho CÂU HỎI user. Prefix 'query: ' theo convention E5."""
    vec = get_model().encode("query: " + text, normalize_embeddings=True)
    return vec.tolist()

def embed_passage(text: str) -> list[float]:
    """Dùng cho NỘI DUNG chunk/tài liệu. Prefix 'passage: ' theo convention E5."""
    vec = get_model().encode("passage: " + text, normalize_embeddings=True)
    return vec.tolist()

def cosine_sim(a: list[float], b: list[float]) -> float:
    """Đã normalize → dot product = cosine. Clamp để tránh float noise âm nhỏ."""
    return max(0.0, float(np.dot(np.array(a), np.array(b))))
