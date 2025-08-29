import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageContainer from './components/MessageContainer';
import InputSection from './components/InputSection';
import qraptorService from './services/qraptorService'; // ← ADD THIS IMPORT

function App() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState("Financial Planning Help");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [sessionId, setSessionId] = useState(null); // ← ADD THIS STATE
  const [connectionError, setConnectionError] = useState(null); // ← ADD THIS STATE
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showChat && !sessionId) {
      initializeSession();
    }
  }, [showChat]);

  const initializeSession = async () => {
    const newSessionId = qraptorService.generateSessionId();
    setSessionId(newSessionId);
    
    const welcomeMessage = {
      id: Date.now(),
      content: "Hi! I'm your personal Financial Advisor AI. I'm here to help you with budgeting, investing, saving, debt management, and retirement planning. How can I help you achieve financial freedom today? 💰",
      sender: "assistant",
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    setShowWelcome(false);
    setConnectionError(null);
  };

  const handleStartChat = () => {
    setShowChat(true);
  };

  const handleGoBack = () => {
    setShowChat(false);
    setMessages([]);
    setShowWelcome(true);
    setCurrentChat("Financial Planning Help");
    setIsLoading(false);
    setSessionId(null);
    setConnectionError(null);
  };

  const handleSendMessage = async (messageText) => {
    console.log('💬 handleSendMessage called with:', messageText);
    
    if (!messageText.trim()) {
      console.log('❌ Empty message, returning');
      return;
    }

    setShowWelcome(false);
    setConnectionError(null);

    // Add user message
    const userMessage = {
      id: Date.now(),
      content: messageText,
      sender: "user",
      timestamp: new Date()
    };

    console.log('➕ Adding user message:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('🔄 Calling qraptorService.sendMessage...');
      // Send to Qraptor AI
      const response = await qraptorService.sendMessage(messageText, sessionId);
      
      console.log('📨 Service response:', response);
      
      if (response.success) {
        const botMessage = {
          id: Date.now() + 1,
          content: response.message,
          sender: "assistant",
          timestamp: new Date()
        };
        
        console.log('🤖 Adding bot message:', botMessage);
        setMessages(prev => [...prev, botMessage]);
        
        if (response.sessionId && response.sessionId !== sessionId) {
          setSessionId(response.sessionId);
        }
      } else {
        console.error('❌ Service returned error:', response.error);
        const errorMessage = {
          id: Date.now() + 1,
          content: `Error: ${response.error}`,
          sender: "assistant",
          timestamp: new Date(),
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
        setConnectionError(response.error);
      }
    } catch (error) {
      console.error('❌ Unexpected error in handleSendMessage:', error);
      const errorMessage = {
        id: Date.now() + 1,
        content: "An unexpected error occurred. Please try again.",
        sender: "assistant",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      console.log('🏁 Setting loading to false');
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    const newSessionId = qraptorService.generateSessionId();
    setSessionId(newSessionId);
    
    const welcomeMessage = {
      id: Date.now(),
      content: "Hi! I'm your personal Financial Advisor AI. How can I help you with your financial goals today? 💰",
      sender: "assistant",
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    setShowWelcome(false);
    setCurrentChat("New Financial Chat");
    setConnectionError(null);
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showChat) {
        handleGoBack();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showChat]);

  if (!showChat) {
    return <LandingPage onStartChat={handleStartChat} />;
  }

  return (
    <div className="app-container">
      <Sidebar 
        currentChat={currentChat}
        onNewChat={handleNewChat}
        onChatSelect={setCurrentChat}
      />
      <div className="main-content">
        <ChatHeader onGoBack={handleGoBack} />
        {connectionError && (
          <div className="connection-error">
            <i className="fas fa-exclamation-triangle"></i>
            Connection issue: {connectionError}
          </div>
        )}
        {showWelcome ? (
          <div className="welcome-section">
            <h1>What can I help with?</h1>
          </div>
        ) : (
          <MessageContainer 
            messages={messages} 
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
        )}
        <InputSection 
          onSendMessage={handleSendMessage}
          onQuickAction={handleQuickAction}
        />
      </div>
    </div>
  );
}

export default App;
