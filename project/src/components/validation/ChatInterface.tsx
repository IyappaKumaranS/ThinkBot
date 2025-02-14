import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  competitors?: Competitor[];
}

interface Competitor {
  name: string;
  similarity: number;
  strengths: string[];
  weaknesses: string[];
}

interface ChatInterfaceProps {
  onCompetitorAnalysis: (competitors: Competitor[]) => void;
}

export function ChatInterface({ onCompetitorAnalysis }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! Please describe your project or upload a file, and I\'ll analyze potential competitors for you.',
    },
  ]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Simulated competitor database
  const competitorDatabase = [
    {
      keywords: ['analytics', 'data', 'visualization'],
      competitors: [
        {
          name: "DataViz Pro",
          similarity: 92,
          strengths: ["Advanced visualizations", "Real-time analytics", "Enterprise features"],
          weaknesses: ["High cost", "Steep learning curve", "Limited customization"]
        },
        {
          name: "Analytics Hub",
          similarity: 78,
          strengths: ["User-friendly", "Affordable", "Good integration"],
          weaknesses: ["Basic features", "Limited scalability", "Slower updates"]
        }
      ]
    },
    {
      keywords: ['ecommerce', 'shop', 'store'],
      competitors: [
        {
          name: "ShopMaster",
          similarity: 88,
          strengths: ["Complete solution", "Large marketplace", "Strong support"],
          weaknesses: ["Transaction fees", "Template limitations", "Platform lock-in"]
        }
      ]
    }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const analyzeInput = (text: string) => {
    const words = text.toLowerCase().split(' ');
    let matchedCompetitors: Competitor[] = [];

    competitorDatabase.forEach(category => {
      if (category.keywords.some(keyword => words.includes(keyword))) {
        matchedCompetitors = [...matchedCompetitors, ...category.competitors];
      }
    });

    return matchedCompetitors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    // Analyze input and find competitors
    const competitors = analyzeInput(input);
    
    // Add bot response
    const botResponse: Message = {
      type: 'bot',
      content: competitors.length
        ? 'I found some potential competitors based on your description:'
        : 'I couldn\'t find any direct competitors based on your description. Try providing more details or using different keywords.',
      competitors
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
      if (competitors.length) {
        onCompetitorAnalysis(competitors);
      }
    }, 1000);

    setInput('');
  };

  return (
    <Card className="flex h-[500px] flex-col">
      <div className="flex items-center gap-2 border-b p-4">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Competitor Analysis Chat</h3>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.competitors && (
                  <div className="mt-2 space-y-2">
                    {message.competitors.map((comp, idx) => (
                      <div key={idx} className="rounded bg-background/10 p-2 text-sm">
                        <div className="font-medium">{comp.name}</div>
                        <div className="text-xs opacity-90">Similarity: {comp.similarity}%</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your project..."
            className="flex-1 rounded-md bg-muted px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}