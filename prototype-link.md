# Prototype Link — Chặng 4

## Cách mở

Prototype nằm ở thư mục [prototype/](prototype/), là file HTML/CSS/JS tĩnh, không cần server hay API thật.

- Mở trực tiếp: double-click [prototype/index.html](prototype/index.html) (hoặc kéo file vào tab browser).
- Hoặc chạy local server nếu muốn: `npx serve prototype` hoặc `python -m http.server` trong thư mục `prototype/`, rồi mở `http://localhost:<port>`.

## Cấu trúc

```
prototype/
  index.html          # Common context: lỗi cài đặt ở bước 3 + link chọn Option A/B/C
  shared/styles.css   # style dùng chung (~70%) cho cả ba option
  option-a/index.html # Neo nguồn — trigger: learner tự bấm mở câu trả lời
  option-b/index.html # Tự khai mức chắc — trigger: hệ thống tự phát ngay khi trả lời
  option-c/index.html # Đã được duyệt trước — trigger: hệ thống tự đưa lên khi thấy dừng lâu
```

Mỗi option có đường "← Danh sách option" để quay về common context, đúng yêu cầu Definition of testable (Chặng 4). Annotation "We expect / Watch for / Do not explain" nằm trong HTML comment ở đầu mỗi file `option-*/index.html`, không hiện cho tester.

## Link deploy (nếu cần test với người ngoài máy)

...
