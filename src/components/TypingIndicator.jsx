import React from 'react';
import { Box, Stack, Paper, Avatar, Typography } from '@mui/material';

export default function TypingIndicator() {
  return (
    <Stack
      id="typing-indicator"
      direction="row"
      spacing={1}
      sx={{
        maxWidth: 820,
        mx: 'auto',
        width: '100%',
        py: 0.5,
        animation: 'fadeIn 250ms ease',
      }}
    >
      <Avatar
        variant="rounded"
        sx={{
          width: 32,
          height: 32,
          mt: 0.5,
          flexShrink: 0,
          bgcolor: 'transparent',
          backgroundImage: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        }}
      >
        <Typography component="span" sx={{ fontSize: 12, fontWeight: 700, color: 'common.white' }}>
          AI
        </Typography>
      </Avatar>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 2,
          py: 1.5,
          borderRadius: 2,
          borderTopLeftRadius: 4,
          bgcolor: 'rgba(30, 30, 50, 0.6)',
          border: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              animation: 'typingBounce 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Paper>
    </Stack>
  );
}
