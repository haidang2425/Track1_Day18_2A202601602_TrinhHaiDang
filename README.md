# README - Day 18

| | |
|---|---|
| **Tên nhóm** | 333 |
| **Case đã chọn** | **A — AI Tutor · Diagnostic Refresher** |
| **Sản phẩm** | VLearn |

**Thành viên nhóm**

| # | Họ và tên | MHV |
|---|---|---|
| 1 | Nguyễn Hoàng Minh | 2A202601764 |
| 2 | Nguyễn Việt Hải | 2A202601656 |
| 3 | Trịnh Hải Đăng | 2A202601602 |

## Tài liệu liên quan trong repo

| Deliverable | File |
|---|---|
| Three Solution Options (bảng chuẩn hóa) | [docs/three-option-design-sheet.md](docs/three-option-design-sheet.md) |
| Cách chạy prototype (link A/B/C) | [docs/prototype-link.md](docs/prototype-link.md) |
| Prototype Feedback Note (Chặng 6) | [docs/prototype-feedback-note.md](docs/prototype-feedback-note.md) |
| Group Feedback Synthesis (Chặng 6) | [docs/group-feedback-synthesis.md](docs/group-feedback-synthesis.md) |
| AI Support Log | [docs/ai-support-log.md](docs/ai-support-log.md) |
| Transcript phỏng vấn usability test | [docs/interviews/](docs/interviews/) |
| Đề bài gốc (không chỉnh sửa) | [docs/assignment-brief.md](docs/assignment-brief.md) |

## Đóng góp của tôi trong nhóm (Trịnh Hải Đăng)

> *(Bản nháp dựa trên đúng những gì đã được ghi lại trong tài liệu của nhóm — bạn đọc lại, sửa và bổ sung phần bạn tự làm mà tài liệu chưa nhắc tới, ví dụ bạn build/chịu trách nhiệm chính option nào ở Chặng 4, vì phần đó chưa có ghi chú rõ trong README.)*

- **Chặng 1 — Evidence:** thực hiện Practice Note 3, phỏng vấn learner Đỗ Duy Đức — evidence này chỉ ra rào cản tâm lý khi ngại hỏi lab coach và hành vi chụp slide hỏi ChatGPT ngoài nền tảng, dẫn tới việc nhóm sửa lại giả thuyết ban đầu (learner không phải không biết mình hổng ở đâu, mà thiếu cơ chế kiểm chứng). Viết bản nháp đầu tiên của Hypothesis Problem, sau đó nhóm cùng chỉnh lại hai điểm (situation và job) dựa trên evidence trước khi chốt.
- **Chặng 6 — Test và Feedback Note:** facilitate phiên usability test A/B/C với tester Nguyễn Đức Đạt; dẫn buổi qua từng Option, ghi nhận lựa chọn (Option A) và lý do, tổng hợp thành [prototype-feedback-note.md](docs/prototype-feedback-note.md).
- *(Bổ sung nếu có: vai trò cụ thể ở Chặng 2-4 — ví dụ đóng góp ý tưởng cho Option nào, hoặc trực tiếp build phần nào của prototype/web app.)*

## Chặng 1: Evidence huddle và chốt Hypothesis Problem

### Phần 1. Evidence huddle

Nhóm đặt ba practice note cạnh nhau và đọc như ba nguồn riêng biệt. Mỗi thành viên chọn ra một chi tiết trong bản ghi của mình rồi đọc lại đúng nguyên văn hoặc mô tả đúng hành vi đã ghi nhận. Nhóm giữ nguyên tắc tách bạch: cột giữa là lời nói và việc làm của người được phỏng vấn, cột phải là phần suy luận của nhóm, và hai cột này không được trộn vào nhau.

#### 1.1. Bảng ba practice notes

| Practice Note | User đã thực sự làm hoặc nói gì | Điều nhóm đang diễn giải |
|---|---|---|
| Note 1: Lab coach, mã LC-01. Người phỏng vấn là Nguyễn Hoàng Minh. Người này không đúng tiêu chí tuyển của case, được phỏng vấn với tư cách nhân chứng phía hỗ trợ. | Coach cho biết chỉ cần nhìn vào là biết learner đang gặp lỗi gì, nhưng thường ít hỏi để learner tự chủ động hơn. Câu hỏi dồn vào giữa và cuối buổi, trong đó phần bị hỏi nhiều nhất là setup môi trường. Với những câu hỏi lạ, coach phải hỏi lại, mất khoảng ba mươi giây tới một phút mới biết learner cần gì, và có nhiều trường hợp coach hiểu sai ý hỏi. Ngoài giờ, coach vẫn trả lời tiếp qua tin nhắn và email, cách này chỉ giúp được một phần nhưng hiện vẫn đang dùng. Những câu ngoài lề, không đúng trọng tâm thì coach bỏ ra và không trả lời. Có lúc coach trả lời không kịp, và việc này chiếm rất nhiều thời gian, ảnh hưởng tới các công việc khác. | Nhóm cho rằng khoảng trống ở đây không phải là thiếu tín hiệu để phát hiện learner đang kẹt, mà là một lựa chọn sư phạm có chủ đích cộng với giới hạn về khả năng xử lý tuần tự của một người. Nói cách khác, kênh hỏi người thật đang bị nghẽn ngay từ phía người trả lời, chứ không chỉ từ phía learner. |
| Note 2: Learner Nguyễn Đức Đạt. Người phỏng vấn là Nguyễn Việt Hải. Người này đúng tiêu chí tuyển. | Đạt kẹt ở các bài học có kiến thức chuyên sâu về xây dựng ứng dụng AI. Việc đầu tiên khi kẹt là hỏi coach hoặc giảng viên, nhưng phải giơ tay, có thể làm chậm mạch bài giảng, và câu hỏi cũng có thể không được giải đáp. Khi đó Đạt chuyển sang hỏi bạn bè về phần còn mơ hồ, hoặc hỏi các model AI bên ngoài như Claude và ChatGPT. Việc đọc lại slide ngoài buổi học có được nhắc tới nhưng theo lời kể là chưa nhiều, phần lớn Đạt chỉ học tập trung trên lớp. Câu trả lời từ bạn bè chỉ đáp ứng được khoảng tám mươi phần trăm hoặc có lúc sai lệch, khiến Đạt phải tốn công học lại và tìm hiểu thêm. Còn hỏi AI bên ngoài thì tốn thêm token và chi phí. | Nhóm cho rằng khó khăn không nằm ở việc thiếu tài liệu để tự ôn, bởi vì việc xem lại slide ngoài giờ vốn đã ít. Khó khăn nằm ở chỗ thiếu một kênh giải đáp tức thời và ít ma sát ngay trong hoặc sát buổi học. Khi kênh chính bị nghẽn, learner chấp nhận đánh đổi độ chính xác bằng cách hỏi bạn bè, hoặc đánh đổi chi phí bằng cách hỏi AI bên ngoài, để lấp vào khoảng trống đó. |
| Note 3: Learner Đỗ Duy Đức. Người phỏng vấn là Trịnh Hải Đăng. Người này đúng tiêu chí tuyển. | Đức dùng AI tutor tích hợp sẵn trước, và khi thấy không thỏa đáng thì chụp ảnh slide đưa lên ChatGPT ở ngoài nền tảng để tra cứu. Khi có kết quả, Đức không kiểm chứng lại mà buộc phải tin. Đức ngại hỏi lab coach để xác minh, nên chọn bỏ qua phần chưa chắc chắn. Hai câu nguyên văn được ghi lại là: "Anh chụp slide lên... anh buộc phải tin thôi." và "Anh bị vấn đề là ngại hỏi lab coach. Nên anh bỏ qua." | Nhóm cho rằng vấn đề không nằm ở việc learner không biết mình hổng ở đâu, tức là giả thuyết ban đầu của nhóm đã sai ở điểm này. Vấn đề nằm ở chỗ thiếu cơ chế kiểm chứng câu trả lời của AI, cộng thêm rào cản tâm lý khi phải hỏi người thật. Hệ quả là learner chủ động chọn bỏ qua kiến thức thay vì đi xác minh. |

#### 1.2. Có situation, behavior hay workaround nào xuất hiện nhiều hơn một lần

Nhóm tìm thấy bốn điểm lặp lại, trong đó điểm đầu tiên là điểm hội tụ mạnh nhất.

Điểm lặp lại thứ nhất là kênh hỏi người thật đang bị nghẽn, và điểm này xuất hiện ở cả ba nguồn nhưng nhìn từ ba góc khác nhau. Với Đạt, chỗ nghẽn là ma sát về mặt cấu trúc, cụ thể là phải giơ tay, sợ làm chậm mạch bài giảng, và câu hỏi có thể không được giải đáp. Với Đức, chỗ nghẽn là rào cản tâm lý, cụ thể là ngại hỏi lab coach. Còn với LC-01, chỗ nghẽn đến từ chính phía coach, khi coach cố ý ít hỏi để learner tự chủ, đồng thời loại bỏ những câu ngoài trọng tâm và có lúc trả lời không kịp. Ba dạng nghẽn này khác nhau về nguyên nhân nhưng cùng dẫn tới một hệ quả: learner không lấy được câu trả lời từ người thật vào đúng thời điểm cần.

