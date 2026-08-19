# Three-option Design Sheet

> Bảng chuẩn hóa cho Chặng 2 (Ba Solution Options) và Chặng 3 (Human–AI Decision Table). Phần narrative đầy đủ (lý do chọn, distance check, spectrum, tự kiểm Gate 2/Gate 3) nằm ở [README.md](../README.md) — mục "Chặng 2" và "Chặng 3". File này chỉ giữ lại các bảng để Ban Giám Khảo tra nhanh.

## Case và Hypothesis Problem

**Case đã chọn:** A — AI Tutor · Diagnostic Refresher (VLearn)

**Hypothesis Problem:** Khi đang học trong hoặc sát buổi lab và gặp một khái niệm hoặc một lỗi thao tác chưa hiểu, learner gặp khó khăn trong việc có được một câu trả lời đủ tin cậy để đi tiếp. Nguyên nhân là kênh hỏi người thật đang bị nghẽn, cụ thể là phải giơ tay giữa buổi, có người thì ngại hỏi, còn coach thì chủ động ít can thiệp và loại bỏ những câu nằm ngoài trọng tâm. Trong khi đó các kênh thay thế là bạn bè và AI ngoài nền tảng lại trả về những câu trả lời không kiểm chứng được. Hệ quả là learner hoặc đi tiếp trên một câu trả lời mà chính họ không chắc đúng, hoặc bỏ hẳn phần kiến thức đó.

## 1. Những thứ phải giữ nguyên giữa A / B / C

| Thành phần | Quyết định chung cho cả A, B và C |
|---|---|
| Target user | Learner đang theo học lab, đã từng bị kẹt và phải tự xoay xở trong bảy ngày gần đây |
| Situation | Đang làm bài trong buổi lab, ở khoảng giữa buổi, gặp một điểm kẹt, trong khi coach đang bận hỗ trợ người khác |
| Task | Có được một câu trả lời đủ tin cậy để đi tiếp bước đang làm dở |
| Desired outcome | Đi tiếp được bước tiếp theo mà không phải chấp nhận một câu trả lời mình không chắc, và cũng không phải bỏ qua phần kiến thức đó |
| Content và data fixture | Cùng một điểm kẹt là lỗi khi cài đặt môi trường ở bước 3 của bài lab, cùng một câu trả lời gốc do AI sinh ra, và cùng một bộ tài liệu khóa học |

## 2. Những thứ được phép khác nhau (Solution mechanism)

| Thành phần | Option A: Neo nguồn | Option B: Tự khai mức chắc và chuyển tiếp | Option C: Đã được người thật duyệt |
|---|---|---|---|
| Solution mechanism | Mọi câu trả lời đều đi kèm phần trích dẫn về đúng đoạn trong tài liệu khóa học, đồng thời đánh dấu rõ phần nào không tìm thấy trong tài liệu | AI tự phân loại mức độ chắc chắn của chính câu trả lời vừa đưa ra. Khi mức này thấp, hệ thống đề nghị chuyển câu hỏi sang coach dưới dạng ẩn danh, và learner có thể đi tiếp trong lúc chờ | Hệ thống khớp bước mà learner đang làm với những câu trả lời đã được coach duyệt từ các lần trước rồi đưa lên trước. Chỉ khi chưa có câu nào phù hợp thì mới sinh câu trả lời mới và tự động xếp vào hàng chờ coach |
| User làm gì | Đọc phần neo nguồn rồi tự quyết định là tin hay không tin | Quyết định có gửi câu hỏi đi hay không, và tiếp tục làm việc khác trong lúc chờ phản hồi | Đọc câu trả lời đã có nhãn xác nhận, sau đó đánh dấu là có giải quyết được vấn đề hay không |
| AI làm gì | Sinh câu trả lời và neo từng ý về nguồn tương ứng. AI không phán đoán độ tin cậy và không chủ động làm gì thêm | Sinh câu trả lời, tự đánh giá mức độ chắc chắn, và soạn sẵn nội dung câu hỏi để gửi cho coach | Không sinh nội dung mới ở lượt đầu tiên, chỉ làm nhiệm vụ khớp câu hỏi với thư viện đã được duyệt |
| Trigger | Learner tự mở, giống như cách đang làm hiện nay | Hệ thống phát ra ngay trong lượt trả lời, vào lúc AI tự thấy mức chắc chắn của mình thấp | Hệ thống chủ động đưa lên khi thấy learner dừng lại lâu bất thường ở một bước vốn đã có sẵn câu trả lời |
| Trade-off chính | Đẩy toàn bộ công việc kiểm chứng lên vai learner đúng vào lúc họ đang vội. Gần như vô dụng khi câu trả lời vốn không nằm trong tài liệu khóa học — đúng là trường hợp lỗi cài đặt môi trường | Phụ thuộc hoàn toàn vào việc AI tự đánh giá đúng mức chắc chắn của mình. Nếu báo không chắc quá thường xuyên thì tín hiệu thành nhiễu; vẫn phát sinh thêm một vòng chờ coach | Gặp vấn đề cold start (thư viện ban đầu còn trống), phụ thuộc coach có chịu duyệt hay không, kém linh hoạt với câu hỏi lạ, và đi ngược thói quen để learner tự xoay xở của coach |

