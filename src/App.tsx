import React, { useState } from 'react';
import Input from './Input';
import Editor from './Editor';

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