Điểm lặp lại thứ hai là workaround chính của learner đều là AI ngoài nền tảng, và điểm này đúng với cả hai learner. Đạt hỏi Claude và ChatGPT, còn Đức chụp ảnh slide đưa lên ChatGPT. Không learner nào coi việc đọc lại slide là workaround chính của mình.

Điểm lặp lại thứ ba là chi phí của workaround không nằm ở thời gian mà nằm ở độ tin cậy, và điểm này cũng đúng với cả hai learner. Đạt cho biết câu trả lời từ bạn bè chỉ đúng khoảng tám mươi phần trăm và có lúc sai lệch nên phải học lại. Đức thì nói thẳng là không kiểm chứng được nên buộc phải tin. Cả hai người đều đang đi tiếp trên một câu trả lời mà chính họ không chắc là đúng.

Điểm lặp lại thứ tư là hành vi bỏ qua, với một nguồn nói thẳng và một nguồn xác nhận gián tiếp. Đức chủ động bỏ qua phần chưa chắc. LC-01 thì cho biết có một nhóm câu hỏi bị coach loại và không trả lời, nghĩa là vẫn tồn tại một phần learner đã đặt câu hỏi nhưng không nhận được gì.

#### 1.3. Evidence nào mâu thuẫn hoặc làm nhóm bất ngờ

Bất ngờ thứ nhất là giả thuyết ban đầu của nhóm bị chính hai learner phủ định. Pain hypothesis mà nhóm viết ở Day 17 nói rằng learner không xác định được mình đang thiếu chính xác kiến thức nền nào. Nhưng Đạt chỉ rõ được mình kẹt ở mảng kiến thức chuyên sâu nào, còn Đức thì biết chính xác khái niệm nào mình chưa chắc, chỉ là không xác minh được. Như vậy rào cản không phải là chẩn đoán, mà là xác minh và tiếp cận.

Bất ngờ thứ hai là giải pháp trong directive vốn đã tồn tại, đã được dùng, và đã thất bại. Đức dùng AI tutor tích hợp sẵn trước, thấy không thỏa đáng rồi mới chụp slide ra ChatGPT. Đây là bằng chứng trực tiếp nhất chống lại directive được giao: một AI đọc nội dung bài rồi giải thích lại đã có sẵn trong luồng, learner đã thử, và vẫn phải đi ra ngoài.

Bất ngờ thứ ba là nội dung slide không phải nơi vấn đề tập trung. Đạt cho biết việc đọc lại slide ngoài buổi học là ít, còn LC-01 cho biết phần bị hỏi nhiều nhất là setup môi trường, tức là lỗi kỹ thuật khi thao tác. Điều đáng chú ý là Đức vẫn dùng slide, nhưng dùng làm vật liệu đầu vào để hỏi AI chứ không phải để đọc lại. Nói cách khác, slide đóng vai trò nguyên liệu chứ không phải câu trả lời.

Ngoài ra nhóm giữ lại hai mâu thuẫn thay vì làm phẳng chúng. Mâu thuẫn thứ nhất là hai learner đều nói mình biết rõ đang vướng gì, trong khi LC-01 lại nói có nhiều trường hợp coach hiểu sai ý hỏi của learner. Cách hòa giải khả dĩ là learner biết mình kẹt ở đâu nhưng diễn đạt không đủ chính xác cho người khác, tức đây là vấn đề truyền đạt chứ không phải vấn đề chẩn đoán. Nhóm ghi lại cách hòa giải này như một suy đoán và không dùng nó làm evidence. Mâu thuẫn thứ hai là Đức ngại hỏi coach còn Đạt lại hỏi coach trước tiên, cho thấy rào cản tâm lý không phải là hiện tượng phổ quát, nên nhóm không gộp hai người này thành một mẫu chung.

#### 1.4. Điều gì vẫn chỉ là suy đoán của nhóm

| Suy đoán | Vì sao chưa được tính là evidence |
|---|---|
| Hậu quả thật của việc bỏ qua kiến thức | Cả ba nguồn đều mỏng ở phần này. Đức nói mình bỏ qua nhưng không kể ra hậu quả cụ thể, còn Đạt nói tốn công học lại nhưng chưa nêu được bài tập sai, điểm kém hay sự cố nào. |
| Tần suất xảy ra | Không nguồn nào cho được con số theo tuần. Nhóm chưa biết đây là chuyện xảy ra mỗi buổi hay chỉ vài lần trong cả khóa. |
| Chi phí token khi hỏi AI bên ngoài | Đạt có nêu đây là một chi phí, nhưng chưa có con số hay ngưỡng nào khiến anh phải dừng lại. |
| Việc buộc phải tin có gây thiệt hại thật hay không | Chưa nguồn nào kể được một lần AI trả lời sai mà họ phát hiện ra sau đó. |
| Nhóm learner im lặng hoàn toàn nghĩ gì | Cả hai người được phỏng vấn đều là người có hành động khi kẹt. Người chọn không làm gì cả vẫn nằm ngoài dữ liệu của nhóm. |
| Việc coach cố ý ít can thiệp có phổ biến hay không | Chỉ mới có một nguồn duy nhất, nên chưa rõ đây là phong cách cá nhân hay chuẩn mực chung. |

#### 1.5. Hai chỗ nhóm đã sửa so với bản nháp ban đầu

Bản nháp Hypothesis Problem do Đăng viết đã bắt đúng rào cản, nhưng nhóm chỉnh lại hai chỗ trước khi dùng.

Chỗ thứ nhất là situation. Bản nháp mở đầu bằng cụm khi đọc slide bài giảng, trong khi Đạt nói rõ việc đọc slide ngoài buổi học là ít, và cả ba nguồn đều đặt sự kiện vào trong hoặc sát buổi học. Vì vậy nhóm đổi situation cho khớp với nơi sự kiện thực sự xảy ra.

Chỗ thứ hai là job. Bản nháp viết job là xác minh độ tin cậy của câu trả lời AI. Job này sẽ biến mất nếu bỏ AI ra khỏi bối cảnh, nghĩa là nó đang mang sẵn solution vào bên trong phần problem. Job đúng phải sống được kể cả khi không có AI, nên nhóm viết lại thành có được một câu trả lời đủ tin cậy để đi tiếp. Việc xác minh AI khi đó trở thành một trong các rào cản, chứ không còn là job nữa.

### Phần 2. Chốt Hypothesis Problem

#### 2.1. Hypothesis Problem nhóm tiếp tục

Khi đang học trong hoặc sát buổi lab và gặp một khái niệm hoặc một lỗi thao tác chưa hiểu, learner gặp khó khăn trong việc có được một câu trả lời đủ tin cậy để đi tiếp. Nguyên nhân là kênh hỏi người thật đang bị nghẽn, cụ thể là phải giơ tay giữa buổi, có người thì ngại hỏi, còn coach thì chủ động ít can thiệp và loại bỏ những câu nằm ngoài trọng tâm. Trong khi đó các kênh thay thế là bạn bè và AI ngoài nền tảng lại trả về những câu trả lời không kiểm chứng được. Hệ quả là learner hoặc đi tiếp trên một câu trả lời mà chính họ không chắc đúng, hoặc bỏ hẳn phần kiến thức đó.

#### 2.2. Evidence ban đầu hỗ trợ giả thuyết

| Thành phần của giả thuyết | Evidence tương ứng |
|---|---|
| Situation | Đạt cho biết mình kẹt ở bài học chuyên sâu, phần lớn học tập trung trên lớp và ít đọc lại slide ngoài giờ. LC-01 cho biết câu hỏi dồn vào giữa và cuối buổi. |
| Kênh hỏi người thật bị nghẽn | Ba nguồn cùng chỉ vào một chỗ. Đạt phải giơ tay, sợ làm chậm mạch bài, và câu hỏi có thể không được giải đáp. Đức nói rõ mình ngại hỏi lab coach. LC-01 xác nhận từ phía mình rằng coach cố ý ít hỏi để learner tự chủ, đồng thời loại bỏ câu ngoài trọng tâm và có lúc trả lời không kịp. |
| Workaround | Cả hai learner đều chuyển sang AI ngoài nền tảng. Riêng Đức còn đi qua AI tutor tích hợp trước khi ra ngoài, cho thấy workaround được xếp thành nhiều tầng. |
| Rào cản xác minh | Đạt cho biết câu trả lời từ bạn bè chỉ đáp ứng khoảng tám mươi phần trăm và có lúc sai lệch nên phải tốn công học lại. Đức nói thẳng là buộc phải tin. |
| Hậu quả | Đức chủ động bỏ qua phần chưa chắc. Đạt tốn công học lại và tốn thêm token khi hỏi AI bên ngoài. |

#### 2.3. Điều vẫn chưa được chứng minh

Thứ nhất là hậu quả cuối cùng. Không nguồn nào kể được một hậu quả quan sát được, chẳng hạn làm sai bài tập, phải học lại buổi, hay điểm bị ảnh hưởng. Toàn bộ phần consequence hiện đang đứng trên lời tự thuật về hành vi, chứ không đứng trên kết quả.

Thứ hai là tần suất. Nhóm chưa biết chuyện này xảy ra mấy lần mỗi buổi hay mỗi tuần, nên chưa định lượng được quy mô của vấn đề.

