import { createTheme } from '@mui/material/styles';

/** Dark glass + indigo/violet accent (aligned with index.css design tokens). */
export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#8b5cf6',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#a78bfa',
    },
    background: {
      default: '#0a0a0f',
      paper: 'rgba(30, 30, 50, 0.6)',
    },
    text: {
      primary: '#f0f0f5',
      secondary: '#a0a0b8',
      disabled: '#6b6b85',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    success: {
      main: '#34d399',
    },
    warning: {
      main: '#fbbf24',
    },
    error: {
      main: '#f87171',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: 14,
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: 'antialiased',
        },
        body: {
          overflow: 'hidden',
          height: '100vh',
        },
        '#root': {
          height: '100vh',
          display: 'flex',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(30, 30, 50, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(30, 30, 50, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