## 3. Vị trí trên spectrum quyền khởi tạo/quyết định

| Vị trí trên spectrum | Option tương ứng | Diễn giải ngắn |
|---|---|---|
| User tự khởi tạo và tự quyết | Option A | Learner tự kiểm chứng dựa trên phần neo nguồn |
| User và AI cùng làm | Option B | Hệ thống khai mức chắc chắn, learner quyết định có leo thang lên người thật hay không |
| Hệ thống và người thật khởi tạo, user xem lại | Option C | Câu trả lời đã được duyệt từ trước, hệ thống chủ động đưa lên |

## 4. Human–AI Decision Table (Chặng 3)

| Human và AI decision | Option A: Neo nguồn | Option B: Tự khai mức chắc và chuyển tiếp | Option C: Đã được người thật duyệt |
|---|---|---|---|
| User làm gì và AI làm gì | AI sinh câu trả lời rồi neo từng ý về đúng đoạn trong tài liệu khóa. Learner đọc phần neo đó và tự quyết định tin hay không tin | AI sinh câu trả lời, tự phân loại mức chắc chắn, và soạn sẵn nội dung câu hỏi để gửi coach. Learner quyết định có gửi hay không rồi đi làm bước khác trong lúc chờ | Hệ thống khớp bước đang làm với câu trả lời đã được coach duyệt rồi đưa lên. Learner đọc và đánh dấu là có giải quyết được hay không |
| AI tự làm, hỏi lại hay không tự làm, và vì sao | Không tự làm — AI không có cơ sở đáng tin để tự chấm điểm mình, sai ở khâu này rất khó phát hiện | Hỏi lại — AI có tín hiệu nghi ngờ chính mình nhưng chưa đủ chắc; mỗi lần gửi tốn thời gian coach nên quyền quyết định thuộc về learner | Tự làm ở khâu đưa nội dung lên, không tự sinh nội dung — nội dung đã có người thật duyệt nên chi phí khi sai thấp |
| Learner hiểu capability/limit bằng gì | Câu giới thiệu nói rõ chỉ dựa trên tài liệu khóa, cảnh báo lỗi môi trường máy cá nhân thường nằm ngoài phạm vi | Câu giới thiệu nói rõ mức chắc chắn là tự đánh giá của hệ thống, không phải bảo chứng người thật | Nhãn nguồn gốc cho biết câu đã duyệt hay chưa, duyệt từ khi nào |
| Evidence/uncertainty thể hiện thế nào | Trích dẫn cạnh từng ý; ý không có trích dẫn mang nhãn "nằm ngoài tài liệu khóa" | Ba nhóm mức chắc: đầy đủ / một phần / không neo được (không dùng %) | Tên người duyệt, thời điểm duyệt, số lần dùng lại; chưa duyệt thì nói thẳng |
| Learner kiểm soát và phục hồi thế nào | Mở/thu gọn nguồn, bỏ qua câu trả lời. Đường phục hồi vẫn là chờ hỏi coach (điểm yếu nhất) | Từ chối gửi, sửa nội dung, rút lại câu đã gửi; quay lại đúng bước đang làm dở khi coach trả lời | Đóng gợi ý, đánh dấu không liên quan, tìm câu khác, đặt câu hỏi mới — tự đẩy sang hàng chờ coach |

## 5. Tự kiểm Gate 2 và Gate 3

| Gate | Tiêu chí | Kết quả |
|---|---|---|
| Gate 2 | Ba option cùng target user / situation / task / desired outcome / fixture, khác nhau có ý nghĩa ở mechanism, không option nào bị làm yếu có chủ ý | Đạt — chi tiết căn cứ ở [README.md](../README.md) mục 2.5 |
| Gate 3 | Mỗi option nói rõ user/AI làm gì, mức tự chủ phù hợp hậu quả khi sai, có đường kiểm soát/phục hồi, capability/limit và evidence/uncertainty được nói rõ | Đạt — chi tiết căn cứ ở [README.md](../README.md) mục "Chặng 3 · Phần 4" |
