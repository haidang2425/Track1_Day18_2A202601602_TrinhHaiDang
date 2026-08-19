import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import Topbar from '../shared/Topbar';
import { usePageTitle } from '../../hooks/usePageTitle';
import { parseUtcDate } from '../../utils/datetime';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Coach.module.css';

const Coach = () => {
  const { t } = useLanguage();
  usePageTitle(t('coach.title'));
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const fetchQueue = async () => {
    try {
      const data = await apiClient('/coach/queue');
      setQueue(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 10000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (answerId) => {
    try {
      await apiClient('/coach/approve', {
        method: 'POST',
        body: JSON.stringify({ answer_id: answerId })
      });
      setApprovedCount(c => c + 1);
      fetchQueue();
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleReject = async (answerId) => {
    const text = replyText[answerId];
    if (!text) {
      alert('Vui lòng nhập lý do từ chối/phản hồi cho học viên.');
      return;
    }
    try {
      await apiClient('/coach/reject', {
        method: 'POST',
        body: JSON.stringify({ answer_id: answerId, reply_text: text })
      });
      setRejectedCount(c => c + 1);
      fetchQueue();
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  return (
    <div className="app-container">
      <Topbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{t('coach.title')}</h2>
          <p>{t('coach.subtitle')}</p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{queue.length}</span>
            <span className={styles.statLabel}>{t('coach.queueLabel')}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{approvedCount}</span>
            <span className={styles.statLabel}>{t('coach.approvedToday')}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{rejectedCount}</span>
            <span className={styles.statLabel}>{t('coach.rejectedLabel')}</span>
          </div>
        </div>

        {loading ? (
          <div>{t('coach.loading')}</div>
        ) : queue.length === 0 ? (
          <div className={styles.emptyState}>{t('coach.emptyState')}</div>
        ) : (
          <div className={styles.grid}>
            {queue.map(item => (
              <div key={item.escalation_id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.badge}>
                    {item.mode === 'B' ? 'Escalated (Low Confidence)' : 'Coach Approval (Mode C)'}
                  </span>
                  <span className={styles.time}>{parseUtcDate(item.sent_at).toLocaleString('vi-VN')}</span>
                </div>
                
                <div className={styles.studentInfo}>
                  <strong>{t('coach.student')}</strong> {item.is_anonymous ? t('coach.anonymous') : `${item.display_name} (${item.user_id})`}
                </div>

                <div className={styles.qaSection}>
                  <div className={styles.q}>
                    <strong>Q:</strong> {item.question_text}
                  </div>
                  <div className={styles.a}>
                    <strong>AI Draft ({item.confidence_score ? `${Math.round(item.confidence_score*100)}% ${t('coach.confident')}` : 'Mode C'}):</strong>
                    <p>{item.answer_text}</p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button
                    className="btn-primary"
                    onClick={() => handleApprove(item.answer_id)}
                  >
                    {t('coach.approveBtn')}
                  </button>

                  <div className={styles.rejectGroup}>
                    <input
                      type="text"
                      placeholder={t('coach.rejectPlaceholder')}
                      value={replyText[item.answer_id] || ''}
                      onChange={(e) => setReplyText({...replyText, [item.answer_id]: e.target.value})}
                    />
                    <button
                      className="btn-accent"
                      onClick={() => handleReject(item.answer_id)}
                    >
                      {t('coach.rejectBtn')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coach;
