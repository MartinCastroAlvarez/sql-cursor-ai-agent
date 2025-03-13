import React, { useState, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface InputProps {
  onSubmit: (query: string) => void;
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
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

export default Input;