def get_fallback_chunks(day: int):
    if day == 17:
        return [
            {
                "day": 17,
                "page_number": 1,
                "content": "Đây là nội dung giả định cho Day 17 (Trang 1).",
                "source_label": "Tr. 1"
            },
            {
                "day": 17,
                "page_number": 2,
                "content": "Lỗi AuthenticationError xảy ra khi API key bị sai hoặc bị thiếu. Hãy kiểm tra lại file .env.",
                "source_label": "Tr. 2"
            }
        ]
    elif day == 18:
        return [
            {
                "day": 18,
                "page_number": 1,
                "content": "Đây là nội dung giả định cho Day 18 (Trang 1).",
                "source_label": "Tr. 1"
            }
        ]
    return []
