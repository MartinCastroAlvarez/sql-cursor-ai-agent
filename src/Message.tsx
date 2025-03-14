import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <div className="message p-4 rounded-lg bg-carbon-gray-90 text-carbon-gray-10 mb-4">
      <ReactMarkdown 
        components={{
          p: ({ node, ...props }) => <p className="prose prose-invert prose-sm max-w-none" {...props} />
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default Message;
