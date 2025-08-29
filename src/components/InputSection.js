import React, { useState, useRef } from 'react';

const InputSection = ({ onSendMessage, onQuickAction }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const quickActions = [
    "Budget Help",
    "Investment Tips", 
    "Saving Goals",
    "Debt Advice"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  return (
    <div className="input-section">
      <div className="quick-actions">
        {quickActions.map((action, index) => (
          <button 
            key={index}
            className="quick-btn"
            onClick={() => onQuickAction(action)}
          >
            {action}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="input-container">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about budgeting, investing, saving strategies..."
          className="message-input"
          rows={1}
        />
        <button 
          type="submit" 
          className="send-btn"
          disabled={!inputValue.trim()}
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      </form>
    </div>
  );
};

export default InputSection;
