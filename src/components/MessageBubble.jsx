import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, Paper, Typography, Chip, Avatar } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SourceCard from './SourceCard';

const CHAT_MAX_WIDTH = 820;

const markdownSx = {
  fontSize: '0.875rem',
  lineHeight: 1.7,
  '& p': { mb: 1, '&:last-child': { mb: 0 } },
  '& strong': { color: 'text.primary', fontWeight: 600 },
  '& ol, & ul': { pl: 3, mb: 1 },
  '& li': { mb: 0.5 },
  '& code': {
    bgcolor: 'rgba(255, 255, 255, 0.06)',
    px: 0.75,
    py: 0.25,
    borderRadius: 0.5,
    fontSize: '0.8125rem',
    fontFamily: "'SF Mono', 'Fira Code', monospace",
  },
  '& pre': {
    bgcolor: 'background.default',
    p: 2,
    borderRadius: 1,
    overflowX: 'auto',
    my: 1,
    border: '1px solid',
    borderColor: 'divider',
    '& code': { bgcolor: 'transparent', p: 0 },
  },
  '& a': {
    color: 'secondary.main',
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
};

function AssistantAvatar() {
  return (
    <Avatar
      variant="rounded"
      sx={{
        width: 32,
        height: 32,
        mt: 0.5,
        flexShrink: 0,
        bgcolor: 'transparent',
        backgroundImage: `linear-gradient(135deg, #6366f1, #8b5cf6)`,
      }}
    >
      <Typography component="span" sx={{ fontSize: 12, fontWeight: 700, color: 'common.white' }}>
        AI
      </Typography>
    </Avatar>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isError = message.isError;
  const msgKey = message.id?.slice(0, 8) ?? 'msg';

  return (
    <Stack
      id={`msg-${msgKey}`}
      direction="row"
      spacing={1}
      sx={{
        maxWidth: CHAT_MAX_WIDTH,
        mx: 'auto',
        width: '100%',
        py: 1,
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        animation: isUser ? 'slideInRight 250ms ease' : 'slideInLeft 250ms ease',
      }}
    >
      {!isUser && <AssistantAvatar />}

      <Box
        sx={{
          maxWidth: { xs: '85%', sm: '75%' },
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        {!isUser && message.metadata?.category && message.metadata.category !== 'unknown' && (
          <Stack direction="row" alignItems="center" spacing={0.75} flexWrap="wrap" sx={{ mb: 0.5 }}>
            <Chip
              size="small"
              label={
                message.metadata.sub_category && message.metadata.sub_category !== 'unknown'
                  ? `${message.metadata.category} → ${message.metadata.sub_category}`
                  : message.metadata.category
              }
              sx={{
                height: 22,
                fontSize: '0.6875rem',
                fontWeight: 500,
                bgcolor: 'rgba(99, 102, 241, 0.15)',
                color: 'secondary.main',
                border: '1px solid rgba(99, 102, 241, 0.12)',
              }}
            />
            {message.metadata.missing_fields?.length > 0 && (
              <Chip
                size="small"
                icon={<HelpOutlineOutlinedIcon sx={{ fontSize: 14 }} />}
                label="Needs more info"
                sx={{
                  height: 22,
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  bgcolor: 'rgba(251, 191, 36, 0.08)',
                  color: 'warning.main',
                  border: '1px solid rgba(251, 191, 36, 0.15)',
                  '& .MuiChip-icon': { color: 'warning.main' },
                }}
              />
            )}
          </Stack>
        )}

        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 2,
            wordBreak: 'break-word',
            ...(isUser
              ? {
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
                  color: 'common.white',
                  borderTopRightRadius: 4,
                  boxShadow: '0 2px 12px rgba(99, 102, 241, 0.2)',
                }
              : {
                  bgcolor: 'rgba(30, 30, 50, 0.6)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderTopLeftRadius: 4,
                  backdropFilter: 'blur(8px)',
                  ...(isError && {
                    borderColor: 'rgba(248, 113, 113, 0.2)',
                    bgcolor: 'rgba(248, 113, 113, 0.05)',
                  }),
                }),
          }}
        >
          {isUser ? (
            <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {message.content}
            </Typography>
          ) : (
            <Box sx={markdownSx}>
              <ReactMarkdown>{message.content}</ReactMarkdown>
              {message.isStreaming && (
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    ml: 0.25,
                    animation: 'pulse 1s ease-in-out infinite',
                    color: 'primary.main',
                  }}
                >
                  ▊
                </Box>
              )}
            </Box>
          )}
        </Paper>

        {!isUser && !message.isStreaming && message.sources && <SourceCard sources={message.sources} />}
      </Box>

      {isUser && (
        <Avatar
          variant="rounded"
          sx={{
            width: 32,
            height: 32,
            mt: 0.5,
            flexShrink: 0,
            bgcolor: 'rgba(30, 30, 50, 0.9)',
            color: 'text.secondary',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />
        </Avatar>
      )}
    </Stack>
  );
}
