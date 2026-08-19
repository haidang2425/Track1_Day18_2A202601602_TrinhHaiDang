import React from 'react';
import { parseUtcDate } from '../../../utils/datetime';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './VerifiedBadge.module.css';

const VerifiedBadge = ({ approvedByName, approvedAt, reuseCount }) => {
  const { t } = useLanguage();
  return (
    <div className={styles.badge}>
      <span className={styles.icon}>✅</span>
      <div className={styles.info}>
        <span className={styles.title}>
          {t('verifiedBadge.confirmedBy', { name: approvedByName })}
          {approvedAt && <> · {parseUtcDate(approvedAt).toLocaleDateString('vi-VN')}</>}
          {typeof reuseCount === 'number' && <> · {t('verifiedBadge.helped', { n: reuseCount })}</>}
        </span>
      </div>
    </div>
  );
};

export default VerifiedBadge;
