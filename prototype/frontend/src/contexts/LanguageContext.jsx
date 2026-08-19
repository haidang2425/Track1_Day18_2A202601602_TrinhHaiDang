import React, { createContext, useContext, useState, useCallback } from 'react';
import { translations } from '../i18n/translations';

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'vi');

  const toggleLanguage = useCallback((lang) => {
    const next = lang || (language === 'vi' ? 'en' : 'vi');
    setLanguage(next);
    localStorage.setItem('language', next);
  }, [language]);

  // t('login.emailLabel') -> tra trong translations[language].login.emailLabel
  // t('compare.usedTimes', { n: 3 }) -> thay {n} trong chuỗi bằng 3
  const t = useCallback((key, vars) => {
    const parts = key.split('.');
    let node = translations[language];
    for (const part of parts) {
      node = node?.[part];
    }
    let result = node ?? key;
    if (vars && typeof result === 'string') {
      for (const [varKey, varVal] of Object.entries(vars)) {
        result = result.replaceAll(`{${varKey}}`, varVal);
      }
    }
    return result;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
