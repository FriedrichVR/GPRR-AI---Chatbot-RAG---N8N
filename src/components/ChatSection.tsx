import { useState, useRef, useEffect } from 'react';
import { Send, Bot, ChevronLeft, Settings } from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

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
      // 2. Call Gemini API directly
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userText,
        config: {
          systemInstruction: "Eres un asistente experto para el proyecto GPRR Invap XR. Tu objetivo es ayudar a los usuarios con dudas técnicas, operativas y de simulación sobre el sistema GPRR. Responde de manera profesional, concisa y útil.",
        },
      });

      const aiResponse = response.text || "Lo siento, no pude procesar tu solicitud.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, timestamp: getCurrentTime() }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error al conectar con el servidor de IA. Por favor, intenta de nuevo.', timestamp: getCurrentTime() }]);
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
    <div className="flex-1 flex flex-col h-full relative bg-background-dark radial-glow">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-20">
        <button className="text-slate-100 hover:text-primary transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-bold tracking-tight text-white">GPRR Database</h1>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,183,127,0.8)]"></span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Online</span>
          </div>
        </div>
        <button className="text-slate-100 hover:text-primary transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Scroll Content - Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6 no-scrollbar">
        {messages.map((msg, idx) => {
          const isAI = msg.role === 'assistant';
          return (
            <div 
              key={idx} 
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end self-end'} max-w-[85%]`}
              id={`msg-${idx}`}
            >
              <div className={`flex items-end gap-3 w-full ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
                {isAI && (
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div className="flex flex-col gap-1 w-full">
                  <div className={`px-4 py-3 text-sm leading-relaxed ${
                    isAI 
                      ? 'bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl rounded-bl-none text-slate-100' 
                      : 'bg-primary text-black font-medium rounded-2xl rounded-br-none shadow-[0_4px_12px_rgba(16,183,127,0.2)]'
                  }`}>
                    <Markdown>{msg.content}</Markdown>
                  </div>
                  
                  {/* Media Card Example (if present) */}
                  {msg.media && (
                    <div className="mt-3 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                      <div 
                        className="h-32 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${msg.media.image})` }}
                      ></div>
                      <div className="p-3">
                        <h3 className="text-xs font-bold text-primary uppercase">{msg.media.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-1">{msg.media.subtitle}</p>
                      </div>
                    </div>
                  )}
                  
                  <span className={`text-[10px] text-slate-500 mt-1 ${isAI ? 'ml-1' : 'mr-1 text-right'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <Bot className="w-5 h-5 text-primary/60" />
            </div>
            <div className="flex gap-1 px-4 py-3 bg-white/5 rounded-2xl">
              <span className="typing-dot size-1.5 rounded-full bg-primary/60"></span>
              <span className="typing-dot size-1.5 rounded-full bg-primary/60"></span>
              <span className="typing-dot size-1.5 rounded-full bg-primary/60"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {/* Input Area */}
      <div className="p-4 bg-background-dark/80 backdrop-blur-xl border-t border-slate-800/50 z-20">
        <div className="relative group">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your coach..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-5 pr-14 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-600"
          />
          <button 
            onClick={() => sendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-1.5 top-1.5 size-10 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(16,183,127,0.3)] disabled:opacity-50"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
