# AI Support Log

## Trịnh Hải Đăng

**AI đã giúp tôi ở đâu?**

- Chuyển bản thảo thô của Chặng 3, Chặng 4, Chặng 5 (do nhóm tự viết) vào đúng cấu trúc README.md, và dựng bảng chuẩn hóa A/B/C ở `three-option-design-sheet.md` từ nội dung nhóm đã có sẵn.
- Dựng `prototype-feedback-note.md` từ transcript phỏng vấn thật với tester Nguyễn Đức Đạt, và biên tập/tổ chức lại kịch bản phỏng vấn đó thành file + tên file chuẩn trong `docs/interviews/`.
- Chẩn đoán lỗi "Tài khoản hoặc mật khẩu không đúng" / "Failed to fetch" khi đăng nhập demo: đọc code `Login.jsx`, `AuthContext.jsx`, `auth_router.py`, kiểm tra DB, phát hiện nguyên nhân thật là backend chưa chạy + `.env` cấu hình sai, không phải do sai tài khoản.
- Giải thích cơ chế hệ thống gán nội dung cho từng slide (PyMuPDF trích xuất theo trang PDF, lưu vào `CourseChunk`, dùng trong retrieval và citation).
- Hỗ trợ thao tác git: commit các file tài liệu, thêm remote `fork`, push nhánh `haidang2425` lên fork cá nhân, và chẩn đoán vì sao fork hiển thị "chưa có nội dung" (do GitHub đang hiển thị nhánh `main` cũ, chưa đổi default branch).

**AI sai, hời hợt hoặc làm các options giống nhau ở đâu?**

+ Khi mà em thiết kế ui ux và các cái solution cho bài thì AI không thể định nghĩa và xác định được các công việc mình phải làm chuẩn như nào, mặc dù em đã cung cấp đầy đủ context và các ảnh hay tuân thủ các kĩ thuật prompt engineering. Sau đấy e phải sử dụng 3 con chatbot khác nhau để xác định từng cái và vibe code. Nhưng kết quả mới đạt được 70% so với mong muốn của em.

**Tôi đã tự sửa hoặc quyết định lại điều gì?**

+ Em đã sử dụng nhiều chatbot và kết hợp tự tìm kiếm tìm tòi để chỉnh sửa từng cái component hay luồng hoạt động để có thể hoàn thiện MVP ạ!
