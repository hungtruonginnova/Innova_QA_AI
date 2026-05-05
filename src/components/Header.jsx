import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function BrandLogo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))' }}>
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6366f1' }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
        <text x="16" y="22" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">
          AI
        </text>
      </svg>
    </Box>
  );
}

export default function Header({ onToggleSidebar, isSidebarOpen, showMenuButton }) {
  return (
    <AppBar id="app-header" position="static" color="transparent" elevation={0}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 60,
          px: { xs: 2, sm: 3 },
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {showMenuButton ? (
            <IconButton
              id="sidebar-toggle"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              edge="start"
              sx={{
                display: 'flex',
                color: 'text.secondary',
                bgcolor: 'rgba(255,255,255,0.03)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', color: 'text.primary' },
              }}
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : null}

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <BrandLogo />
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                }}
              >
                SolutionData{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  AI
                </Box>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'text.disabled',
                  fontWeight: 400,
                }}
              >
                Innova Support Assistant
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Stack
          id="connection-status"
          direction="row"
          alignItems="center"
          spacing={0.75}
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            bgcolor: 'rgba(52, 211, 153, 0.08)',
            border: '1px solid rgba(52, 211, 153, 0.15)',
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: 'success.main',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 500 }}>
            Online
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
