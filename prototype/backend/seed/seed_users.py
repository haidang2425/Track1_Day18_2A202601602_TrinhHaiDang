import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db import SessionLocal, User
from app.auth import get_password_hash

def seed_users():
    db = SessionLocal()
    
    users = [
        {
            "username": "26ai.minhnh@vinuni.edu.vn",
            "password": "demo1234",
            "role": "learner",
            "display_name": "Nguyễn Hoàng Minh"
        },
        {
            "username": "coach.dangth@vinuni.edu.vn",
            "password": "coach1234",
            "role": "coach",
            "display_name": "Trịnh Hải Đăng"
        }
    ]

    for u in users:
        if not db.query(User).filter(User.username == u["username"]).first():
            user = User(
                username=u["username"],
                password_hash=get_password_hash(u["password"]),
                role=u["role"],
                display_name=u["display_name"]
            )
            db.add(user)
    
    db.commit()
    db.close()
    print("Seeded users successfully.")

if __name__ == "__main__":
    seed_users()
