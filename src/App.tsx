import React, { useState, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Input component defined inside App.tsx
const Input: React.FC<{ onSubmit: (query: string) => void }> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  return (
    <div className="flex w-full max-w-md bg-carbon-gray-100 rounded-lg overflow-hidden">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe the data you want to retrieve..."
        className="flex-grow px-4 py-2 text-carbon-gray-10 bg-carbon-gray-100 border-none focus:outline-none focus:ring-0"
      />
      <button
        onClick={handleInputSubmit}
        className="px-3 py-2 text-carbon-blue-30 bg-carbon-gray-100 hover:bg-carbon-gray-90 focus:outline-none transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

// Editor component defined inside App.tsx
const Editor: React.FC<{ sql: string }> = ({ sql }) => {
  return (
    <div className="bg-carbon-gray-90 text-carbon-blue-30 p-6 rounded-lg shadow-md h-full">
      <div className="bg-carbon-gray-100 text-carbon-blue-30 p-4 rounded overflow-x-auto">
        <pre>{sql || "-- Your SQL will appear here"}</pre>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [generatedSQL, setGeneratedSQL] = useState<string>('');

  const handleSubmit = (query: string) => {
    console.log(`User submitted: ${query}`);
    // This would normally call an API or process the query
    // For now, we'll just set some sample SQL based on the query
    setGeneratedSQL(`-- SQL generated from: ${query}\nSELECT * FROM users WHERE name LIKE '%${query}%';`);
  };

  return (
    <div className="min-h-screen bg-carbon-gray-90 text-carbon-gray-10 flex flex-col">
      <main className="container mx-auto p-6 flex-grow">
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Left column (Editor) - now without white container */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <Editor sql={generatedSQL} />
          </div>
          
          {/* Right column (Input) */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="bg-carbon-gray-80 rounded-lg shadow-md p-6 h-full">
              <div className="flex justify-center items-center h-full">
                <Input onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
