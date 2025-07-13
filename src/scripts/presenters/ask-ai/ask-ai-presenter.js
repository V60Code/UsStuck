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
    // Get existing toasts to calculate position
    const existingToasts = document.querySelectorAll('.toast');
    const toastHeight = 50; // Approximate height including margin
    const topOffset = 90 + (existingToasts.length * toastHeight);
    
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.top = `${topOffset}px`;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide and remove toast
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
          // Reposition remaining toasts
          this.repositionToasts();
        }
      }, 300);
    }, 2000);
  }

  // Reposition remaining toasts after one is removed
  repositionToasts() {
    const toasts = document.querySelectorAll('.toast');
    const toastHeight = 50;
    
    toasts.forEach((toast, index) => {
      const newTop = 90 + (index * toastHeight);
      toast.style.top = `${newTop}px`;
    });
  }

  // Initialize Gemini service in background
  async initializeGeminiService() {
    const maxRetries = 3;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        console.log(`🔄 Initializing Gemini service... (attempt ${retryCount + 1}/${maxRetries})`);
        
        // Show loading feedback to user
        if (retryCount === 0) {
          this.showToast('🔄 Memuat AI...');
        } else {
          this.showToast(`🔄 Mencoba ulang... (${retryCount + 1}/${maxRetries})`);
        }
        
        const success = await this.model.initializeGemini();
        
        if (success) {
          console.log('✅ AI service initialized successfully');
          this.showToast('🤖 AI siap digunakan');
          
          // Test connection to ensure it's working
          const testResult = await this.model.testGeminiConnection();
          if (testResult.success) {
            console.log('✅ connection test passed');
            return true;
          } else {
            console.warn('⚠️ AI initialized but connection test failed');
            throw new Error('Connection test failed: ' + testResult.error);
          }
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`⏳ Retrying in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
      } catch (error) {
        console.error(`❌ Initialization attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        
        if (retryCount < maxRetries) {
          console.log(`⏳ Waiting 2 seconds before retry...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    
    console.warn('❌ AI service initialization failed after all retries');
    this.showToast('⚠️ AI tidak tersedia, menggunakan mode fallback');
    
    // Show diagnostic info
    this.showDiagnosticInfo();
    
    return false;
  }

  // Show diagnostic information to help debug issues
  async showDiagnosticInfo() {
    try {
      const status = await this.model.getGeminiStatus();
      console.log('🔍 Diagnostic Info:', {
        initialized: status.initialized,
        hasApiKey: status.hasApiKey,
        datasetStats: status.datasetStats,
        timestamp: new Date().toISOString()
      });
      
      // Show user-friendly diagnostic
      if (!status.hasApiKey) {
        this.showToast('❌ API Key tidak ditemukan');
      } else if (!status.datasetStats || status.datasetStats.count === 0) {
        this.showToast('❌ Dataset hadits tidak dapat dimuat');
      } else {
        this.showToast('❌ Koneksi ke AI gagal');
      }
      
    } catch (error) {
      console.error('Error getting diagnostic info:', error);
    }
  }

  // Test Gemini connection
  async testGeminiConnection() {
    try {
      this.showToast('🔄 Testing AI connection...');
      const result = await this.model.testGeminiConnection();
      
      if (result.success) {
        this.showToast('✅ AI connection successful');
        console.log('Gemini test response:', result.response);
      } else {
        this.showToast('❌ AI connection failed');
        console.error('AI test error:', result.error);
      }
      
      return result;
    } catch (error) {
      this.showToast('❌ Error testing AI connection');
      console.error('Test connection error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get Gemini service status
  async getGeminiStatus() {
    try {
      const status = await this.model.getGeminiStatus();
      console.log('AI service status:', status);
      return status;
    } catch (error) {
      console.error('Error getting AI status:', error);
      return { error: error.message };
    }
  }

  // Toggle Gemini usage
  toggleGeminiUsage(enabled) {
    this.model.toggleGemini(enabled);
    this.showToast(`AI ${enabled ? 'diaktifkan' : 'dinonaktifkan'}`);
  }
}

export default AskAiPresenter;