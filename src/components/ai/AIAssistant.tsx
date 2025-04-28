
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { MessageSquare, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatWithAssistant } from '@/lib/aiService';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          role: 'assistant', 
          content: "Hi there! I'm your travel assistant. Ask me anything about destinations, travel tips, or let me help you plan your trip!" 
        }
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsLoading(true);
    try {
      const response = await chatWithAssistant(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error getting response:', error);
      toast.error("Sorry, I'm having trouble connecting at the moment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat button floating */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed z-50 rounded-full p-4 shadow-lg bg-travel-teal hover:bg-travel-teal/90 text-white",
          isOpen ? "hidden" : "flex items-center gap-2 bottom-6 right-6"
        )}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="hidden sm:inline">Travel Assistant</span>
      </Button>

      {/* Chat widget */}
      <div
        className={cn(
          "fixed z-50 bottom-0 right-0 w-full sm:w-[400px] sm:max-w-[85vw] transition-all duration-300 transform",
          isOpen ? "translate-y-0 sm:bottom-4 sm:right-4" : "translate-y-full"
        )}
      >
        <Card className="flex flex-col h-[500px] sm:h-[600px] border shadow-xl rounded-t-lg sm:rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-travel-teal text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-medium">Travel AI Assistant</h3>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-travel-teal/80 h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "mb-4 max-w-[80%] rounded-lg p-3",
                  message.role === 'user'
                    ? "ml-auto bg-travel-teal text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about destinations, activities, or travel tips..."
                className="resize-none min-h-[60px]"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                className="bg-travel-teal hover:bg-travel-teal/90 shrink-0"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AIAssistant;
