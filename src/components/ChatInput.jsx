import React, { useState } from 'react';
import { Box, Paper, TextField, IconButton, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StopIcon from '@mui/icons-material/Stop';

const CHAT_MAX_WIDTH = 768;

export default function ChatInput({ onSend, isLoading, onStop, embedded = false }) {
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

  const handleStop = () => {
    onStop?.();
  };

  return (
    <Box
      sx={{
        px: embedded ? 0 : { xs: 2, sm: 3 },
        pt: 0,
        pb: embedded ? 0 : 2,
        width: '100%',
      }}
    >
      <Box component="form" id="chat-input-form" onSubmit={handleSubmit} sx={{ maxWidth: CHAT_MAX_WIDTH, mx: 'auto' }}>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 0.5,
            pl: 2.5,
            pr: 0.75,
            py: 1.25,
            borderRadius: '1.5rem',
            bgcolor: '#2f2f2f',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'border-color 150ms ease',
            '&:focus-within': {
              borderColor: 'rgba(255,255,255,0.3)',
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
            placeholder="Message SolutionData AI..."
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
                py: 0.5,
                '& textarea::placeholder': {
                  color: 'text.disabled',
                  opacity: 1,
                },
              },
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, pb: 0.25 }}>
            {isLoading ? (
              <IconButton
                type="button"
                id="stop-btn"
                aria-label="Stop generating"
                onClick={handleStop}
                sx={{
                  width: 36,
                  height: 36,
                  color: '#000',
                  bgcolor: '#ececec',
                  '&:hover': { bgcolor: '#d4d4d4' },
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
                sx={{
                  width: 36,
                  height: 36,
                  ...(input.trim()
                    ? {
                        bgcolor: '#ececec',
                        color: '#000',
                        '&:hover': { bgcolor: '#d4d4d4' },
                      }
                    : {
                        bgcolor: '#404040',
                        color: '#8e8e8e',
                      }),
                  '&.Mui-disabled': {
                    bgcolor: '#404040',
                    color: '#8e8e8e',
                  },
                }}
              >
                <ArrowUpwardIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>
        </Paper>
      </Box>
      {!embedded && (
        <Typography
          variant="caption"
          component="p"
          sx={{
            display: { xs: 'none', sm: 'block' },
            textAlign: 'center',
            mt: 1,
            color: 'text.disabled',
            fontSize: '0.6875rem',
            lineHeight: 1.5,
          }}
        >
          AI can make mistakes. Check important info.
        </Typography>
      )}
    </Box>
  );
}
