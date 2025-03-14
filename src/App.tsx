import React, { useState, useCallback } from "react";
import Editor from "./Editor";
import Chat from "./Chat";
import { useConversation } from "./useConversation";
import "tippy.js/dist/tippy.css";
import "./tippy-theme.css";
import { editorAgent, analystAgent } from "./Agent";

const INITIAL_SQL = "-- Your SQL will appear here";


const App: React.FC = () => {
  const [sql, setSql] = useState<string>(INITIAL_SQL);
  const [conversation, addMessage] = useConversation();

  const handleApply = useCallback(
    async (code: string) => {
      const newSql = await editorAgent.apply({sqlChanges: code, currentSql: sql});
      setSql(newSql);
      console.log(`Applying code: ${code}`);
    },
    [sql],
  );

  // Handle sending a message in the chat
  const handleSend = useCallback(
    async (text: string) => {
      addMessage({
        text,
        date: new Date(),
        sender: "USER",
      });
      const response = await analystAgent.ask({currentSql: sql, conversation: [...conversation, {text, date: new Date(), sender: "USER"}]});
      addMessage(response);
    },
    [addMessage],
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
              <Chat messages={conversation} onSend={handleSend} onApply={handleApply} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
