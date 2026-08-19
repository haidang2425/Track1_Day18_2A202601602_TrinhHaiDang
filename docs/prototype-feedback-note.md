# Prototype Feedback Note

> Theo luật Chặng 6: mỗi thành viên facilitate một phiên với một tester ngoài nhóm và ghi một bản riêng. File này là bản của **Trịnh Hải Đăng**, facilitate với tester **Nguyễn Đức Đạt**. Nguồn gốc quan sát: transcript đầy đủ ở [docs/interviews/usability-test-transcript-nguyen-duc-dat.md](interviews/usability-test-transcript-nguyen-duc-dat.md) và bản ghi âm ở [docs/interviews/recordings/usability-test-nguyen-duc-dat.m4a](interviews/recordings/usability-test-nguyen-duc-dat.m4a).
>
> **Lưu ý về hình thức phiên này:** phiên này chạy dưới dạng phỏng vấn có dẫn dắt qua từng Option (hỏi — trải nghiệm — hỏi tiếp), không phải một phiên click-through câm lặng đúng luật facilitation ở Chặng 5 (test tự thao tác, người dẫn không thuyết minh). Vì vậy các quan sát dưới đây bám sát đúng lời tester nói ra, không suy diễn thêm hành vi không được ghi lại. *(2 bản Feedback Note còn lại của nhóm — do Nguyễn Hoàng Minh và Nguyễn Việt Hải facilitate — chưa có trong repo, cần bổ sung để đủ ba bản theo Gate 5.)*

**Tester/context:** Nguyễn Đức Đạt, học viên. Facilitator: Trịnh Hải Đăng.

| Observation | Note |
|---|---|
| First action | Với mỗi Option, Đạt không phản ứng ngay bằng thao tác mà hỏi làm rõ cơ chế trước khi thao tác — ví dụ hỏi thẳng liệu Option A có làm mất khả năng chat tiếp với AI hay không |
| Chỗ dừng, do dự hoặc hiểu sai | Ở Option A, Đạt không hiểu ngay nhãn "Không có trong bài" — phải hỏi lại facilitator mới rõ ý nghĩa (nhãn cảnh báo nội dung ngoài phạm vi slide) |
| Evidence được đọc hay bỏ qua | Đạt chủ động hỏi về cơ chế xác định mức độ tự tin (confidence) ở Option C, và hỏi có xem được các câu "chưa được duyệt" hay không — cho thấy có quan tâm đến evidence/uncertainty, không bỏ qua |
| Cách tester sửa hoặc lấy lại control | Khi chưa chắc AI trả lời, Đạt xác nhận rõ mình vẫn có quyền gửi lại câu hỏi cho Lab code kiểm tra (ở Option C) và vẫn dùng được chatbot bình thường trong lúc chờ (ở Option B) — tự kiểm tra đường phục hồi trước khi yên tâm |
| Option được chọn | A |
| Lý do và trade-off | Chọn A vì luôn muốn có nguồn gốc rõ ràng để tự kiểm chứng câu trả lời AI. Ghi nhận thêm: với vấn đề chuyên môn sâu, Đạt vẫn ưu tiên hỏi trực tiếp Lab code (Option B) hơn là chỉ dựa vào AI — nghĩa là lựa chọn A không loại bỏ nhu cầu với cơ chế của B |
| Evidence chống lại kỳ vọng của nhóm | Đạt dùng AI hỗ trợ học tập khá thường xuyên (tự nhận), khác với suy đoán ban đầu ở Chặng 1 rằng learner ít chủ động dùng AI ngoài lúc kẹt gấp |

```
OBSERVED
Đạt hỏi làm rõ cơ chế của cả ba Option trước khi đưa ra nhận định (link dẫn chứng có chặn chat tiếp không, câu hỏi gửi Lab code có đích danh không, người duyệt ở Option C có ẩn danh không). Đạt không hiểu ngay nhãn "Không có trong bài" ở Option A khi mới thấy. Cuối buổi, Đạt chọn Option A và nêu lý do là cần nguồn để tự kiểm chứng.

INTERPRETED
Việc tester hỏi kỹ cơ chế trước khi phản hồi cho thấy nhóm learner như Đạt không mặc định tin AI — họ chủ động dò giới hạn hệ thống trước khi tin dùng. Nhãn "Không có trong bài" gây hiểu lầm ban đầu nghĩa là microcopy hiện tại chưa tự giải thích được, cần facilitator can thiệp mới hiểu đúng — đây là rủi ro thật nếu không có ai giải thích trong lúc dùng thật.

DECIDED — NEXT CHANGE
Viết lại microcopy của nhãn "Không có trong bài" ở Option A để tự giải thích được không cần hỏi thêm (ví dụ thêm tooltip hoặc câu giải thích ngắn ngay cạnh nhãn). Bổ sung đề xuất của Đạt: thêm tab/bộ lọc riêng cho lịch sử chat với Lab code trong phần History.

STILL UNPROVEN
Một tester chọn A chưa đủ để kết luận A là hướng đúng — cần đối chiếu với lựa chọn và lý do của 2 tester còn lại trước khi chốt Next Change chung của nhóm (xem group-feedback-synthesis.md). Ngoài ra phiên này không đo được hành vi thao tác thật (click, thời gian do dự) vì chạy dưới dạng phỏng vấn dẫn dắt, nên "First action" và "Chỗ dừng, do dự" ở bảng trên là suy ra từ lời kể, không phải quan sát trực tiếp trên UI.
```
