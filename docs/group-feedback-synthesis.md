# Group Feedback Synthesis

> Chặng 6, mục 4 — tổng hợp sau khi có đủ ba Prototype Feedback Note. Nguồn: **Feedback 1** là bản của Nguyễn Hoàng Minh, tester là một learner từng dùng AI hỏi bài học và dùng ChatGPT nhiều nhất. **Feedback 2** là bản của Nguyễn Việt Hải, tester là Nguyễn Thị Thương, phòng D304. **Feedback 3** là bản của Trịnh Hải Đăng ([prototype-feedback-note.md](prototype-feedback-note.md), tester Nguyễn Đức Đạt) — buổi này lệch protocol, kèm lỗi mô tả sai cơ chế Option C, nên được xếp vào diện **dữ liệu tham khảo**, không dùng để đánh giá Option C.

## Cảnh báo về Feedback 3 trước khi đọc bảng

Buổi của Đăng không theo đúng luật Chặng 5: người dẫn giải thích cơ chế cả ba bản bằng tên mô tả ngay từ đầu, không giao nhiệm vụ outcome theo kịch bản, trả lời trực tiếp các câu hỏi kỹ thuật thay vì hỏi ngược, và câu hỏi tổng kết gần trùng với câu bị cấm là "bản nào tốt nhất".

Nghiêm trọng hơn cách dẫn buổi, nội dung buổi này còn mô tả sai cơ chế của Option C. Đăng giải thích C bằng logic mức độ tự tin của AI để quyết định có đẩy câu hỏi cho Lab code hay không, đang thiết lập ở mức cao — đây là cơ chế của **Option B**, không phải C. Đặc tả gốc của C (xem [three-option-design-sheet.md](three-option-design-sheet.md)) là khớp câu hỏi với thư viện đã coach duyệt từ trước và hiện tên người duyệt, nhưng khi tester hỏi có biết đích danh người duyệt không, Đăng trả lời sẽ ẩn danh — ngược với đặc tả. Vì vậy toàn bộ phản hồi của Feedback 3 về bản C không phản ánh đúng thiết kế C thật và không dùng để đánh giá C.

## Bảng tổng hợp

| Nội dung | Feedback 1 (Nguyễn Hoàng Minh) | Feedback 2 (Nguyễn Việt Hải · tester Nguyễn Thị Thương) | Feedback 3 (Trịnh Hải Đăng · dữ liệu tham khảo) | Pattern hoặc khác biệt |
|---|---|---|---|---|
| First action | Ở bản A, bấm ngay vào nút trích nguồn và dừng lại đọc. | Ở bản A, ấn vào nút trích dẫn nguồn trước. Ở bản B, ấn nút gửi ẩn danh. Ở bản C, ấn nút "vẫn chưa hiểu". | Không quan sát được, vì người dẫn giới thiệu cơ chế trước khi tester thao tác. | Hai nguồn có dữ liệu thao tác đều cho thấy hành vi đầu tiên ở bản A là chủ động tìm nguồn để kiểm chứng, không phải đọc rồi tin ngay. |
| Breakdown chính | Không quan sát được ở bản B và C vì tester dừng lại và chốt A ngay sau bước rà nguồn của bản A. | Do dự chính rơi vào bản B, khi tester chưa rõ cơ chế của AI trong lúc chờ câu hỏi được coach duyệt. | Ở bản C, tester hỏi ngược người dẫn có xem được câu chưa duyệt không, thay vì tự tìm hiểu qua thao tác. Nhưng vì mô tả C bị lẫn sang B nên khó xác định câu hỏi này nhắm vào cơ chế nào thật sự. | Bản B là nơi phát sinh sự lấn cấn rõ nhất ở nguồn có dữ liệu thao tác đầy đủ nhất. Bản C tiếp tục là nơi gây câu hỏi ở cả hai buổi có ghi nhận, dù dữ liệu buổi 3 không đáng tin về mặt cơ chế. |
| Cách lấy lại control | Chưa quan sát được, vì tester không đi tới tình huống cần sửa hay cần lấy lại quyền kiểm soát. | Không thu thập được. Người ghi ghi rõ phần lớn các luồng cần vai trò con người vẫn chưa được tester hiểu rõ. | Không quan sát được. | Không có nguồn nào trong ba nguồn cho dữ liệu đầy đủ ở mục này. Đây vẫn là khoảng trống lớn nhất của cả ba buổi cộng lại. |
| Option được chọn | A | A | A | Ba trên ba người chọn A. Đây là tín hiệu nhất quán qua ba buổi độc lập, dù một buổi bị xếp vào diện tham khảo. |
| Trade-off | Không có. Tester không tự nói ra mình đánh đổi gì khi chọn A. | Không có. Lý do chọn A là vì đơn giản và nhanh chóng — đây là một ưu điểm được nêu ra chứ không phải điều tự nhận là phải đánh đổi. | Không có. | Không nguồn nào trong ba nguồn nêu được cái giá phải trả của việc chọn A. Theo quy tắc đã chốt, không dòng nào đủ điều kiện tính là kết quả chính thức, dù xu hướng chọn A đã rất rõ. |

