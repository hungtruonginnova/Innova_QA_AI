import React, { useMemo, useState } from 'react';
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import UploadKnowledgeDialog from './UploadKnowledgeDialog';

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function groupSessionsByRecency(sessions) {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const today = [];
  const previous7 = [];
  const earlier = [];

  for (const s of sessions) {
    const created = new Date(s.createdAt);
    if (created >= todayStart) today.push(s);
    else if (created >= weekStart) previous7.push(s);
    else earlier.push(s);
  }

  return { today, previous7, earlier };
}

function SessionListSection({ title, sessions, activeSessionId, onSelectSession, onDeleteSession }) {
  if (sessions.length === 0) return null;

  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        variant="overline"
        sx={{
          display: 'block',
          px: 2,
          py: 0.75,
          color: 'text.disabled',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
        }}
      >
        {title}
      </Typography>
      <List disablePadding sx={{ px: 0.5 }}>
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  sx={{
                    mr: 0.25,
                    opacity: { xs: 1, sm: 0 },
                    color: 'text.disabled',
                    '&:hover': {
                      bgcolor: '#2a2a2a',
                      color: 'text.primary',
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
                  borderRadius: 1,
                  pr: 5,
                  py: 1,
                  px: 1.5,
                  '&:hover': { bgcolor: '#2a2a2a' },
                  '&.Mui-selected': {
                    bgcolor: '#2a2a2a',
                    '&:hover': { bgcolor: '#2a2a2a' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: isActive ? 'text.primary' : 'text.disabled' }}>
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
    </Box>
  );
}

export default function Sidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}) {
  const { today, previous7, earlier } = useMemo(() => groupSessionsByRecency(sessions), [sessions]);
  const [uploadOpen, setUploadOpen] = useState(false);

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
      <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <Stack spacing={1}>
        <Button
          id="new-chat-btn"
          fullWidth
          variant="outlined"
          startIcon={<EditOutlinedIcon sx={{ fontSize: 18 }} />}
          onClick={onNewChat}
          sx={{
            py: 1,
            fontWeight: 500,
            fontSize: '0.8125rem',
            color: 'text.primary',
            borderColor: 'rgba(255,255,255,0.12)',
            bgcolor: 'transparent',
            '&:hover': {
              borderColor: 'rgba(255,255,255,0.12)',
              bgcolor: '#2a2a2a',
            },
          }}
        >
          New chat
        </Button>
        <Button
          fullWidth
          variant="text"
          startIcon={<UploadFileOutlinedIcon sx={{ fontSize: 18 }} />}
          onClick={() => setUploadOpen(true)}
          sx={{
            py: 0.75,
            fontWeight: 500,
            fontSize: '0.8125rem',
            color: 'text.secondary',
            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': { bgcolor: '#2a2a2a', color: 'text.primary' },
          }}
        >
          Upload knowledge
        </Button>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', py: 0.5 }}>
        <SessionListSection
          title="Today"
          sessions={today}
          activeSessionId={activeSessionId}
          onSelectSession={onSelectSession}
          onDeleteSession={onDeleteSession}
        />
        <SessionListSection
          title="Previous 7 days"
          sessions={previous7}
          activeSessionId={activeSessionId}
          onSelectSession={onSelectSession}
          onDeleteSession={onDeleteSession}
        />
        <SessionListSection
          title="Earlier"
          sessions={earlier}
          activeSessionId={activeSessionId}
          onSelectSession={onSelectSession}
          onDeleteSession={onDeleteSession}
        />
      </Box>

      <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={0.75}>
          <InfoOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6875rem' }}>
            Powered by Gemma + LangChain
          </Typography>
        </Stack>
      </Box>
      <UploadKnowledgeDialog open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </Box>
  );
}
