import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPlay } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

// Define our own CodeProps interface since we can't import it
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

interface MessageProps {
  text: string;
  sender: "USER" | "AGENT";
  onApply: (message: string, code: string) => void;
}

const extractText = (node: any): string => {
  // If node is null or undefined, return empty string
  if (node === null || node === undefined) return "";
  
  // If it's a string or number, return it directly
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  
  // If it's an array, process each item and join
  if (Array.isArray(node)) {
    return node.map(item => extractText(item)).join('');
  }
  
  // If it's a React element with props and children
  if (node.props && node.props.children) {
    return extractText(node.props.children);
  }
  
  // If it's a plain object but not a React element (shouldn't normally happen)
  if (typeof node === 'object') {
    return '';
  }
  
  // Default case
  return '';
};

// Enhanced Toolbar with Tippy tooltips - button colors updated
const Toolbar: React.FC<{ code: string; onApply: (code: string) => void }> = ({
  code,
  onApply,
}) => {
  const handleCopy = () => {
    // Ensure we're copying the raw string content of the code
    const codeToCopy = typeof code === 'string' ? code : String(code);
    navigator.clipboard.writeText(codeToCopy)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="flex justify-end mb-2 space-x-2">
      <Tippy
        content="Copy to clipboard"
        theme="carbon"
        arrow={true}
        placement="top"
        animation="scale"
        duration={[200, 0]}
      >
        <button
          onClick={handleCopy}
          className="px-2 py-1 text-white bg-carbon-blue-60 hover:bg-carbon-blue-50 rounded focus:outline-none transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faCopy} size="sm" />
        </button>
      </Tippy>
        <Tippy
          content="Apply this code"
          theme="carbon"
          arrow={true}
          placement="top"
          animation="scale"
          duration={[200, 0]}
        >
          <button
            onClick={() => onApply(code)}
            className="px-2 py-1 text-white bg-carbon-green-60 hover:bg-carbon-green-50 rounded focus:outline-none transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faPlay} size="sm" />
          </button>
        </Tippy>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ text, sender, onApply }: MessageProps) => {
  return (
    <div
      className={`message p-4 rounded-lg ${sender === "USER" ? "bg-carbon-blue-90" : "bg-carbon-gray-90"} text-carbon-gray-10 mb-4 relative`}
    >
      {/* Triangle for agent - left side */}
      {sender === "AGENT" && (
        <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0 border-t-[6px] border-r-[6px] border-b-[6px] border-l-0 border-solid border-t-transparent border-r-carbon-gray-90 border-b-transparent"></div>
      )}

      {/* Triangle for user - right side */}
      {sender === "USER" && (
        <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-[6px] border-l-[6px] border-b-[6px] border-r-0 border-solid border-t-transparent border-l-carbon-blue-90 border-b-transparent"></div>
      )}

      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre: ({ children }) => <div className="my-4">{children}</div>,
            code: ({
              node,
              inline,
              className,
              children,
              ...props
            }: CodeProps) => {
              const match = /language-(\w+)/.exec(className || "");
              className = `bg-[#1e2030] rounded-md overflow-x-auto ${className}`;
              console.log(children);
              console.log(props);
              console.log(node);
              console.log(inline);
              console.log(className);
              console.log(match);
              

              
              // For code blocks, get the raw text content
              const raw = Array.isArray(children) 
                ? children.map(child => typeof child === 'string' ? child : extractText(child)).join('')
                : String(children).replace(/\n$/, '');
              
              return !inline && match ? (
                <pre className="rounded-md overflow-x-auto">
                  <Toolbar code={raw} onApply={(code) => onApply(text, code)} />
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code
                  className="bg-[#1e2030] px-1 py-0.5 rounded text-carbon-blue-30"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;
