# Đề bài — Track 1, Day 18: Multiple Prototypes · Human–AI Design

> **Nguồn:** nội dung lab do ban tổ chức cung cấp trên nền tảng VLearn Codelabs.
> **Mục đích của file này:** giữ nguyên yêu cầu/rubric gốc của ban tổ chức ở một nơi riêng, tách khỏi các file bài làm của nhóm (`README.md`, `three-option-design-sheet.md`, `prototype-link.md`, `prototype-feedback-note.md`, `group-feedback-synthesis.md`, `ai-support-log.md`). Không chỉnh sửa nội dung yêu cầu trong file này — mọi bài làm, diễn giải, quyết định của nhóm nằm ở các file khác.
> **Tài liệu gốc kèm theo (giữ nguyên, không chỉnh sửa):** [references/Day18.pdf](references/Day18.pdf), [references/Day18-Design.pdf](references/Day18-Design.pdf), [references/Day18-Prototype.pdf](references/Day18-Prototype.pdf), [references/Day17-The Mom Test.pdf](references/Day17-The%20Mom%20Test.pdf), [references/Day 17.pdf](references/Day%2017.pdf).

---

## Đầu vào từ Day 17

Nhóm tiếp tục đúng case đã làm ở Day 17: AI Tutor, AI Notes hoặc AI Support Radar. Không đổi case chỉ để chọn solution dễ build hơn.

Đặt bốn artifact sau cạnh nhau trước khi bắt đầu:

- Hypothesis Problem của nhóm.
- Ba Practice Notes, thường là một note từ mỗi thành viên.
- Solution Parking Lot có tối thiểu năm hướng.
- Conversation Guide cuối để tham khảo context; Day 18 không tiếp tục problem interview.

Practice interview Day 17 chưa đủ để chứng minh pain đã được validated.

Cuối bài, nhóm được phép kết luận:

> "Với Hypothesis Problem này, chúng tôi đã thử ba cách giải. Tester đã làm…, vì vậy iteration tiếp theo chúng tôi sẽ…"

Nhóm không được kết luận:

> "User đã xác nhận solution này đúng."

---

## Chặng 1 — Tổng hợp evidence · 15 phút

### 1. Evidence huddle

Đặt ba Practice Notes cạnh nhau. Nếu dùng Evidence Pack, đọc các snippets như ba nguồn riêng; không biến chúng thành findings thật.

Mỗi thành viên chọn một chi tiết và đọc nguyên văn hoặc mô tả đúng hành vi đã ghi:

| Practice Note | User đã thực sự làm/nói gì? | Điều nhóm đang diễn giải |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

Thảo luận nhanh:

- Có situation, behavior hoặc workaround nào xuất hiện nhiều hơn một lần?
- Evidence nào mâu thuẫn hoặc làm nhóm bất ngờ?
- Điều gì vẫn chỉ là suy đoán của nhóm?
- Hypothesis Problem nào đủ cụ thể để nhóm dùng làm điểm xuất phát hôm nay?

### 2. Chốt Hypothesis Problem

Giữ đúng cấu trúc:

> Khi [situation], [user] gặp khó khăn trong việc [job] vì [barrier], dẫn đến [consequence].

**Hypothesis Problem nhóm tiếp tục:**

...

**Evidence ban đầu hỗ trợ giả thuyết:**

...

**Điều vẫn chưa được chứng minh:**

...

> **Tự kiểm · GATE 1 — Evidence continuity**
> Nhóm qua gate khi Hypothesis Problem có user, situation, job, barrier và consequence; đồng thời chỉ ra được ít nhất một observation Day 17 và một điều vẫn chưa biết.

---

## Chặng 2 — Chọn ba Solution Options · 20 phút

### 1. Mở lại Solution Parking Lot

Đọc lại các hướng đã park ở Day 17. Không cần nghĩ thêm một quota ý tưởng mới. Chỉ bổ sung một hướng khi pool hiện tại:

- toàn là cùng một cơ chế;
- chỉ thay UI hoặc wording;
- không có hướng user-led/no-inference hoặc human escalation khi context cần;
- không tạo được ba options cùng giải một task.

Day 16 có thể được dùng như một prompt, không phải deliverable:

> "Có nguyên lý nào từ sản phẩm đã teardown giúp nhóm nghĩ ra một cơ chế khác? Nhóm đang adapt nguyên lý nào, thay vì copy feature nào?"

