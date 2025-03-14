import React, { useState, useCallback } from "react";
import Editor from "./Editor";
import Chat from "./Chat";
import { useConversation } from "./useConversation";
import "tippy.js/dist/tippy.css";
import "./tippy-theme.css"; // We'll create this custom CSS file

const App: React.FC = () => {
  const [sql, setSql] = useState<string>("");
  const [conversation, addMessage] = useConversation();

  const handleSubmit = useCallback(
    (query: string) => {
      console.log(`User submitted: ${query}`);
      // This would normally call an API or process the query
      // For now, we'll just set some sample SQL based on the query
      setSql(
        `-- SQL generated from: ${query}\nSELECT * FROM users WHERE name LIKE '%${query}%';`,
      );
    },
    [setSql],
  );


  const handleApply = useCallback(
    (message: string, code: string) => {
      console.log(`Applying code: ${code} for message: ${message}`);
    },
    [],
  );

  // Handle sending a message in the chat
  const handleSendMessage = useCallback(
    (text: string) => {
      // Add user message to conversation
      addMessage({
        text,
        date: new Date(),
        sender: "USER",
      });

      // Process the query to generate SQL
      handleSubmit(text);

      // Add agent response to conversation
      addMessage({
        text: `I've generated SQL for your query: \`\`\`sql\nSELECT * FROM users WHERE name LIKE '%${text}%';\n\`\`\``,
        date: new Date(),
        sender: "AGENT",
      });
    },
    [addMessage, handleSubmit],
  );

  return (
    <div className="min-h-screen bg-carbon-gray-90 text-carbon-gray-10 flex flex-col">
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Left column (Editor) */}
          <div className="w-full md:w-1/2 order-2 md:order-1 h-[calc(100vh-2rem)]">
            <div className="bg-carbon-gray-100 rounded-lg shadow-md h-full">
              <Editor sql={sql} />
            </div>
          </div>

          {/* Right column (Chat) - replaced Input with Chat */}
          <div className="w-full md:w-1/2 order-1 md:order-2 h-[calc(100vh-2rem)]">
            <div className="bg-gradient-to-b from-carbon-gray-90 to-carbon-gray-80 p-8 rounded-lg shadow-md h-full">
              <Chat messages={conversation} onSend={handleSendMessage} onApply={handleApply} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