## Một Next Change nhóm chốt

Giữ Option A làm cơ chế chính. Trước khi làm bất kỳ điều gì khác, nhóm phải thống nhất lại đúng mô tả của Option C theo đặc tả gốc ở Chặng 2 và Chặng 3, vì hiện tại buổi test số 3 đã kiểm một phiên bản C sai. Sau khi sửa mô tả, nhóm cần chạy lại đúng kịch bản Chặng 5 cho ít nhất một người tham gia nữa, đọc nguyên văn nhiệm vụ, không thuyết minh, gọi tên trung tính A, B, C, và bắt buộc hỏi cho ra được cái giá phải trả khi chọn, vì đây là ô duy nhất còn thiếu ở cả ba buổi đã chạy.

Với Option B, cần thiết kế thêm phần giải thích rõ hơn về việc chuyện gì xảy ra trong lúc chờ coach duyệt, vì đây là điểm gây do dự nhiều nhất ở nguồn có dữ liệu thao tác đầy đủ.

## Evidence nào dẫn tới quyết định này

Ba trên ba người tham gia chọn A, và ở hai nguồn có dữ liệu thao tác đầy đủ, hành vi đầu tiên đều là chủ động bấm vào nguồn để tự kiểm chứng, không phải đọc lướt rồi tin luôn. Điều này khớp với lý do được nêu ra ở cả ba nguồn, rằng A giúp dễ tin tưởng hơn nhờ có thể tự kiểm tra.

Lý do bản B bị đánh giá thấp hơn xuất hiện độc lập ở nhiều nguồn dưới các hình thức khác nhau: Feedback 1 nói mình chưa chắc sẽ hỏi dù không hiểu bài, Feedback 2 ghi nhận do dự và đánh giá B là còn mơ hồ. Lý do bản C bị đánh giá thấp cũng lặp lại độc lập: Feedback 1 nói AI làm hết mà quyền tin vẫn ở mình nên có hay không cũng vậy, Feedback 2 nói C sẽ cần chờ lâu vì cần con người tham gia nhiều bước. Việc hai lý do này xuất hiện ở những buổi chạy độc lập nhau khiến nhóm tin đây là tín hiệu thật, dù cần thêm một buổi đúng protocol để chắc chắn hơn.

## Still Unproven sau ba feedback

Nhóm chưa có dòng dữ liệu nào đủ điều kiện tính là kết quả chính thức, vì không tester nào tự nói ra cái giá phải trả khi chọn A. Đây là khoảng trống quan trọng nhất, vì theo đúng quy tắc nhóm đặt ra, một lựa chọn không đi kèm trade-off chỉ là lời khen chứ không phải dữ liệu.

Nhóm chưa quan sát được cách bất kỳ tester nào xử lý khi thật sự gặp ngõ cụt, vì không buổi nào ghi nhận việc tester đi tới tình huống ý thứ ba không có gì chống lưng ở bản A, tình huống chờ coach trả lời xong ở bản B, hay tình huống kho trống ở bản C.

Nhóm chưa có mô tả C đúng để test, vì buổi duy nhất đào sâu vào phần này của C lại mô tả sai cơ chế. Nói cách khác, nhóm hiện chưa thật sự biết người dùng phản ứng thế nào với Option C như đã thiết kế.

Nhóm cũng chưa biết liệu xu hướng chọn A có giữ nguyên khi câu hỏi rơi vào loại tình huống mà A yếu nhất theo dự đoán ban đầu, tức là loại câu hỏi hoàn toàn nằm ngoài tài liệu khóa học, vì cả ba buổi đều dừng ở bước rà nguồn của những ý còn neo được, chưa ai thật sự đi sâu vào ý không neo được.

Nhóm không tuyên bố bất kỳ phương án nào đã được validated.

> **Tự kiểm · GATE 5 — Learning, not praise:** Nhóm có đủ ba Feedback Notes (một trong đó — Feedback 3 — chỉ dùng làm dữ liệu tham khảo do lệch protocol và sai mô tả cơ chế), nêu được pattern nhất quán (3/3 chọn A, lý do lặp lại độc lập cho B và C) và một Next Change có evidence. Điểm nhóm tự nhận là **chưa đạt đầy đủ**: không buổi nào thu được trade-off khi chọn A, nên theo đúng luật "một lựa chọn không kèm cái giá phải trả chỉ là lời khen", nhóm không tuyên bố A đã validated — đây chính là lý do Next Change yêu cầu chạy thêm một buổi đúng protocol trước khi kết luận thêm.