Thứ ba là việc buộc phải tin có gây thiệt hại thật hay không. Chưa ai kể được một lần AI trả lời sai mà họ phát hiện ra sau đó.

Thứ tư là nhóm learner im lặng. Cả hai người được phỏng vấn đều là người có hành động khi kẹt, còn người chọn không làm gì cả thì vẫn nằm ngoài dữ liệu.

Thứ năm là quan hệ giữa lỗi setup môi trường và khái niệm bài học. LC-01 nói setup bị hỏi nhiều nhất, trong khi cả hai learner đều kể về khái niệm. Nhóm chưa rõ đây là hai loại pain khác nhau hay chỉ là một loại nhìn từ hai phía.

Thứ sáu là mức độ phổ biến của việc coach cố ý ít can thiệp, vì hiện mới chỉ có một nguồn.

#### 2.4. Ràng buộc nhóm mang sang phần solution

Một AI đọc nội dung bài rồi giải thích lại thì đã tồn tại trong luồng và đã được learner sử dụng, nhưng Đức vẫn phải đi ra ngoài vì thấy không thỏa đáng. Vì vậy bất kỳ hướng giải quyết nào chỉ lặp lại năng lực đó đều khó tạo ra thay đổi. Phần chưa ai phục vụ là khâu xác minh, tức là cho learner biết câu trả lời đáng tin đến đâu, và mở một đường hỏi người thật đủ ít ma sát để họ chịu dùng khi câu trả lời chưa đủ chắc.

Nhóm không tuyên bố bất kỳ giả thuyết nào đã được validated.

## Chặng 2: Mở lại kho phương án và chọn ba cách giải

### Phần 1. Mở lại Solution Parking Lot

#### 1.1. Rà soát lại pool cũ từ Day 17

Trước khi nghĩ thêm bất kỳ hướng nào mới, nhóm quay lại đọc kỹ sáu hướng đã park ở Day 17 và đối chiếu từng hướng với những gì đã thu được từ ba cuộc phỏng vấn. Kết quả rà soát như sau:

| Số thứ tự | Hướng đã park | Cơ chế cốt lõi | Còn dùng được sau khi có evidence hay không |
|---|---|---|---|
| 1 | Nút "Tôi chưa hiểu" kèm AI chẩn đoán rồi cho ôn lại khái niệm nền | AI sinh ra lời giải thích | Nhóm quyết định loại hướng này. Đức đã dùng AI tutor tích hợp sẵn, thấy không thỏa đáng nên mới chụp slide đưa ra ChatGPT. Cả hai learner được phỏng vấn đều biết rất rõ mình đang kẹt ở đâu, nên phần chẩn đoán không phải là chỗ đang thiếu. |
| 2 | Gắn link tới bài học nền cho từng khái niệm, do đội nội dung khai báo thủ công | Điều hướng người học tới tài liệu vốn đã có sẵn | Nhóm giữ lại nhưng đánh giá là yếu. Đạt cho biết việc đọc lại tài liệu ngoài giờ học vốn đã rất ít, nên thêm một đường dẫn cũng khó thay đổi được hành vi. |
| 3 | Một câu kiểm tra nhanh ở cuối mỗi phần, trả lời sai thì mở lại phần nền tương ứng | Hệ thống tự phát hiện lỗ hổng | Giá trị giảm đi đáng kể, vì việc phát hiện không phải chỗ đang thiếu. Learner tự biết mình hổng ở đâu từ trước rồi. |
| 4 | Thư viện câu hỏi gắn theo từng slide, coach trả lời một lần cho tất cả | Tái sử dụng lại câu trả lời của người thật | Nhóm giữ lại và đánh giá mạnh, vì nó chạm đúng vào rào cản xác minh mà cả hai learner đều gặp phải. |
| 5 | Cho phép đánh dấu điểm kẹt ẩn danh rồi gom thành Support Queue cho coach | Chuyển tiếp sang người thật, có bảo vệ danh tính | Nhóm giữ lại và đánh giá mạnh. Cơ chế ẩn danh chạm đúng vào rào cản tâm lý mà Đức nói ra rất rõ. |
| 6 | AI tổng hợp các điểm kẹt lại thành báo cáo cho đội nội dung viết lại tài liệu | Cải thiện chất lượng nội dung về sau | Nhóm giữ lại nhưng thấy lệch mục tiêu, vì nó không phục vụ learner ngay tại khoảnh khắc họ đang kẹt. |

#### 1.2. Pool cũ đang thiếu điều gì

Nhìn lại cả sáu hướng, nhóm nhận ra chúng đều đang trả lời cho cùng một câu hỏi: làm thế nào để đưa được một lời giải thích tới tay learner. Không có hướng nào trả lời câu hỏi mà evidence thực sự đặt ra, đó là làm thế nào để learner biết được câu trả lời đang nằm trước mặt mình đáng tin đến mức nào. Vì lý do đó, và chỉ vì lý do đó, nhóm bổ sung thêm hai hướng mới. Nhóm không bổ sung để cho đủ số lượng ý tưởng.

Hướng bổ sung thứ bảy là neo nguồn cho câu trả lời và đánh dấu rõ những phần không có trong tài liệu khóa học. Mỗi câu trả lời sẽ đi kèm phần trích dẫn về đúng đoạn trong tài liệu của khóa, đồng thời nói thẳng ra phần nào nằm ngoài phạm vi tài liệu đó.

Hướng bổ sung thứ tám là cho phép hỏi ẩn danh chỉ bằng một thao tác ngay trong bài học, coach trả lời theo lô vào thời điểm thuận tiện, và câu trả lời sau khi được duyệt sẽ vào thư viện để những người sau dùng lại. Đây là cách hợp nhất hướng 4 và hướng 5 thành một cơ chế có vòng lặp khép kín.

#### 1.3. Dùng Day 16 như một câu hỏi gợi mở

Nhóm không lấy buổi teardown ở Day 16 làm sản phẩm nộp, mà chỉ dùng nó như một câu hỏi để mở rộng hướng suy nghĩ. Nguyên lý mà nhóm mượn lại là: sản phẩm do AI tạo ra nên tồn tại ở trạng thái một bản nháp có thể lần lại được và sửa được, chứ không phải một kết quả cuối đã đóng lại. Ở công cụ thiết kế mà nhóm đã teardown, nguyên lý này thể hiện qua việc thứ AI tạo ra vẫn nằm nguyên trên canvas cho người dùng chỉnh sửa, và vẫn còn nguyên lịch sử các phiên bản trước đó.

Điều quan trọng cần nói rõ: nhóm không sao chép tính năng lịch sử phiên bản. Nhóm mượn nguyên lý phía sau nó rồi dịch sang bối cảnh học tập, thành ra một yêu cầu khác hẳn về hình thức, đó là mỗi câu trả lời phải mang theo dấu vết về nguồn gốc của nó và về trạng thái đã được xác nhận hay chưa. Chính nguyên lý này đã sinh ra hướng bổ sung thứ bảy, và về sau trở thành xương sống của Option A.

#### 1.4. Ghi chú về chi phí khi sai

Theo khung thiết kế mức độ tự chủ của Day 18, nhóm xác định trường hợp này thuộc nhóm sai thì đắt và lại khó phát hiện. Khi learner tin nhầm một câu trả lời sai, lỗ hổng kiến thức chỉ lộ ra rất muộn, thường là tới lúc làm bài tập hoặc thi, và tới lúc đó thì không còn cách nào hoàn tác. Vì vậy nhóm thống nhất rằng không option nào được đặt ở vùng để hệ thống tự làm hoàn toàn. Cả ba phương án đều phải nằm ở vùng hỏi lại người dùng, hoặc ở vùng không tự quyết thay người dùng.

### Phần 2. Chọn ba cách giải

Ba option dưới đây cùng xuất phát từ một Hypothesis Problem, nhưng đại diện cho ba giả thuyết giải pháp khác nhau. Điểm khác biệt nằm ở chỗ: ai là người chịu trách nhiệm làm cho câu trả lời trở nên đáng tin, và việc đó diễn ra vào lúc nào.

Option A đặt việc kiểm chứng vào tay chính learner, ngay tại thời điểm họ đang kẹt. Option B để hệ thống tự khai ra mức độ chắc chắn của mình rồi mở đường sang người thật, cũng ngay tại thời điểm kẹt. Option C thì đưa việc kiểm chứng về trước, do người thật làm từ những lần trước đó, và learner chỉ việc nhận lại kết quả.

#### 2.1. Những thứ phải giữ nguyên

| Thành phần | Quyết định chung cho cả A, B và C |
|---|---|
| Target user | Learner đang theo học lab, đã từng bị kẹt và phải tự xoay xở trong bảy ngày gần đây |
| Situation | Đang làm bài trong buổi lab, ở khoảng giữa buổi, gặp một điểm kẹt, trong khi coach đang bận hỗ trợ người khác |
| Task | Có được một câu trả lời đủ tin cậy để đi tiếp bước đang làm dở |
| Desired outcome | Đi tiếp được bước tiếp theo mà không phải chấp nhận một câu trả lời mình không chắc, và cũng không phải bỏ qua phần kiến thức đó |
| Content và data fixture | Cùng một điểm kẹt là lỗi khi cài đặt môi trường ở bước 3 của bài lab, cùng một câu trả lời gốc do AI sinh ra, và cùng một bộ tài liệu khóa học |

