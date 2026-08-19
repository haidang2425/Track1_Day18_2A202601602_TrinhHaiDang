import React, { useRef, useEffect } from 'react';
import { useChat } from '../../../hooks/useChat';
import { useLanguage } from '../../../contexts/LanguageContext';
import ModeSelector from './ModeSelector';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import styles from './AITutor.module.css';

const SAMPLE_QUESTIONS = [
  'Tôi bị lỗi AuthenticationError khi gọi API trong lab, phải làm gì?',
  'Giải thích khái niệm chính trong buổi học hôm nay giúp em',
  'Em nên bắt đầu từ đâu để làm bài tập buổi này?',
];

const FOLLOW_UP_QUESTIONS = [
  'Giải thích rõ hơn phần này giúp em',
  'Cho em 1 ví dụ cụ thể',
  'Còn cách nào khác để xử lý không?',
];

const AITutor = ({ dayId }) => {
  const {
    messages,
    isLoading,
    mode,
    setMode,
    sendMessage,
    clearHistory,
    escalateAnswer,
    submitFeedback
  } = useChat(dayId);

  const { t } = useLanguage();

  const handleClearHistory = () => {
    if (messages.length === 0) return;
    if (window.confirm(t('aitutor.clearHistoryConfirm'))) {
      clearHistory();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{t('aitutor.title')}</h3>
        <div className={styles.headerActions}>
          <ModeSelector currentMode={mode} setMode={setMode} />
          {messages.length > 0 && (
            <button type="button" className={styles.clearHistoryBtn} onClick={handleClearHistory} title={t('aitutor.clearHistory')}>
              🗑
            </button>
          )}
        </div>
      </div>

      <div className={styles.messageList}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <p>{t('aitutor.emptyState')}</p>
            <div className={styles.suggestions}>
              {SAMPLE_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  className={styles.suggestionBtn}
                  onClick={() => sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map(msg => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            onEscalate={() => escalateAnswer(msg.answer_id)}
            onFeedback={(helpful) => submitFeedback(msg.answer_id, helpful)}
          />
        ))}
        
        {isLoading && (
          <div className={styles.loadingBubble}>
            <div className={styles.dotPulse}></div>
          </div>
        )}

        {!isLoading && messages.length > 0 && messages[messages.length - 1].sender === 'ai' && !messages[messages.length - 1].isError && (
          <div className={styles.followUps}>
            <span className={styles.followUpsLabel}>{t('aitutor.followUpLabel')}</span>
            {FOLLOW_UP_QUESTIONS.map((q, i) => (
              <button
                key={i}
                type="button"
                className={styles.followUpChip}
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={(text) => sendMessage(text)} disabled={isLoading} />
    </div>
  );
};

export default AITutor;
