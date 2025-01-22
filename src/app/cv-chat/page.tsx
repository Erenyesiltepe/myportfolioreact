"use client";
import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import ChatMessage from '@/components/ChatMessage';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function CVChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm familiar with Eren's CV. Feel free to ask me anything about his experience, education, or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    // Add user message to chat
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userMessage
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', content: data.text }]);
    } catch (error) {
      console.error('Failed to get response:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        content: "I'm sorry, I encountered an error. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col h-[calc(100vh-10rem)] md:h-full">
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar">
          <div className="max-w-3xl mx-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Input form - fixed at bottom on mobile */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4">
          <form onSubmit={sendMessage} className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Eren's experience..."
                className="flex-1 bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-cyan-500 text-white px-4 md:px-6 py-2 rounded hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}