Cả ba option đều dùng chung đúng một fixture này. Nhóm giữ nguyên fixture để chắc chắn rằng phản ứng của learner là phản ứng với cơ chế, chứ không phải phản ứng với nội dung khác nhau giữa các bản.

#### 2.2. Những thứ được phép khác nhau

| Thành phần | Option A: Neo nguồn | Option B: Tự khai mức chắc và chuyển tiếp | Option C: Đã được người thật duyệt |
|---|---|---|---|
| Solution mechanism | Mọi câu trả lời đều đi kèm phần trích dẫn về đúng đoạn trong tài liệu khóa học, đồng thời đánh dấu rõ phần nào không tìm thấy trong tài liệu | AI tự phân loại mức độ chắc chắn của chính câu trả lời vừa đưa ra. Khi mức này thấp, hệ thống đề nghị chuyển câu hỏi sang coach dưới dạng ẩn danh, và learner có thể đi tiếp trong lúc chờ | Hệ thống khớp bước mà learner đang làm với những câu trả lời đã được coach duyệt từ các lần trước rồi đưa lên trước. Chỉ khi chưa có câu nào phù hợp thì mới sinh câu trả lời mới và tự động xếp vào hàng chờ coach |
| User làm gì | Đọc phần neo nguồn rồi tự quyết định là tin hay không tin | Quyết định có gửi câu hỏi đi hay không, và tiếp tục làm việc khác trong lúc chờ phản hồi | Đọc câu trả lời đã có nhãn xác nhận, sau đó đánh dấu là có giải quyết được vấn đề hay không |
| AI làm gì | Sinh câu trả lời và neo từng ý về nguồn tương ứng. AI không phán đoán độ tin cậy và không chủ động làm gì thêm | Sinh câu trả lời, tự đánh giá mức độ chắc chắn, và soạn sẵn nội dung câu hỏi để gửi cho coach | Không sinh nội dung mới ở lượt đầu tiên, chỉ làm nhiệm vụ khớp câu hỏi với thư viện đã được duyệt |
| Trigger | Learner tự mở, giống như cách đang làm hiện nay | Hệ thống phát ra ngay trong lượt trả lời, vào lúc AI tự thấy mức chắc chắn của mình thấp | Hệ thống chủ động đưa lên khi thấy learner dừng lại lâu bất thường ở một bước vốn đã có sẵn câu trả lời |
| Trade-off chính | Đẩy toàn bộ công việc kiểm chứng lên vai learner đúng vào lúc họ đang vội. Ngoài ra phương án này gần như vô dụng khi câu trả lời vốn không nằm trong tài liệu khóa học, mà đó lại đúng là trường hợp lỗi cài đặt môi trường | Phụ thuộc hoàn toàn vào việc AI tự đánh giá đúng mức chắc chắn của mình. Nếu hệ thống báo không chắc quá thường xuyên thì tín hiệu thành nhiễu và learner sẽ bỏ qua hết. Ngoài ra vẫn phát sinh thêm một vòng chờ coach | Gặp vấn đề cold start, tức là giai đoạn đầu thư viện còn trống nên chưa giúp được gì. Phương án cũng phụ thuộc vào việc coach có chịu duyệt hay không, và kém linh hoạt với những câu hỏi lạ. Thêm nữa, việc hệ thống can thiệp chủ động đi ngược lại thói quen để learner tự xoay xở của coach |

#### 2.3. Distance check

Nhóm hoàn thành ba câu dưới đây mà không nhắc tới màu sắc, bố cục hay câu chữ, để chắc chắn rằng ba option khác nhau ở cơ chế chứ không phải khác nhau ở lớp vỏ.

A khác B ở chỗ, với A thì quyền phán đoán độ tin cậy nằm hoàn toàn trong tay learner, còn với B thì hệ thống tự tuyên bố mức chắc chắn của mình và chủ động mở một đường sang người thật. Trách nhiệm đánh giá đã chuyển từ phía con người sang phía hệ thống.

B khác C ở chỗ, B sinh ra một câu trả lời mới rồi mới đi tìm cách kiểm chứng sau đó, còn C chỉ phát lại thứ đã được người thật duyệt từ trước. Nói cách khác, việc kiểm chứng ở B diễn ra sau khi learner đã đọc, còn ở C nó diễn ra trước khi learner kịp gặp câu trả lời.

A khác C ở chỗ, A đặt toàn bộ công việc kiểm chứng lên learner ngay tại thời điểm họ đang kẹt, còn C dời công việc đó sang cho coach và sang một thời điểm khác, nên learner không phải làm gì mà vẫn có được sự đảm bảo.

#### 2.4. Vị trí của ba option trên spectrum

Nhóm dùng spectrum về quyền khởi tạo và quyền quyết định để định vị ba phương án:

| Vị trí trên spectrum | Option tương ứng | Diễn giải ngắn |
|---|---|---|
| User tự khởi tạo và tự quyết | Option A | Learner tự kiểm chứng dựa trên phần neo nguồn |
| User và AI cùng làm | Option B | Hệ thống khai mức chắc chắn, learner quyết định có leo thang lên người thật hay không |
| Hệ thống và người thật khởi tạo, user xem lại | Option C | Câu trả lời đã được duyệt từ trước, hệ thống chủ động đưa lên |

Nhóm xin lưu ý rằng không option nào bị làm yếu đi một cách cố ý để hai option còn lại trông tốt hơn. Option A là hướng gần với mặc định nhất, nhưng đồng thời cũng là hướng rẻ nhất và có thể triển khai được ngay. Option C có tiềm năng cao nhất, nhưng lại gánh rủi ro cold start nặng nhất trong ba phương án.

#### 2.5. Tự kiểm theo Gate 2

| Tiêu chí | Kết quả | Căn cứ |
|---|---|---|
| Ba option cùng target user | Đạt | Cùng là learner đã từng bị kẹt trong bảy ngày gần đây |
| Cùng situation | Đạt | Cùng bối cảnh giữa buổi lab, coach đang bận với người khác |
| Cùng task | Đạt | Cùng nhắm tới việc có được câu trả lời đủ tin cậy để đi tiếp |
| Cùng desired outcome | Đạt | Cùng mong muốn đi tiếp mà không phải tin liều và cũng không bỏ qua |
| Cùng content và data fixture | Đạt | Cùng lỗi cài đặt ở bước 3, cùng câu trả lời gốc, cùng bộ tài liệu |
| Khác nhau có ý nghĩa ở mechanism | Đạt | Ba cơ chế lần lượt là neo nguồn, tự khai mức chắc kèm leo thang, và thư viện đã được duyệt |
| Khác nhau ở cách chia việc và quyền quyết định | Đạt | Lần lượt là learner tự quyết, hệ thống khai rồi learner quyết, và người thật đã quyết từ trước |
| Mô tả được ba cơ chế mà không cần tới hình ảnh | Đạt | Ba câu trong phần distance check không nhắc tới màu sắc, bố cục hay câu chữ |
| Không có option nào bị làm yếu có chủ ý | Đạt | Mỗi option đều có một điều kiện riêng để thắng: A thắng khi tài liệu khóa học đầy đủ, B thắng khi gặp câu hỏi lạ cần tới người thật, C thắng khi câu hỏi lặp lại nhiều lần |

#### 2.6. Điều nhóm muốn học được từ ba option này

Câu hỏi nhóm mang vào buổi thử nghiệm là: khi learner đang kẹt và cần một câu trả lời đáng tin, họ muốn tự mình cầm quyền phán đoán, muốn hệ thống tự thú nhận giới hạn rồi mở đường sang người thật, hay muốn nhận sẵn một câu trả lời đã có người bảo chứng.

Kết quả mà nhóm mong đợi là một quyết định thiết kế cho bước tiếp theo, không phải một tuyên bố rằng phương án nào đó đã được validated.

## Chặng 3: Human và AI Design pass

Phạm vi của chặng này chỉ gói trong đúng một khoảnh khắc cần mang đi test, chứ không phải toàn bộ sản phẩm. Nhóm cũng không thêm một màn hình riêng cho mỗi tiêu chí, mà chỉ trả lời bốn nhóm câu hỏi thiết kế ngay trên khoảnh khắc đó.

**Critical interaction mà nhóm chọn để review:** Learner đang làm bài lab, kẹt ở bước 3 khi cài đặt môi trường, coach lúc đó đang bận với người khác. Learner mở phần trợ giúp và nhận về một câu trả lời. Toàn bộ phần thiết kế dưới đây chỉ xoay quanh đúng lượt trả lời này và những gì xảy ra ngay sau đó.

Lý do nhóm chọn đúng khoảnh khắc này là vì cả ba option chỉ khác nhau ở đây. Trước lượt trả lời thì ba bản giống hệt nhau, còn sau lượt trả lời thì learner đã bước vào một trong ba nhánh khác nhau.

### Phần 1. Bốn quyết định thiết kế

#### 1.1. Expectation

Trước khi AI hoạt động, learner cần hiểu rõ nó sắp làm gì và không làm được gì, vì nếu để giao diện hứa nhiều hơn năng lực thật thì niềm tin sẽ bị đặt sai chỗ ngay từ đầu.

