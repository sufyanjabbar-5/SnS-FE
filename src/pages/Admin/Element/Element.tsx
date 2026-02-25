import React, { useState, useEffect, useCallback, JSX } from "react";
import { ChatInputSection } from "./sections/ChatInputSection";
import { SidebarSection } from "./sections/SidebarSection";
import api from "../../../services/api";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface ChatSession {
  id: number;
  externalSessionId: string;
  title: string;
  mode: string;
  index_name?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const Element = (): JSX.Element => {
  // State
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<string>("pmi-pmp");

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Load sessions from API
  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const response = await api.getChatSessions();
      if (response.success) {
        setSessions(response.data);
      }
    } catch (err) {
      console.error("Failed to load sessions:", err);
      setError("Failed to load chat sessions");
    } finally {
      setIsLoading(false);
    }
  };

  // Load messages for a session
  const loadMessages = async (sessionId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.getChatMessages(sessionId);
      if (response.success) {
        const { messages: sessionMessages, session } = response.data;
        setMessages(sessionMessages);
        setActiveSessionId(sessionId);
        // Sync selected certification with session data if available
        if (session && session.index_name) {
          setSelectedCertification(session.index_name);
        }
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
      setError("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle session selection
  const handleSelectSession = useCallback((sessionId: number) => {
    if (sessionId !== activeSessionId) {
      loadMessages(sessionId);
    }
  }, [activeSessionId]);

  // Handle new chat
  const handleNewChat = useCallback(() => {
    setActiveSessionId(null);
    setMessages([]);
    setInputValue("");
    setSelectedCertification("pmi-pmp");
    setError(null);
  }, []);

  // Handle send message
  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isSending) return;

    const trimmedMessage = message.trim();
    setIsSending(true);
    setError(null);

    // Optimistically add user message
    const tempUserMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMessage]);
    setInputValue("");

    try {
      let response: any;

      if (activeSessionId) {
        // Send to existing session
        response = await (api as any).sendChatMessage(activeSessionId, trimmedMessage, undefined, selectedCertification);
        if (response.success) {
          // Replace temp message with real one and add assistant response
          setMessages((prev) => {
            const filtered = prev.filter((m) => m.id !== tempUserMessage.id);
            return [
              ...filtered,
              response.data.userMessage,
              response.data.assistantMessage,
            ];
          });
        }
      } else {
        // Create new chat
        response = await (api as any).createChat(trimmedMessage, "default", selectedCertification);
        if (response.success) {
          const { session, messages: newMessages } = response.data;
          setActiveSessionId(session.id);
          setMessages(newMessages);
          // Add new session to list
          setSessions((prev) => [session, ...prev]);
        }
      }
    } catch (err: unknown) {
      console.error("Failed to send message:", err);
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMessage.id));
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  // Handle delete session
  const handleDeleteSession = async (sessionId: number) => {
    try {
      await api.deleteChatSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to delete session:", err);
      setError("Failed to delete chat session");
    }
  };

  return (
    <main className="flex items-start bg-[#212121] min-h-screen" data-model-id="168:10">
      <SidebarSection
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        isLoading={isLoading}
      />
      <ChatInputSection
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        isSending={isSending}
        error={error}
        activeSessionId={activeSessionId}
        selectedCertification={selectedCertification}
        setSelectedCertification={setSelectedCertification}
      />
    </main>
  );
};
