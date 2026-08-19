import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './LeftSidebar.module.css';

const LeftSidebar = ({ dayId }) => {
  const { t } = useLanguage();
  return (
    <div className={styles.sidebar}>
      <Link to="/home" className={styles.backBtn}>← {t('sidebar.back')}</Link>

      <div className={styles.courseInfo}>
        <div className={styles.dayBadge}>Day {dayId}</div>
        <h2>{dayId === '17' ? 'Giới thiệu Agentic Workflow' : 'Cơ chế kiểm chứng của AI'}</h2>

        <div className={styles.progress}>
          <div className={styles.progressHeader}>
            <span>{t('sidebar.progress')}</span>
            <span>0%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>

      <nav className={styles.menu}>
        <div className={styles.menuItem}>
          <span className={styles.icon}>📚</span>
          <span>{t('sidebar.slideDoc')}</span>
        </div>
        <div className={styles.menuItem}>
          <span className={styles.icon}>💻</span>
          <span>{t('sidebar.labPractice')}</span>
        </div>
        <div className={styles.menuItem}>
          <span className={styles.icon}>✅</span>
          <span>{t('sidebar.quiz')}</span>
        </div>
      </nav>

      <div className={styles.tips}>
        <h4>{t('sidebar.tipTitle')}</h4>
        <p>{t('sidebar.tipBody')}</p>
      </div>
    </div>
  );
};

export default LeftSidebar;
