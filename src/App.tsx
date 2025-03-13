import React, { useState, useCallback } from 'react';
import Input from './Input';
import Editor from './Editor';

const App: React.FC = () => {
  const [sql, setSql] = useState<string>('');

  const handleSubmit = useCallback((query: string) => {
    console.log(`User submitted: ${query}`);
    // This would normally call an API or process the query
    // For now, we'll just set some sample SQL based on the query
    setSql(`-- SQL generated from: ${query}\nSELECT * FROM users WHERE name LIKE '%${query}%';`);
  }, [setSql]);

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
          
          {/* Right column (Input) */}
          <div className="w-full md:w-1/2 order-1 md:order-2 h-[calc(100vh-2rem)]">
            <div className="bg-carbon-gray-80 rounded-lg shadow-md h-full flex items-center justify-center">
              <Input onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
