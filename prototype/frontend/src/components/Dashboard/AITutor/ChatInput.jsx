import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import styles from './ChatInput.module.css';

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('aitutor.inputPlaceholder')}
          className={styles.input}
          disabled={disabled}
        />
        <button type="submit" className={styles.sendBtn} disabled={!text.trim() || disabled}>
          {t('aitutor.send')}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