### 2. Chọn ba cách giải

Ba options cùng xuất phát từ một Hypothesis Problem nhưng đại diện cho ba solution hypotheses khác nhau.

**Những thứ phải giữ nguyên**

| Thành phần | Quyết định chung cho A/B/C |
|---|---|
| Target user | |
| Situation | |
| Task | |
| Desired outcome | |
| Content/data fixture | |

**Những thứ được phép khác**

| Thành phần | Option A | Option B | Option C |
|---|---|---|---|
| Solution mechanism | | | |
| User làm gì? | | | |
| AI làm gì? | | | |
| Trigger | | | |
| Trade-off chính | | | |

**Distance check** — hoàn thành ba câu mà không nhắc màu, layout hoặc wording:

- A khác B vì ...
- B khác C vì ...
- A khác C vì ...

Một spectrum đơn giản có thể dùng khi phù hợp:

```
USER CREATES / INITIATES
   → USER + AI CO-CREATE
   → AI CREATES / INITIATES, USER REVIEWS
```

Không bắt buộc mọi case phải dùng đúng spectrum này. Không cố tình làm một option tệ để hai option còn lại thắng.

> **Tự kiểm · GATE 2 — Meaningful options**
> Ba options cùng user, situation, task và desired outcome; khác nhau có ý nghĩa ở mechanism hoặc cách phân chia công việc và quyền quyết định giữa user với AI.

---

## Chặng 3 — Human–AI Design pass · 30 phút

Chỉ review critical interaction cần test. Không thiết kế toàn bộ product và không thêm một màn hình cho mỗi tiêu chí.

### 1. Bốn quyết định thiết kế

**Expectation**
- Trước khi AI hoạt động, user có hiểu AI sắp làm gì không?
- Capability và limit nào cần nói rõ?

**Role and Agency**
- User làm phần nào? AI làm phần nào?
- AI Act, Ask hay Don't Act tại critical moment?
- Nếu AI sai, user mất gì và sai có dễ phát hiện không?

**Evidence and Uncertainty**
- User cần biết AI dựa vào tín hiệu hoặc dữ liệu nào?
- Nếu AI không chắc, hệ thống thể hiện ra sao?

**Control and Recovery**
- User preview, edit, reject, stop, undo hoặc dismiss ở đâu?
- Sau khi AI sai, user tiếp tục task ban đầu bằng đường nào?

### 2. Human–AI Decision Table

| Human–AI decision | Option A | Option B | Option C |
|---|---|---|---|
| User làm gì? AI làm gì? | | | |
| AI Act / Ask / Don't Act? Vì sao? | | | |
| User hiểu capability/limit bằng gì? | | | |
| Evidence/uncertainty được thể hiện thế nào? | | | |
| User kiểm soát và recovery thế nào? | | | |

**Feedback and data check — khi liên quan.** Coach có thể yêu cầu nhóm bổ sung nếu option dùng dữ liệu nhạy cảm hoặc học từ feedback:

- Feedback có ảnh hưởng phiên hiện tại, lần sau hay không được ghi nhớ?
- Dữ liệu nào được dùng và user có cách rút quyền không?

> **Tự kiểm · GATE 3 — Human control**
> Mỗi option nói rõ user và AI làm gì, agency phù hợp với hậu quả khi sai, và user có một đường kiểm soát hoặc phục hồi.

---

## Chặng 4 — Build ba micro-prototype · 80 phút

### 1. Scope chuẩn

Mỗi option chỉ cần 2–3 màn hình hoặc trạng thái:

```
COMMON CONTEXT
      ↓
CRITICAL INTERACTION
      ↓
RESULT / USER DECISION
```

Cả ba options nên dùng chung khoảng 70%:

- context screen;
- content/data fixture;
- component và visual style;
- task và desired outcome.

Chỉ critical interaction cần khác rõ.

### 2. Definition of testable

Prototype sẵn sàng khi:

- Tester có thể tự mở và thao tác A/B/C.
- Cả ba bắt đầu từ cùng một context và task.
- Option không cần facilitator narrate để hiểu.
- Nội dung đủ thật để tester ra quyết định.
- Mỗi option thể hiện được điểm user lấy lại control.
- Có đường reset về common context.

**Được dùng:**

