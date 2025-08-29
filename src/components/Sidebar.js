import React from 'react';

const Sidebar = ({ currentChat, onNewChat, onChatSelect }) => {
  const chatHistory = [
    "Financial Planning Help",
    "Budget Optimization", 
    "Investment Strategies",
    "Saving Goals Setup",
    "Debt Management",
    "Emergency Fund Planning",
    "Retirement Planning",
    "Tax Optimization"
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={onNewChat}>
          <i className="fas fa-plus"></i>
          New chat
        </button>
      </div>
      
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div 
            key={index}
            className={`chat-item ${currentChat === chat ? 'active' : ''}`}
            onClick={() => onChatSelect(chat)}
          >
            <i className="fas fa-message"></i>
            <span>{chat}</span>
          </div>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <i className="fas fa-user"></i>
          <span>Financial Advisor</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
