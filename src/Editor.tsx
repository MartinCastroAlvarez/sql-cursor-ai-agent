import React from 'react';

interface EditorProps {
  sql: string;
}

const Editor: React.FC<EditorProps> = ({ sql }) => {
  return (
    <div className="bg-carbon-gray-90 text-carbon-blue-30 p-6 rounded-lg shadow-md h-full">
      <div className="bg-carbon-gray-100 text-carbon-blue-30 p-4 rounded overflow-x-auto">
        <pre>{sql || "-- Your SQL will appear here"}</pre>
      </div>
    </div>
  );
};

export default Editor;