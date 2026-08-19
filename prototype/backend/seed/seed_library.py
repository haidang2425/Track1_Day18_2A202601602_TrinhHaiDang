import sys
import os
import json
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db import SessionLocal, LibraryEntry, User
from app.services.embedding import embed_query

COLD_START = [
    {
        "question_text": "Tôi bị lỗi AuthenticationError khi gọi API model trong lab, phải làm gì?",
        "answer_text": "Lỗi AuthenticationError xảy ra khi API key trong file .env bị sai hoặc chưa được load đúng. Hãy kiểm tra: (1) file .env có tồn tại không; (2) biến khai báo đúng cú pháp (không có dấu cách quanh '='); (3) chạy lại để reload."
    },
    {
        "question_text": "Cách cài đặt Docker Compose trên Ubuntu",
        "answer_text": "Câu hỏi này nằm ngoài phạm vi tài liệu khóa học."  # decoy để test fallback
    }
]

def seed_library():
    db = SessionLocal()
    
    coach = db.query(User).filter(User.role == "coach").first()
    coach_id = coach.id if coach else 1

    for item in COLD_START:
        if not db.query(LibraryEntry).filter(LibraryEntry.question_text == item["question_text"]).first():
            entry = LibraryEntry(
                question_text=item["question_text"],
                question_embedding=json.dumps(embed_query(item["question_text"])),
                answer_text=item["answer_text"],
                source_answer_id=None,
                approved_by=coach_id,
                reuse_count=0
            )
            db.add(entry)
    
    db.commit()
    db.close()
    print("Seeded library successfully.")

if __name__ == "__main__":
    seed_library()
