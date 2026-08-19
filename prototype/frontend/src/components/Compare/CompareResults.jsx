import React from 'react';
import SourcePanel from '../Dashboard/AITutor/SourcePanel';
import ConfidenceMeter from '../Dashboard/AITutor/ConfidenceMeter';
import VerifiedBadge from '../Dashboard/AITutor/VerifiedBadge';
import { useLanguage } from '../../contexts/LanguageContext';
import styles from './CompareResults.module.css';

const CompareResults = ({ result }) => {
  const { text, mode_a, mode_b, mode_c } = result;
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <strong>{t('compare.testQuestion')}</strong> {text}
      </div>

      <div className={styles.grid}>
        {/* Mode A */}
        <div className={styles.modeCard}>
          <div className={styles.cardHeader}>
            <h4>{t('aitutor.modeA')}</h4>
            <span className={styles.latency}>{mode_a.latency_ms}ms</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.answerText}>{mode_a.answer_text}</div>
            <SourcePanel claims={mode_a.claims} />
            <div className={styles.metrics}>
              <span>Retrieval Score: {mode_a.retrieval_score?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Mode B */}
        <div className={styles.modeCard}>
          <div className={styles.cardHeader}>
            <h4>{t('aitutor.modeB')}</h4>
            <span className={styles.latency}>{mode_b.latency_ms}ms</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.answerText}>{mode_b.answer_text}</div>
            <ConfidenceMeter
              score={mode_b.confidence_score}
              requiresEscalation={mode_b.requires_escalation}
            />
            <SourcePanel claims={mode_b.claims} />
            <div className={styles.metrics}>
              <span>Grounded Ratio: {(mode_b.grounded_ratio * 100)?.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Mode C */}
        <div className={styles.modeCard}>
          <div className={styles.cardHeader}>
            <h4>{t('aitutor.modeC')}</h4>
            <span className={styles.latency}>{mode_c.latency_ms}ms</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.answerText}>{mode_c.answer_text}</div>
            {mode_c.status === 'from_library' ? (
              <VerifiedBadge
                approvedByName={mode_c.approved_by_name}
                approvedAt={mode_c.approved_at}
              />
            ) : (
              <div className={styles.pendingEscalation}>
                {t('compare.pendingEscalation')}
              </div>
            )}
            {mode_c.matched_question && (
              <div className={styles.matchedQ}>
                <strong>{t('compare.originalQuestion')}</strong> {mode_c.matched_question}
                <br/>
                <small>{t('compare.usedTimes', { n: mode_c.reuse_count })}</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareResults;
