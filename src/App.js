import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ListPage from './pages/ListPage';
import AddEditPage from './pages/AddEditPage';
import NotFoundPage from './pages/NotFoundPage';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/list" 
          element={isAuthenticated() ? <ListPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/add" 
          element={isAuthenticated() ? <AddEditPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/edit/:id" 
          element={isAuthenticated() ? <AddEditPage /> : <Navigate to="/login" replace />} 
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;