Với Option A, hệ thống nói trước rằng nó chỉ trả lời dựa trên tài liệu của khóa học, và những phần nằm ngoài tài liệu sẽ được đánh dấu lại chứ không giấu đi. Giới hạn cần nói thẳng là với lỗi cài đặt môi trường trên máy cá nhân thì tài liệu khóa thường không chứa câu trả lời, nên phần lớn nội dung sẽ rơi vào nhóm không neo được.

Với Option B, hệ thống nói trước rằng nó sẽ tự đánh giá mức độ chắc chắn của chính mình, và khi thấy không chắc thì sẽ đề nghị chuyển câu hỏi sang coach. Giới hạn cần nói thẳng là mức chắc chắn đó chỉ là ước lượng của chính hệ thống, không phải một bảo chứng từ người thật.

Với Option C, hệ thống nói trước rằng thứ learner sắp đọc là câu trả lời đã có coach duyệt, kèm theo thời điểm duyệt. Giới hạn cần nói thẳng là trong giai đoạn đầu thư viện còn ít câu, nên có những bước chưa có gì để đưa lên, và khi đó learner sẽ nhận một câu trả lời chưa qua duyệt kèm nhãn ghi rõ điều đó.

#### 1.2. Role and Agency

Nhóm dựa vào chi phí khi sai để quyết định mức tự chủ, chứ không dựa vào cảm giác phương án nào thông minh hơn. Ở bối cảnh học tập này, learner tin nhầm một câu trả lời sai thì lỗ hổng kiến thức chỉ lộ ra rất muộn và không có cách nào hoàn tác, nên đây là loại sai vừa đắt vừa khó phát hiện.

Option A đặt AI ở mức không tự hành động. AI chỉ trả lời khi được gọi và tuyệt đối không phán đoán hộ learner rằng câu trả lời này đáng tin đến đâu. Toàn bộ quyền phán đoán nằm ở learner. Nhóm chọn mức này vì AI không có cơ sở đáng tin để tự chấm điểm mình, nên thà không nói gì còn hơn nói sai.

Option B đặt AI ở mức hỏi lại. AI tự khai mức chắc chắn rồi hỏi learner có muốn gửi câu hỏi sang coach hay không, chứ không tự động gửi. Nhóm không cho AI tự gửi vì mỗi câu gửi đi đều chiếm thời gian của coach, và ngay cả khi ẩn danh thì việc gửi vẫn là một hành động có hệ quả mà learner nên được quyết định.

Option C đặt AI ở mức tự hành động, nhưng chỉ tự hành động ở khâu đưa nội dung lên chứ không tự hành động ở khâu sinh nội dung. Thứ được đưa lên là câu trả lời đã có người thật duyệt từ trước, nên chi phí khi sai thấp hơn hẳn. Dù vậy nhóm ghi nhận một rủi ro riêng của phương án này: việc hệ thống chủ động can thiệp đi ngược lại thói quen để learner tự xoay xở của coach.

Về hậu quả khi AI sai, ba option chịu ba kiểu thiệt hại khác nhau. Ở Option A, nếu phần neo nguồn trích sai đoạn thì learner có thể tin nhầm, nhưng vì nguồn hiện ngay trước mặt nên learner còn cơ hội tự phát hiện. Ở Option B, nếu AI báo chắc chắn mà thực ra sai thì đây là trường hợp nặng nhất, vì learner được trấn an rồi đi tiếp và gần như không có cách nào phát hiện. Ở Option C, nếu hệ thống khớp nhầm câu hỏi thì learner sẽ đọc một câu trả lời đúng nhưng dành cho vấn đề khác, và điều này lộ ra khá nhanh vì nó không giải quyết được việc đang làm.

#### 1.3. Evidence and Uncertainty

Learner cần biết hệ thống đang dựa vào cái gì để nói, chứ không chỉ biết nó nói gì.

Option A cho thấy bằng chứng dưới dạng trích dẫn về đúng đoạn trong tài liệu khóa học, đặt cạnh từng ý trong câu trả lời. Những ý không tìm được trong tài liệu sẽ mang nhãn ghi rõ là nằm ngoài tài liệu khóa. Mức không chắc ở đây không được diễn đạt thành một con số, mà được thể hiện bằng chính sự vắng mặt của phần trích dẫn.

Option B chia mức chắc chắn thành ba nhóm thay vì hiển thị phần trăm, gồm neo được đầy đủ vào tài liệu, chỉ neo được một phần, và không neo được. Nhóm chọn cách phân loại theo nhóm vì một con số phần trăm sẽ tạo cảm giác chính xác giả tạo. Khi rơi vào nhóm thấp nhất, hệ thống mới đề nghị chuyển câu hỏi sang coach.

Option C cho thấy bằng chứng dưới dạng nguồn gốc của câu trả lời, cụ thể là ai đã duyệt, duyệt vào lúc nào, và câu này đã được dùng lại bao nhiêu lần. Khi chưa có câu nào được duyệt cho bước đang làm, hệ thống nói thẳng rằng đây là câu chưa qua duyệt chứ không im lặng đưa ra như thể nó đã được xác nhận.

#### 1.4. Control and Recovery

Option A cho learner mở rộng hoặc thu gọn phần nguồn, và bỏ qua toàn bộ câu trả lời nếu thấy không dùng được. Đường phục hồi là learner quay lại cách cũ, tức là chờ tới lượt hỏi coach. Nhóm ghi nhận đây là điểm yếu rõ nhất của Option A, vì nó không mở thêm bất kỳ đường thoát mới nào so với hiện trạng.

Option B cho learner từ chối lời đề nghị gửi câu hỏi, sửa lại nội dung câu hỏi trước khi gửi, và rút lại câu đã gửi nếu tự tìm ra đáp án trong lúc chờ. Learner cũng được đi làm bước khác trong lúc chờ thay vì phải đứng yên. Đường phục hồi là khi coach trả lời, hệ thống đưa learner quay lại đúng bước đang làm dở kèm theo câu hỏi ban đầu.

Option C cho learner đóng gợi ý, đánh dấu là không liên quan, tự tìm câu khác trong thư viện, hoặc đặt một câu hỏi mới nếu thư viện không có gì phù hợp. Đường phục hồi nằm ngay ở thao tác đánh dấu không giải quyết được, vì thao tác này sẽ đẩy trường hợp đó sang hàng chờ của coach thay vì để learner tự chịu.

### Phần 2. Human và AI Decision Table

| Human và AI decision | Option A: Neo nguồn | Option B: Tự khai mức chắc và chuyển tiếp | Option C: Đã được người thật duyệt |
|---|---|---|---|
| User làm gì và AI làm gì | AI sinh câu trả lời rồi neo từng ý về đúng đoạn trong tài liệu khóa. Learner đọc phần neo đó và tự quyết định tin hay không tin | AI sinh câu trả lời, tự phân loại mức chắc chắn, và soạn sẵn nội dung câu hỏi để gửi coach. Learner quyết định có gửi hay không rồi đi làm bước khác trong lúc chờ | Hệ thống khớp bước đang làm với câu trả lời đã được coach duyệt rồi đưa lên. Learner đọc và đánh dấu là có giải quyết được hay không |
| AI tự làm, hỏi lại hay không tự làm, và vì sao | Không tự làm. AI không phán đoán độ tin cậy vì nó không có cơ sở đáng tin để tự chấm điểm mình, và sai ở khâu này thì rất khó phát hiện | Hỏi lại. AI có tín hiệu để nghi ngờ chính mình nhưng chưa đủ chắc, mà mỗi lần gửi đi lại tốn thời gian của coach, nên quyền quyết định phải thuộc về learner | Tự làm, nhưng chỉ tự làm ở khâu đưa nội dung lên chứ không tự sinh nội dung. Thứ được đưa lên đã có người thật duyệt nên chi phí khi sai thấp |
| Learner hiểu capability và limit bằng gì | Câu giới thiệu nói rõ hệ thống chỉ dựa trên tài liệu khóa, kèm cảnh báo rằng lỗi môi trường trên máy cá nhân thường nằm ngoài phạm vi đó | Câu giới thiệu nói rõ mức chắc chắn là tự đánh giá của hệ thống chứ không phải bảo chứng của người thật | Nhãn nguồn gốc trên từng câu trả lời cho biết đây là câu đã duyệt hay chưa duyệt, và duyệt từ khi nào |
| Bằng chứng và mức không chắc được thể hiện thế nào | Trích dẫn đặt cạnh từng ý. Ý nào không có trích dẫn thì mang nhãn nằm ngoài tài liệu khóa | Ba nhóm mức chắc chắn là neo được đầy đủ, neo được một phần, và không neo được. Nhóm không dùng phần trăm để tránh tạo cảm giác chính xác giả tạo | Tên người duyệt, thời điểm duyệt và số lần câu trả lời đã được dùng lại. Khi chưa có câu duyệt thì hệ thống nói thẳng là chưa qua duyệt |
| Learner kiểm soát và phục hồi thế nào | Mở rộng hoặc thu gọn phần nguồn, bỏ qua câu trả lời. Đường phục hồi vẫn là chờ hỏi coach như hiện trạng, và đây là điểm yếu rõ nhất của phương án | Từ chối gửi, sửa nội dung trước khi gửi, rút lại câu đã gửi. Khi coach trả lời thì hệ thống đưa learner quay lại đúng bước đang làm dở | Đóng gợi ý, đánh dấu không liên quan, tìm câu khác trong thư viện, hoặc đặt câu hỏi mới. Thao tác đánh dấu không giải quyết được sẽ tự đẩy sang hàng chờ coach |

