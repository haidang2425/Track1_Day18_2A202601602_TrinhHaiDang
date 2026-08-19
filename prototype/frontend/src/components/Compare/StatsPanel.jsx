import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './StatsPanel.module.css';

const StatsPanel = ({ stats }) => {
  const { total_interactions, by_mode, escalation_over_time, library_growth } = stats;
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.summaryGrid}>
        <div className={styles.statCard}>
          <div className={styles.label}>{t('statsPanel.totalInteractions')}</div>
          <div className={styles.value}>{total_interactions}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.label}>{t('statsPanel.escalationRate')}</div>
          <div className={styles.value}>
            {(by_mode.B.escalation_rate * 100).toFixed(1)}%
          </div>
          <div className={styles.subtext}>{t('statsPanel.avgConfidence')}: {(by_mode.B.avg_confidence * 100).toFixed(1)}%</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.label}>{t('statsPanel.libraryRate')}</div>
          <div className={styles.value}>
            {(by_mode.C.from_library_rate * 100).toFixed(1)}%
          </div>
          <div className={styles.subtext}>{t('statsPanel.totalReuses')}: {by_mode.C.total_reuses}</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.label}>{t('statsPanel.avgLatency')}</div>
          <div className={styles.subtext}>A: {by_mode.A.avg_latency_ms}ms</div>
          <div className={styles.subtext}>B: {by_mode.B.avg_latency_ms}ms</div>
          <div className={styles.subtext}>C: {by_mode.C.avg_latency_ms}ms</div>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <h4>{t('statsPanel.escalationChart')}</h4>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={escalation_over_time}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="interaction_seq" label={{ value: t('statsPanel.interactionSeq'), position: 'insideBottomRight', offset: -10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="stepAfter" dataKey="cumulative_escalations" name={t('statsPanel.totalEscalations')} stroke="#dc2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartBox}>
          <h4>{t('statsPanel.libraryChart')}</h4>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={library_growth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="interaction_seq" label={{ value: t('statsPanel.interactionSeq'), position: 'insideBottomRight', offset: -10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_library_entries" name={t('statsPanel.libraryEntries')} stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
