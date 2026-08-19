// Cache câu trả lời AI theo (mode + day + câu hỏi) để câu hỏi lặp lại (đặc biệt
// là các câu hỏi mẫu) không phải gọi lại API — tránh tốn quota rate-limit free-tier.
const STORAGE_KEY = 'vlearn_answer_cache_v1';
const MAX_ENTRIES = 200;

const normalize = (text) => text.trim().toLowerCase().replace(/\s+/g, ' ');

const buildKey = (mode, dayId, text) => `${mode}::${dayId}::${normalize(text)}`;

const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const writeStore = (store) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage đầy hoặc bị chặn — bỏ qua, cache chỉ là tối ưu, không bắt buộc
  }
};

export const getCachedAnswer = (mode, dayId, text) => {
  const store = readStore();
  const entry = store[buildKey(mode, dayId, text)];
  return entry ? entry.response : null;
};

export const setCachedAnswer = (mode, dayId, text, response) => {
  const store = readStore();
  const key = buildKey(mode, dayId, text);
  store[key] = { response, cachedAt: Date.now() };

  const keys = Object.keys(store);
  if (keys.length > MAX_ENTRIES) {
    keys
      .sort((a, b) => store[a].cachedAt - store[b].cachedAt)
      .slice(0, keys.length - MAX_ENTRIES)
      .forEach((k) => delete store[k]);
  }
  writeStore(store);
};