- Figma, Framer hoặc công cụ tương đương.
- HTML/CSS/JavaScript.
- Prototype giấy có flow rõ.
- Canned AI output.
- Wizard of Oz, miễn người mô phỏng AI không giải thích giao diện hộ tester.

**Không cần:**

- Model hoặc API thật.
- Full onboarding hoặc dashboard.
- Responsive cho nhiều thiết bị.
- Visual polish hoàn chỉnh.
- Một failure catalog đầy đủ.

### 3. Build order

| Phút | Việc cần làm |
|---|---|
| 0–10 | Vẽ common context, task và content fixture dùng cho cả ba. |
| 10–55 | Mỗi thành viên build một option bằng shared components. |
| 55–65 | Thêm control/recovery và evidence/uncertainty cần thiết. |
| 65–75 | Mỗi thành viên tự test option do người khác build. |
| 75–80 | Chuẩn hóa A/B/C, kiểm link và reset path. |

### 4. Prototype annotation

Đặt annotation ngoài frame, không hiện cho tester:

```
OPTION ___
We expect the tester to: ______________________________________
Watch for: ____________________________________________________
Do not explain: _______________________________________________
```

> **Tự kiểm · GATE 4 — Test-ready**
> Một người không build có thể mở, thực hiện cùng task qua A/B/C và quay về context ban đầu mà không cần người khác giải thích.

---

## Chặng 5 — Chuẩn bị test · 15 phút

### 1. Chốt context và task

**Relevant context** — một câu hỏi, tối đa 2 phút trong lúc test:

> "Gần đây bạn có từng ... không?"

Nếu tester chưa từng có context liên quan, vẫn có thể dùng họ để tìm interaction breakdown nhưng không đưa ra value claim mạnh.

**Outcome task** — nói kết quả cần đạt, không nói nút cần bấm:

> "Trong tình huống này, hãy dùng từng phương án để ..."

**Observation focus** — chọn tối đa năm thứ:

- first action;
- hesitation;
- evidence read/ignored;
- misunderstanding;
- help needed;
- correction/recovery;
- option được chọn và trade-off.

### 2. Luật facilitation

- Tester tự điều khiển prototype.
- Dùng cùng một task cho A/B/C.
- Không narrate hoặc giải thích icon.
- Không lấp im lặng.
- Không hỏi "Bạn có thích không?".
- Khi tester hỏi cách hoạt động, hỏi lại: "Theo bạn, nó nên hoạt động như thế nào?"

**Ba câu cứu hộ:**

- "Bạn cứ nói to suy nghĩ của mình nhé."
- "Bạn sẽ làm gì tiếp theo?"
- "Theo bạn, nó nên hoạt động như thế nào?"

---

## Chặng 6 — Test với ba người · 20 phút cuối hoặc ngoài giờ

### 1. Trách nhiệm cá nhân

- Thành viên 1 test cả A/B/C với Tester 1.
- Thành viên 2 test cả A/B/C với Tester 2.
- Thành viên 3 test cả A/B/C với Tester 3.
- Ba tester phải là ba người khác nhóm; ưu tiên người có relevant context với case.
- Có thể chạy song song nếu coach đã chuẩn bị tester. Nếu không đủ người hoặc không đủ 20 phút, hoàn tất ngoài giờ trước khi nộp.
- Người phụ trách thiết kế Option A vẫn phải test cả A/B/C; tương tự với B và C.

### 2. Timeline 20 phút

| Thời gian | Hoạt động |
|---|---|
| 0–2 phút | Make comfortable + hỏi relevant context ngắn. |
| 2–14 phút | Tester dùng A/B/C, khoảng 4 phút mỗi option. |
| 14–18 phút | So sánh option, lý do và trade-off. |
| 18–20 phút | Hoàn thành Feedback Note cá nhân. |

**Opening:**

> "Chúng mình đang thử ba cách thiết kế, không kiểm tra bạn. Không có câu trả lời đúng hoặc sai. Bạn hãy tự thao tác và nói to điều mình đang nghĩ; mình sẽ cố gắng không hướng dẫn."

**Compare:**

> "Trong tình huống này, bạn chọn A, B hay C? Vì sao?"
>
> "Bạn muốn tự làm phần nào và giao cho AI phần nào?"
>
> "Điều gì ở phương án đã chọn khiến bạn chưa thoải mái?"

### 3. Prototype Feedback Note — mỗi thành viên hoàn thành một bản