### Phần 3. Feedback and data check

Phần này chỉ áp dụng cho những option có dùng dữ liệu của learner hoặc có học từ phản hồi, và ở đây là Option B với Option C.

#### 3.1. Feedback ảnh hưởng tới đâu

Với Option A, hệ thống không ghi nhớ gì. Câu trả lời được sinh ra từ tài liệu khóa, không lưu lại lịch sử và không dùng để cải thiện lần sau. Đây là phương án ít chạm vào dữ liệu learner nhất.

Với Option B, phản hồi ảnh hưởng tới chính phiên hiện tại. Câu hỏi được gửi sang coach và câu trả lời của coach quay lại đúng phiên đó cho đúng learner đã hỏi. Hệ thống không dùng câu hỏi này để huấn luyện gì thêm.

Với Option C, phản hồi ảnh hưởng tới những người dùng sau. Câu hỏi và câu trả lời sau khi coach duyệt sẽ đi vào thư viện dùng chung, nghĩa là learner khác sẽ đọc lại nội dung xuất phát từ tình huống của mình.

#### 3.2. Dữ liệu nào được dùng và learner rút quyền bằng cách nào

Với Option B, dữ liệu được dùng là nội dung câu hỏi cùng bước đang làm dở. Nhóm lưu ý một điểm cần cẩn thận: hệ thống chỉ nên hứa đúng mức ẩn danh mà nó thực sự làm được. Câu hỏi có thể ẩn danh với các learner khác, nhưng coach vẫn có khả năng đoán ra người hỏi khi lớp ít người, nên giao diện phải nói rõ điều này thay vì hứa ẩn danh tuyệt đối. Learner được xem trước toàn bộ nội dung sắp gửi, được sửa, và được rút lại câu đã gửi khi coach chưa trả lời.

Với Option C, dữ liệu được dùng là câu hỏi và câu trả lời sẽ vào thư viện chung. Learner phải được hỏi trước khi nội dung đó được đưa vào thư viện, chứ không phải được thông báo sau. Learner cũng có quyền yêu cầu gỡ phần đóng góp của mình khỏi thư viện về sau.

### Phần 4. Tự kiểm theo Gate 3

| Tiêu chí | Kết quả | Căn cứ |
|---|---|---|
| Mỗi option nói rõ user làm gì và AI làm gì | Đạt | Dòng đầu của Decision Table tách bạch phần việc của hai bên trong cả ba option |
| Mức tự chủ phù hợp với hậu quả khi sai | Đạt | Sai ở đây vừa đắt vừa khó phát hiện, nên không option nào để AI tự quyết thay learner. A không tự làm, B hỏi lại, còn C chỉ tự làm với nội dung đã có người thật duyệt |
| Mỗi option có ít nhất một đường kiểm soát hoặc phục hồi | Đạt | A cho bỏ qua và mở nguồn để tự kiểm, B cho từ chối, sửa và rút lại, C cho đóng gợi ý và đánh dấu không giải quyết được để đẩy sang coach |
| Có nói rõ capability và limit trước khi AI hoạt động | Đạt | Cả ba option đều có một câu nói trước về phạm vi và giới hạn, viết ở mục 1.1 |
| Mức không chắc được thể hiện ra ngoài | Đạt | A thể hiện bằng sự vắng mặt của trích dẫn, B bằng ba nhóm mức chắc, C bằng nhãn đã duyệt hay chưa duyệt |
| Dữ liệu và phản hồi được nói rõ, learner rút quyền được | Đạt | A không lưu gì, B chỉ ảnh hưởng phiên hiện tại và cho rút lại, C hỏi trước khi đưa vào thư viện chung và cho gỡ về sau |

Điểm nhóm muốn quan sát kỹ nhất là phản ứng của learner với mức không chắc. Ở Option B, nếu hệ thống báo không chắc quá thường xuyên thì tín hiệu sẽ thành nhiễu và learner bỏ qua hết, nhưng nếu báo quá ít thì learner lại rơi đúng vào tình trạng buộc phải tin như hiện nay. Nhóm chưa biết ngưỡng nào là hợp lý, và đây là thứ chỉ có thể học được từ hành vi thật chứ không suy ra được trên giấy.

## Chặng 4: Build ba micro-prototype

Ba micro-prototype (Option A/B/C) đã được build tích hợp trực tiếp vào UI của Dashboard (chuyển qua dropdown), dùng chung context, content fixture và visual components theo đúng luật giữ 70% chung đã đặt ra ở Chặng 2. Chi tiết kiến trúc, cách cài đặt và link truy cập nằm ở [prototype-link.md](docs/prototype-link.md); kiến trúc/API/data model đầy đủ nằm ở [docs/PROJECT.md](docs/PROJECT.md).

## Chặng 5: Chuẩn bị test

Nhóm đã dựng xong ba bản micro prototype của option A, B và C. Ở chặng này nhóm sẽ làm ba việc. Việc thứ nhất là chốt câu hỏi để biết người tham gia có từng gặp tình huống liên quan hay chưa. Việc thứ hai là chốt nhiệm vụ sẽ giao cho họ. Việc thứ ba là chốt luật dẫn buổi thử. Nhóm không sửa bản nháp trong chặng này.

**Tình huống dùng chung cho cả ba bản:** Cả ba bản micro prototype đều đặt người học vào cùng một tình huống. Người học đang xem slide 4 của bài Day 18 và gặp một chỗ chưa rõ về việc thế nào là ba cơ chế khác nhau. Người học hỏi trợ giảng AI câu sau: nhóm em làm ba bản chỉ khác chỗ hiện thông báo, vậy có tính là ba cơ chế không.

Ba bản dùng chung đúng một câu hỏi này và đúng một câu trả lời gốc. Câu trả lời gốc có ba ý. Hai ý đầu dẫn được về slide 4 và slide 7 trong bài học. Ý thứ ba thì bài học không nói tới.

Điểm đáng chú ý của tình huống này nằm ở chỗ ý mà người học cần nhất lại chính là ý không có gì trong bài chống lưng. Ba bản khác nhau ở cách chúng xử lý riêng ý thứ ba đó.

### Phần 1. Chốt bối cảnh và nhiệm vụ

#### 1.1. Bảng câu hỏi phỏng vấn

Kịch bản dẫn buổi thử: bảng câu hỏi theo thứ tự. Bảng này dành cho người dẫn cầm theo trong lúc thử. Cột thứ ba là lời để đọc gần như nguyên văn. Cột thứ tư nói rõ mục đích và những chỗ cần cẩn thận.

**a. Mở đầu và xin phép**

| Thứ tự | Nói lúc nào | Người dẫn nói gì | Mục đích và lưu ý |
|---|---|---|---|
| 1 | Ngay khi bắt đầu | Chào bạn. Nhóm mình đang làm một bài tập về thiết kế sản phẩm. Hôm nay mình muốn nhờ bạn thử ba bản nháp và nói to suy nghĩ của bạn trong lúc thử. | Người dẫn không nói đây là sản phẩm của nhóm và cũng không nói bản nào do nhóm tâm đắc, để người tham gia không khen cho vừa lòng. |
| 2 | Ngay sau câu 1 | Ba bản này còn rất thô, vẽ tay và chưa chạy thật. Bạn cứ chê thoải mái, chê càng thẳng thì càng giúp được nhóm mình. | Câu này hạ kỳ vọng về hình thức, để người tham gia tập trung vào cách hoạt động thay vì bình luận màu sắc và bố cục. |
| 3 | Trước khi bấm gì | Mình xin phép ghi màn hình và ghi âm buổi này được không. Bản ghi chỉ dùng trong nội bộ bài tập của nhóm mình thôi. | Người dẫn phải chờ người tham gia đồng ý rõ ràng rồi mới bật ghi. |

**b. Hỏi về bối cảnh, tối đa hai phút**

| Thứ tự | Nói lúc nào | Người dẫn nói gì | Mục đích và lưu ý |
|---|---|---|---|
| 4 | Trước khi mở bản nháp | Trong bảy ngày gần đây, bạn có lần nào hỏi một công cụ AI về nội dung bài học rồi không biết câu trả lời đó có đúng hay không, không? | Đây là câu sàng lọc duy nhất. Câu này hỏi về chuyện đã xảy ra, không hỏi thói quen chung. |
| 5 | Chỉ hỏi khi câu 4 được trả lời là có | Lần gần nhất là chuyện gì vậy, và sau đó bạn làm gì? | Người ghi chép lại càng sát nguyên văn càng tốt. Về sau nhóm đối chiếu lời kể này với hành vi của chính họ trong lúc thử. |
| 6 | Chỉ hỏi khi câu 4 được trả lời là chưa từng | Không sao cả, mình vẫn thử tiếp nhé. | Người dẫn không hỏi thêm và không cố khơi ra một câu chuyện. Người ghi đánh dấu người này không có bối cảnh liên quan. |

**c. Giao nhiệm vụ, đọc nguyên văn cho cả ba bản**

