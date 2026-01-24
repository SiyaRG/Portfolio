import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { adminApi } from '../services/api';
import { getMediaUrl } from '../utils/api';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const drawerWidth = 280;

const Layout = ({ children, onLogout }: LayoutProps) => {
  const location = useLocation();
  const [profile, setProfile] = useState<{ name: string; profile_image?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await adminApi.getProfile();
        if (data.results && data.results.length > 0) {
          setProfile(data.results[0]);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const getProfileImageUrl = () => {
    if (!profile?.profile_image) return '';
    return getMediaUrl(profile.profile_image) || '';
  };

  const getNameParts = () => {
    if (!profile?.name) return { firstName: '', surname: '' };
    const parts = profile.name.trim().split(/\s+/);
    if (parts.length === 1) {
      return { firstName: parts[0], surname: '' };
    }
    const surname = parts[parts.length - 1];
    const firstName = parts.slice(0, -1).join(' ');
    return { firstName, surname };
  };

  const { firstName, surname } = getNameParts();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/education', label: 'Education' },
    { path: '/leadership', label: 'Leadership' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            padding: '1.5rem',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          {profile && (
            <Stack
              direction="column"
              spacing={1.5}
              alignItems="center"
              sx={{ marginBottom: '1.5rem' }}
            >
              <Avatar
                src={getProfileImageUrl()}
                alt={profile.name || 'Profile'}
                sx={{
                  width: 80,
                  height: 80,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              />
              {(firstName && surname) && (
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textAlign: 'center',
                  }}
                >
                  {firstName} {surname}
                </Typography>
              )}
              
            </Stack>
          )}
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              background: 'linear-gradient(135deg, #0e6e55 0%, #a16f0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center',
            }}
          >
            Portfolio CMS
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto', padding: '1rem 0' }}>
          <List>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={isActive}
                    sx={{
                      padding: '1rem 1.5rem',
                      borderLeft: '3px solid',
                      borderLeftColor: isActive ? 'primary.main' : 'transparent',
                      backgroundColor: isActive ? 'rgba(14, 110, 85, 0.2)' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(14, 110, 85, 0.1)',
                        borderLeftColor: 'primary.main',
                        paddingLeft: '1.75rem',
                      },
                      '&.Mui-selected': {
                        color: 'primary.main',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(14, 110, 85, 0.2)',
                        },
                      },
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider sx={{ borderColor: 'primary.main' }} />
        <Box sx={{ padding: '1.5rem' }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{
              padding: '0.75rem',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: '2rem',
          backgroundColor: 'background.default',
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

