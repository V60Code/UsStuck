import AskAiModel from '../../models/ask-ai/ask-ai-model.js';
import AskAiView from '../../views/ask-ai/ask-ai-view.js';

class AskAiPresenter {
  constructor() {
    this.model = new AskAiModel();
    this.view = new AskAiView();
  }

  async init() {
    this.setupEventListeners();
    this.setupStyles();
    
    // Initialize Gemini service in background
    this.initializeGeminiService();
  }

  setupEventListeners() {
    // Send button click
    const sendButton = this.view.getSendButton();
    if (sendButton) {
      sendButton.addEventListener('click', () => this.handleSendQuestion());
    }

    // Enter key in textarea
    const questionInput = this.view.getQuestionInput();
    if (questionInput) {
      // Auto-resize textarea
      this.setupAutoResize(questionInput);
      
      questionInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          this.handleSendQuestion();
        }
      });

      // Input validation and button state
      questionInput.addEventListener('input', () => {
        this.updateSendButtonState();
      });

      // Paste handling
      questionInput.addEventListener('paste', () => {
        setTimeout(() => {
          this.autoResizeTextarea(questionInput);
          this.updateSendButtonState();
        }, 0);
      });
    }

    // Clear button click
    const clearButton = this.view.getClearButton();
    if (clearButton) {
      clearButton.addEventListener('click', () => this.handleClearConversation());
    }

    // Initial button state
    this.updateSendButtonState();
  }

  setupAutoResize(textarea) {
    // Set initial height
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    // Add input listener for auto-resize
    textarea.addEventListener('input', () => {
      this.autoResizeTextarea(textarea);
    });
  }

  autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 120); // Max height 120px
    textarea.style.height = newHeight + 'px';
    
    // Scroll to bottom if content exceeds max height
    if (textarea.scrollHeight > 120) {
      textarea.scrollTop = textarea.scrollHeight;
    }
  }

  updateSendButtonState() {
    const questionInput = this.view.getQuestionInput();
    const sendButton = this.view.getSendButton();
    
    if (questionInput && sendButton) {
      const hasText = questionInput.value.trim().length > 0;
      sendButton.disabled = !hasText;
      
      // Update button appearance
      if (hasText) {
        sendButton.style.opacity = '1';
        sendButton.style.transform = 'scale(1)';
      } else {
        sendButton.style.opacity = '0.5';
        sendButton.style.transform = 'scale(0.95)';
      }
    }
  }

  setupStyles() {
    // Add pulse animation for loading dots
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 80%, 100% {
          opacity: 0.3;
          transform: scale(0.8);
        }
        40% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
  }

  async handleSendQuestion() {
    const questionInput = this.view.getQuestionInput();
    const question = questionInput?.value.trim();

    if (!question) {
      this.showToast('Silakan masukkan pertanyaan terlebih dahulu');
      return;
    }

    // Show user message
    this.view.appendMessage(this.view.renderMessage({ question }, true));
    this.view.clearInput();
    
    // Reset textarea height after clearing
    if (questionInput) {
      this.autoResizeTextarea(questionInput);
    }

    // Show loading
    this.view.setButtonLoading(true);
    this.view.appendMessage(this.view.renderLoadingMessage());

    try {
      // Get AI response
      const conversation = await this.model.askQuestion(question);
      
      // Remove loading and show response
      this.view.removeLoadingMessage();
      this.view.appendMessage(this.view.renderMessage(conversation));
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      this.view.removeLoadingMessage();
      this.view.appendMessage(this.view.renderMessage({
        response: {
          text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
          source: 'Sistem',
          references: []
        }
      }));
    } finally {
      this.view.setButtonLoading(false);
      this.updateSendButtonState();
    }
  }

  handleClearConversation() {
    if (confirm('Apakah Anda yakin ingin menghapus semua percakapan?')) {
      this.model.clearConversation();
      this.view.clearMessages();
      this.showToast('Percakapan telah dihapus');
    }
  }

  showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide and remove toast
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  }

  // Initialize Gemini service in background
  async initializeGeminiService() {
    try {
      console.log('Initializing Gemini service...');
      const success = await this.model.initializeGemini();
      
      if (success) {
        console.log('Gemini service initialized successfully');
        this.showToast('🤖 Gemini AI siap digunakan');
      } else {
        console.warn('Gemini service initialization failed');
        this.showToast('⚠️ Gemini AI tidak tersedia, menggunakan mode fallback');
      }
    } catch (error) {
      console.error('Error initializing Gemini service:', error);
      this.showToast('⚠️ Error loading Gemini AI');
    }
  }

  // Test Gemini connection
  async testGeminiConnection() {
    try {
      this.showToast('🔄 Testing Gemini connection...');
      const result = await this.model.testGeminiConnection();
      
      if (result.success) {
        this.showToast('✅ Gemini AI connection successful');
        console.log('Gemini test response:', result.response);
      } else {
        this.showToast('❌ Gemini AI connection failed');
        console.error('Gemini test error:', result.error);
      }
      
      return result;
    } catch (error) {
      this.showToast('❌ Error testing Gemini connection');
      console.error('Test connection error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get Gemini service status
  async getGeminiStatus() {
    try {
      const status = await this.model.getGeminiStatus();
      console.log('Gemini service status:', status);
      return status;
    } catch (error) {
      console.error('Error getting Gemini status:', error);
      return { error: error.message };
    }
  }

  // Toggle Gemini usage
  toggleGeminiUsage(enabled) {
    this.model.toggleGemini(enabled);
    this.showToast(`Gemini AI ${enabled ? 'diaktifkan' : 'dinonaktifkan'}`);
  }
}

export default AskAiPresenter;