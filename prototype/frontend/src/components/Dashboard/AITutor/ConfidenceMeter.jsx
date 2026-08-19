import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './ConfidenceMeter.module.css';

const ConfidenceMeter = ({ score, requiresEscalation }) => {
  const { t } = useLanguage();
  if (score === undefined || score === null) return null;

  const percentage = Math.round(score * 100);
  
  let colorClass = styles.high;
  if (percentage < 60) colorClass = styles.low;
  else if (percentage < 80) colorClass = styles.medium;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{t('confidenceMeter.label')}</span>
        <span className={`${styles.scoreText} ${colorClass}`}>{percentage}%</span>
      </div>
      <div className={styles.barBg}>
        <div 
          className={`${styles.barFill} ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {requiresEscalation && (
        <div className={styles.warning}>
          {t('confidenceMeter.warning')}
        </div>
      )}
    </div>
  );
};

export default ConfidenceMeter;
