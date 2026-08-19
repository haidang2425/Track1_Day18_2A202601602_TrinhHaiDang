import React, { useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Topbar from '../shared/Topbar';
import LeftSidebar from './LeftSidebar';
import SlideViewer from './SlideViewer';
import AITutor from './AITutor/AITutor';
import styles from './Dashboard.module.css';
import { SlideContext } from '../../contexts/SlideContext';
import { usePageTitle } from '../../hooks/usePageTitle';

const Dashboard = () => {
  const { dayId } = useParams();
  const { setCurrentPage } = useContext(SlideContext);
  usePageTitle(`Buổi ${dayId}`);

  useEffect(() => {
    // Reset to page 1 when changing lesson
    setCurrentPage(1);
  }, [dayId, setCurrentPage]);

  if (!['17', '18'].includes(dayId)) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="app-container">
      <Topbar />
      <div className={styles.workspace}>
        <LeftSidebar dayId={dayId} />
        <SlideViewer dayId={dayId} />
        <AITutor dayId={dayId} />
      </div>
    </div>
  );
};

export default Dashboard;
