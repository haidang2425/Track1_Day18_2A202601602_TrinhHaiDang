import React, { useRef, useEffect, useState, useCallback } from 'react';
import { loadStrokes, saveStrokes } from '../../utils/slideAnnotations';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './SlideAnnotationCanvas.module.css';

const TOOL_STYLE = {
  pen: { color: '#1f2937', width: 3, alpha: 1, composite: 'source-over' },
  highlight: { color: '#facc15', width: 18, alpha: 0.35, composite: 'source-over' },
  eraser: { color: '#000000', width: 24, alpha: 1, composite: 'destination-out' },
};

const SlideAnnotationCanvas = ({ dayId, page, activeTool }) => {
  const { t } = useLanguage();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [strokes, setStrokes] = useState(() => loadStrokes(dayId, page));
  const drawingRef = useRef(null); // stroke đang vẽ dở

  const isDrawable = activeTool !== 'read';
  const isShape = activeTool === 'circle';

  const redraw = useCallback((canvas, strokeList, previewShape) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const all = previewShape ? [...strokeList, previewShape] : strokeList;
    for (const stroke of all) {
      ctx.globalCompositeOperation = stroke.composite || 'source-over';
      ctx.globalAlpha = stroke.alpha ?? 1;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.tool === 'circle') {
        const { x1, y1, x2, y2 } = stroke;
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        const rx = Math.abs(x2 - x1) / 2;
        const ry = Math.abs(y2 - y1) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (stroke.points?.length) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (const p of stroke.points.slice(1)) ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Nạp lại nét vẽ khi đổi trang/buổi học, và khớp kích thước canvas với khung chứa
  useEffect(() => {
    const loaded = loadStrokes(dayId, page);
    setStrokes(loaded);
  }, [dayId, page]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      redraw(canvas, strokes, null);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [strokes, redraw]);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e) => {
    if (!isDrawable) return;
    const pos = getPos(e);
    const style = isShape ? { color: '#dc2626', width: 2.5, alpha: 1, composite: 'source-over' } : TOOL_STYLE[activeTool];
    if (isShape) {
      drawingRef.current = { tool: 'circle', ...style, x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y };
    } else {
      drawingRef.current = { tool: activeTool, ...style, points: [pos] };
    }
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!drawingRef.current) return;
    const pos = getPos(e);
    if (isShape) {
      drawingRef.current.x2 = pos.x;
      drawingRef.current.y2 = pos.y;
    } else {
      drawingRef.current.points.push(pos);
    }
    redraw(canvasRef.current, strokes, drawingRef.current);
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;
    const finished = drawingRef.current;
    drawingRef.current = null;
    setStrokes(prev => {
      const next = [...prev, finished];
      saveStrokes(dayId, page, next);
      return next;
    });
  };

  const clearAll = () => {
    setStrokes([]);
    saveStrokes(dayId, page, []);
  };

  return (
    <div ref={containerRef} className={styles.overlay}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ cursor: isDrawable ? (activeTool === 'eraser' ? 'cell' : 'crosshair') : 'default', pointerEvents: isDrawable ? 'auto' : 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      {strokes.length > 0 && (
        <button type="button" className={styles.clearBtn} onClick={clearAll} title={t('slideViewer.clearDrawing')}>
          🗑 {t('slideViewer.clearDrawing')}
        </button>
      )}
    </div>
  );
};

export default SlideAnnotationCanvas;
