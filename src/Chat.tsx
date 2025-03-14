import React, { useEffect, useRef } from "react";
import Message from "./Message";
import Input from "./Input";
import { Message as MessageType } from "./useConversation";

interface ChatProps {
  messages: MessageType[];
  onSend: (message: string) => void;
  onApply: (message: string, code: string) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSend, onApply }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages container - scrollable */}
      <div className="flex-grow overflow-y-auto mb-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${message.sender === "USER" ? "ml-auto" : "mr-auto"} max-w-[80%]`}
          >
            <Message text={message.text} sender={message.sender} onApply={onApply} />
          </div>
        ))}
        {/* Empty div for scroll reference */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container - fixed at bottom */}
      <div className="p-2">
        <Input onSubmit={onSend} />
      </div>
    </div>
  );
};

export default Chat;
