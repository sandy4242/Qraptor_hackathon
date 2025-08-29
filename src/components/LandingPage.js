import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onStartChat }) => {
  const features = [
    {
      icon: "fas fa-chart-line",
      title: "Smart Investment Advice",
      description: "Get personalized investment strategies based on your financial goals and risk tolerance."
    },
    {
      icon: "fas fa-piggy-bank",
      title: "Budget Optimization",
      description: "Create and manage budgets that work for your lifestyle and financial objectives."
    },
    {
      icon: "fas fa-shield-alt",
      title: "Financial Security",
      description: "Build emergency funds and secure your financial future with expert guidance."
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Learn & Grow",
      description: "Understand complex financial concepts with easy-to-follow explanations."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      comment: "This AI advisor helped me optimize my budget and start investing. My savings increased by 40% in just 6 months!",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager", 
      comment: "The debt management advice was incredible. I paid off my credit cards 2 years ahead of schedule.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      comment: "Finally understood investing! The explanations are so clear and actionable. Highly recommend!",
      avatar: "ER"
    }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <nav className="navbar">
          <div className="nav-brand">
            <i className="fas fa-coins"></i>
            <span>FinanceAI</span>
          </div>
          <button className="cta-button" onClick={onStartChat}>
            Start Chat
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your Personal <span className="highlight">Financial Advisor</span> AI</h1>
            <p>Get expert financial guidance 24/7. From budgeting to investing, we help you make smarter money decisions and achieve financial freedom.</p>
            <div className="hero-buttons">
              <button className="primary-button" onClick={onStartChat}>
                <i className="fas fa-comments"></i>
                Start Free Chat
              </button>
              <button className="secondary-button">
                <i className="fas fa-play"></i>
                Watch Demo
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="chat-preview">
              <div className="chat-header-preview">
                <div className="chat-dots">
                  <span></span><span></span><span></span>
                </div>
                <span>Financial Advisor AI</span>
              </div>
              <div className="chat-messages-preview">
                <div className="message-preview bot">
                  <div className="avatar">🤖</div>
                  <div className="text">Hi! How can I help you achieve financial freedom today?</div>
                </div>
                <div className="message-preview user">
                  <div className="text">I want to start investing</div>
                </div>
                <div className="message-preview bot">
                  <div className="avatar">🤖</div>
                  <div className="text">Great! Let's start with index funds - they're perfect for beginners...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Our Financial AI?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.comment}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Take Control of Your Finances?</h2>
          <p>Join thousands of users who've improved their financial health with our AI advisor.</p>
          <button className="primary-button large" onClick={onStartChat}>
            <i className="fas fa-rocket"></i>
            Start Your Financial Journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <i className="fas fa-coins"></i>
              <span>FinanceAI</span>
            </div>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 FinanceAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
