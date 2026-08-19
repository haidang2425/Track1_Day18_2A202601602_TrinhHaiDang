import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { SlideProvider } from './contexts/SlideContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/shared/ErrorBoundary';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Compare from './components/Compare/Compare';
import Coach from './components/Coach/Coach';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = React.useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
    <LanguageProvider>
    <AuthProvider>
      <SlideProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            
            <Route path="/lesson/:dayId" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/compare" element={
              <ProtectedRoute>
                <Compare />
              </ProtectedRoute>
            } />
            
            <Route path="/coach" element={
              <ProtectedRoute allowedRoles={['coach']}>
                <Coach />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </SlideProvider>
    </AuthProvider>
    </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
