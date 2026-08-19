import React, { useContext } from 'react';
import { SlideContext } from '../../../contexts/SlideContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './SourcePanel.module.css';

const SourcePanel = ({ claims }) => {
  const { setCurrentPage } = useContext(SlideContext);
  const { t } = useLanguage();

  if (!claims || claims.length === 0) return null;

  const handleSourceClick = (sourceLabel) => {
    if (!sourceLabel) return;
    // expect format "Tr. N"
    const match = sourceLabel.match(/\d+/);
    if (match) {
      setCurrentPage(parseInt(match[0], 10));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('sourcePanel.title')}</div>
      <ul className={styles.list}>
        {claims.map((c, idx) => (
          <li key={idx} className={styles.item}>
            <span className={styles.claimText}>{c.claim}</span>
            {c.source_label ? (
              <span 
                className={styles.sourceLabel}
                onClick={() => handleSourceClick(c.source_label)}
              >
                [{c.source_label}]
              </span>
            ) : (
              <span className={styles.warningLabel}>[{t('sourcePanel.noSource')}]</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourcePanel;
