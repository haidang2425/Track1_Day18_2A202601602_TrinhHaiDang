import sys
import os
import json
from pathlib import Path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db import SessionLocal, CourseChunk
from app.services.pdf_ingest import ingest_pdf
from app.services.embedding import embed_passage
from seed_fallback_content import get_fallback_chunks

def seed_course_docs():
    db = SessionLocal()
    
    base_dir = Path(__file__).resolve().parent.parent
    PDF_PATHS = {
        17: base_dir / "data" / "day17.pdf",
        18: base_dir / "data" / "day18.pdf"
    }

    for day, path in PDF_PATHS.items():
        if not path.exists():
            print(f"[WARN] {path} không tìm thấy, dùng fallback content")
            chunks = get_fallback_chunks(day)
        else:
            print(f"Ingesting {path} ...")
            chunks = ingest_pdf(str(path), day)

        for chunk in chunks:
            if db.query(CourseChunk).filter_by(day=day, page_number=chunk["page_number"]).first():
                continue  # Skip nếu đã tồn tại
            
            embedding = embed_passage(chunk["content"])
            db.add(CourseChunk(
                day=chunk["day"],
                page_number=chunk["page_number"],
                content=chunk["content"],
                source_label=chunk["source_label"],
                embedding_json=json.dumps(embedding)
            ))
        db.commit()
    
    db.close()
    print("Seeded course docs successfully.")

if __name__ == "__main__":
    seed_course_docs()
