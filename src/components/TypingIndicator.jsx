import React from 'react';
import { Box, Stack, Avatar } from '@mui/material';

const CHAT_MAX_WIDTH = 768;

export default function TypingIndicator() {
  return (
    <Stack
      id="typing-indicator"
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        maxWidth: CHAT_MAX_WIDTH,
        mx: 'auto',
        width: '100%',
        py: 0.5,
        animation: 'fadeIn 200ms ease',
      }}
    >
      <Avatar
        sx={{
          width: 28,
          height: 28,
          flexShrink: 0,
          bgcolor: '#ececec',
          color: '#000',
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        AI
      </Avatar>
      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ py: 1 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#b4b4b4',
              animation: 'pulse 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
