import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, Typography, Chip, Avatar } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const CHAT_MAX_WIDTH = 768;

const chipSx = {
  height: 22,
  fontSize: '0.6875rem',
  fontWeight: 500,
  bgcolor: 'rgba(255, 255, 255, 0.06)',
  color: 'text.secondary',
  border: 'none',
};

const markdownSx = {
  fontSize: '0.875rem',
  lineHeight: 1.7,
  color: 'text.primary',
  '& p': { mb: 1, '&:last-child': { mb: 0 } },
  '& strong': { color: 'text.primary', fontWeight: 600 },
  '& ol, & ul': { pl: 3, mb: 1 },
  '& li': { mb: 0.5 },
  '& code': {
    bgcolor: '#2f2f2f',
    px: 0.75,
    py: 0.25,
    borderRadius: 0.5,
    fontSize: '0.8125rem',
    fontFamily: "'SF Mono', 'Fira Code', ui-monospace, monospace",
  },
  '& pre': {
    bgcolor: '#171717',
    p: 2,
    borderRadius: 1,
    overflowX: 'auto',
    my: 1,
    border: '1px solid',
    borderColor: 'divider',
    '& code': { bgcolor: 'transparent', p: 0 },
  },
  '& a': {
    color: '#ececec',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
    '&:hover': { opacity: 0.85 },
  },
};

function AssistantAvatar() {
  return (
    <Avatar
      sx={{
        width: 28,
        height: 28,
        mt: 0.25,
        flexShrink: 0,
        bgcolor: '#ececec',
        color: '#000',
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      AI
    </Avatar>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isError = message.isError;
  const msgKey = message.id?.slice(0, 8) ?? 'msg';

  if (isUser) {
    return (
      <Stack
        id={`msg-${msgKey}`}
        direction="row"
        sx={{
          maxWidth: CHAT_MAX_WIDTH,
          mx: 'auto',
          width: '100%',
          justifyContent: 'flex-end',
          animation: 'fadeIn 200ms ease',
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '85%', sm: '70%' },
            px: 2,
            py: 1.25,
            borderRadius: '1.5rem',
            bgcolor: '#2f2f2f',
            color: '#ececec',
            wordBreak: 'break-word',
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack
      id={`msg-${msgKey}`}
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
      sx={{
        maxWidth: CHAT_MAX_WIDTH,
        mx: 'auto',
        width: '100%',
        animation: 'fadeIn 200ms ease',
      }}
    >
      <AssistantAvatar />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        {message.metadata?.topic && message.metadata.topic !== 'unknown' && (
          <Stack direction="row" alignItems="center" spacing={0.75} flexWrap="wrap" sx={{ mb: 1 }}>
            <Chip
              size="small"
              label={
                message.metadata.intent && message.metadata.intent !== 'unknown'
                  ? `${message.metadata.topic} → ${message.metadata.intent}`
                  : message.metadata.topic
              }
              sx={chipSx}
            />
            {message.metadata.missing_fields?.length > 0 && (
              <Chip
                size="small"
                icon={<HelpOutlineOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />}
                label={(message.metadata.missing_fields || []).length > 0
                  ? `Needs more info: ${(message.metadata.missing_fields || [])[0]}`
                  : 'Needs more info'}
                sx={{
                  ...chipSx,
                  '& .MuiChip-icon': { color: 'text.secondary' },
                }}
              />
            )}
          </Stack>
        )}

        <Box
          sx={{
            ...markdownSx,
            ...(isError && {
              color: 'error.main',
              '& a': { color: 'error.main' },
            }),
          }}
        >
          <ReactMarkdown>{message.content || ''}</ReactMarkdown>
          {message.isStreaming && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                ml: 0.25,
                animation: 'blinkCaret 1s step-end infinite',
                color: 'text.primary',
              }}
            >
              ▍
            </Box>
          )}
        </Box>

      </Box>
    </Stack>
  );
}
