import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import PressKitListPage from './pages/dashboard/PressKitListPage';
import PressKitEditorPage from './pages/dashboard/PressKitEditorPage';
import PressKitPreviewPage from './pages/dashboard/PressKitPreviewPage';
import AnalyticsPage from './pages/dashboard/AnalyticsPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import PressKitPublicPage from './pages/public/PressKitPublicPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/press-kit/:slug" element={<PressKitPublicPage />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardHomePage />} />
                <Route path="/dashboard/press-kits" element={<PressKitListPage />} />
                <Route path="/dashboard/press-kits/new" element={<PressKitEditorPage />} />
                <Route path="/dashboard/press-kits/:id/edit" element={<PressKitEditorPage />} />
                <Route path="/dashboard/press-kits/:id/preview" element={<PressKitPreviewPage />} />
                <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;