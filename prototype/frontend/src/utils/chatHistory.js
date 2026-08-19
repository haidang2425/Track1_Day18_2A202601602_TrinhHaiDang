// Lưu lịch sử chat AI Tutor theo (username + buổi học) vào localStorage, để
// không mất khi chuyển trang / F5 / đóng-mở lại trình duyệt. Khoá theo username
// để 2 tài khoản demo (học viên/coach) dùng chung máy không lẫn lịch sử của nhau.
const PREFIX = 'vlearn_chat_history_v1';

const buildKey = (username, dayId) => `${PREFIX}:${username || 'guest'}:${dayId}`;

export const loadChatHistory = (username, dayId) => {
  try {
    const raw = localStorage.getItem(buildKey(username, dayId));
    return raw ? JSON.parse(raw) : { messages: [], mode: 'A' };
  } catch {
    return { messages: [], mode: 'A' };
  }
};

export const saveChatHistory = (username, dayId, messages, mode) => {
  try {
    localStorage.setItem(buildKey(username, dayId), JSON.stringify({ messages, mode }));
  } catch {
    // localStorage đầy/bị chặn — bỏ qua, không phải lỗi nghiêm trọng
  }
};

// Đánh dấu "đã xoá tới đâu" bằng question_id lớn nhất tại thời điểm xoá — vì
// dữ liệu Question/Answer thật vẫn còn trên server (Coach vẫn cần thấy), nên
// "xoá" ở đây là ẨN các tin nhắn cũ đi mỗi khi nạp lại lịch sử từ server, chứ
// không xoá bản ghi thật. Không dùng cách này thì bấm "xoá" xong load lại trang
// sẽ thấy lịch sử cũ hiện lại y nguyên — đúng bug cần tránh.
const clearedKey = (username, dayId) => `vlearn_chat_cleared_before:${username || 'guest'}:${dayId}`;

export const getClearedBeforeId = (username, dayId) => {
  return parseInt(localStorage.getItem(clearedKey(username, dayId)) || '0', 10);
};

export const setClearedBeforeId = (username, dayId, maxQuestionId) => {
  try {
    localStorage.setItem(clearedKey(username, dayId), String(maxQuestionId));
  } catch {
    // ignore
  }
};

export const clearChatHistory = (username, dayId, maxQuestionId = Number.MAX_SAFE_INTEGER) => {
  try {
    localStorage.removeItem(buildKey(username, dayId));
  } catch {
    // ignore
  }
  setClearedBeforeId(username, dayId, maxQuestionId);
};
