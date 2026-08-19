import json
from ..db import CourseChunk
from .embedding import embed_query, cosine_sim

def get_relevant_chunks(question_text: str, day: int, db_session, n_results: int = 3) -> list[dict]:
    """
    Filter theo day trước, tính cosine với tất cả chunk còn lại.
    Trả về top-N theo score DESC.
    """
    q_emb = embed_query(question_text)
    chunks = db_session.query(CourseChunk).filter(CourseChunk.day == day).all()
    scored = []
    for c in chunks:
        c_emb = json.loads(c.embedding_json)
        score = cosine_sim(q_emb, c_emb)
        scored.append((c, score))
    scored.sort(key=lambda x: x[1], reverse=True)
    return [
        {"content": c.content, "source_label": c.source_label, "db_chunk_id": c.id, "score": s}
        for c, s in scored[:n_results]
    ]
