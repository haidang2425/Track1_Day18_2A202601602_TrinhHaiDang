import json
from ..db import LibraryEntry
from .embedding import embed_query, cosine_sim

MATCH_THRESHOLD = 0.85

def match_library(question_text: str, db_session):
    q_emb = embed_query(question_text)
    entries = db_session.query(LibraryEntry).all()
    best, best_score = None, 0.0
    for entry in entries:
        score = cosine_sim(q_emb, json.loads(entry.question_embedding))
        if score > best_score:
            best_score, best = score, entry
    if best and best_score >= MATCH_THRESHOLD:
        best.reuse_count += 1
        db_session.commit()
        return best
    return None

def add_to_library(question_text, answer_text, source_answer_id, approved_by_id, db_session):
    entry = LibraryEntry(
        question_text=question_text,
        question_embedding=json.dumps(embed_query(question_text)),
        answer_text=answer_text,
        source_answer_id=source_answer_id,
        approved_by=approved_by_id
    )
    db_session.add(entry)
    db_session.commit()
    return entry
