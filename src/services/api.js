/**
 * API Service - Handles all communication with the FastAPI backend.
 */

const API_BASE = '/api';

/**
 * Send a chat message and stream NDJSON events.
 * @param {string} sessionId - Session identifier
 * @param {string} message - User's message
 * @param {AbortSignal} signal - Optional abort signal
 */
export async function* sendChatMessageStream(sessionId, message, signal) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, message }),
    signal,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err}`);
  }

  if (!response.body) {
    throw new Error('Streaming not supported by browser');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    let newlineIdx = buffer.indexOf('\n');

    while (newlineIdx >= 0) {
      const rawLine = buffer.slice(0, newlineIdx).trim();
      buffer = buffer.slice(newlineIdx + 1);
      if (rawLine) {
        yield JSON.parse(rawLine);
      }
      newlineIdx = buffer.indexOf('\n');
    }
  }

  const finalLine = buffer.trim();
  if (finalLine) {
    yield JSON.parse(finalLine);
  }
}

export async function getChatHistory(sessionId) {
  const response = await fetch(`${API_BASE}/chat/history/${sessionId}`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
}

export async function getChatState(sessionId) {
  const response = await fetch(`${API_BASE}/chat/state/${sessionId}`);
  if (!response.ok) throw new Error('Failed to fetch chat state');
  return response.json();
}

export async function clearChatHistory(sessionId) {
  const response = await fetch(`${API_BASE}/chat/history/${sessionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to clear history');
  return response.json();
}

export async function getKnowledgeStats() {
  const response = await fetch(`${API_BASE}/knowledge/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

export async function reloadKnowledge() {
  const response = await fetch(`${API_BASE}/knowledge/reload`, {
    method: 'POST',
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err}`);
  }
  return response.json();
}

export async function uploadKnowledge(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/knowledge/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err}`);
  }

  return response.json();
}

export async function healthCheck() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error('Health check failed');
  return response.json();
}
