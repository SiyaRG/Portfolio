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
  },
});

export default theme;

