import React, { useState, KeyboardEvent, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface InputProps {
  onSubmit: (query: string) => void;
}

const Input = forwardRef<HTMLTextAreaElement, InputProps>(({ onSubmit }, ref) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid new line
      handleInputSubmit();
    }
  };

  return (
    <div className="flex w-full bg-carbon-gray-100 rounded-lg overflow-hidden">
      <textarea
        ref={ref}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe the data you want to retrieve..."
        className="flex-grow px-4 py-2 text-carbon-gray-10 bg-carbon-gray-100 border-none focus:outline-none focus:ring-0 resize-none min-h-[72px]"
        rows={3}
      />
      <button
        onClick={handleInputSubmit}
        className="px-3 py-2 text-carbon-blue-30 bg-carbon-gray-100 hover:bg-carbon-gray-90 focus:outline-none transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
