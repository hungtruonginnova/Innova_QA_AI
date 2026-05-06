import React, { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { getKnowledgeStats, uploadKnowledge } from '../services/api';

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_MS = 5 * 60 * 1000;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function UploadKnowledgeDialog({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const canSubmit = useMemo(() => Boolean(file) && !isUploading, [file, isUploading]);

  const handleClose = () => {
    if (isUploading) return;
    setFile(null);
    setError('');
    onClose();
  };

  const pollStatsUntilReady = async () => {
    const startedAt = Date.now();
    while (Date.now() - startedAt < MAX_POLL_MS) {
      const stats = await getKnowledgeStats();
      if (stats.status === 'ready' || stats.status === 'failed') {
        return stats;
      }
      await sleep(POLL_INTERVAL_MS);
    }
    throw new Error('Timed out while waiting for indexing to finish');
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError('');
    setResult(null);

    try {
      await uploadKnowledge(file);
      const stats = await pollStatsUntilReady();
      setResult(stats);
      if (stats.status === 'failed') {
        setError('Indexing failed on backend. Please check API logs and try again.');
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload knowledge dataset</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            Upload a new Excel file to replace the current dataset. Backend will re-index and update the chatbot.
          </Typography>

          <Button component="label" variant="outlined" disabled={isUploading}>
            {file ? `Selected: ${file.name}` : 'Choose .xlsx file'}
            <input
              hidden
              type="file"
              accept=".xlsx,.xls"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
          </Button>

          {isUploading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={18} />
              <Typography variant="body2">Uploading and indexing...</Typography>
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {result && (
            <Alert severity={result.status === 'ready' ? 'success' : 'warning'}>
              <Typography variant="body2">Status: {result.status}</Typography>
              <Typography variant="body2">Documents: {result.total_documents}</Typography>
              <Typography variant="body2">Topics: {result.total_topics}</Typography>
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isUploading}>Close</Button>
        <Button onClick={handleUpload} variant="contained" disabled={!canSubmit}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
