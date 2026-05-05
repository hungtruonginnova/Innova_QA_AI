/**
 * useChat hook - Manages chat state (non-streaming).
 */

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendChatMessage, clearChatHistory } from '../services/api';

export function useChat() {
  const [sessions, setSessions] = useState(() => {
    const id = uuidv4();
    return [{ id, title: 'New Chat', createdAt: new Date().toISOString() }];
  });
  const [activeSessionId, setActiveSessionId] = useState(() => sessions[0]?.id);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getSessionMessages = useCallback(() => {
    return messages[activeSessionId] || [];
  }, [messages, activeSessionId]);

  const addMessage = useCallback((sessionId, message) => {
    setMessages((prev) => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] || []), message],
    }));
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const sessionId = activeSessionId;

    // Add user message
    const userMsg = {
      id: uuidv4(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    addMessage(sessionId, userMsg);

    // Update session title from first message
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId && s.title === 'New Chat') {
          return { ...s, title: text.trim().slice(0, 50) + (text.length > 50 ? '...' : '') };
        }
        return s;
      })
    );

    setIsLoading(true);

    try {
      const result = await sendChatMessage(sessionId, text.trim());

      const assistantMsg = {
        id: uuidv4(),
        role: 'assistant',
        content: result.message,
        timestamp: new Date().toISOString(),
        metadata: {
          category: result.category,
          sub_category: result.sub_category,
          missing_fields: result.missing_fields,
        },
        sources: result.sources,
      };
      addMessage(sessionId, assistantMsg);
    } catch (error) {
      const errMsg = {
        id: uuidv4(),
        role: 'assistant',
        content: `Sorry, an error occurred: ${error.message}`,
        timestamp: new Date().toISOString(),
        isError: true,
      };
      addMessage(sessionId, errMsg);
    } finally {
      setIsLoading(false);
    }
  }, [activeSessionId, isLoading, addMessage]);

  const createNewSession = useCallback(() => {
    const id = uuidv4();
    const newSession = { id, title: 'New Chat', createdAt: new Date().toISOString() };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(id);
  }, []);

  const deleteSession = useCallback(async (sessionId) => {
    try {
      await clearChatHistory(sessionId);
    } catch {
      // Ignore API errors on delete
    }

    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessionId);
      if (filtered.length === 0) {
        const id = uuidv4();
        const newSession = { id, title: 'New Chat', createdAt: new Date().toISOString() };
        setActiveSessionId(id);
        return [newSession];
      }
      if (sessionId === activeSessionId) {
        setActiveSessionId(filtered[0].id);
      }
      return filtered;
    });

    setMessages((prev) => {
      const { [sessionId]: _, ...rest } = prev;
      return rest;
    });
  }, [activeSessionId]);

  const switchSession = useCallback((sessionId) => {
    if (isLoading) return;
    setActiveSessionId(sessionId);
  }, [isLoading]);

  return {
    sessions,
    activeSessionId,
    messages: getSessionMessages(),
    isLoading,
    sendMessage,
    createNewSession,
    deleteSession,
    switchSession,
  };
}
