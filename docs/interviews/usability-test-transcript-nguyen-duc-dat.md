# Kịch bản Phỏng vấn Trải nghiệm Người dùng (Usability Testing) — Nguyễn Đức Đạt

> **Dự án:** Nền tảng B-learn (Đánh giá 3 Prototype Solutions — Option A/B/C)
> **Người phỏng vấn (đại diện nhóm sản phẩm):** Trịnh Hải Đăng
> **Người được phỏng vấn (học viên):** Nguyễn Đức Đạt
> **Bản ghi âm gốc:** [`docs/interviews/recordings/usability-test-nguyen-duc-dat.m4a`](recordings/usability-test-nguyen-duc-dat.m4a)
> **Vai trò của file này:** đây là transcript đã biên tập ngôn từ cho mượt mà, chuyên nghiệp; nội dung câu trả lời giữ đúng ý người được phỏng vấn. Đây là **evidence thô** — quan sát/insight rút ra từ transcript này cần được tổng hợp vào [`../prototype-feedback-note.md`](../prototype-feedback-note.md) và [`../group-feedback-synthesis.md`](../group-feedback-synthesis.md) theo Chặng 6 của đề bài.

---

## Phần 1 — Giới thiệu và làm quen

**Hải Đăng:** Chào bạn, mình là Trịnh Hải Đăng. Hôm nay nhóm mình mang đến 3 giải pháp mẫu (prototype solutions) cho phần B-learn tutorial. Trước khi bắt đầu, bạn có thể giới thiệu ngắn gọn về bản thân được không?

**Đạt:** Chào Đăng, mình là học viên, tên là Nguyễn Đức Đạt. Mình đã sẵn sàng, chúng ta bắt đầu xem qua các sản phẩm của nhóm bạn nhé.

---

## Phần 2 — Trải nghiệm và đánh giá tính năng (Solutions)

**Hải Đăng:** Hiện tại, nhóm mình đã phát triển 3 tính năng chính: (1) Cung cấp link dẫn chứng, (2) AI tự nhận diện kiến thức chưa chắc chắn, và (3) Ngân hàng câu hỏi đã được Lab code duyệt.

Đầu tiên là **Solution A — Có link dẫn chứng**. Khi bạn đặt câu hỏi, AI sẽ tổng hợp thông tin sát nhất và đính kèm các đường link dẫn chứng ngay bên dưới, như trên màn hình bạn đang thấy. Bạn trải nghiệm thử nhé.

**Đạt:** Tính năng này... mình vẫn có thể chat hỏi thêm AI bình thường đúng không? Hay nó chỉ hiện câu trả lời kèm link để mình bấm vào xem luôn thôi?

**Hải Đăng:** Đây thuần túy vẫn là một chatbot, nên bạn hoàn toàn có thể tiếp tục trò chuyện và hỏi đào sâu thêm. Các link đính kèm chỉ đóng vai trò củng cố độ uy tín cho câu trả lời của AI thôi.

**Đạt:** Mình hiểu rồi. Chuyển sang **Solution B — Tự nói điều chưa chắc chắn**. Nếu mình dùng tính năng này để hỏi Lab code, thì câu hỏi sẽ được gửi đích danh đến thầy Lab code phụ trách đúng không?

**Hải Đăng:** Đúng vậy. Khi thiết kế, hệ thống sẽ tự động xác định Lab code của lớp bạn là ai để gửi câu hỏi đến họ. Khi có phản hồi, Lab code có thể chọn trả lời công khai để tất cả học viên khác cùng tham khảo.

**Đạt:** Vậy trong lúc chờ Lab code trả lời, mình vẫn có thể xem lại lịch sử và tiếp tục dùng chatbot để hỏi các vấn đề khác chứ?

**Hải Đăng:** Chuẩn rồi, luồng sử dụng chatbot của bạn sẽ không bị gián đoạn. Tiếp theo là **Solution C — Câu hỏi Lab code đã duyệt**. Đây là kho tổng hợp những câu hỏi mà các học viên khác đã từng hỏi.

**Đạt:** *(quan sát màn hình)* Mình thấy rồi, giống như một bộ FAQ tổng hợp. Tức là với những câu hỏi ngoài lề (ví dụ: cách cài đặt môi trường) không có trong bài học, hệ thống bắt buộc phải có Lab code duyệt nội dung trước rồi mới hiển thị cho người dùng đúng không? Thế mình có xem được những câu "chưa được duyệt" không?

