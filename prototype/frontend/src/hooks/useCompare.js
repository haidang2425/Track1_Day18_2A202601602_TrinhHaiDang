import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export const useCompare = () => {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  
  const [compareResult, setCompareResult] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await apiClient('/api/compare/stats');
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const runCompare = async (text, dayId) => {
    setIsComparing(true);
    setCompareResult(null);
    try {
      const res = await apiClient('/api/compare/answer', {
        method: 'POST',
        body: JSON.stringify({
          error_text: text,
          day: parseInt(dayId)
        })
      });
      setCompareResult({
        text,
        ...res
      });
      // Refresh stats after comparison to see new data points
      fetchStats();
    } catch (err) {
      console.error(err);
      alert('Lỗi: ' + err.message);
    } finally {
      setIsComparing(false);
    }
  };

  return {
    stats,
    loadingStats,
    compareResult,
    isComparing,
    runCompare,
    refreshStats: fetchStats
  };
};
