import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 默认路由重定向到登录页 */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 页面路由 */}
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* 404 页面 */}
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-8">页面未找到</p>
                <a 
                  href="/" 
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  返回首页
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;