| Thứ tự | Nói lúc nào | Người dẫn nói gì | Mục đích và lưu ý |
|---|---|---|---|
| 7 | Trước bản đầu tiên | Bạn đang học slide 4 và đang chuẩn bị bài cho nhóm mình. Bạn có một câu hỏi, và bạn cần biết câu trả lời có dùng được hay không trước khi mang vào bài nhóm. Trong tình huống này, bạn hãy dùng bản này để đi tới chỗ mà bạn thấy đủ chắc để học tiếp. Nếu bạn thấy mình không thể chắc thêm được nữa thì bạn cứ dừng lại, như vậy cũng được. | Vế cuối là phần bắt buộc phải đọc. Nếu bỏ vế này thì người tham gia sẽ cố bấm cho ra kết quả để làm vừa lòng người dẫn. |
| 8 | Trước bản thứ hai và bản thứ ba | Giờ mình chuyển sang bản tiếp theo nhé. Nhiệm vụ vẫn y như lúc nãy. | Người dẫn không đổi một chữ nào trong nhiệm vụ và không mô tả bản mới có gì khác. |

**d. Trong lúc người tham gia đang thử**

Ba câu đầu là câu cứu hộ, dùng đi dùng lại được cho cả ba bản. Các câu còn lại chỉ dùng khi đúng tình huống xảy ra.

| Thứ tự | Nói lúc nào | Người dẫn nói gì | Mục đích và lưu ý |
|---|---|---|---|
| 9 | Khi người tham gia im lặng và có vẻ lúng túng | Bạn cứ nói to suy nghĩ của mình nhé. | Người dẫn phải đếm thầm tới mười trước khi nói câu này. Im lặng không phải lúc nào cũng là lúng túng. |
| 10 | Khi người tham gia dừng lại và chờ hướng dẫn | Bạn sẽ làm gì tiếp theo? | Người dẫn đẩy quyền quyết định về lại cho người tham gia thay vì gợi ý. |
| 11 | Khi người tham gia hỏi hệ thống hoạt động ra sao | Theo bạn, nó nên hoạt động như thế nào? | Người dẫn không xác nhận và không phủ nhận. Câu trả lời của họ chính là dữ liệu về mô hình mà họ đang hình dung trong đầu. |
| 12 | Khi người tham gia khen bản nháp hoặc khen ý tưởng | Bản này còn thô lắm. Mà lúc nãy bạn bấm vào chỗ đó vì nghĩ nó sẽ ra cái gì vậy? | Người dẫn gạt lời khen sang một bên rồi kéo ngay về việc vừa xảy ra. |
| 13 | Khi người tham gia đề xuất thêm tính năng | Nếu có cái đó thì nó giúp bạn ở đúng chỗ nào trong lúc nãy? | Người dẫn không bàn về tính năng, mà đào ngược về công việc mà người tham gia đang mắc. |
| 14 | Ở bản A, khi họ mở chỗ dẫn rồi đóng rất nhanh | Lúc nãy bạn mở chỗ dẫn rồi đóng ngay, lúc đó bạn đang tìm cái gì vậy? | Câu này phân biệt việc đọc thật với việc mở ra cho có. |
| 15 | Ở bản A, sau khi họ chọn vẫn tin hoặc bỏ qua ở ý thứ ba | Lúc nãy bạn chọn như vậy. Bạn dựa vào cái gì để chọn? | Đây là chỗ quan trọng nhất của bản A, vì ý thứ ba không có gì trong bài chống lưng. |
| 16 | Ở bản B, sau khi họ bấm gửi hoặc bấm thôi | Bạn nghĩ gì ngay trước lúc bấm nút đó? | Câu này hỏi về khoảnh khắc vừa xảy ra, không hỏi về ý định chung chung. |
| 17 | Ở bản B, trong lúc chờ coach trả lời | Bây giờ bạn định làm gì? | Người dẫn không gợi ý là hãy học tiếp. Việc họ chờ, học tiếp, hay mở công cụ khác đều là dữ liệu. |
| 18 | Ở bản B, sau khi đọc câu trả lời của coach | Câu này với câu lúc nãy của trợ giảng, bạn thấy khác nhau ở chỗ nào? | Câu này kiểm tra xem người thật có mang lại thứ gì mà máy không mang lại được hay không. |
| 19 | Ở bản C, ngay sau khi trợ giảng tự mở lên | Trên màn hình này bạn có để ý dòng nào không, và dòng đó nói gì? | Người dẫn tuyệt đối không chỉ vào dòng ghi coach đã duyệt. Việc họ có tự nhận ra hay không chính là thứ cần đo. |
| 20 | Ở bản C, khi họ gặp câu chưa ai duyệt | Bây giờ bạn định làm gì? | Đây là chỗ yếu nhất của bản C, khi kho chưa có câu cho trường hợp riêng. |

**e. Kết thúc buổi**

| Thứ tự | Nói lúc nào | Người dẫn nói gì | Mục đích và lưu ý |
|---|---|---|---|
| 21 | Sau khi thử xong cả ba bản | Nếu tuần sau bạn học một bài khó và chỉ được dùng một trong ba bản vừa rồi, bạn chọn bản nào? | Câu này hỏi về một chuyện chưa xảy ra, nhưng vẫn dùng được vì người tham gia đang chọn giữa ba thứ họ vừa tự tay bấm thử. |
| 22 | Ngay sau câu 21 | Cái gì trong lúc bạn vừa thử đã làm bạn chọn như vậy, và bạn phải chịu thiệt gì khi chọn bản đó? | Đây mới là câu quan trọng. Nếu người tham gia không nói ra được cái giá phải trả thì lựa chọn ở câu 21 chỉ được ghi như một lời khen, không tính là dữ liệu. |
| 23 | Khi họ đã trả lời xong câu 22 | Có chỗ nào trong ba bản vừa rồi làm bạn thấy khó chịu mà nãy giờ bạn chưa nói ra không? | Câu này mở đường cho những điều họ giữ lại vì ngại. Người dẫn hỏi xong thì im lặng chờ. |
| 24 | Đóng buổi | Cảm ơn bạn nhiều. Nhóm mình dùng đúng những gì bạn vừa làm để sửa lại bản nháp. | Người dẫn không giải thích bản nào nhóm định chọn và không hỏi thêm gì sau câu này. |

**f. Năm câu tuyệt đối không được hỏi**

| Câu không được hỏi | Vì sao hỏng | Câu dùng thay |
|---|---|---|
| Bạn thấy bản này có hay không | Câu này chỉ thu về ý kiến nói cho lịch sự | Xem câu số 14 |
| Bạn có tin câu trả lời của AI không | Câu này hỏi về thái độ chung chung, ai cũng trả lời được mà không nói lên điều gì | Xem câu số 15 |
| Nếu có nút gửi cho coach thì bạn có dùng không | Câu này hỏi về một chuyện chưa xảy ra nên câu trả lời gần như luôn là có | Xem câu số 16 |
| Việc ghi rõ coach đã duyệt có làm bạn yên tâm hơn không | Câu này mớm sẵn kết luận mà nhóm đang mong đợi | Xem câu số 19 |
| Bản nào tốt nhất | Câu này ép người tham gia xếp hạng thay vì nói ra tiêu chí của họ | Xem câu số 21 và 22 |

#### 1.2. Nhiệm vụ giao cho người tham gia

Nhiệm vụ được viết theo kết quả cần đạt, không viết theo nút cần bấm. Nhiệm vụ cũng cho phép người tham gia dừng lại giữa chừng mà vẫn được tính là hợp lệ.

Người dẫn đọc nguyên văn như sau cho người tham gia nghe: "Bạn đang học slide 4 và đang chuẩn bị bài cho nhóm mình. Bạn có một câu hỏi, và bạn cần biết câu trả lời có dùng được hay không trước khi mang vào bài nhóm. Trong tình huống này, bạn hãy dùng từng bản để đi tới chỗ mà bạn thấy đủ chắc để học tiếp. Nếu bạn thấy mình không thể chắc thêm được nữa thì bạn cứ dừng lại, như vậy cũng được."

Và cuối là phần quan trọng nhất. Nếu nhiệm vụ chỉ nói là hãy tìm câu trả lời thì người tham gia sẽ cố bấm cho ra một kết quả nào đó để làm vừa lòng người dẫn. Khi nhiệm vụ nói rõ rằng dừng lại vì không chắc thêm được cũng là một kết cục hợp lệ, nhóm mới nhìn được hành vi thật.

Cả ba bản dùng đúng một nhiệm vụ này. Người dẫn không đổi một chữ nào giữa các bản.

#### 1.3. Thứ tự cho từng người thử

Nhóm đảo thứ tự ba bản giữa những người tham gia khác nhau. Người thứ nhất thử theo thứ tự A, B rồi C. Người thứ hai thử theo thứ tự B, C rồi A. Người thứ ba thử theo thứ tự C, A rồi B.

Lý do là bản được thử đầu tiên thường bị đánh giá thiệt hơn hai bản sau, vì lúc đó người tham gia còn đang làm quen với tình huống. Ngoài ra, người dẫn chỉ gọi là bản A, bản B và bản C. Người dẫn không đọc tên mô tả của từng bản, để tránh gợi ý trước bản nào tốt hơn.

