import React from 'react';

interface EditorProps {
  sql: string;
}

const Editor: React.FC<EditorProps> = ({ sql }) => {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="bg-carbon-gray-100 text-carbon-blue-30 p-4 rounded overflow-auto flex-grow">
        <pre className="whitespace-pre-wrap">{sql || "-- Your SQL will appear here"}</pre>
      </div>
    </div>
  );
};

export default Editor;