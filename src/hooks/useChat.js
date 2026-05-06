/**
 * useChat hook - Manages chat state (non-streaming).
 */

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendChatMessageStream, clearChatHistory } from '../services/api';

export function useChat() {
  const [sessions, setSessions] = useState(() => {
    const id = uuidv4();
    return [{ id, title: 'New Chat', createdAt: new Date().toISOString() }];
  });
  const [activeSessionId, setActiveSessionId] = useState(() => sessions[0]?.id);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const getSessionMessages = useCallback(() => {
    return messages[activeSessionId] || [];
  }, [messages, activeSessionId]);

  const addMessage = useCallback((sessionId, message) => {
    setMessages((prev) => ({
      ...prev,
      [sessionId]: [...(prev[sessionId] || []), message],
    }));
  }, []);

  const updateMessage = useCallback((sessionId, messageId, updater) => {
    setMessages((prev) => ({
      ...prev,
      [sessionId]: (prev[sessionId] || []).map((msg) => (
        msg.id === messageId ? updater(msg) : msg
      )),
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
    let assistantId = null;

    try {
      const controller = new AbortController();
      setAbortController(controller);

      assistantId = uuidv4();
      addMessage(sessionId, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        metadata: {},
        sources: [],
        isStreaming: true,
      });

      for await (const event of sendChatMessageStream(sessionId, text.trim(), controller.signal)) {
        if (event.type === 'meta') {
          updateMessage(sessionId, assistantId, (prev) => ({
            ...prev,
            metadata: {
              topic: event.topic,
              intent: event.intent,
              required_info: event.required_info,
              missing_fields: event.missing_fields,
              slots: event.slots,
            },
            sources: event.sources || [],
          }));
          continue;
        }

        if (event.type === 'delta') {
          updateMessage(sessionId, assistantId, (prev) => ({
            ...prev,
            content: `${prev.content || ''}${event.content || ''}`,
          }));
          continue;
        }

        if (event.type === 'final') {
          updateMessage(sessionId, assistantId, (prev) => ({
            ...prev,
            content: event.message || prev.content,
            metadata: {
              topic: event.topic,
              intent: event.intent,
              required_info: event.required_info,
              missing_fields: event.missing_fields,
              slots: event.slots,
            },
            isFollowUp: (event.missing_fields || []).length > 0,
            sources: event.sources || [],
            isStreaming: false,
          }));
        }
      }
    } catch (error) {
      if (error?.name === 'AbortError') {
        if (assistantId) {
          updateMessage(sessionId, assistantId, (prev) => ({
            ...prev,
            isStreaming: false,
          }));
        }
        return;
      }
      const errMsg = {
        id: uuidv4(),
        role: 'assistant',
        content: `Sorry, an error occurred: ${error.message}`,
        timestamp: new Date().toISOString(),
        isError: true,
      };
      addMessage(sessionId, errMsg);
    } finally {
      setAbortController(null);
      setIsLoading(false);
    }
  }, [activeSessionId, isLoading, addMessage, updateMessage]);

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

  const stopStreaming = useCallback(() => {
    abortController?.abort();
  }, [abortController]);

  return {
    sessions,
    activeSessionId,
    messages: getSessionMessages(),
    isLoading,
    sendMessage,
    stopStreaming,
    createNewSession,
    deleteSession,
    switchSession,
  };
}
