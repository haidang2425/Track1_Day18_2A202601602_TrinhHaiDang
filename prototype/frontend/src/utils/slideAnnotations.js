// Lưu nét vẽ (bút/highlight/khoanh) trên từng slide theo (dayId, page) vào
// localStorage — annotation cá nhân, không cần đồng bộ nhiều máy.
const PREFIX = 'vlearn_slide_annotations_v1';

const buildKey = (dayId, page) => `${PREFIX}:${dayId}:${page}`;

export const loadStrokes = (dayId, page) => {
  try {
    const raw = localStorage.getItem(buildKey(dayId, page));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStrokes = (dayId, page, strokes) => {
  try {
    if (strokes.length === 0) {
      localStorage.removeItem(buildKey(dayId, page));
    } else {
      localStorage.setItem(buildKey(dayId, page), JSON.stringify(strokes));
    }
  } catch {
    // localStorage đầy/bị chặn — bỏ qua
  }
};
