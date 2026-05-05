import React from 'react';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Sidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}) {
  return (
    <Box
      id="sidebar"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Button
          id="new-chat-btn"
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onNewChat}
          sx={{
            py: 1.25,
            fontWeight: 600,
            fontSize: '0.8125rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5558e8 0%, #7c4fe8 50%, #9b7df2 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)',
            },
          }}
        >
          New Chat
        </Button>
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto', py: 0.5, px: 0.5 }}>
        {sessions.map((session) => {
          const isActive = session.id === activeSessionId;
          return (
            <ListItem
              key={session.id}
              disablePadding
              secondaryAction={
                <IconButton
                  className="sidebar-session-delete"
                  edge="end"
                  size="small"
                  aria-label="Delete session"
                  onClick={() => onDeleteSession(session.id)}
                  sx={{
                    mr: 0.5,
                    opacity: { xs: 1, sm: 0 },
                    color: 'text.disabled',
                    '&:hover': {
                      bgcolor: 'rgba(248, 113, 113, 0.1)',
                      color: 'error.main',
                    },
                  }}
                >
                  <DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              }
              sx={{
                mb: 0.25,
                '&:hover .sidebar-session-delete': { opacity: 1 },
              }}
            >
              <ListItemButton
                id={`session-${session.id.slice(0, 8)}`}
                selected={isActive}
                onClick={() => onSelectSession(session.id)}
                sx={{
                  borderRadius: 1.25,
                  pr: 6,
                  py: 1,
                  px: 2,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.18)' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: isActive ? 'primary.main' : 'text.disabled' }}>
                  <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                </ListItemIcon>
                <ListItemText
                  primary={session.title}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'text.primary' : 'text.secondary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <InfoOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
          <Typography variant="caption" color="text.disabled">
            Powered by Qwen + LangChain
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
