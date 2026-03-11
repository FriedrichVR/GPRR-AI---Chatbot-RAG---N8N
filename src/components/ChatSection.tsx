import { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Bot, ChevronLeft, Settings, Moon, Sun, Trash2, X, Check } from 'lucide-react';
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

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('gprr_chat_history');
    return saved ? JSON.parse(saved) : [
      { 
        role: 'assistant', 
        content: '¡Hola! Bienvenido a GPRR AI. ¿En qué te puedo ayudar hoy con el proyecto GPRR Invap XR?',
        timestamp: getCurrentTime()
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('gprr_theme');
    return saved ? saved === 'dark' : true;
  });
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Persist theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('gprr_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('gprr_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist chat history
  useEffect(() => {
    localStorage.setItem('gprr_chat_history', JSON.stringify(messages));
  }, [messages]);
  
  // Generate a unique session ID for this chat instance
  const sessionId = useMemo(() => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }, []);

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
      // 2. Call n8n Webhook with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch('https://n8n.srv1202174.hstgr.cloud/webhook/58fce02b-5157-4f02-a652-0ff5eaba59c2/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: userText, sessionId }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMsg = 'The server responded with an error.';
        if (response.status === 404) errorMsg = 'The AI service endpoint was not found (404).';
        if (response.status === 500) errorMsg = 'The AI service encountered an internal error (500).';
        if (response.status === 429) errorMsg = 'Too many requests. Please wait a moment.';
        throw new Error(errorMsg);
      }

      const textResponse = await response.text();
      if (!textResponse) {
        throw new Error('The server returned an empty response.');
      }

      let aiResponse = "";
      
      try {
        // Try standard JSON parse first
        const data = JSON.parse(textResponse);
        
        // Check for error field in JSON
        if (data.type === 'error' || data.error) {
          throw new Error(data.message || data.error || 'The AI service returned an error.');
        }

        aiResponse = data.output || data.message || data.response || (typeof data === 'string' ? data : "");
      } catch (err: any) {
        if (err.message && err.message.includes('AI service')) throw err;

        console.warn('Response is not standard JSON. Attempting to parse stream/NDJSON...', err);
        try {
          const normalizedText = textResponse.replace(/}\s*{/g, '}\n{');
          const lines = normalizedText.split('\n').filter(line => line.trim());
          
          let combinedText = '';
          for (const line of lines) {
            const cleanLine = line.replace(/^data:\s*/, '');
            if (cleanLine === '[DONE]') continue;
            try {
              const parsed = JSON.parse(cleanLine);
              if (parsed.type === 'error') throw new Error(parsed.content || 'Stream error');
              if (parsed.type === 'item' && typeof parsed.content === 'string') {
                combinedText += parsed.content;
              } else if (!parsed.type) {
                combinedText += (parsed.output || parsed.message || parsed.response || parsed.text || parsed.content || '');
              }
            } catch (e: any) {
              if (e.message && e.message.includes('Stream error')) throw e;
            }
          }
          aiResponse = combinedText;
        } catch (fallbackErr: any) {
          if (fallbackErr.message && fallbackErr.message.includes('Stream error')) throw fallbackErr;
          aiResponse = "";
        }
      }

      if (!aiResponse) {
        throw new Error('Could not extract a valid message from the server response.');
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse, timestamp: getCurrentTime() }]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      let feedback = 'Sorry, I encountered an error connecting to the server.';
      
      if (error.name === 'AbortError') {
        feedback = 'The request timed out. The server might be busy.';
      } else if (error.message) {
        feedback = `Error: ${error.message}`;
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: feedback, 
        timestamp: getCurrentTime() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        role: 'assistant', 
        content: '¡Hola! Bienvenido a GPRR AI. ¿En qué te puedo ayudar hoy con el proyecto GPRR Invap XR?',
        timestamp: getCurrentTime()
      }
    ]);
    setShowClearConfirm(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={`flex-1 flex flex-col h-full relative transition-colors duration-300 ${isDarkMode ? 'bg-background-dark text-slate-100' : 'bg-slate-50 text-slate-900'} radial-glow`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 pt-12 pb-4 backdrop-blur-md sticky top-0 z-20 transition-colors ${isDarkMode ? 'bg-background-dark/80' : 'bg-white/80 border-b border-slate-200'}`}>
        <button className={`transition-colors ${isDarkMode ? 'text-slate-100 hover:text-primary' : 'text-slate-600 hover:text-primary'}`}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className={`text-sm font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>GPRR Database</h1>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(16,183,127,0.8)]"></span>
            <span className={`text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'text-slate-100 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setShowClearConfirm(true)}
            className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'text-slate-100 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Clear Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button className={`transition-colors ${isDarkMode ? 'text-slate-100 hover:text-primary' : 'text-slate-600 hover:text-primary'}`}>
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Clear Confirmation Overlay */}
      {showClearConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-xs p-6 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200'}`}>
            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Clear conversation?</h3>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>This will permanently delete all messages in this chat.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowClearConfirm(false)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Cancel
              </button>
              <button 
                onClick={clearChat}
                className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <div className={`size-8 rounded-full flex items-center justify-center border shrink-0 ${isDarkMode ? 'bg-primary/20 border-primary/30' : 'bg-primary/10 border-primary/20'}`}>
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                <div className="flex flex-col gap-1 w-full">
                  <div className={`px-4 py-3 text-sm leading-relaxed rounded-2xl ${
                    isAI 
                      ? `${isDarkMode ? 'bg-white/5 border-white/10 text-slate-100' : 'bg-white border-slate-200 text-slate-800'} border backdrop-blur-sm rounded-bl-none` 
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
                  
                  <span className={`text-[10px] mt-1 ${isAI ? 'ml-1' : 'mr-1 text-right'} ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
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
            <div className={`size-8 rounded-full flex items-center justify-center border shrink-0 ${isDarkMode ? 'bg-primary/10 border-primary/20' : 'bg-primary/5 border-primary/10'}`}>
              <Bot className="w-5 h-5 text-primary/60" />
            </div>
            <div className={`flex gap-1 px-4 py-3 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
              <span className="typing-dot size-1.5 rounded-full bg-primary/60"></span>
              <span className="typing-dot size-1.5 rounded-full bg-primary/60"></span>
              <span className="typing-dot size-1.5 rounded-full bg-primary/60"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 backdrop-blur-xl border-t z-20 transition-colors ${isDarkMode ? 'bg-background-dark/80 border-slate-800/50' : 'bg-white/80 border-slate-200'}`}>
        <div className="relative group">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your coach..." 
            className={`w-full border rounded-full py-3.5 pl-5 pr-14 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600' 
                : 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400'
            }`}
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
