import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const chipSx = {
  height: 22,
  fontSize: '0.6875rem',
  fontWeight: 500,
  bgcolor: 'rgba(255, 255, 255, 0.06)',
  color: 'text.secondary',
  border: 'none',
};

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
              bgcolor: '#2f2f2f',
              borderColor: 'divider',
              borderRadius: 1.5,
              transition: 'background-color 150ms, border-color 150ms',
              '&:hover': {
                borderColor: 'divider',
                bgcolor: '#3a3a3a',
              },
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap" sx={{ mb: 0.5 }}>
                <Chip size="small" label={source.category || 'General'} sx={chipSx} />
                {source.tool_name && (
                  <Chip size="small" label={source.tool_name} sx={chipSx} />
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