#### 1.4. Năm thứ nhóm sẽ quan sát

Nhóm chọn đúng năm thứ để quan sát và bỏ hẳn những thứ còn lại, để buổi thử không bị loãng.

| Thứ nhóm quan sát | Người ghi cần nhìn cái gì | Thứ này giúp nhóm phân biệt điều gì |
|---|---|---|
| Việc đầu tiên người tham gia làm | Người ghi nhìn xem người tham gia làm thao tác gì đầu tiên sau khi câu trả lời hiện ra, tính trong khoảng mười giây đầu | Việc này cho biết phản xạ tự nhiên của họ là đi kiểm chứng, là đọc tiếp, hay là đi tiếp luôn mà không kiểm gì cả |
| Phần dẫn chứng được đọc hay bị bỏ qua | Ở bản A, người ghi nhìn xem người tham gia có bấm vào chỗ dẫn hay không, và khi mở ra thì họ đọc kỹ đoạn gốc hay chỉ liếc qua rồi bấm nút Khớp. Ở bản B, người ghi nhìn xem họ có đọc dòng trợ giảng tự chấm là chưa chắc hay không. Ở bản C, người ghi nhìn xem họ có để ý dòng ghi tên người duyệt và ngày duyệt hay không | Đây là điều quan trọng nhất của cả buổi, vì nó cho biết cơ chế kiểm chứng có được dùng thật hay chỉ nằm đó cho có |
| Chỗ người tham gia do dự | Người ghi đánh dấu những chỗ người tham gia dừng lại lâu bất thường, đọc lại một đoạn, hoặc rê chuột qua lại giữa hai lựa chọn trước khi bấm | Việc này chỉ ra đúng chỗ mà quyết định đang khó. Nhóm dự đoán hai chỗ khó nhất là màn ý thứ ba của bản A và màn quyết định gửi hay không gửi của bản B |
| Cách người tham gia gỡ khi gặp ngõ cụt | Ở bản A, ngõ cụt là ý không có chỗ dẫn. Ở bản B, ngõ cụt là lúc họ từ chối gửi câu hỏi. Ở bản C, ngõ cụt là lúc kho không có câu nào cho trường hợp riêng. Người ghi nhìn xem họ làm gì tiếp sau đó | Việc này cho biết mỗi bản có thật sự mở được một đường đi tiếp hay chỉ đẩy người học về lại tình trạng cũ |
| Bản được chọn và cái giá phải trả khi chọn | Sau khi thử xong cả ba bản, người tham gia chọn một bản và nói được mình phải chịu thiệt gì khi chọn như vậy | Một lựa chọn mà không kèm cái giá phải trả thì chỉ là lời khen, nhóm không dùng được |

Nhóm cố ý không theo dõi kỹ hai thứ là người tham gia cần trợ giúp ở đâu và họ hiểu nhầm chỗ nào. Lý do là bản nháp này vẽ tay và còn thô, nên phần lớn chỗ khó hiểu sẽ đến từ chất lượng bản vẽ chứ không đến từ cơ chế. Nhóm không muốn dữ liệu bị lấp bởi loại nhiễu đó.

#### 1.5. Câu nhóm cần trả lời và dấu hiệu hỏng của từng bản

| Bản | Câu nhóm cần trả lời | Dấu hiệu cho thấy bản này hỏng |
|---|---|---|
| Bản A, có link dẫn chứng | Người học có chịu bấm vào link để tự đi kiểm hay không | Người học đọc lướt rồi tin luôn mà không mở chỗ dẫn nào. Hoặc khi gặp ý không có trong bài thì họ bỏ qua ngay |
| Bản B, tự nói mình chưa chắc | Dòng chữ chưa chắc có được người học tin hay không, và việc giấu tên có đủ để họ chịu bấm gửi hay không | Người học bỏ qua dòng chữ đó vì nghĩ lần nào cũng thấy. Hoặc họ bấm nút Thôi rồi đi tiếp |
| Bản C, câu đã có coach duyệt | Việc ghi rõ có người thật đã duyệt có thay được việc tự đi hỏi hay không | Người học thấy việc trợ giảng tự mở lên là phiền. Hoặc khi gặp câu lạ thì kho không giúp được gì cho họ |

### Phần 2. Luật dẫn buổi thử

#### 2.1. Sáu luật và lý do của từng luật

Luật thứ nhất là người tham gia tự điều khiển bản nháp. Người dẫn không cầm chuột và không bấm hộ, kể cả khi người tham gia bấm nhầm chỗ. Chỗ họ bấm nhầm chính là dữ liệu mà nhóm cần.

Luật thứ hai là dùng đúng một nhiệm vụ cho cả ba bản. Nếu người dẫn đổi cách nói giữa các bản thì phản ứng của người tham gia sẽ nói về nhiệm vụ chứ không nói về cơ chế.

Luật thứ ba là không thuyết minh và không giải thích các dòng chữ trên màn hình. Ở bài này, người dẫn không được giải thích dòng không có trong bài của bản A, không được giải thích dòng trợ giảng tự chấm chưa chắc của bản B, và không được giải thích dòng coach đã duyệt của bản C. Việc người tham gia có tự nhận ra những dòng đó hay không chính là thứ nhóm cần đo.

Luật thứ tư là không lấp vào khoảng im lặng. Khi người tham gia dừng lại, người dẫn đếm thầm tới mười rồi mới cân nhắc nói. Phần lớn những câu nói ra sau một khoảng im lặng dài là những câu đáng giá nhất.

Luật thứ năm là không hỏi người tham gia có thích hay không. Câu hỏi về sở thích chỉ thu về lời khen cho lịch sự. Nhóm hỏi về việc họ vừa làm, không hỏi về cảm nhận của họ.

Luật thứ sáu là khi người tham gia hỏi ngược về cách hệ thống hoạt động, người dẫn hỏi lại chứ không trả lời. Ví dụ khi họ hỏi coach có biết ai gửi câu hỏi hay không, người dẫn không giải thích cơ chế giấu tên mà hỏi lại rằng theo bạn thì nó nên hoạt động thế nào.

#### 2.2. Ba câu cứu hộ

Khi người tham gia im lặng quá lâu và có vẻ đang lúng túng, người dẫn nói: "bạn cứ nói to suy nghĩ của mình nhé."

Khi người tham gia dừng lại và chờ người dẫn hướng dẫn, người dẫn nói: "bạn sẽ làm gì tiếp theo?"

Khi người tham gia hỏi về cách hệ thống vận hành, người dẫn nói: "theo bạn, nó nên hoạt động như thế nào?"

Ba câu này dùng đi dùng lại được và không cần đổi cách nói. Người dẫn nên thuộc lòng để không phải nghĩ giữa buổi.

#### 2.3. Ba tình huống dễ gặp trong đúng bài này

Tình huống thứ nhất là người tham gia khen bản vẽ hoặc khen ý tưởng. Người dẫn gạt nhẹ lời khen sang một bên rồi kéo về việc đang làm. Người dẫn có thể nói rằng bản này còn thô lắm, rồi hỏi ngay là bạn vừa bấm vào đó vì nghĩ nó sẽ ra cái gì.

Tình huống thứ hai là người tham gia hỏi cái này có thật không, hoặc hỏi trợ giảng AI lấy thông tin từ đâu. Người dẫn không xác nhận và cũng không phủ nhận, mà hỏi lại rằng theo bạn thì nó nên lấy từ đâu.

Tình huống thứ ba là người tham gia đề xuất thêm tính năng ngay giữa buổi. Người dẫn không bàn về tính năng đó, mà hỏi ngược về việc vừa xảy ra. Người dẫn có thể hỏi rằng nếu có cái đó thì nó giúp bạn ở đúng chỗ nào trong lúc nãy.

#### 2.4. Hai câu hỏi ở cuối buổi

Sau khi người tham gia thử xong cả ba bản, nhóm hỏi hai câu và chỉ hai câu này.

Câu thứ nhất như sau: nếu tuần sau bạn học một bài khó và chỉ được dùng một trong ba bản vừa rồi, bạn chọn bản nào?

Câu thứ hai như sau, và đây mới là câu quan trọng: cái gì trong lúc bạn vừa thử đã làm bạn chọn như vậy, và bạn phải chịu thiệt gì khi chọn bản đó?

Nhóm biết rằng câu thứ nhất là một câu hỏi về tương lai, tức là loại câu mà sách Mom Test khuyên nên tránh. Nhóm vẫn dùng câu này vì người tham gia đang chọn giữa ba thứ mà họ vừa tự tay bấm thử, chứ không phải đang đoán trước một sản phẩm chưa từng thấy — điều Mom Test cảnh báo là hỏi ý kiến về ý tưởng trừu tượng, còn ở đây câu hỏi neo vào hành vi vừa quan sát được. Câu thứ hai mới là câu chống đỡ cho câu thứ nhất: nếu người tham gia không nói ra được cái giá phải trả, lựa chọn ở câu thứ nhất bị hạ xuống thành lời khen, không được tính là evidence.

> *(Ghi chú tổ chức: bản gốc phần này bị cắt ở nguồn khi biên soạn — nếu nhóm còn phần tiếp theo của Chặng 5 hoặc phần Chặng 6/Feedback Notes/AI Support Log, gửi bổ sung để cập nhật đầy đủ.)*