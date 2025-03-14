import React, { useEffect, useRef, forwardRef } from "react";
import Message from "./Message";
import Input from "./Input";
import { Message as MessageType } from "./useConversation";

interface ChatProps {
  messages: MessageType[];
  onSend: (message: string) => void;
  onApply: (code: string) => void;
  isLoading: boolean;
}

const Chat = forwardRef<HTMLTextAreaElement, ChatProps>(({ messages, onSend, onApply, isLoading }, ref) => {
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
      <div className="p-2 relative">
        <Input ref={ref} onSubmit={onSend} />
        {isLoading && (
          <div className="absolute inset-0 bg-carbon-gray-90/50 flex justify-center items-center backdrop-blur-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
});

Chat.displayName = 'Chat';

export default Chat;
