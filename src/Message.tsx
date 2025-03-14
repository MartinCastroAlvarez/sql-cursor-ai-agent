import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

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
}

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <div className="message p-4 rounded-lg bg-carbon-gray-90 text-carbon-gray-10 mb-4">
      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre: ({ children }) => (
              <div className="my-4">
                {children}
              </div>
            ),
            code: ({ node, inline, className, children, ...props }: CodeProps) => {
              const match = /language-(\w+)/.exec(className || '');
              className = `bg-[#1e2030] rounded-md overflow-x-auto ${className}`;
              return !inline && match ? (
                <pre className="rounded-md overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-[#1e2030] px-1 py-0.5 rounded text-carbon-blue-30" {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Message;