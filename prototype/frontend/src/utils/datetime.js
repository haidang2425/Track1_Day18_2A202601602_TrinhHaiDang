// Backend trả về datetime dạng naive UTC (không có hậu tố 'Z'/offset).
// new Date(str) của JS sẽ hiểu nhầm chuỗi không có timezone là GIỜ ĐỊA PHƯƠNG,
// khiến giờ hiển thị lệch đúng bằng độ lệch múi giờ (vd: UTC+7 thì lệch 7 tiếng).
// Hàm này ép rõ chuỗi là UTC trước khi parse, để trình duyệt tự quy đổi đúng về giờ địa phương.
export const parseUtcDate = (value) => {
  if (!value) return null;
  // Chuẩn hoá dạng Python str(datetime) "YYYY-MM-DD HH:MM:SS.ffffff" (dấu cách,
  // không "T") về đúng ISO trước khi kiểm tra/gắn hậu tố 'Z'.
  const isoLike = value.includes('T') ? value : value.replace(' ', 'T');
  const hasTimezone = /[zZ]|[+-]\d{2}:?\d{2}$/.test(isoLike);
  return new Date(hasTimezone ? isoLike : `${isoLike}Z`);
};
