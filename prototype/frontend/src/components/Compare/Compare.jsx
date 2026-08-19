import React, { useState } from 'react';
import { useCompare } from '../../hooks/useCompare';
import Topbar from '../shared/Topbar';
import CompareResults from './CompareResults';
import StatsPanel from './StatsPanel';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Compare.module.css';

const SAMPLE_QUESTIONS = [
  'Tôi bị lỗi AuthenticationError khi gọi API trong lab, phải làm gì?',
  'Cách cài đặt Docker Compose trên Ubuntu',
];

const Compare = () => {
  const { t } = useLanguage();
  usePageTitle(t('compare.title'));
  const { stats, loadingStats, compareResult, isComparing, runCompare, refreshStats } = useCompare();
  const [text, setText] = useState('');
  const [dayId, setDayId] = useState('17');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      runCompare(text, dayId);
    }
  };

  return (
    <div className="app-container">
      <Topbar />
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2>{t('compare.title')}</h2>
          <p>{t('compare.subtitle')}</p>
        </div>

        <div className={styles.decisionTableWrap}>
          <h3>{t('compare.decisionTableTitle')}</h3>
          <table className={styles.decisionTable}>
            <thead>
              <tr>
                <th>{t('compare.colDecision')}</th>
                <th>{t('compare.colOptionA')}</th>
                <th>{t('compare.colOptionB')}</th>
                <th>{t('compare.colOptionC')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('compare.rowExpectation')}</strong></td>
                <td>{t('compare.aExpectation')}</td>
                <td>{t('compare.bExpectation')}</td>
                <td>{t('compare.cExpectation')}</td>
              </tr>
              <tr>
                <td><strong>{t('compare.rowRoleAgency')}</strong></td>
                <td>{t('compare.aRole')}</td>
                <td>{t('compare.bRole')}</td>
                <td>{t('compare.cRole')}</td>
              </tr>
              <tr>
                <td><strong>{t('compare.rowEvidence')}</strong></td>
                <td>{t('compare.aEvidence')}</td>
                <td>{t('compare.bEvidence')}</td>
                <td>{t('compare.cEvidence')}</td>
              </tr>
              <tr>
                <td><strong>{t('compare.rowControl')}</strong></td>
                <td>{t('compare.aControl')}</td>
                <td>{t('compare.bControl')}</td>
                <td>{t('compare.cControl')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.testerForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <select value={dayId} onChange={(e) => setDayId(e.target.value)}>
              <option value="17">Day 17 - Tài liệu (Agentic Workflow)</option>
              <option value="18">Day 18 - Tài liệu (Verification)</option>
            </select>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('compare.inputPlaceholder')}
              required
            />
            <button type="submit" className="btn-primary" disabled={isComparing || !text.trim()}>
              {isComparing ? t('compare.submitting') : t('compare.submit')}
            </button>
          </form>
          <div className={styles.suggestions}>
            <span className={styles.suggestionsLabel}>{t('compare.sampleLabel')}</span>
            {SAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                type="button"
                className={styles.suggestionChip}
                disabled={isComparing}
                onClick={() => { setText(q); runCompare(q, dayId); }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {compareResult && <CompareResults result={compareResult} />}

        {!loadingStats && stats && (
          <div className={styles.statsSection}>
            <h3>{t('compare.statsTitle')}</h3>
            <StatsPanel stats={stats} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
