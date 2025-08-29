import React from 'react';
import Message from './Message';
import LoadingMessage from './LoadingMessage';

const MessageContainer = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isLoading && <LoadingMessage />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageContainer;
