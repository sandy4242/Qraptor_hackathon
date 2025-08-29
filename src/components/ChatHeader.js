import React from 'react';

const ChatHeader = ({ onGoBack }) => {
  return (
    <div className="chat-header">
      <div className="header-left">
        <button className="back-btn" onClick={onGoBack} title="Back to Home">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>💰 Financial Advisor AI</h2>
      </div>
      <div className="header-actions">
        <button className="header-btn" title="Share conversation">
          <i className="fas fa-share"></i>
        </button>
        <button className="header-btn" title="More options">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