**Hải Đăng:** Thực ra cơ chế hoạt động của tính năng này dựa trên "mức độ tự tin" (confidence level) của AI. Nếu AI đánh giá mức độ tự tin của câu trả lời thấp, nó sẽ tự động đẩy câu hỏi đó sang cho Lab code xử lý. Còn nếu độ tự tin cao, nó sẽ trả kết quả trực tiếp cho bạn. Nhóm mình đang cài đặt ngưỡng tự tin này khá cao. Tất nhiên, nếu bạn nhận được câu trả lời từ AI mà vẫn cảm thấy chưa tin tưởng, bạn hoàn toàn có quyền ấn nút gửi lại câu đó cho Lab code kiểm tra.

**Đạt:** Vậy ở phần Lab code duyệt này, mình có biết đích danh người duyệt câu hỏi của mình là ai không?

**Hải Đăng:** Sẽ là ẩn danh bạn ạ. Thực tế vận hành sau này, các Lab code sẽ phải hỗ trợ rất nhiều lớp và được phân công luân phiên theo ca, chứ không cố định một người kèm một lớp, nên hệ thống sẽ để ẩn danh người duyệt.

---

## Phần 3 — Tổng kết và ghi nhận đề xuất

**Hải Đăng:** Sau khi trải nghiệm qua cả 3 solutions, Đạt cảm thấy ấn tượng nhất với giải pháp nào và tại sao?

**Đạt:** Mình ấn tượng nhất với **Solution A (Có link dẫn chứng)**. Cá nhân mình khi đọc câu trả lời của AI luôn muốn có nguồn gốc rõ ràng để kiểm chứng lại thông tin. Bên cạnh đó, Solution B cũng rất thực tế, vì khi gặp những vấn đề chuyên môn sâu, mình vẫn ưu tiên việc được hỏi trực tiếp Lab code hơn là chỉ dùng AI.

**Hải Đăng:** Trong quá trình học tập hàng ngày trên trường, bạn có thường xuyên dùng AI để hỗ trợ tóm tắt hay giải thích các slide bài giảng không?

**Đạt:** Có chứ, với những môn học này thì mình dùng AI khá thường xuyên để giải quyết những phần mình chưa hiểu rõ.

**Hải Đăng:** Từ góc độ người dùng, Đạt thấy nhóm mình cần cải tiến hay bổ sung thêm chi tiết nào cho các giải pháp này không?

**Đạt:** Để mình xem nào... Ở phần cung cấp link dẫn chứng (Solution A), cái dòng thông báo "Không có trong bài" nghĩa là sao vậy?

**Hải Đăng:** À, dòng đó xuất hiện khi bạn hỏi những kiến thức ngoài lề (ví dụ: cài đặt môi trường) không hề có trong slide bài giảng gốc. AI vẫn sẽ đi tìm kiếm thông tin bên ngoài để trả lời bạn, nhưng nó bắt buộc phải hiển thị cảnh báo "Nội dung này không có trong slide". Mục đích là để người dùng tự xác định được giới hạn của bài học và cân nhắc mức độ tin cậy của luồng thông tin bên ngoài đó.

**Đạt:** Mình hiểu ý đồ của nhóm rồi. Nếu để đề xuất, mình muốn bổ sung thêm ở phần Lịch sử (History). Mình muốn có một tab riêng hoặc bộ lọc để xem lại đoạn chat trực tiếp với Lab code cho dễ tìm.

**Hải Đăng:** Một insight rất hay, nhóm mình sẽ ghi nhận lại đề xuất này. Buổi phỏng vấn đến đây là kết thúc rồi, cảm ơn Đạt đã dành thời gian hỗ trợ nhóm mình nhé!

---

## Tóm tắt nhanh (rút ra để đưa vào Feedback Note)

| Nội dung | Ghi nhận |
|---|---|
| Option được chọn | **A** (có link dẫn chứng) |
| Lý do chính | Cần nguồn gốc rõ ràng để tự kiểm chứng thông tin AI đưa ra |
| Ghi nhận thêm về B | Vẫn ưu tiên hỏi trực tiếp Lab code cho vấn đề chuyên môn sâu, dù không phải lựa chọn số 1 |
| Điểm chưa rõ ràng khi thao tác | Nhãn "Không có trong bài" ở Solution A cần thời gian giải thích thêm mới hiểu đúng ý nghĩa |
| Đề xuất cải tiến | Thêm tab/bộ lọc riêng cho lịch sử chat với Lab code trong phần History |
