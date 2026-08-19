import React, { useState } from 'react';
import SourcePanel from './SourcePanel';
import ConfidenceMeter from './ConfidenceMeter';
import VerifiedBadge from './VerifiedBadge';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message, onEscalate, onFeedback }) => {
  const isUser = message.sender === 'user';
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { t } = useLanguage();

  const handleFeedback = (helpful) => {
    onFeedback(helpful);
    setFeedbackGiven(true);
  };

  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.userWrapper : styles.aiWrapper}`}>
      {!isUser && (
        <div className={styles.avatar}>
          <img src="/ai-avatar.svg" alt="AI" onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML='🤖'; }} />
        </div>
      )}
      
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        {message.fromCache && (
          <div className={styles.cacheTag}>{t('chatMessage.cacheTag')}</div>
        )}
        {message.isError ? (
          <div className={styles.errorText}>{message.text}</div>
        ) : message.mode === 'C' && message.status === 'sent_to_coach' && !previewOpen ? null : (
          <div className={styles.text}>{message.text || message.answer_text}</div>
        )}

        {/* Mode B: Confidence & Escalation */}
        {message.mode === 'B' && message.confidence_score !== undefined && (
          <ConfidenceMeter 
            score={message.confidence_score} 
            requiresEscalation={message.requires_escalation} 
          />
        )}
        {message.mode === 'B' && message.requires_escalation && message.status !== 'sent_to_coach' && (
          <button
            className={styles.escalateBtn}
            onClick={onEscalate}
          >
            {t('chatMessage.escalateBtn')}
          </button>
        )}
        {message.mode === 'B' && message.status === 'sent_to_coach' && (
          <div className={styles.statusLabel}>{t('chatMessage.sentToCoach')}</div>
        )}

        {/* Mode C: Verified Badge */}
        {message.mode === 'C' && message.status === 'from_library' && (
          <VerifiedBadge
            approvedByName={message.approved_by_name}
            approvedAt={message.approved_at}
            reuseCount={message.reuse_count}
          />
        )}
        {message.mode === 'C' && message.status === 'sent_to_coach' && (
          <div className={styles.statusLabel}>
            <div>{t('chatMessage.pendingApproval')}</div>
            {!previewOpen ? (
              <button className={styles.escalateBtn} onClick={() => setPreviewOpen(true)}>
                {t('chatMessage.previewBtn')}
              </button>
            ) : (
              <div className={styles.warningBanner}>
                {t('chatMessage.previewWarning')}
              </div>
            )}
          </div>
        )}

        {/* Common: Source citations */}
        {!isUser && !message.isError && message.claims && (
          <SourcePanel claims={message.claims} />
        )}

        {/* Feedback: chỉ áp dụng cho Mode C đã có câu trả lời từ library (đúng spec 10.6) */}
        {message.mode === 'C' && message.status === 'from_library' && !feedbackGiven && (
          <div className={styles.feedbackContainer}>
            <span className={styles.feedbackLabel}>{t('chatMessage.feedbackQuestion')}</span>
            <div className={styles.feedbackActions}>
              <button onClick={() => handleFeedback(true)}>{t('chatMessage.feedbackYes')}</button>
              <button onClick={() => handleFeedback(false)}>{t('chatMessage.feedbackNo')}</button>
            </div>
          </div>
        )}
        {!isUser && feedbackGiven && (
          <div className={styles.feedbackThanks}>{t('chatMessage.feedbackThanks')}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
