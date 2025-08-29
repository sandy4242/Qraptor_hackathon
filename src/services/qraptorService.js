import axios from 'axios';

console.log('🔧 QraptorService loading...');

class QraptorService {
  constructor() {
    console.log('🏗️ QraptorService constructor called');
    
    this.accessToken = process.env.REACT_APP_QRAPTOR_ACCESS_TOKEN;
    this.agentEndpoint = process.env.REACT_APP_QRAPTOR_API_ENDPOINT;
    
    console.log('🔧 Access token loaded:', this.accessToken ? 'Yes' : 'No');
    console.log('🔧 Agent endpoint:', this.agentEndpoint);
    
    if (!this.accessToken) {
      console.error('❌ Missing Qraptor access token');
    }
    
    if (!this.agentEndpoint) {
      console.error('❌ Missing Qraptor agent endpoint');
    }
    
    this.client = axios.create({
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });
  }

  async sendMessage(message, sessionId = null) {
    console.log('📞 sendMessage called with:', { message, sessionId });
    
    if (!this.accessToken || !this.agentEndpoint) {
      console.error('❌ Missing credentials');
      return {
        success: false,
        error: 'API credentials not configured properly',
        sessionId: sessionId,
      };
    }

    try {
      if (!sessionId) {
        sessionId = this.generateSessionId();
      }

      const payload = {
        user_name: "User",
        query: message,
        session_id: sessionId,
      };

      console.log('🚀 Making API call to:', this.agentEndpoint);
      console.log('📤 Payload:', payload);

      const response = await this.client.post(this.agentEndpoint, payload);
      
      console.log('✅ API Response received:', response.data);

      let aiMessage = '';
      
      if (response.data && response.data.success) {
        if (response.data.data && response.data.data.output_variable_1) {
          aiMessage = response.data.data.output_variable_1;
        } else if (response.data.message) {
          aiMessage = response.data.message;
        } else {
          aiMessage = 'I received your message successfully!';
        }
      } else {
        aiMessage = response.data?.message || 'I apologize, but I encountered an issue.';
      }

      return {
        success: true,
        message: aiMessage,
        sessionId: sessionId,
        rawResponse: response.data,
      };

    } catch (error) {
      console.error('❌ API Error:', error);
      
      return {
        success: false,
        error: this.handleError(error),
        sessionId: sessionId,
      };
    }
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  handleError(error) {
    if (error.response) {
      return `Server error (${error.response.status}): ${error.response.data?.message || 'Unknown error'}`;
    } else if (error.request) {
      return 'Network error: Unable to reach the server';
    } else {
      return `Request error: ${error.message}`;
    }
  }
}

const instance = new QraptorService();
export default instance;
