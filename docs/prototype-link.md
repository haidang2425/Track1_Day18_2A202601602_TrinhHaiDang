# Prototype Link — Chặng 4

> Kiến trúc, data model, API endpoints và build plan của MVP nằm ở `docs/PROJECT.md`. File này chỉ có **cách chạy prototype**.

## Trạng thái hiện tại

✅ Hệ thống đã được nâng cấp lên bản MVP hoàn chỉnh với **Frontend (React/Vite)** và **Backend (Python FastAPI)** thay vì bản demo HTML tĩnh ban đầu. 3 Option (A, B, C) đã được tích hợp trực tiếp vào trong UI của Dashboard để Ban Giám Khảo dễ dàng thay đổi qua Dropdown.

## Cách cài đặt và chạy (PowerShell/Terminal)

Chi tiết vui lòng xem tại `SETUP_GUIDE.md` ở thư mục gốc. Dưới đây là tóm tắt nhanh:

**1. Khởi động Backend (Port 8001):**
```powershell
cd prototype\backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8001
```

**2. Khởi động Frontend (Port 3000):**
Mở một tab PowerShell mới:
```powershell
cd prototype\frontend
npm install
npm run dev
```

**3. Link truy cập:**
Mở trình duyệt: `http://localhost:3000`
(Port frontend đã được đổi thành 3000 để tránh xung đột với các tiến trình chạy port 5173 hiện tại).

