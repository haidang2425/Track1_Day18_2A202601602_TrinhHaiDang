# Hướng Dẫn Cài Đặt & Khởi Chạy VLearn MVP

Tài liệu này hướng dẫn cách setup toàn bộ hệ thống (Frontend React + Backend FastAPI) và khởi chạy thông qua Terminal / PowerShell.

## 1. Yêu cầu hệ thống (Prerequisites)

- **Node.js** (Phiên bản v18 trở lên) - Dùng để chạy Frontend.
- **Python** (Phiên bản 3.9 trở lên) - Dùng để chạy Backend FastAPI.

---

## 2. Cài đặt (Chỉ làm ở lần đầu tiên)

Bạn cần mở Terminal (hoặc PowerShell) tại thư mục gốc của dự án và chạy các lệnh sau:

### Bước 2.1: Cài đặt Backend

```powershell
cd prototype\backend

# Tạo môi trường ảo (khuyên dùng)
python -m venv venv

# Kích hoạt môi trường ảo
.\venv\Scripts\activate

# Cài đặt các thư viện
pip install -r requirements.txt
```

### Bước 2.2: Cài đặt Frontend

Mở một cửa sổ PowerShell khác (hoặc tab mới):

```powershell
cd prototype\frontend
npm install
```

---

## 3. Khởi chạy hệ thống (Các lần sau)

Để chạy hệ thống, bạn cần bật 2 Terminal / PowerShell chạy song song:

**Terminal 1 (Chạy Backend):**

```powershell
cd prototype\backend
# Nhớ activate venv nếu có: .\venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8001
```

👉 *Backend API sẽ lắng nghe tại: `http://localhost:8001`*

**Terminal 2 (Chạy Frontend):**

```powershell
cd prototype\frontend
npm run dev
```

👉 *Frontend sẽ lắng nghe tại: `http://localhost:3000`*

Sau khi cả 2 server đều báo chạy thành công, hãy mở trình duyệt và truy cập `http://localhost:3000` để trải nghiệm sản phẩm.

---

## Cấu trúc thư mục chuẩn Production

```
.
├── assets/
│   └── mockups/        # Các ảnh chụp màn hình UI thiết kế tham khảo
├── docs/               # Chứa toàn bộ tài liệu dự án, nhật ký AI, bản nháp Option
├── prototype/
│   ├── backend/        # Mã nguồn Python/FastAPI (Cấu trúc DB, Routers, Models)
│   └── frontend/       # Mã nguồn Node/React/Vite (UI tương tác thực tế)
├── references/         # Các tài liệu pdf khóa học
├── README.md           # Thông tin chung về Chặng 1 & 2
└── SETUP_GUIDE.md      # Hướng dẫn này
```
