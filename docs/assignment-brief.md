# Đề bài — Track 1, Day 18: Multiple Prototypes · Human–AI Design

> **Nguồn:** nội dung lab do ban tổ chức cung cấp trên nền tảng VLearn Codelabs.
> **Mục đích của file này:** giữ nguyên yêu cầu/rubric gốc của ban tổ chức ở một nơi riêng, tách khỏi các file bài làm của nhóm (`README.md`, `three-option-design-sheet.md`, `prototype-link.md`, `prototype-feedback-note.md`, `group-feedback-synthesis.md`, `ai-support-log.md`). Không chỉnh sửa nội dung yêu cầu trong file này — mọi bài làm, diễn giải, quyết định của nhóm nằm ở các file khác.
> **Tài liệu gốc kèm theo (giữ nguyên, không chỉnh sửa):** [references/Day18.pdf](references/Day18.pdf), [references/Day18-Design.pdf](references/Day18-Design.pdf), [references/Day18-Prototype.pdf](references/Day18-Prototype.pdf), [references/Day17-The Mom Test.pdf](references/Day17-The%20Mom%20Test.pdf), [references/Day 17.pdf](references/Day%2017.pdf).

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

## Ánh xạ deliverable ↔ file trong repo

| Chặng | Deliverable theo đề bài | File tương ứng của nhóm |
|---|---|---|
| 1 | Evidence huddle + Hypothesis Problem | [README.md](README.md) — mục "Chặng 1" |
| 2 | Ba Solution Options + Distance check + Gate 2 | [README.md](README.md) — mục "Chặng 2"; bảng chuẩn hóa ở [three-option-design-sheet.md](three-option-design-sheet.md) |
| 3 | Bốn quyết định thiết kế + Human–AI Decision Table + Gate 3 | *(chưa có file riêng — cần bổ sung, ví dụ `human-ai-decision-table.md`)* |
| 4 | Build micro-prototype + Gate 4 | [prototype-link.md](prototype-link.md) |
| 5 | Context, task, observation focus, luật facilitation | *(chưa có file riêng — có thể gộp vào đầu `prototype-feedback-note.md` hoặc tách `test-plan.md`)* |
| 6 | Prototype Feedback Note (×3) + Group Feedback Synthesis + Gate 5 | [prototype-feedback-note.md](prototype-feedback-note.md), [group-feedback-synthesis.md](group-feedback-synthesis.md) |
| — | Log việc dùng AI hỗ trợ làm bài (minh bạch, không thuộc rubric Chặng 1–6 ở trên) | [ai-support-log.md](ai-support-log.md) |