**Tester/context:** ...

| Observation | Note |
|---|---|
| First action | |
| Chỗ dừng, do dự hoặc hiểu sai | |
| Evidence được đọc hay bỏ qua | |
| Cách tester sửa hoặc lấy lại control | |
| Option được chọn | A / B / C |
| Lý do và trade-off | |
| Evidence chống lại kỳ vọng của nhóm | |

Tách bốn lớp:

```
OBSERVED
Tester đã làm hoặc nói gì?

INTERPRETED
Nhóm nghĩ điều đó có thể có nghĩa gì?

DECIDED — NEXT CHANGE
Nhóm sẽ sửa, kết hợp hoặc test gì tiếp?

STILL UNPROVEN
Điều gì chưa thể kết luận từ một người?
```

Next Change có thể là:

- Giữ một option và sửa interaction.
- Kết hợp hai options nhưng giữ một cơ chế chính rõ ràng.
- Bỏ một option vì tester không hiểu hoặc nó không tạo khác biệt.
- Sửa cả ba rồi test người tiếp theo.

### 4. Group Feedback Synthesis — sau khi có đủ ba bản

| Nội dung | Feedback 1 | Feedback 2 | Feedback 3 | Pattern hoặc khác biệt |
|---|---|---|---|---|
| First action | | | | |
| Breakdown chính | | | | |
| Cách lấy lại control | | | | |
| Option được chọn | | | | |
| Trade-off | | | | |

**Một Next Change nhóm chốt:** ...

**Evidence nào dẫn tới quyết định này:** ...

**Still Unproven sau ba feedback:** ...

> **Tự kiểm · GATE 5 — Learning, not praise**
> Nhóm có ba Feedback Notes độc lập, nêu được pattern hoặc khác biệt giữa ba người, chốt một Next Change và một điều vẫn chưa được chứng minh. "Ba tester thích B" không đủ nếu không có hành vi và trade-off đi kèm.

---

## Sau lớp — hoàn tất test nếu cần

Nếu 20 phút cuối chưa đủ để cả ba thành viên hoàn thành phiên riêng, mỗi người tự hẹn một tester và bổ sung Feedback Note trước deadline. Không bắt transcript hoặc report dài.

Không dùng ba feedback để áp dụng threshold thống kê hoặc tuyên bố product value đã validated.

---

## Quy tắc dùng AI

**Được dùng AI để:**

- Gợi ý một cơ chế còn thiếu trong Solution Parking Lot.
- Tạo content fixture và canned AI output.
- Viết code hoặc component cho prototype.
- Rà soát ba options có thật sự khác về mechanism hoặc role split không.
- Tìm câu hỏi dẫn dắt trong test prompt.

**Không được dùng AI để:**

- Tạo quote, observation hoặc user feedback không tồn tại.
- Viết lại evidence khiến không còn phân biệt lời user và diễn giải.
- Chọn option thay tester hoặc thay nhóm.
- Làm đẹp feedback tiêu cực.

**AI Support Log — mỗi thành viên viết ngắn:**

- AI đã giúp tôi ở đâu?
- AI sai, hời hợt hoặc làm các options giống nhau ở đâu?
- Tôi đã tự sửa hoặc quyết định lại điều gì?

---

## Nộp bài

Mỗi học viên nộp một repository cá nhân:

```
Track1_Day18_MHV_HoVaTen
```

Ba thành viên có thể trỏ tới cùng Design Sheet, prototype và Group Feedback Synthesis. Mỗi repo phải có Feedback Note của chính phiên người đó facilitate; README và AI Support Log phải phản ánh đúng đóng góp cá nhân.

**Cấu trúc tối thiểu:**

```
Track1_Day18_MHV_HoVaTen/
├── README.md
├── three-option-design-sheet.md       # hoặc link board chung của nhóm
├── prototype-link.md                  # link A/B/C chung của nhóm
├── prototype-feedback-note.md         # phiên do chính người nộp facilitate
├── group-feedback-synthesis.md        # hoặc link artifact tổng hợp chung
└── ai-support-log.md
```

Trong `README.md`, ghi rõ:

