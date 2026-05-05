/**
 * API Service - Handles all communication with the FastAPI backend.
 */

const API_BASE = '/api';

/**
 * Send a chat message and receive a complete JSON response.
 * @param {string} sessionId - Session identifier
 * @param {string} message - User's message
 * @returns {Promise<{message, category, sub_category, missing_fields, sources}>}
 */
export async function sendChatMessage(sessionId, message) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, message }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HTTP ${response.status}: ${err}`);
  }

  return response.json();
}

/**
 * Get chat history for a session.
 */
export async function getChatHistory(sessionId) {
  const response = await fetch(`${API_BASE}/chat/history/${sessionId}`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
}

/**
 * Clear chat history for a session.
 */
export async function clearChatHistory(sessionId) {
  const response = await fetch(`${API_BASE}/chat/history/${sessionId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to clear history');
  return response.json();
}

/**
 * Get knowledge base statistics.
 */
export async function getKnowledgeStats() {
  const response = await fetch(`${API_BASE}/knowledge/stats`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
}

/**
 * Health check.
 */
export async function healthCheck() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error('Health check failed');
  return response.json();
}
