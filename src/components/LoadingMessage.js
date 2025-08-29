import React from 'react';

const LoadingMessage = () => {
  return (
    <div className="message assistant">
      <div className="message-content loading">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;
