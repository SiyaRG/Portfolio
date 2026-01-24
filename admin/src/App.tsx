import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import theme from './theme';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileManagement from './pages/ProfileManagement';
import AboutManagement from './pages/AboutManagement';
import ExperienceManagement from './pages/ExperienceManagement';
import ProjectsManagement from './pages/ProjectsManagement';
import SkillsManagement from './pages/SkillsManagement';
import EducationManagement from './pages/EducationManagement';
import LeadershipManagement from './pages/LeadershipManagement';
import ContactManagement from './pages/ContactManagement';
import Layout from './components/Layout';
import { adminApi } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    adminApi.logout();
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <ProfileManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <AboutManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/experience"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <ExperienceManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/projects"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <ProjectsManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/skills"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <SkillsManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/education"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <EducationManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/leadership"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <LeadershipManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/contact"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <ContactManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Router>
    </ThemeProvider>
  );
}

export default App;
