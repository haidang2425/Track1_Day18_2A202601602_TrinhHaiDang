import React, { useContext, useState } from 'react';
import { SlideContext } from '../../contexts/SlideContext';
import { useLanguage } from '../../contexts/LanguageContext';
import SlideAnnotationCanvas from './SlideAnnotationCanvas';
import styles from './SlideViewer.module.css';

const SlideViewer = ({ dayId }) => {
  const { currentPage, setCurrentPage } = useContext(SlideContext);
  const [activeTool, setActiveTool] = useState('read');
  const { t } = useLanguage();

  const TOOLS = [
    { id: 'read', label: t('slideViewer.toolRead'), icon: '📖' },
    { id: 'pen', label: t('slideViewer.toolPen'), icon: '✏️' },
    { id: 'highlight', label: t('slideViewer.toolHighlight'), icon: '🖍️' },
    { id: 'circle', label: t('slideViewer.toolCircle'), icon: '⭕' },
    { id: 'eraser', label: t('slideViewer.toolEraser'), icon: '🧹' },
  ];

  // Số trang thật của từng buổi (khớp số file PNG render sẵn trong public/slides/dayN)
  const SLIDE_COUNTS = { 17: 28, 18: 43 };
  const maxPages = SLIDE_COUNTS[dayId] || 20;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < maxPages) setCurrentPage(currentPage + 1);
  };

  const imagePath = `/slides/day${dayId}/page_${currentPage}.png`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{t('slideViewer.title')} (Day {dayId})</h3>
        <div className={styles.controls}>
          <button onClick={handlePrev} disabled={currentPage === 1}>◀ {t('slideViewer.prev')}</button>
          <span>{t('slideViewer.page')} {currentPage} / {maxPages}</span>
          <button onClick={handleNext} disabled={currentPage === maxPages}>{t('slideViewer.next')} ▶</button>
        </div>
      </div>

      <div className={styles.toolbar}>
        {TOOLS.map(tool => (
          <button
            key={tool.id}
            type="button"
            className={`${styles.toolBtn} ${activeTool === tool.id ? styles.toolBtnActive : ''}`}
            onClick={() => setActiveTool(tool.id)}
            title={tool.label}
          >
            <span aria-hidden="true">{tool.icon}</span> {tool.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <img
          src={imagePath}
          alt={`Slide ${currentPage}`}
          className={styles.slideImage}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className={styles.placeholder} style={{ display: 'none' }}>
          <span>Slide {currentPage} {t('slideViewer.noSlide')}</span>
        </div>
        <SlideAnnotationCanvas dayId={dayId} page={currentPage} activeTool={activeTool} />
      </div>

      <div className={styles.thumbStrip}>
        {Array.from({ length: maxPages }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            type="button"
            className={`${styles.thumb} ${n === currentPage ? styles.thumbActive : ''}`}
            onClick={() => setCurrentPage(n)}
            title={`Trang ${n}`}
          >
            <img
              src={`/slides/day${dayId}/page_${n}.png`}
              alt={`Slide thu nhỏ trang ${n}`}
              loading="lazy"
              onError={(e) => { e.target.style.visibility = 'hidden'; }}
            />
            <span>{n}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlideViewer;
