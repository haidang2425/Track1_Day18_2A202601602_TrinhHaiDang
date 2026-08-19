import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { apiClient } from '../../api/client';
import logoImage from '../../assets/logo.png';
import styles from './Topbar.module.css';

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [myEscalations, setMyEscalations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const lastSeenKey = `vlearn_notif_last_seen:${user?.username}`;

  useEffect(() => {
    if (user?.role !== 'coach') return;
    const fetchQueue = () => {
      apiClient('/coach/queue').then(setPendingQueue).catch(() => {});
    };
    fetchQueue();
    const interval = setInterval(fetchQueue, 15000);
    return () => clearInterval(interval);
  }, [user?.role]);

  useEffect(() => {
    if (user?.role !== 'learner') return;
    const fetchEscalations = () => {
      apiClient('/api/my-escalations').then(list => {
        setMyEscalations(list);
        const lastSeen = parseInt(localStorage.getItem(lastSeenKey) || '0', 10);
        setUnreadCount(list.filter(e => e.escalation_id > lastSeen).length);
      }).catch(() => {});
    };
    fetchEscalations();
    const interval = setInterval(fetchEscalations, 15000);
    return () => clearInterval(interval);
  }, [user?.role, lastSeenKey]);

  const openNotif = () => {
    setNotifOpen(open => {
      const next = !open;
      if (next && user?.role === 'learner' && myEscalations.length > 0) {
        const maxId = Math.max(...myEscalations.map(e => e.escalation_id));
        localStorage.setItem(lastSeenKey, String(maxId));
        setUnreadCount(0);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!menuOpen && !notifOpen) return;
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, notifOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div className={styles.topbar}>
      <Link to="/home" className={styles.logo}>
        <img src={logoImage} alt="VLearn" className={styles.logoImg} />
        <span><span className={styles.logoV}>V</span><span className={styles.logoLearn}>Learn</span></span>
      </Link>
      
      <div className={styles.nav}>
        <Link to="/home" className={location.pathname === '/home' ? styles.active : ''}>{t('topbar.home')}</Link>
        <Link to="/compare" className={location.pathname === '/compare' ? styles.active : ''}>{t('topbar.compare')}</Link>
        {user?.role === 'coach' && (
          <Link to="/coach" className={location.pathname === '/coach' ? styles.active : ''}>{t('topbar.coachDashboard')}</Link>
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.langToggle}>
          <button
            className={language === 'vi' ? styles.langActive : ''}
            onClick={() => toggleLanguage('vi')}
          >
            VI
          </button>
          <button
            className={language === 'en' ? styles.langActive : ''}
            onClick={() => toggleLanguage('en')}
          >
            EN
          </button>
        </div>

        <div className={styles.notifWrapper} ref={notifRef}>
          <button
            className={styles.iconBtn}
            title={t('topbar.notifications')}
            onClick={openNotif}
          >
            🔔
            {user?.role === 'coach' && pendingQueue.length > 0 && (
              <span className={styles.notifDot}>{pendingQueue.length}</span>
            )}
            {user?.role === 'learner' && unreadCount > 0 && (
              <span className={styles.notifDot}>{unreadCount}</span>
            )}
          </button>
          {notifOpen && (
            <div className={styles.dropdown}>
              {user?.role === 'coach' ? (
                pendingQueue.length > 0 ? (
                  <>
                    <div className={styles.dropdownRow} style={{ fontWeight: 700 }}>
                      <span>{pendingQueue.length} câu đang chờ duyệt</span>
                    </div>
                    <button
                      className={styles.dropdownLogout}
                      style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
                      onClick={() => { setNotifOpen(false); navigate('/coach'); }}
                    >
                      Đi tới hàng chờ
                    </button>
                  </>
                ) : (
                  <div className={styles.dropdownRow}>
                    <span>Không có câu nào đang chờ duyệt 🎉</span>
                  </div>
                )
              ) : myEscalations.length > 0 ? (
                <div className={styles.notifList}>
                  {myEscalations.slice(0, 5).map(e => (
                    <div key={e.escalation_id} className={styles.notifItem}>
                      <span className={e.status === 'approved' ? styles.notifBadgeOk : styles.notifBadgeNo}>
                        {e.status === 'approved' ? '✅ Đã duyệt' : '❌ Từ chối'}
                      </span>
                      <p>{e.question_text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.dropdownRow}>
                  <span>Chưa có thông báo mới</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.profile} ref={profileRef}>
          <button
            type="button"
            className={styles.profileTrigger}
            onClick={() => setMenuOpen(open => !open)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <div className={styles.avatar}>{user?.display_name?.[0] || '?'}</div>
            <div className={styles.userInfo}>
              <span className={styles.name}>{user?.display_name}</span>
              <span className={styles.role}>({user?.role === 'coach' ? t('topbar.coach') : t('topbar.learner')})</span>
            </div>
            <span className={styles.caret}>▾</span>
          </button>
          {menuOpen && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader}>
                <div className={styles.avatar}>{user?.display_name?.[0] || '?'}</div>
                <div>
                  <div className={styles.dropdownName}>{user?.display_name}</div>
                  <div className={styles.dropdownUsername}>{user?.username}</div>
                </div>
              </div>
              <div className={styles.dropdownRow}>
                <span>{t('topbar.role')}</span>
                <span>{user?.role === 'coach' ? t('topbar.coach') : t('topbar.learner')}</span>
              </div>
              <button className={styles.dropdownLogout} onClick={handleLogout}>{t('topbar.logout')}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
