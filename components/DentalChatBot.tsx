'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function DentalChatbot() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className='bg-dark-400 rounded-lg p-4 h-96 flex flex-col justify-end'>
      <div className='space-y-4 mb-4 max-h-80 overflow-y-auto'>
        <div className='flex justify-start'>
          <div className='bg-dark-500 text-light-200 p-3 rounded-lg w-[80%] text-left'>
            Hi! I can help you with general questions about dental procedures,
            appointment preparation, and oral health tips. How can I assist you
            today?
          </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-green-primary text-white'
                  : 'bg-dark-500 text-light-200'
              }`}>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <ReactMarkdown
                        key={`${message.id}-${i}`}
                        components={{
                          h3: ({ children }) => (
                            <h3 className='text-lg font-bold text-green-400 mt-2 mb-1'>
                              {children}
                            </h3>
                          ),
                          strong: ({ children }) => (
                            <strong className='font-bold text-white'>
                              {children}
                            </strong>
                          ),
                          p: ({ children }) => (
                            <p className='mb-2 text-left'>{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className='mb-2 list-disc list-inside ml-4'>
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className='mb-2'>{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className='mb-1 text-left'>{children}</li>
                          ),
                        }}>
                        {part.text}
                      </ReactMarkdown>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className='flex gap-2'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask about dental procedures, preparation tips...'
          className='flex-1 p-2 rounded bg-dark-500 text-light-200'
        />
        <button
          type='submit'
          className='bg-green-primary text-white px-4 py-2 rounded'>
          Send
        </button>
      </form>
    </div>
  );
}