- Thông tin cá nhân và nhóm: MHV, họ tên, tên nhóm, ba thành viên và case.
- Hypothesis Problem: bản nhóm dùng trong Day 18.
- Three Solution Options: mô tả ngắn A/B/C và link prototype.
- Đóng góp của tôi trong nhóm: ghi cụ thể bạn đã làm gì, ví dụ option nào, shared context/content, Human–AI decisions, facilitation, observation hoặc tổng hợp feedback.
- Prototype Feedback: observation từ phiên bạn facilitate, ba-feedback synthesis, Next Change và Still Unproven.
- AI Support Log: AI đã giúp gì, sai/hời hợt ở đâu và bạn tự sửa gì.

### Năm gate đánh giá

| Gate | Đạt khi | Dấu hiệu chưa đạt |
|---|---|---|
| 1. Evidence Continuity | Hypothesis Problem nối được với ít nhất một observation Day 17 và ghi rõ điều chưa biết | Chỉ kể lại ý tưởng; coi Practice Notes là validation |
| 2. Meaningful Options | A/B/C cùng problem và task nhưng khác mechanism hoặc cách chia việc user–AI | Ba option chỉ khác layout, màu hoặc wording |
| 3. Human Control | Mỗi option nói rõ expectation, agency, evidence/uncertainty và đường recovery | AI tự hành động nhưng user không hiểu, không sửa hoặc không dừng được |
| 4. Test-ready | Tester ngoài nhóm tự dùng được cả A/B/C với cùng task | Facilitator phải giải thích; một option hoàn thiện hơn hẳn hai option còn lại |
| 5. Learning | Có ba Feedback Notes, pattern/khác biệt, Next Change và Still Unproven | Chỉ đếm "ba tester thích B" hoặc tuyên bố solution đã validated |

### Kiểm tra trước khi nộp

- [ ] Repo đúng tên `Track1_Day18_MHV_HoVaTen`.
- [ ] `README.md` đủ sáu phần và ghi rõ "Đóng góp của tôi trong nhóm".
- [ ] Link Design Sheet, A/B/C, Feedback Note cá nhân và Group Feedback Synthesis mở được với giảng viên/TA.
- [ ] Ba prototype cùng user, situation, task, content và desired outcome.
- [ ] Mỗi thành viên đã test cả A/B/C với một người khác; nhóm có đủ ba Feedback Notes.
- [ ] Group Feedback Synthesis tách pattern, Next Change và Still Unproven.
- [ ] AI Support Log là phần phản ánh của chính người nộp.

> **Tự kiểm · HOÀN TẤT — Three prototypes, one next change**
> Bài hoàn tất khi nhóm có một Hypothesis Problem có dấu vết từ Day 17, ba options đủ khác nhưng so sánh được, ba micro-prototype test-ready, ba Feedback Notes từ ba tester ngoài nhóm và một Group Next Change không nói quá evidence; đồng thời mỗi học viên có repo cá nhân đúng tên và ghi rõ option mình chịu trách nhiệm cùng các đóng góp khác.

---

## Ánh xạ deliverable ↔ file trong repo

| Chặng | Deliverable theo đề bài | File tương ứng của nhóm |
|---|---|---|
| 1 | Evidence huddle + Hypothesis Problem | [README.md](README.md) — mục "Chặng 1" |
| 2 | Ba Solution Options + Distance check + Gate 2 | [README.md](README.md) — mục "Chặng 2"; bảng chuẩn hóa ở [three-option-design-sheet.md](three-option-design-sheet.md) |
| 3 | Bốn quyết định thiết kế + Human–AI Decision Table + Gate 3 | [README.md](README.md) — mục "Chặng 3"; bảng chuẩn hóa ở [three-option-design-sheet.md](three-option-design-sheet.md) mục 4 |
| 4 | Build micro-prototype + Gate 4 | [README.md](README.md) — mục "Chặng 4"; [prototype-link.md](prototype-link.md) |
| 5 | Context, task, observation focus, luật facilitation | [README.md](README.md) — mục "Chặng 5" |
| 6 | Prototype Feedback Note (×3) + Group Feedback Synthesis + Gate 5 | [prototype-feedback-note.md](prototype-feedback-note.md), [group-feedback-synthesis.md](group-feedback-synthesis.md) — evidence thô (transcript + ghi âm) ở [interviews/](interviews/) |
| — | Log việc dùng AI hỗ trợ làm bài (minh bạch, không thuộc rubric Chặng 1–6 ở trên) | [ai-support-log.md](ai-support-log.md) |
