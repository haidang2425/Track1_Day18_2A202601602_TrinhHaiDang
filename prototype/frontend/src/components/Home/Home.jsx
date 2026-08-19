import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../shared/Topbar';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Home.module.css';

const courses = [
  { id: 17, title: 'Buổi 17', desc: 'Giới thiệu Agentic Workflow', status: 'available' },
  { id: 18, title: 'Buổi 18', desc: 'Cơ chế kiểm chứng của AI', status: 'available' },
  { id: 19, title: 'Buổi 19', desc: 'Sắp ra mắt', status: 'coming' },
  { id: 20, title: 'Buổi 20', desc: 'Sắp ra mắt', status: 'coming' },
  { id: 21, title: 'Buổi 21', desc: 'Sắp ra mắt', status: 'coming' },
  { id: 22, title: 'Buổi 22', desc: 'Sắp ra mắt', status: 'coming' },
];

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  usePageTitle(t('home.title'));

  return (
    <div className="app-container">
      <Topbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{t('home.title')}</h2>
          <p>{t('home.subtitle')}</p>
        </div>

        <div className={styles.grid}>
          {courses.map(c => (
            <div
              key={c.id}
              className={`${styles.card} ${c.status === 'coming' ? styles.disabled : ''}`}
              onClick={() => c.status === 'available' && navigate(`/lesson/${c.id}`)}
            >
              <div className={styles.cardHeader}>
                <h3>{c.title}</h3>
                {c.status === 'coming' && <span className={styles.badge}>{t('home.comingSoon')}</span>}
              </div>
              <p>{c.status === 'coming' ? t('home.comingSoon') : c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
