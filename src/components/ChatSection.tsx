import { useState, useRef, useEffect } from 'react';
import { Send, Bot, ChevronLeft, Settings } from 'lucide-react';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  media?: {
    image: string;
    title: string;
    subtitle: string;
  };
}

export default function ChatSection() {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '¡Hola! Bienvenido a GPRR AI. ¿En qué te puedo ayudar hoy con el proyecto GPRR Invap XR?',
      timestamp: getCurrentTime()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (textToSend?: string | React.MouseEvent) => {
    const text = typeof textToSend === 'string' ? textToSend : inputValue;
    if (!text.trim()) return;

    const userText = text.trim();
    setInputValue('');
    
    // 1. Add user message to local UI
    setMessages(prev => [...prev, { role: 'user', content: userText, timestamp: getCurrentTime() }]);
    setIsTyping(true);

    try {
      // 2. Call n8n Webhook
      const response = await fetch('https://n8n.srv1202174.hstgr.cloud/webhook/58fce02b-5157-4f02-a652-0ff5eaba59c2/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: userText })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const textResponse = await response.text();
      let aiResponse = "";
      
      try {
        // Try standard JSON parse first
        const data = JSON.parse(textResponse);
        aiResponse = data.output || data.message || data.response || (typeof data === 'string' ? data : JSON.stringify(data));
      } catch (err) {
        console.warn('Response is not standard JSON. Attempting to parse stream/NDJSON...', err);
        try {
          // Normalize concatenated JSON (e.g., }{ becomes }\n{)
          const normalizedText = textResponse.replace(/}\s*{/g, '}\n{');
          const lines = normalizedText.split('\n').filter(line => line.trim());
          
          let combinedText = '';
          for (const line of lines) {
            const cleanLine = line.replace(/^data:\s*/, '');
            if (cleanLine === '[DONE]') continue;
            try {
              const parsed = JSON.parse(cleanLine);
              // n8n AI Agent stream format uses type: 'item' and content
              if (parsed.type === 'item' && typeof parsed.content === 'string') {
                combinedText += parsed.content;
              } else if (!parsed.type) {
                // Fallback for other properties
                combinedText += (parsed.output || parsed.message || parsed.response || parsed.text || parsed.content || '');
              }
            } catch (e) {
              // Ignore lines that aren't valid JSON
            }
          }
          aiResponse = combinedText || textResponse;
        } catch (fallbackErr) {
          aiResponse = textResponse;
        }
      }

      if (!aiResponse) {
        aiResponse = "I received your message, but couldn't parse the response format.";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, timestamp: getCurrentTime() }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the server.', timestamp: getCurrentTime() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative bg-[#050A08]">
      {/* Header */}
      <div className="h-20 px-6 pt-8 pb-4 flex items-center justify-between z-20 shrink-0 bg-[#030303] border-b border-white/5">
        <button className="text-white hover:text-neutral-300 transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-base font-bold tracking-wide text-white">GPRR AI</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-medium tracking-widest text-neutral-400">ONLINE</span>
          </div>
        </div>
        <button className="text-white hover:text-neutral-300 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Scroll Content - Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6 no-scrollbar">
        {messages.map((msg, idx) => {
          const isAI = msg.role === 'assistant';
          return (
            <div key={idx} className={`flex flex-col ${isAI ? 'items-start mb-8' : 'items-end mb-4'}`}>
              <div className={`flex items-end gap-3 max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
                
                {/* AI Avatar */}
                {isAI && (
                  <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center shrink-0 mb-1">
                    <Bot className="w-5 h-5 text-emerald-500" />
                  </div>
                )}

                {/* Message Bubble */}
                <div className="flex flex-col gap-1 w-full">
                  <div 
                    className={`p-4 text-[15px] leading-relaxed ${
                      isAI 
                        ? 'bg-[#1A201E] text-neutral-200 rounded-2xl rounded-bl-sm border border-white/5 prose prose-invert prose-emerald max-w-none prose-p:leading-relaxed prose-pre:bg-[#0A0D0C] prose-pre:border prose-pre:border-white/10 prose-code:text-emerald-400 prose-code:bg-emerald-950/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none' 
                        : 'bg-[#10B981] text-black rounded-2xl rounded-br-sm font-medium whitespace-pre-wrap'
                    }`}
                  >
                    {isAI ? (
                      <Markdown>{msg.content}</Markdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                  
                  {/* Media Card (if any) */}
                  {msg.media && (
                    <div className="mt-2 bg-[#1A201E] rounded-2xl border border-white/5 overflow-hidden">
                      <img src={msg.media.image} alt={msg.media.title} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <h3 className="text-emerald-500 font-bold text-sm tracking-wide">{msg.media.title}</h3>
                        <p className="text-neutral-400 text-xs mt-1">{msg.media.subtitle}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Timestamp */}
              <span className={`text-[10px] text-neutral-500 mt-1.5 ${isAI ? 'ml-12' : 'mr-2'}`}>
                {msg.timestamp}
              </span>
            </div>
          );
        })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex flex-col items-start mb-8">
            <div className="flex items-end gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center shrink-0 mb-1">
                <Bot className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="bg-[#1A201E] border border-white/5 rounded-2xl rounded-bl-sm p-4 flex items-center gap-1.5 h-[52px]">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full typing-dot"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full typing-dot"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#030303] border-t border-white/5 z-20 flex flex-col gap-3">
        <div className="relative flex items-center bg-[#111111] border border-white/10 rounded-full p-1.5 focus-within:border-emerald-500/50 transition-colors">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..." 
            className="flex-1 bg-transparent text-[15px] text-white placeholder-neutral-500 px-4 py-2 focus:outline-none"
          />
          <button 
            onClick={sendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-[#10B981] text-black flex items-center justify-center hover:bg-emerald-400 disabled:opacity-50 transition-colors shrink-0"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1 pb-2">
            {['¿Qué es GPRR Invap XR?', '¿Qué hardware se utiliza?', '¿Cómo funciona la simulación?'].map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="px-4 py-2 bg-[#111111] border border-white/10 rounded-full text-sm text-neutral-300 whitespace-nowrap hover:bg-[#1A201E] hover:border-emerald-500/50 transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
