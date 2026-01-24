import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0e6e55',
      light: '#1a8a6d',
      dark: '#0a5542',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#a16f0b',
      light: '#b88a2e',
      dark: '#7a5408',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#F0F8FF',
      secondary: 'rgba(240, 248, 255, 0.9)',
      disabled: 'rgba(240, 248, 255, 0.7)',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#0e6e55',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '4px',
          padding: '0.75rem 1.5rem',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: '2px solid #0e6e55',
          transition: 'all 0.3s',
          '&:hover': {
            borderColor: '#a16f0b',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(14, 110, 85, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#0e6e55',
            },
            '&:hover fieldset': {
              borderColor: '#a16f0b',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0e6e55',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          borderRight: '2px solid #0e6e55',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          borderBottom: '2px solid #0e6e55',
        },
      },
    },
  },
});

export default theme;

