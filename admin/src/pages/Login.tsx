import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { adminApi } from '../services/api';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminApi.login(username, password);
      onLogin();
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '1rem',
        background: 'linear-gradient(135deg, #0e6e55 0%, #a16f0b 100%)',
      }}
    >
      <Card
        sx={{
          padding: '3rem',
          width: '100%',
          maxWidth: '500px',
          minWidth: '320px',
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              marginBottom: '0.5rem',
              color: 'primary.main',
              textAlign: 'center',
            }}
          >
            Portfolio CMS
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              marginBottom: '2rem',
              color: 'text.secondary',
              textAlign: 'center',
              fontWeight: 'normal',
            }}
          >
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              variant="outlined"
            />
            {error && (
              <Alert severity="error" sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                marginTop: '1.5rem',
                padding: '0.75rem',
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Logging in...
                </Box>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;

