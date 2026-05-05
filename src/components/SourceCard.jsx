import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export default function SourceCard({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <Box id="source-references" sx={{ mt: 2, animation: 'fadeIn 250ms ease' }}>
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
        <DescriptionOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 500 }}>
          Sources ({sources.length})
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 0.5 }}>
        {sources.slice(0, 3).map((source, idx) => (
          <Card
            key={idx}
            id={`source-${idx}`}
            variant="outlined"
            sx={{
              minWidth: 200,
              maxWidth: 240,
              flexShrink: 0,
              bgcolor: 'rgba(30, 30, 50, 0.6)',
              backdropFilter: 'blur(16px)',
              borderColor: 'divider',
              borderRadius: 1.25,
              transition: 'border-color 150ms, background-color 150ms',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.12)',
                bgcolor: 'rgba(40, 40, 65, 0.7)',
              },
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap" sx={{ mb: 0.5 }}>
                <Chip
                  size="small"
                  label={source.category || 'General'}
                  sx={{
                    height: 22,
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    bgcolor: 'rgba(99, 102, 241, 0.15)',
                    color: 'secondary.main',
                    border: '1px solid rgba(99, 102, 241, 0.15)',
                  }}
                />
                {source.tool_name && (
                  <Chip
                    size="small"
                    label={source.tool_name}
                    sx={{
                      height: 22,
                      fontSize: '0.6875rem',
                      fontWeight: 500,
                      bgcolor: 'rgba(52, 211, 153, 0.08)',
                      color: 'success.main',
                      border: '1px solid rgba(52, 211, 153, 0.15)',
                    }}
                  />
                )}
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4, display: 'block' }}>
                {source.question?.length > 80 ? `${source.question.slice(0, 80)}...` : source.question}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
