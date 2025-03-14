import { useState, useCallback } from 'react';

// Message type definition
export type Message = {
  text: string;
  date: Date;
  sender: "USER" | "AGENT";
};

// Maximum number of messages to keep in conversation history
const MAX_MESSAGES = 20;

/**
 * Hook for managing conversation state
 * @returns [conversation, addMessage] - Array containing conversation and function to add messages
 */
export function useConversation(): [Message[], (message: Message) => void] {
  const [conversation, setConversation] = useState<Message[]>([]);

  const addMessage = useCallback((message: Message) => {
    setConversation(prevConversation => {
      // If we already have the maximum number of messages, remove the oldest
      if (prevConversation.length >= MAX_MESSAGES) {
        return [...prevConversation.slice(1), message];
      }
      // Otherwise, just add the new message
      return [...prevConversation, message];
    });
  }, []);

  return [conversation, addMessage];
} 