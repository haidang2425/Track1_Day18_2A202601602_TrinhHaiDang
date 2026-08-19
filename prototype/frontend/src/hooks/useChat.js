import { useState, useEffect, useContext, useRef } from 'react';
import { apiClient } from '../api/client';
import { getCachedAnswer, setCachedAnswer } from '../utils/answerCache';
import { loadChatHistory, saveChatHistory, clearChatHistory, getClearedBeforeId } from '../utils/chatHistory';
import { AuthContext } from '../contexts/AuthContext';

export const useChat = (dayId) => {
  const { user } = useContext(AuthContext);
  const username = user?.username;

  // Tải lịch sử chat đã lưu cho đúng (user + buổi học) này, nếu có.
  const initial = loadChatHistory(username, dayId);
  const [messages, setMessages] = useState(initial.messages);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(initial.mode);

  // Tránh ghi đè lịch sử lưu sẵn bằng mảng rỗng ngay lần render đầu tiên khi
  // effect dưới chạy trước khi state kịp cập nhật từ initial.
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      return;
    }
    saveChatHistory(username, dayId, messages, mode);
  }, [messages, mode, username, dayId]);

  // Nạp lịch sử THẬT từ server khi mở trang (nguồn chính, hoạt động trên mọi
  // máy/trình duyệt) — localStorage chỉ còn là cache tạm/fallback nếu API lỗi.
  // Riêng các câu trả lời "from_library" (Mode C khớp thư viện) không có Question
  // gốc trong DB nên không xuất hiện ở đây — vẫn giữ nguyên trong bản cache local.
  useEffect(() => {
    let cancelled = false;
    apiClient(`/api/chat-history?day=${dayId}`)
      .then(data => {
        if (cancelled || !data?.messages?.length) return;
        const clearedBefore = getClearedBeforeId(username, dayId);
        const visible = data.messages.filter(m => !m.question_id || m.question_id > clearedBefore);
        if (visible.length === 0) return;
        setMessages(prevLocal => {
          const localOnly = prevLocal.filter(m => m.status === 'from_library');
          return [...visible, ...localOnly];
        });
      })
      .catch(() => {
        // API lỗi/offline — giữ nguyên bản đã nạp từ localStorage, không sao cả.
      });
    return () => { cancelled = true; };
  }, [dayId]);

  const sendMessage = async (text, taskContext = '') => {
    // Add user message immediately
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);

    // Câu hỏi trùng lặp (đặc biệt câu hỏi mẫu bấm đi bấm lại) → lấy thẳng câu trả
    // lời đã cache, không gọi API lần nữa (tránh tốn quota rate-limit free-tier).
    const cached = getCachedAnswer(mode, dayId, text);
    if (cached) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        mode: mode,
        fromCache: true,
        ...cached
      }]);
      return;
    }

    setIsLoading(true);

    try {
      let endpoint = '';
      if (mode === 'A') endpoint = '/api/mode-a/answer';
      else if (mode === 'B') endpoint = '/api/mode-b/answer';
      else if (mode === 'C') endpoint = '/api/mode-c/answer';

      const res = await apiClient(endpoint, {
        method: 'POST',
        body: JSON.stringify({
          error_text: text,
          task_context: taskContext,
          day: parseInt(dayId)
        })
      });

      setCachedAnswer(mode, dayId, text, res);

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        mode: mode,
        ...res
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Có lỗi xảy ra: ' + err.message,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const escalateAnswer = async (answerId) => {
    try {
      await apiClient('/api/mode-b/escalate', {
        method: 'POST',
        body: JSON.stringify({ answer_id: answerId })
      });
      // update local message state to reflect it's been escalated
      setMessages(prev => prev.map(m => 
        m.answer_id === answerId ? { ...m, status: 'sent_to_coach' } : m
      ));
      return true;
    } catch (err) {
      console.error(err);
      alert('Lỗi gửi coach: ' + err.message);
      return false;
    }
  };

  const submitFeedback = async (answerId, helpful) => {
    try {
      await apiClient('/api/mode-c/feedback', {
        method: 'POST',
        body: JSON.stringify({ answer_id: answerId, helpful })
      });
      alert('Cảm ơn bạn đã phản hồi!');
    } catch (err) {
      console.error(err);
    }
  };

  // Xoá lịch sử chat hiển thị (localStorage) cho đúng buổi học này. Không xoá
  // dữ liệu Question/Answer thật trên server (đó là bản ghi thật của hệ thống,
  // Coach vẫn cần thấy trong hàng chờ nếu đã escalate) — chỉ xoá màn hình + cache.
  const clearHistory = () => {
    const maxQuestionId = messages.reduce((max, m) => Math.max(max, m.question_id || 0), 0);
    setMessages([]);
    clearChatHistory(username, dayId, maxQuestionId);
  };

  return {
    messages,
    isLoading,
    mode,
    setMode,
    sendMessage,
    clearHistory,
    escalateAnswer,
    submitFeedback
  };
};
