import React, { useState } from 'react';
import { Box, Paper, TextField, IconButton, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import StopIcon from '@mui/icons-material/Stop';

const CHAT_MAX_WIDTH = 820;

export default function ChatInput({ onSend, isLoading, onStop }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        pt: 0,
        pb: 2,
      }}
    >
      <Box
        component="form"
        id="chat-input-form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: CHAT_MAX_WIDTH, mx: 'auto' }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 0.5,
            pl: 2,
            pr: 0.5,
            py: 0.5,
            borderRadius: 2.5,
            bgcolor: 'rgba(30, 30, 50, 0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: 'divider',
            transition: 'border-color 150ms, box-shadow 150ms',
            '&:focus-within': {
              borderColor: 'primary.main',
              boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.15)',
            },
          }}
        >
          <TextField
            id="chat-input-textarea"
            multiline
            minRows={1}
            maxRows={6}
            fullWidth
            variant="standard"
            placeholder="Ask about your Innova scan tool..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'text.primary',
                py: 1,
                '& textarea::placeholder': {
                  color: 'text.disabled',
                  opacity: 1,
                },
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {isLoading ? (
              <IconButton
                type="button"
                id="stop-btn"
                aria-label="Stop generating"
                onClick={onStop}
                sx={{
                  width: 40,
                  height: 40,
                  color: 'common.white',
                  bgcolor: 'error.main',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '&:hover': { bgcolor: '#ef4444' },
                }}
              >
                <StopIcon sx={{ fontSize: 18 }} />
              </IconButton>
            ) : (
              <IconButton
                type="submit"
                id="send-btn"
                aria-label="Send message"
                disabled={!input.trim()}
                sx={(theme) => ({
                  width: 40,
                  height: 40,
                  ...(input.trim()
                    ? {
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
                        color: theme.palette.common.white,
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                        },
                      }
                    : {
                        bgcolor: 'rgba(30, 30, 50, 0.8)',
                        color: 'text.disabled',
                      }),
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(30, 30, 50, 0.8)',
                    color: 'text.disabled',
                    backgroundImage: 'none',
                  },
                })}
              >
                <SendIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Box>
        </Paper>
      </Box>
      <Typography
        variant="caption"
        component="p"
        sx={{
          display: { xs: 'none', sm: 'block' },
          textAlign: 'center',
          mt: 1,
          color: 'text.disabled',
          opacity: 0.85,
        }}
      >
        Press <kbd style={{ padding: '1px 5px', borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'rgba(30,30,50,0.8)' }}>Enter</kbd> to send,{' '}
        <kbd style={{ padding: '1px 5px', borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'rgba(30,30,50,0.8)' }}>Shift + Enter</kbd> for new line
      </Typography>
    </Box>
  );
}
