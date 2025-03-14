import { useState, useCallback } from "react";

// Message type definition
export type Message = {
  text: string;
  date: Date;
  sender: "USER" | "AGENT";
};

// Maximum number of messages to keep in conversation history
const MAX_MESSAGES = 20;

// Welcome message that will always stay as the first message
const WELCOME_MESSAGE: Message = {
  text: "Hi, I'm your SQL assistant. I can help you build SQL queries through natural conversation. Just describe the data you want to retrieve, and I'll generate the appropriate SQL query for you. You can be as specific or general as you like, and we can refine the query together until it meets your needs.",
  date: new Date(),
  sender: "AGENT",
};

// Example message that can be deleted if conversation gets too long
const EXAMPLE_MESSAGE: Message = {
  text: "For example, you may ask me to write a query that finds all users who signed up in the last month. I'll generate something like:\n\n```sql\nSELECT username, email, signup_date \nFROM users \nWHERE signup_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH);\n```\n\nFeel free to try your own request!",
  date: new Date(),
  sender: "AGENT",
};

/**
 * Hook for managing conversation state
 * @returns [conversation, addMessage] - Array containing conversation and function to add messages
 */
export function useConversation(): [Message[], (message: Message) => void] {
  const [conversation, setConversation] = useState<Message[]>([
    WELCOME_MESSAGE,
    EXAMPLE_MESSAGE,
  ]);

  const addMessage = useCallback((message: Message) => {
    setConversation((prevConversation) => {
      // If we already have the maximum number of messages (including welcome message)
      if (prevConversation.length >= MAX_MESSAGES) {
        // Keep welcome message (index 0), remove the oldest message after welcome (index 1)
        return [prevConversation[0], ...prevConversation.slice(2), message];
      }
      // Otherwise, just add the new message
      return [...prevConversation, message];
    });
  }, []);

  return [conversation, addMessage];
}
