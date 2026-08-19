import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './Login.module.css';
import logoImage from '../../assets/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  // Theme logic
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError(t('login.errorInvalid'));
    } finally {
      setLoading(false);
    }
  };

  const executeDemoLogin = async (demoUsername, demoPassword) => {
    setError('');
    setLoading(true);

    try {
      await login(demoUsername, demoPassword);
      navigate('/home');
    } catch (err) {
      setError(t('login.errorInvalid'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`h-screen w-screen relative overflow-hidden text-textMain-light dark:text-textMain-dark transition-colors duration-300 font-sans`}>
      {/* Background Image */}
      <div className={styles.splitBg}></div>
      
      {/* Left side color overlay */}
      <div className={styles.overlayLeft}></div>

      {/* Main Container */}
      <main className="relative z-10 w-full h-full flex flex-col md:flex-row p-6 md:p-12">
          
          {/* Header area for Logo and Top Actions */}
          <div className="absolute top-6 left-6 md:top-8 md:left-12 flex items-center z-20">
              {/* Logo area */}
              <div className="flex items-center gap-3">
                  <div className="flex items-center">
                      <img src={logoImage} alt="VinUniversity Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]" />
                  </div>
                  <span className="text-3xl md:text-4xl font-bold tracking-wide border-l border-white/30 pl-3 ml-1">
                      <span className="text-vlearnRed">V</span><span className="text-primary-dark">Learn</span>
                  </span>
              </div>
          </div>

          <div className="absolute top-6 right-6 md:top-8 md:right-12 flex items-center gap-3 z-20">
              <button className={`${styles.topActionBtn} group`} title="Báo lỗi">
                  <i className="ph ph-flag text-lg"></i>
              </button>
              
              <button
                  onClick={() => toggleLanguage()}
                  className={`${styles.topActionBtn} font-semibold text-sm`}
                  title="Đổi ngôn ngữ / Switch language">
                  {language === 'vi' ? 'VI' : 'EN'}
              </button>
              
              <button onClick={toggleTheme} className={`${styles.topActionBtn} ${styles.themeToggleBtn}`} title="Giao diện Sáng/Tối">
                  {theme === 'dark' ? <i className="ph ph-sun text-lg"></i> : <i className="ph ph-moon text-lg"></i>}
              </button>
          </div>

          {/* Left Content Area (Text) */}
          <div className="w-full md:w-[55%] h-full flex flex-col justify-center text-white z-10 pt-20 md:pt-0">
              <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 whitespace-nowrap text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]">
                      {t('login.heading1')}<br/>{t('login.heading2')}
                  </h1>

                  <p className="text-lg md:text-xl text-gray-200 mb-8 font-light leading-relaxed">
                      {t('login.subtitle')}
                  </p>

                  <blockquote className="italic text-gray-300 border-l-4 border-vlearnRed pl-4 py-1">
                      "{t('login.quote')}"
                  </blockquote>
              </div>

              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12 text-sm text-white/70">
                  {t('login.copyright')}
              </div>
          </div>

          {/* Right Content Area (Login Form) */}
          <div className="w-full md:w-[45%] h-full flex items-center justify-center lg:justify-end lg:pr-12 xl:pr-24 z-10 mt-12 md:mt-0">
              
              {/* Login Box */}
              <div className={`bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-2xl p-8 transition-colors duration-300 shadow-2xl border border-white/50 dark:border-white/10`}>
                  
                  <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-1 uppercase tracking-wider text-textMain-light dark:text-textMain-dark">
                          {t('login.welcome1')} <span className="text-vlearnRed">{t('login.welcome2')}</span>
                      </h2>
                      <p className="text-textMuted-light dark:text-textMuted-dark text-sm">
                          {t('login.subheading')}
                      </p>
                  </div>

                  <form onSubmit={handleSubmit}>

                      <div className="mb-5">
                          <label htmlFor="email" className="block text-sm font-semibold mb-2 text-textMain-light dark:text-textMain-dark">
                              {t('login.emailLabel')}
                          </label>
                          <input type="email" id="email"
                              className={`${styles.customInput} w-full px-4 py-3 rounded-lg bg-inputBg-light dark:bg-inputBg-dark border border-inputBorder-light dark:border-inputBorder-dark text-textMain-light dark:text-textMain-dark placeholder-gray-400 focus:outline-none`}
                              placeholder={t('login.emailPlaceholder')}
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required />
                      </div>

                      <div className="mb-5">
                          <div className="flex justify-between items-center mb-2">
                              <label htmlFor="password" className="block text-sm font-semibold text-textMain-light dark:text-textMain-dark">
                                  {t('login.passwordLabel')}
                              </label>
                              <a href="#" className="text-xs font-medium text-primary-light dark:text-primary-dark hover:underline">
                                  {t('login.forgotPassword')}
                              </a>
                          </div>
                          <div className="relative">
                              <input type={showPassword ? 'text' : 'password'} id="password"
                                  className={`${styles.customInput} w-full px-4 py-3 rounded-lg bg-inputBg-light dark:bg-inputBg-dark border border-inputBorder-light dark:border-inputBorder-dark text-textMain-light dark:text-textMain-dark placeholder-gray-400 focus:outline-none pr-10`}
                                  placeholder={t('login.passwordPlaceholder')}
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required />
                              <button type="button"
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-textMain-light dark:hover:text-textMain-dark transition-colors"
                                  onClick={() => setShowPassword(!showPassword)}>
                                  <i className={`ph ${showPassword ? 'ph-eye-slash' : 'ph-eye'} text-lg`}></i>
                              </button>
                          </div>
                      </div>

                      <div className="flex items-center mb-6">
                          <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-primary-light focus:ring-primary-light dark:focus:ring-primary-dark bg-inputBg-light dark:bg-inputBg-dark" />
                          <label htmlFor="remember" className="ml-2 text-sm font-medium text-textMain-light dark:text-textMain-dark">
                              {t('login.rememberMe')}
                          </label>
                      </div>

                      {error && <div className="text-vlearnRed text-sm mb-4">{error}</div>}

                      <button type="submit"
                          disabled={loading}
                          className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex justify-center items-center gap-2 bg-primary-light hover:bg-blue-900 dark:bg-primary-dark dark:text-gray-900 dark:hover:bg-cyan-400 shadow-md hover:shadow-lg">
                          {loading ? t('login.submitting') : <>{t('login.submit')} <i className="ph ph-arrow-right font-bold"></i></>}
                      </button>
                  </form>

                  <div className="mt-6 pt-5 border-t border-inputBorder-light dark:border-inputBorder-dark">
                      <p className="text-xs text-center text-textMuted-light dark:text-textMuted-dark mb-3">
                          {t('login.demoLabel')}
                      </p>
                      <div className="flex flex-col gap-2">
                          <button
                              type="button"
                              disabled={loading}
                              onClick={() => executeDemoLogin('26ai.minhnh@vinuni.edu.vn', 'demo1234')}
                              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium flex justify-center items-center gap-2 border border-inputBorder-light dark:border-inputBorder-dark text-textMain-light dark:text-textMain-dark hover:bg-inputBg-light dark:hover:bg-inputBg-dark transition-colors">
                              <i className="ph ph-student text-lg"></i> {t('login.demoLearner')}
                          </button>
                          <button
                              type="button"
                              disabled={loading}
                              onClick={() => executeDemoLogin('coach.dangth@vinuni.edu.vn', 'coach1234')}
                              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium flex justify-center items-center gap-2 border border-inputBorder-light dark:border-inputBorder-dark text-textMain-light dark:text-textMain-dark hover:bg-inputBg-light dark:hover:bg-inputBg-dark transition-colors">
                              <i className="ph ph-chalkboard-teacher text-lg"></i> {t('login.demoCoach')}
                          </button>
                      </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                      <a href="#" className="text-sm font-bold uppercase tracking-wider text-textMain-light dark:text-textMain-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors border-b-2 border-transparent hover:border-current pb-1">
                          {t('login.firstTime')}
                      </a>
                      <a href="#" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border border-inputBorder-light dark:border-inputBorder-dark text-textMain-light dark:text-textMain-dark hover:bg-inputBg-light dark:hover:bg-inputBg-dark transition-colors">
                          <i className="ph ph-envelope-simple text-lg"></i> {t('login.support')}
                      </a>
                  </div>
                  
              </div>
          </div>
      </main>
    </div>
  );
};

export default Login;
