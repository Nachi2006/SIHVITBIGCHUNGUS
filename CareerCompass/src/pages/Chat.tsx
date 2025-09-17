import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, User, ArrowUp, Loader2, ArrowLeft, MessageSquare, RefreshCw, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { chatAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const messageVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  animate?: boolean;
};

type Session = {
  id: string;
  title: string;
  isActive: boolean;
  lastMessage: Date;
  messages: Message[];
};

const Chat = () => {
  // Session state
  const [sessions, setSessions] = useState<Session[]>([
    { 
      id: '1', 
      title: 'New Chat', 
      isActive: true, 
      lastMessage: new Date(),
      messages: [{
        id: '1',
        content: 'Hello! I\'m your CareerCompass AI assistant. How can I help you today?',
        isUser: false,
        timestamp: new Date(),
      }]
    },
  ]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your CareerCompass AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Create a new session with animation
  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      isActive: true,
      lastMessage: new Date(),
      messages: [
        {
          id: '1',
          content: 'Hello! I\'m your CareerCompass AI assistant. How can I help you today?',
          isUser: false,
          timestamp: new Date(),
        },
      ]
    };
    
    setSessions(prevSessions => {
      // Set all other sessions to inactive
      const updatedSessions = prevSessions.map(s => ({ ...s, isActive: false }));
      return [newSession, ...updatedSessions];
    });
    
    // Set messages for the new session
    setMessages(newSession.messages);
    
    // Reset any loading states
    setIsLoading(false);
  };
  
  // Switch to a different session
  const switchSession = (sessionId: string) => {
    setSessions(prevSessions => 
      prevSessions.map(session => ({
        ...session,
        isActive: session.id === sessionId
      }))
    );
    
    // Load messages for the selected session
    const selectedSession = sessions.find(s => s.id === sessionId);
    if (selectedSession) {
      setMessages(selectedSession.messages || [
        {
          id: '1',
          content: 'Hello! I\'m your CareerCompass AI assistant. How can I help you today?',
          isUser: false,
          timestamp: new Date(),
        }
      ]);
    }
  };

  // Update session with current messages when they change
  useEffect(() => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.isActive 
          ? { 
              ...session, 
              messages: [...messages], 
              lastMessage: new Date() 
            }
          : session
      )
    );
  }, [messages]);

  // Reset current session
  const resetSession = () => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.isActive 
          ? { 
              ...session, 
              messages: [
                {
                  id: '1',
                  content: 'Hello! I\'m your CareerCompass AI assistant. How can I help you today?',
                  isUser: false,
                  timestamp: new Date(),
                }
              ],
              lastMessage: new Date()
            }
          : session
      )
    );
    
    // Reset messages
    setMessages([
      {
        id: '1',
        content: 'Hello! I\'m your CareerCompass AI assistant. How can I help you today?',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    
    setIsLoading(false);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    const currentInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the backend API
      const response = await chatAPI.sendMessage(currentInput);
      
      const aiResponse: Message = {
        id: response.id?.toString() || (Date.now() + 1).toString(),
        content: response.response || 'Sorry, I encountered an error processing your request.',
        isUser: false,
        timestamp: new Date(response.created_at || new Date()),
      };
      
      setMessages((prev) => [...prev, aiResponse]);

      // Update session title if it's the first message
      if (messages.length === 1) {
        setSessions(prevSessions => 
          prevSessions.map(session => 
            session.isActive 
              ? { ...session, title: currentInput.slice(0, 30) + (currentInput.length > 30 ? '...' : '') }
              : session
          )
        );
      }
    } catch (error: any) {
      console.error('Chat API error:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick action suggestions
  const quickActions = [
    'Career guidance',
    'Skill assessment',
    'Job search tips',
    'Resume help'
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/80 backdrop-blur-lg border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <button 
            onClick={createNewSession}
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-md flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <h3 className="px-4 text-xs font-semibold text-slate-400 mb-2">RECENT SESSIONS</h3>
          <div className="space-y-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => switchSession(session.id)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 ${
                  session.isActive 
                    ? 'bg-slate-800/50 text-white' 
                    : 'text-slate-400 hover:bg-slate-800/30'
                }`}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{session.title}</span>
                <span className="text-xs text-slate-500 ml-auto">
                  {new Date(session.lastMessage).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-2 px-4 text-slate-300 hover:bg-slate-800/50 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              CC
            </div>
            <div>
              <h2 className="font-semibold text-white">CareerCompass AI</h2>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={resetSession}
              className="p-2 rounded-sm text-slate-400 hover:text-cyan-400 transition-colors"
              title="Reset Chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={createNewSession}
              className="p-2 rounded-sm text-slate-400 hover:text-cyan-400 transition-colors"
              title="New Chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-6 pb-24">
          <style>{`
            @keyframes slideIn {
              0% { transform: translateY(10px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            .animate-message {
              animation: slideIn 0.3s ease-out forwards;
            }
            .typing-dot {
              width: 8px;
              height: 8px;
              background-color: #9ca3af;
              border-radius: 50%;
              display: inline-block;
              margin: 0 2px;
            }
          `}</style>
          
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">How can I help you today?</h3>
              <p className="text-slate-400 max-w-md">Ask me anything about career guidance, job search, or skill development.</p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(action)}
                    className="p-3 text-left rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-slate-200 hover:text-white border border-slate-700/50 hover:border-cyan-400/30"
                  >
                    <div className="text-sm">{action}</div>
                    <div className="text-xs text-slate-500 mt-1">Get help with {action.toLowerCase()}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-sm ${
                      message.isUser
                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                        : 'bg-slate-800/50 text-gray-200'
                    } ${message.animate ? 'animate-message' : ''}`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    <div className="text-xs mt-1.5 opacity-70 flex items-center justify-end space-x-1">
                      <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {message.isUser && (
                        <span className="ml-1">
                          {message.id === 'sending' ? 'Sending...' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/50 text-gray-200 p-4 rounded-2xl rounded-bl-none max-w-[85%] border border-slate-700/50">
                    <div className="flex space-x-1.5">
                      <div className="typing-dot" style={{ animation: 'pulse 1.4s infinite', animationDelay: '0ms' }}></div>
                      <div className="typing-dot" style={{ animation: 'pulse 1.4s infinite', animationDelay: '200ms' }}></div>
                      <div className="typing-dot" style={{ animation: 'pulse 1.4s infinite', animationDelay: '400ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 mb-5 rounded-lg">
          <form onSubmit={handleSendMessage} className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about career guidance, skill assessment, job search tips, or resume help..."
              className="w-full pr-12 py-4 bg-slate-800/80 border-slate-700 text-white placeholder-slate-500 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:ring-offset-0 rounded-sm text-base"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-sm text-white bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;