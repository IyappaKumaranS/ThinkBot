// import { useState, useRef, useEffect } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Bot, Send, Sparkles, User, Loader2, Brain, Zap } from 'lucide-react';

// interface Message {
//   id: string;
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
//   isLoading?: boolean;
// }

// export function ChatInterface() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       type: 'bot',
//       content: "👋 Hello! I'm your AI validation assistant. I can help analyze your project idea, identify market opportunities, and provide strategic insights. How can I assist you today?",
//       timestamp: new Date(),
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollAreaRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (scrollAreaRef.current) {
//       scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const simulateResponse = async (userMessage: string) => {
//     setIsTyping(true);
    
//     // Simulate AI thinking time
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     const responses = [
//       "Based on your description, I can help analyze the market potential. Would you like to explore competitor analysis or market trends first?",
//       "That's an interesting concept. Let me help you validate it by breaking down the key aspects of your idea.",
//       "I can see several opportunities in your project. Let's discuss how to optimize its market positioning.",
//     ];
    
//     const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
//     setMessages(prev => [...prev, {
//       id: Date.now().toString(),
//       type: 'bot',
//       content: randomResponse,
//       timestamp: new Date(),
//     }]);
    
//     setIsTyping(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = {
//       id: Date.now().toString(),
//       type: 'user' as const,
//       content: input,
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput('');

//     await simulateResponse(input);
//   };

//   return (
//     <Card className="flex h-[calc(100vh-12rem)] flex-col overflow-hidden">
//       {/* Chat Header */}
//       <div className="flex items-center justify-between border-b p-4">
//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <Brain className="h-6 w-6 text-primary" />
//             <Zap className="absolute -right-1 -top-1 h-3 w-3 text-yellow-500" />
//           </div>
//           <div>
//             <h3 className="font-semibold">AI Validation Assistant</h3>
//             <p className="text-xs text-muted-foreground">Powered by advanced analytics</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
//           <span className="text-xs font-medium text-muted-foreground">Online</span>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
//         <div className="space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`flex max-w-[80%] items-start gap-2 rounded-lg px-4 py-2 ${
//                   message.type === 'user'
//                     ? 'bg-primary text-primary-foreground'
//                     : 'bg-muted'
//                 }`}
//               >
//                 {message.type === 'bot' && (
//                   <Bot className="mt-1 h-4 w-4 flex-shrink-0" />
//                 )}
//                 <div>
//                   <p className="text-sm">{message.content}</p>
//                   <p className="mt-1 text-[10px] opacity-70">
//                     {message.timestamp.toLocaleTimeString()}
//                   </p>
//                 </div>
//                 {message.type === 'user' && (
//                   <User className="mt-1 h-4 w-4 flex-shrink-0" />
//                 )}
//               </div>
//             </div>
//           ))}
//           {isTyping && (
//             <div className="flex justify-start">
//               <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
//                 <Bot className="h-4 w-4" />
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 <span className="text-sm">AI is thinking...</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </ScrollArea>

//       {/* Chat Input */}
//       <form onSubmit={handleSubmit} className="border-t p-4">
//         <div className="flex gap-2">
//           <Input
//             ref={inputRef}
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Describe your project idea..."
//             className="flex-1"
//           />
//           <Button type="submit" size="icon" disabled={isTyping}>
//             {isTyping ? (
//               <Loader2 className="h-4 w-4 animate-spin" />
//             ) : (
//               <Send className="h-4 w-4" />
//             )}
//           </Button>
//         </div>
//         <p className="mt-2 text-xs text-muted-foreground">
//           <Sparkles className="mr-1 inline-block h-3 w-3" />
//           Pro tip: Be specific about your project's goals and target market
//         </p>
//       </form>
//     </Card>
//   );
// }



import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Sparkles, User, Loader2, Brain, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Hello! I'm your AI validation assistant. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to send user input to the backend
  const fetchResponse = async (userMessage: string) => {
    setIsTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content: data.response, // Response from Fireworks LLM
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    await fetchResponse(input);
  };

  return (
    <Card className="flex h-[calc(100vh-12rem)] flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Brain className="h-6 w-6 text-primary" />
            <Zap className="absolute -right-1 -top-1 h-3 w-3 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-semibold">AI Validation Assistant</h3>
            <p className="text-xs text-muted-foreground">Powered by Fireworks LLM</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs font-medium text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[80%] items-start gap-2 rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.type === 'bot' && (
                  <Bot className="mt-1 h-4 w-4 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className="mt-1 text-[10px] opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.type === 'user' && (
                  <User className="mt-1 h-4 w-4 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                <Bot className="h-4 w-4" />
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your project idea..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isTyping}>
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          <Sparkles className="mr-1 inline-block h-3 w-3" />
          Pro tip: Be specific about your project's goals and target market
        </p>
      </form>
    </Card>
  );
}
