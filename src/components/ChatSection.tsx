import { useState, useRef, useEffect } from 'react';
import { Send, Bot, ChevronLeft, Settings, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  feedback?: 'up' | 'down';
  media?: {
    image: string;
    title: string;
    subtitle: string;
  };
}

const QUESTION_POOL = [
  '¿Qué es el ecosistema GPRR?',
  '¿Qué desafíos resuelve la plataforma GPRR?',
  '¿Qué áreas de interacción tiene la aplicación?',
  '¿Qué tecnologías de Unreal Engine 5.5 se utilizan?',
  '¿Qué es el middleware "The Bridge"?',
  '¿Cómo se integra la Inteligencia Artificial en el GPRR?',
  '¿Cuáles son los casos de uso en el sector nuclear?',
  '¿Cómo se aplica el protocolo ALARA en XR?',
  '¿Qué hardware HMD se recomienda para la simulación?',
  '¿Quiénes desarrollaron la plataforma GPRR?',
  '¿Qué es el Efecto Cherenkov?',
  '¿Qué es el Foveated Rendering?',
  '¿Qué es el dopado de silicio por transmutación (NTD-Silicon)?',
  '¿Qué relación tiene el GPRR con el Reactor OPAL y el RA-10?',
  '¿Qué rol cumple Federico Sastre Heer en el proyecto?',
  '¿Qué rol cumple Alén Eneas Geor en el proyecto?',
  '¿Qué rol cumple Juan Emanuel Venturelli en el proyecto?',
  '¿Qué es el Passthrough en Realidad Mixta?',
  '¿Cómo funciona la dosimetría virtual en el simulador?',
  '¿Qué latencia máxima tiene la arquitectura técnica?'
];

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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState('Analizando datos...');
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [questionFeedback, setQuestionFeedback] = useState<Record<string, 'up' | 'down'>>({});

  const refreshQuestions = (currentMessages: Message[] = messages) => {
    // Get all user questions to avoid suggesting them again
    const userQuestions = new Set(currentMessages.filter(m => m.role === 'user').map(m => m.content.trim()));
    
    const availableQuestions = QUESTION_POOL.filter(q => !userQuestions.has(q));

    if (currentMessages.length <= 1) {
      const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
      setSuggestedQuestions(shuffled.slice(0, 4));
      return;
    }

    const recentText = currentMessages.slice(-2).map(m => m.content.toLowerCase()).join(' ');
    
    // Define some topic clusters for better context matching
    const topics = [
      { keywords: ['ia', 'inteligencia', 'artificial', 'rag', 'llm', 'asistente', 'n8n', 'webhook'], weight: 2 },
      { keywords: ['xr', 'realidad', 'virtual', 'mixta', 'aumentada', 'visor', 'quest', 'hmd', 'passthrough', 'foveated'], weight: 2 },
      { keywords: ['nuclear', 'reactor', 'gprr', 'opal', 'ra-10', 'alara', 'cherenkov', 'radiación', 'dosimetría', 'silicio', 'transmutación'], weight: 2 },
      { keywords: ['unreal', 'engine', 'lumen', 'nanite', 'bridge', 'latencia', 'fps', '3d', 'gemelo', 'digital'], weight: 2 },
      { keywords: ['federico', 'alén', 'juan', 'equipo', 'desarrolladores', 'invap'], weight: 2 }
    ];

    // Find active topics in recent text
    const activeTopics = topics.filter(topic => 
      topic.keywords.some(kw => recentText.includes(kw))
    );

    const scoredQuestions = availableQuestions.map(q => {
      const qLower = q.toLowerCase();
      let score = 0;
      
      // Score based on active topics
      activeTopics.forEach(topic => {
        if (topic.keywords.some(kw => qLower.includes(kw))) {
          score += topic.weight;
        }
      });

      // Score based on direct word overlap with recent text
      const qWords = qLower.match(/\b\w{4,}\b/g) || [];
      qWords.forEach(w => {
        if (recentText.includes(w)) score += 0.5;
      });

      // Randomness to keep it fresh
      score += Math.random();
      
      return { q, score };
    });

    scoredQuestions.sort((a, b) => b.score - a.score);
    setSuggestedQuestions(scoredQuestions.slice(0, 4).map(item => item.q));
  };

  useEffect(() => {
    refreshQuestions();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const loadingStates = [
    'Analizando datos...',
    'Consultando base RAG...',
    'Generando respuesta...',
    'Optimizando simulación...',
    'Verificando física GPRR...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let i = 0;
      interval = setInterval(() => {
        setLoadingState(loadingStates[i % loadingStates.length]);
        i++;
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isLoading]);

  const sendMessage = async (textToSend?: string | React.MouseEvent) => {
    const text = typeof textToSend === 'string' ? textToSend : inputValue;
    if (!text.trim()) return;

    const userText = text.trim();
    setInputValue('');
    
    // 1. Add user message to local UI
    setMessages(prev => {
      const newMessages: Message[] = [...prev, { role: 'user', content: userText, timestamp: getCurrentTime() }];
      refreshQuestions(newMessages);
      return newMessages;
    });
    setIsLoading(true);
    setIsTyping(false);

    try {
      // 2. Call local proxy API (bypasses CORS and adblockers)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: userText, sessionId })
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
      
      setIsLoading(false);
      setIsTyping(true);
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages(prev => {
        const finalMessages: Message[] = [...prev, { role: 'assistant', content: aiResponse, timestamp: getCurrentTime() }];
        refreshQuestions(finalMessages);
        return finalMessages;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the server.', timestamp: getCurrentTime() }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, feedback: msg.feedback === type ? undefined : type } : msg
    ));
  };

  const handleQuestionFeedback = (e: React.MouseEvent, question: string, type: 'up' | 'down') => {
    e.stopPropagation();
    setQuestionFeedback(prev => {
      const current = prev[question];
      const updated = { ...prev };
      if (current === type) {
        delete updated[question];
      } else {
        updated[question] = type;
      }
      return updated;
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full relative bg-[#050A08]">
      {/* Header */}
      <div className="h-16 px-4 flex items-center justify-between z-20 shrink-0 bg-[#030303]/80 backdrop-blur-md border-b border-white/5 relative">
        <div className="flex items-center gap-3">
          <button className="text-white hover:text-neutral-300 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-wide text-white">GPRR AI</h1>
            <div className="flex items-center gap-1.5">
              {isLoading ? (
                <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              )}
              <span className="text-[9px] font-medium tracking-widest text-neutral-400 uppercase">
                {isLoading ? loadingState : 'En línea'}
              </span>
            </div>
          </div>
        </div>
        <button className="text-white hover:text-neutral-300 transition-colors p-2">
          <Settings className="w-5 h-5" />
        </button>
        
        {/* Loading Progress Bar */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-900/30 overflow-hidden"
            >
              <motion.div 
                className="h-full bg-emerald-500"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
                style={{ width: '50%' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Content - Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-6 no-scrollbar">
        {messages.map((msg, idx) => {
          const isAI = msg.role === 'assistant';
          return (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex flex-col ${isAI ? 'items-start mb-8' : 'items-end mb-4'}`}
            >
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
              
              {/* Timestamp and Feedback */}
              <div className={`flex items-center gap-3 mt-1.5 ${isAI ? 'ml-12' : 'mr-2'}`}>
                <span className="text-[10px] text-neutral-500">
                  {msg.timestamp}
                </span>
                {isAI && (
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleFeedback(idx, 'up')}
                      className={`p-1 rounded-md transition-colors ${msg.feedback === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'}`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => handleFeedback(idx, 'down')}
                      className={`p-1 rounded-md transition-colors ${msg.feedback === 'down' ? 'text-red-500 bg-red-500/10' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'}`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
        
        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-start mb-8"
            >
              <div className="flex items-end gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-emerald-900/40 flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="bg-[#1A201E] border border-white/5 rounded-2xl rounded-bl-sm p-4 flex items-center gap-1.5 h-[52px]">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.2, 
                        delay,
                        ease: "easeInOut" 
                      }}
                      className="w-2 h-2 bg-emerald-500 rounded-full"
                    ></motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#030303] border-t border-white/5 z-20 flex flex-col gap-3">
        <div className="relative flex items-center bg-[#111111] border border-white/10 rounded-full p-1.5 focus-within:border-[#10B981] transition-colors">
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
            disabled={!inputValue.trim() || isTyping || isLoading}
            className="w-10 h-10 rounded-full bg-[#10B981] text-black flex items-center justify-center hover:bg-emerald-400 disabled:opacity-50 transition-colors shrink-0"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        {/* Quick Questions */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto no-scrollbar pt-1 pb-2"
        >
          {suggestedQuestions.map((q, i) => (
            <div
              key={i}
              className="flex items-center bg-[#111111] border border-white/10 rounded-full shrink-0 transition-colors focus-within:border-emerald-500/50 hover:border-emerald-500/50"
            >
              <button
                onClick={() => sendMessage(q)}
                className="px-4 py-2 text-sm text-neutral-300 whitespace-nowrap hover:text-white transition-colors"
              >
                {q}
              </button>
              <div className="flex items-center pr-2 gap-0.5">
                <button
                  onClick={(e) => handleQuestionFeedback(e, q, 'up')}
                  className={`p-1.5 rounded-full transition-colors ${questionFeedback[q] === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'}`}
                  title="Buena sugerencia"
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => handleQuestionFeedback(e, q, 'down')}
                  className={`p-1.5 rounded-full transition-colors ${questionFeedback[q] === 'down' ? 'text-red-500 bg-red-500/10' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'}`}
                  title="Mala sugerencia"
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
