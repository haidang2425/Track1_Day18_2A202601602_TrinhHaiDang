import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './ModeSelector.module.css';

const ModeSelector = ({ currentMode, setMode }) => {
  const { t } = useLanguage();
  return (
    <div className={styles.selector}>
      <select
        value={currentMode}
        onChange={(e) => setMode(e.target.value)}
        className={styles.select}
      >
        <option value="A">{t('aitutor.modeA')}</option>
        <option value="B">{t('aitutor.modeB')}</option>
        <option value="C">{t('aitutor.modeC')}</option>
      </select>
    </div>
  );
};

export default ModeSelector;
