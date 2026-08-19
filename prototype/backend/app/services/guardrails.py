from collections import defaultdict
from datetime import datetime, timedelta

# Per-user rate limit: tối đa 20 requests / 10 phút
_user_requests: dict[int, list[datetime]] = defaultdict(list)
USER_RATE_LIMIT = 20
RATE_WINDOW_SECONDS = 600

def check_rate_limit(user_id: int) -> tuple[bool, str]:
    now = datetime.utcnow()
    window_start = now - timedelta(seconds=RATE_WINDOW_SECONDS)
    # Xóa request cũ ngoài window
    _user_requests[user_id] = [t for t in _user_requests[user_id] if t > window_start]
    if len(_user_requests[user_id]) >= USER_RATE_LIMIT:
        return False, f"Bạn đã gửi quá {USER_RATE_LIMIT} câu hỏi trong 10 phút. Vui lòng thử lại sau."
    _user_requests[user_id].append(now)
    return True, ""
