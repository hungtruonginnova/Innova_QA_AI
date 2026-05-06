import React, { useRef, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

const CHAT_MAX_WIDTH = 768;

const suggestions = [
  { id: 'suggestion-1', text: 'SDS50 update error', query: 'My SDS50 shows an update error' },
  {
    id: 'suggestion-2',
    text: 'Connect scan tool to vehicle',
    query: 'How do I connect the scan tool to my vehicle?',
  },
  {
    id: 'suggestion-3',
    text: 'VCI connection issue',
    query: 'VCI not connected message on my 7111',
  },
  {
    id: 'suggestion-4',
    text: 'Package contents',
    query: "What's included in the SDS50 package?",
  },
];

export default function ChatWindow({ messages, isLoading, onSend, onStop }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  if (isEmpty) {
    return (
      <Box
        id="chat-window"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            py: 4,
          }}
        >
          <Stack
            alignItems="center"
            sx={{
              width: '100%',
              maxWidth: CHAT_MAX_WIDTH,
              gap: 3,
              animation: 'fadeIn 0.35s ease',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                textAlign: 'center',
                color: 'text.primary',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                letterSpacing: '-0.02em',
              }}
            >
              What can I help with?
            </Typography>
            <Box sx={{ width: '100%' }}>
              <ChatInput onSend={onSend} isLoading={isLoading} onStop={onStop} embedded />
            </Box>
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              gap={1}
              sx={{ width: '100%' }}
            >
              {suggestions.map((s) => (
                <Button
                  key={s.id}
                  id={s.id}
                  variant="outlined"
                  onClick={() => onSend(s.query)}
                  sx={{
                    borderRadius: 999,
                    px: 2,
                    py: 0.75,
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'text.secondary',
                    borderColor: 'divider',
                    bgcolor: 'transparent',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'divider',
                      bgcolor: '#2a2a2a',
                      color: 'text.primary',
                    },
                  }}
                >
                  {s.text}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      id="chat-window"
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: { xs: 2, sm: 3 },
          py: 3,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: CHAT_MAX_WIDTH, mx: 'auto', width: '100%' }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </Stack>
      </Box>

      <Box
        sx={{
          flexShrink: 0,
          position: 'relative',
          bgcolor: 'background.default',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            top: -48,
            height: 48,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(33, 33, 33, 0), #212121)',
          },
        }}
      >
        <ChatInput onSend={onSend} isLoading={isLoading} onStop={onStop} />
      </Box>
    </Box>
  );
}
