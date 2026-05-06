import { createTheme } from '@mui/material/styles';

/** ChatGPT-style dark: neutral grays, no glass/blur gradients. */
export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ececec',
      light: '#f5f5f5',
      dark: '#d4d4d4',
    },
    secondary: {
      main: '#b4b4b4',
    },
    background: {
      default: '#212121',
      paper: '#2f2f2f',
    },
    text: {
      primary: '#ececec',
      secondary: '#b4b4b4',
      disabled: '#8e8e8e',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
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
    borderRadius: 12,
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
          backgroundColor: '#171717',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#212121',
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
