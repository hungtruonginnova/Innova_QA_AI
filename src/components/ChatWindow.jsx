import React, { useRef, useEffect } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';

const CHAT_MAX_WIDTH = 820;

export default function ChatWindow({ messages, isLoading, onSend, onStop }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  const suggestions = [
    { id: 'suggestion-1', icon: '🔧', text: 'SDS50 update error', query: 'My SDS50 shows an update error' },
    {
      id: 'suggestion-2',
      icon: '🔌',
      text: 'Connect scan tool to vehicle',
      query: 'How do I connect the scan tool to my vehicle?',
    },
    {
      id: 'suggestion-3',
      icon: '⚠️',
      text: 'VCI connection issue',
      query: 'VCI not connected message on my 7111',
    },
    {
      id: 'suggestion-4',
      icon: '📦',
      text: 'Package contents',
      query: "What's included in the SDS50 package?",
    },
  ];

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
        {isEmpty ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            sx={{
              minHeight: '100%',
              py: 6,
              px: 2,
              animation: 'fadeIn 0.5s ease',
            }}
          >
            <Box
              sx={{
                mb: 3,
                animation: 'bounceIn 0.6s ease',
                filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))',
                '& svg': { width: 64, height: 64 },
              }}
            >
              <svg width="48" height="48" viewBox="0 0 32 32" aria-hidden>
                <defs>
                  <linearGradient id="welcome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#6366f1' }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6' }} />
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="8" fill="url(#welcome-grad)" />
                <text x="16" y="22" fontFamily="Arial" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">
                  AI
                </text>
              </svg>
            </Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 1,
                letterSpacing: '-0.03em',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Welcome to{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                SolutionData AI
              </Box>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 400, mb: 4, lineHeight: 1.6 }}
            >
              I&apos;m your Innova Electronics support assistant. Ask me anything about your scan tool!
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
                maxWidth: 500,
                width: '100%',
              }}
            >
              {suggestions.map((s) => (
                <Button
                  key={s.id}
                  id={s.id}
                  variant="outlined"
                  onClick={() => onSend(s.query)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    color: 'text.secondary',
                    borderColor: 'divider',
                    bgcolor: 'rgba(30, 30, 50, 0.6)',
                    backdropFilter: 'blur(16px)',
                    textTransform: 'none',
                    fontWeight: 400,
                    fontSize: '0.8125rem',
                    '&:hover': {
                      color: 'text.primary',
                      borderColor: 'divider',
                      bgcolor: 'rgba(40, 40, 65, 0.7)',
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box component="span" sx={{ fontSize: '1.25rem', mr: 1.5, flexShrink: 0 }}>
                    {s.icon}
                  </Box>
                  {s.text}
                </Button>
              ))}
            </Box>
          </Stack>
        ) : (
          <Stack spacing={1} sx={{ maxWidth: CHAT_MAX_WIDTH, mx: 'auto', width: '100%' }}>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && <TypingIndicator />}
          </Stack>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <ChatInput onSend={onSend} isLoading={isLoading} onStop={onStop} />
    </Box>
  );
}
