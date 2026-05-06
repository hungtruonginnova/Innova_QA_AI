import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Header({ onToggleSidebar, isSidebarOpen, showMenuButton }) {
  return (
    <AppBar id="app-header" position="static" color="transparent" elevation={0}>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 52,
          px: 2,
          justifyContent: 'flex-start',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
          {showMenuButton ? (
            <IconButton
              id="sidebar-toggle"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              edge="start"
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', color: 'text.primary' },
              }}
            >
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          ) : null}

          <Typography
            component="h1"
            noWrap
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            SolutionData AI
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
