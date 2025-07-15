class AskAiView {
  constructor() {
    this.container = null;
  }

  afterRender() {
    this.setupEventListeners();
    this.autoResizeTextarea();
    this.setupMobileSidebar();
  }

  setupMobileSidebar() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const toggleBtn = document.getElementById('mobile-sidebar-toggle');
      const overlay = document.getElementById('mobile-overlay');      
      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleMobileSidebar();
        });
        
        toggleBtn.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.toggleMobileSidebar();
        });
      }
      
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleMobileSidebar();
        });
      }
    }, 200);
  }

  setupEventListeners() {
    // Add any other event listeners here
  }

  autoResizeTextarea() {
    const textarea = this.getQuestionInput();
    if (textarea) {
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      });
    }
  }

  render() {
    return `
        <div class="chat-layout">
          <!-- Main Chat Area -->
          <div class="chat-main">
            <!-- Sidebar -->
            <div class="chat-sidebar" id="chat-sidebar">
              <div class="sidebar-header">
                <button class="new-chat-btn">
                  <span class="plus-icon">+</span>
                  Chat Baru
                </button>
              </div>
              <div class="chat-history">
                <div class="history-section">
                  <h3>Diskusi Terbaru</h3>
                  <div class="chat-item active">
                    <div class="chat-preview">Apa tujuan hidup seorang...</div>
                  </div>
                  <div class="chat-item">
                    <div class="chat-preview">Hukum Puasa Untuk orang y...</div>
                  </div>
                  <div class="chat-item">
                    <div class="chat-preview">Mengapa kita harus berba...</div>
                  </div>
                  <div class="chat-item">
                    <div class="chat-preview">Apa itu hadits dan kenapa pe...</div>
                  </div>
                  <div class="chat-item">
                    <div class="chat-preview">Perbedaan antara hadits...</div>
                  </div>
                  <div class="chat-item">
                    <div class="chat-preview">Apa fungsi hadits terhadap...</div>
                  </div>
                  <div class="chat-item">
                    <div class="chat-preview">Mengapa hadits diperlukan?</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Overlay -->
            <div class="mobile-overlay" id="mobile-overlay"></div>

            <!-- Chat Content Area -->
            <div class="chat-content">
          <div class="chat-header">
            <button class="mobile-sidebar-toggle" id="mobile-sidebar-toggle">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <line x1="3" y1="6" x2="21" y2="6"></line>
                   <line x1="3" y1="12" x2="21" y2="12"></line>
                   <line x1="3" y1="18" x2="21" y2="18"></line>
                 </svg>
               </button>
            <div class="chat-title">
              <div class="avatar-container">
                <div class="ai-avatar">AI</div>
              </div>
              <div class="header-content">
                <h2>Ask AI Islamic Assistant</h2>
                <p>Tanyakan pertanyaan tentang Islam</p>
              </div>
            </div>
            <div class="chat-actions">
              <div class="user-profile">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23E8F4FD'/%3E%3Cpath d='M50 30c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15zm0 35c-12 0-22 6-22 13v7h44v-7c0-7-10-13-22-13z' fill='%23B8E0FF'/%3E%3C/svg%3E" alt="User" class="user-avatar">
                <span class="username">Azzahra</span>
              </div>
            </div>
          </div>

          <div id="chat-messages" class="chat-messages">
            <div class="message ai">
              <div class="message-avatar ai">AI</div>
              <div class="message-content ai">
                <p>Assalamu'alaikum! Saya adalah asisten AI untuk pertanyaan seputar Islam. Silakan tanyakan apa saja tentang ibadah, akhlak, atau ajaran Islam lainnya.</p>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="chat-input-container">
            <div class="input-wrapper">
              <textarea 
                id="question-input" 
                placeholder="Tanya pertanyaan mu disini..."
                rows="1"
              ></textarea>
              <button id="send-button" class="send-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

          <style>
            .chat-layout {
              height: 100vh;
              background: #f5f5f5;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            /* Main Chat Container */
            .chat-main {
              display: flex;
              height: 100vh;
              position: relative;
            }

            /* Sidebar Styles */
            .chat-sidebar {
              width: 280px;
              background: #2c3e50;
              color: white;
              display: flex;
              flex-direction: column;
              border-right: 1px solid #34495e;
            }

            /* Chat Content Area */
            .chat-content {
              flex: 1;
              display: flex;
              flex-direction: column;
              background: white;
            }

            .sidebar-header {
              padding: 20px;
              border-bottom: 1px solid #34495e;
            }

            .new-chat-btn {
              width: 100%;
              background: #556B2F;
              color: white;
              border: none;
              padding: 12px 16px;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              display: flex;
              align-items: center;
              gap: 8px;
              transition: background 0.2s;
            }

            .new-chat-btn:hover {
              background: #6B8E23;
            }

            .plus-icon {
              font-size: 18px;
              font-weight: bold;
            }

            .chat-history {
              flex: 1;
              overflow-y: auto;
              padding: 0;
            }

            .history-section h3 {
              padding: 16px 20px 8px;
              margin: 0;
              font-size: 14px;
              color: #bdc3c7;
              font-weight: 500;
            }

            .chat-item {
              padding: 12px 20px;
              cursor: pointer;
              border-left: 3px solid transparent;
              transition: all 0.2s;
            }

            .chat-item:hover {
              background: #34495e;
            }

            .chat-item.active {
              background: #34495e;
              border-left-color: #556B2F;
            }

            .chat-preview {
              font-size: 14px;
              color: #ecf0f1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }



            .chat-header {
              padding: 16px 24px;
              border-bottom: 1px solid #e1e8ed;
              background: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .chat-title {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .avatar-container {
              position: relative;
            }

            .ai-avatar {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #556B2F, #6B8E23);
              color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 14px;
            }

            .chat-info h2 {
              margin: 0;
              font-size: 18px;
              color: #2c3e50;
              font-weight: 600;
            }

            .chat-info p {
              margin: 2px 0 0;
              font-size: 14px;
              color: #7f8c8d;
            }

            .user-profile {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .user-avatar {
              width: 32px;
              height: 32px;
              border-radius: 50%;
            }

            .username {
              font-size: 14px;
              color: #2c3e50;
              font-weight: 500;
            }

            .chat-messages {
              flex: 1;
              overflow-y: auto;
              padding: 24px;
              background: #f8f9fa;
            }

            /* Chat Input */
            .chat-input-container {
              padding: 8px;
              background: white;
              border-top: 1px solid #e1e8ed;
            }

            .input-wrapper {
              display: flex;
              align-items: flex-end;
              gap: 16px;
              background: #f8f9fa;
              border: 1px solid #e1e8ed;
              border-radius: 28px;
              padding: 16px 16px 16px 24px;
              transition: all 0.3s ease;
              min-height: 60px;
            }

            .input-wrapper:focus-within {
              border-color: #556B2F;
              background: white;
              box-shadow: 0 0 0 3px rgba(85, 107, 47, 0.1);
            }

            .input-wrapper textarea {
              flex: 1;
              border: none;
              background: transparent;
              resize: none;
              outline: none;
              font-family: inherit;
              font-size: 18px;
              line-height: 1.6;
              padding: 8px 0;
              max-height: 150px;
              min-height: 28px;
            }

            .input-wrapper textarea::placeholder {
              color: #95a5a6;
            }

            .send-btn {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              border: none;
              background: linear-gradient(135deg, #556B2F, #6B8E23);
              color: white;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.3s ease;
              box-shadow: 0 2px 8px rgba(85, 107, 47, 0.3);
            }

            .send-btn:hover:not(:disabled) {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(85, 107, 47, 0.4);
            }

            .send-btn:disabled {
              background: #bdc3c7;
              cursor: not-allowed;
              transform: none;
              box-shadow: none;
            }

            /* Message Styles */
            .message {
              display: flex;
              gap: 12px;
              margin-bottom: 20px;
              animation: fadeInUp 0.3s ease-out;
            }

            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .message-avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 14px;
              flex-shrink: 0;
            }

            .message-avatar.ai {
              background: linear-gradient(135deg, #556B2F, #6B8E23);
              color: white;
            }

            .message-avatar.user {
              background: linear-gradient(135deg, #D2B48C, #DEB887);
              color: white;
            }

            .message-content {
              flex: 1;
              padding: 16px 20px;
              border-radius: 18px;
              line-height: 1.5;
            }

            .message-content.ai {
              background: white;
              border: 1px solid #e5e5e5;
            }

            .message-content.user {
              background: linear-gradient(135deg, #556B2F, #6B8E23);
              color: white;
              margin-left: auto;
              margin-right: 0;
              max-width: 70%;
            }

            .message-source {
              margin-top: 12px;
              padding: 12px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 3px solid #556B2F;
            }

            .source-title {
              font-weight: 600;
              color: #556B2F;
              margin-bottom: 6px;
              font-size: 14px;
            }

            .source-text {
              color: #666;
              font-size: 13px;
              margin-bottom: 2px;
            }

            /* Mobile Sidebar Toggle */
            .mobile-sidebar-toggle {
              display: none;
              background: rgba(85, 107, 47, 0.1);
              border: 2px solid #556B2F;
              color: #556B2F;
              cursor: pointer;
              padding: 8px;
              border-radius: 6px;
              transition: all 0.3s ease;
              margin-right: 12px;
              z-index: 1001;
              position: relative;
              min-width: 44px;
              min-height: 44px;
              pointer-events: auto;
              touch-action: manipulation;
              -webkit-tap-highlight-color: rgba(85, 107, 47, 0.3);
            }

            .mobile-sidebar-toggle:hover {
              background: rgba(85, 107, 47, 0.2);
              border-color: #6B8E23;
            }

            .mobile-sidebar-toggle:active {
              background: rgba(85, 107, 47, 0.3);
              transform: scale(0.95);
              border-color: #556B2F;
            }

            .header-content {
              flex: 1;
            }

            /* Mobile Overlay */
            .mobile-overlay {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 999;
              opacity: 0;
              transition: opacity 0.3s ease;
            }

            /* Desktop Design - Ensure sidebar is always visible */
            @media (min-width: 769px) {
              .chat-sidebar {
                position: relative;
                left: 0;
                width: 280px;
                height: 100vh;
              }
              
              .mobile-sidebar-toggle {
                display: none !important;
              }
              
              .mobile-overlay {
                display: none !important;
              }
              
              .chat-input-container {
                padding: 4px 0px !important;
              }
              
              .input-wrapper {
                margin: 0 !important;
                width: 100% !important;
                box-sizing: border-box !important;
                padding: 16px 8px 16px 16px !important;
              }
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .chat-main {
                overflow: hidden;
              }
              
              .mobile-overlay {
                display: block;
                pointer-events: none;
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                transition: opacity 0.3s ease;
              }
              
              .chat-sidebar {
                position: absolute;
                top: 0;
                left: -100%;
                width: 280px;
                height: 100%;
                z-index: 1000;
                transition: left 0.3s ease;
                box-shadow: 2px 0 10px rgba(0,0,0,0.1);
                background: #2c3e50;
              }
              
              .chat-sidebar.mobile-open {
                left: 0;
              }
              
              .chat-sidebar.mobile-open ~ .mobile-overlay {
                opacity: 1;
                pointer-events: auto;
              }
              
              .chat-content {
                width: 100%;
                height: 100vh;
              }
              
              .mobile-sidebar-toggle {
                display: flex !important;
                align-items: center;
                justify-content: center;
              }
              
              .chat-header {
                display: flex;
                align-items: center;
                position: relative;
                z-index: 1001;
                background: white;
                padding: 16px;
                border-bottom: 1px solid #e5e5e5;
              }
              
              .chat-input-container {
                padding: 4px 0px !important;
              }
              
              .input-wrapper {
                margin: 0 !important;
                width: 100% !important;
                box-sizing: border-box !important;
                padding: 16px 8px 16px 16px !important;
              }
            }

            /* Auto-resize textarea */
            .input-wrapper textarea {
              overflow-y: hidden;
            }

             /* Toast Notification Styles */
             .toast {
               position: fixed;
               top: 90px;
               right: 5px;
               transform: translateX(100px);
               background: #333;
               color: white;
               padding: 12px 20px;
               border-radius: 8px;
               font-size: 14px;
               line-height: 1.4;
               z-index: 1000;
               opacity: 0;
               transition: all 0.3s ease;
               box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
               max-width: 320px;
               text-align: center;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
               height: auto;
               min-height: 40px;
               font-weight: 500;
               margin-bottom: 10px;
             }

             .toast.show {
               opacity: 1;
               transform: translateX(0);
             }

             /* Loading Animation */
             .loading-dots {
               display: inline-block;
             }

             .loading-dots::after {
               content: '';
               animation: loading-dots 1.5s infinite;
             }

             @keyframes loading-dots {
               0%, 20% { content: ''; }
               40% { content: '.'; }
               60% { content: '..'; }
               80%, 100% { content: '...'; }
             }

             /* AI Status Styles */
             .ai-status-container {
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 12px;
               margin: 20px 0;
               padding: 16px;
               background: #f8f9fa;
               border-radius: 12px;
               border: 1px solid #e9ecef;
             }

             .ai-status {
               display: flex;
               align-items: center;
               gap: 16px;
               flex: 1;
               max-width: 400px;
             }

             .status-indicator {
               display: flex;
               align-items: center;
               gap: 8px;
               padding: 8px 12px;
               border-radius: 20px;
               font-size: 14px;
               font-weight: 500;
               transition: all 0.3s ease;
             }

             .status-indicator.healthy {
               background: #d4edda;
               color: #155724;
               border: 1px solid #c3e6cb;
             }

             .status-indicator.warning {
               background: #fff3cd;
               color: #856404;
               border: 1px solid #ffeaa7;
             }

             .status-indicator.critical {
               background: #f8d7da;
               color: #721c24;
               border: 1px solid #f5c6cb;
             }

             .status-indicator.unknown {
               background: #e2e3e5;
               color: #6c757d;
               border: 1px solid #d6d8db;
             }

             .status-dot {
               width: 8px;
               height: 8px;
               border-radius: 50%;
               background: currentColor;
               animation: pulse 2s infinite;
             }

             .status-details {
               display: flex;
               gap: 16px;
               font-size: 12px;
               color: #6c757d;
             }

             .status-toggle-btn {
               background: #556B2F;
               color: white;
               border: none;
               border-radius: 50%;
               width: 40px;
               height: 40px;
               cursor: pointer;
               font-size: 16px;
               transition: all 0.3s ease;
               display: flex;
               align-items: center;
               justify-content: center;
             }

             .status-toggle-btn:hover {
               background: #6B8E23;
               transform: scale(1.05);
             }

             /* Status Panel Styles */
             .status-panel {
               margin: 20px 0;
               background: white;
               border: 1px solid #e9ecef;
               border-radius: 12px;
               box-shadow: 0 2px 8px rgba(0,0,0,0.1);
               overflow: hidden;
               animation: slideDown 0.3s ease-out;
             }

             @keyframes slideDown {
               from {
                 opacity: 0;
                 transform: translateY(-10px);
               }
               to {
                 opacity: 1;
                 transform: translateY(0);
               }
             }

             .status-panel-header {
               background: #f8f9fa;
               padding: 16px 20px;
               border-bottom: 1px solid #e9ecef;
               display: flex;
               justify-content: space-between;
               align-items: center;
             }

             .status-panel-header h3 {
               margin: 0;
               font-size: 16px;
               color: #495057;
             }

             .status-actions {
               display: flex;
               gap: 8px;
             }

             .action-btn {
               background: #556B2F;
               color: white;
               border: none;
               padding: 6px 12px;
               border-radius: 6px;
               font-size: 12px;
               cursor: pointer;
               transition: all 0.3s ease;
             }

             .action-btn:hover {
               background: #6B8E23;
               transform: translateY(-1px);
             }

             .status-panel-content {
               padding: 20px;
             }

             .status-section {
               margin-bottom: 20px;
             }

             .status-section:last-child {
               margin-bottom: 0;
             }

             .status-section h4 {
               margin: 0 0 12px 0;
               font-size: 14px;
               color: #495057;
               font-weight: 600;
             }

             .status-grid {
               display: grid;
               grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
               gap: 8px;
               font-size: 13px;
               color: #6c757d;
             }

             .status-grid > div {
               padding: 8px 12px;
               background: #f8f9fa;
               border-radius: 6px;
               border: 1px solid #e9ecef;
             }

             @media (max-width: 768px) {
               .ai-status-container {
                 flex-direction: column;
                 gap: 8px;
               }

               .ai-status {
                 flex-direction: column;
                 text-align: center;
                 gap: 8px;
               }

               .status-details {
                 justify-content: center;
               }

               .status-grid {
                 grid-template-columns: 1fr;
               }
             }
           </style>
        </div>
      </div>
    `;
  }

  renderMessage(conversation, isUser = false) {
    if (isUser) {
      return `
        <div class="message user">
          <div class="message-avatar user">U</div>
          <div class="message-content user">
            <p>${conversation.question}</p>
          </div>
        </div>
      `;
    } else {
      const response = conversation.response;
      const isGemini = response.isGeminiResponse;
      const hasHadits = response.haditsUsed && response.haditsUsed.length > 0;
      
      return `
        <div class="message ai">
          <div class="message-avatar ai">AI</div>
          <div class="message-content ai">
            <p>${response.text}</p>
            
            ${hasHadits ? `
              <div class="hadits-section" style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-left: 4px solid #556B2F; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="font-weight: 600; color: #556B2F; margin-bottom: 12px; font-size: 14px;">
                  📖 Hadits yang Digunakan:
                </div>
                ${response.haditsUsed.map((hadits, index) => {
                  // Get the hadits text - use text field which contains the translation
                  const haditsText = hadits.text || hadits.translation || hadits.terjemahan || '';
                  const arabicText = hadits.arabic || hadits.Arab || hadits.arab || '';
                  const haditsId = `hadits-${Date.now()}-${index}`;
                  
                  return `
                    <div class="hadits-dropdown-item" style="margin-bottom: 8px;">
                      <div class="hadits-dropdown-header" 
                           style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-weight: 500; color: #556B2F; font-size: 13px; padding: 8px; background: white; border-radius: 6px; border: 1px solid #e9ecef; transition: all 0.3s ease;"
                           onmouseover="this.style.backgroundColor = '#f8f9fa'; this.style.borderColor = '#556B2F';"
                           onmouseout="this.style.backgroundColor = 'white'; this.style.borderColor = '#e9ecef';"
                           onclick="const content = document.getElementById('${haditsId}'); const arrow = this.querySelector('.dropdown-arrow'); if(content.style.display === 'none' || content.style.display === '') { content.style.display = 'block'; arrow.style.transform = 'rotate(180deg)'; } else { content.style.display = 'none'; arrow.style.transform = 'rotate(0deg)'; }">
                        <span>📜 Hadits ${index + 1}</span>
                        <span class="dropdown-arrow" style="transition: transform 0.3s ease; font-size: 12px;">▼</span>
                      </div>
                      <div id="${haditsId}" class="hadits-dropdown-content" style="display: none; margin-top: 4px;">
                        <div class="hadits-item" style="padding: 12px; background: white; border-radius: 6px; border: 1px solid #e9ecef;">
                          ${arabicText ? `
                            <div class="hadits-arabic" style="font-family: 'Amiri', 'Times New Roman', serif; font-size: 16px; line-height: 1.8; text-align: right; margin-bottom: 8px; color: #2c3e50; direction: rtl;">
                              ${arabicText}
                            </div>
                          ` : ''}
                          
                          ${haditsText ? `
                            <div class="hadits-translation" style="font-style: italic; margin-bottom: 8px; color: #34495e; line-height: 1.6;">
                              "${haditsText}"
                            </div>
                          ` : ''}
                          
                          <div class="hadits-metadata" style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 8px;">
                            ${hadits.source ? `
                              <div class="hadits-source" style="font-size: 12px; color: #666; margin-bottom: 4px;">
                                📚 <strong>Sumber:</strong> ${hadits.source}
                              </div>
                            ` : ''}
                            ${hadits.narrator ? `
                              <div class="hadits-narrator" style="font-size: 12px; color: #666;">
                                👤 <strong>Perawi:</strong> ${hadits.narrator}
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
            

            
            <div class="ai-status" style="margin-top: 12px; padding: 6px 8px; background: ${isGemini ? '#e8f5e8' : '#fff3cd'}; border-radius: 4px; font-size: 11px; color: ${isGemini ? '#2d5a2d' : '#856404'};">
              ${isGemini ? '🤖 Dijawab oleh Gemini AI dengan dataset hadits' : '⚠️ Menggunakan respons fallback'}
              ${response.fallbackReason ? ` (${response.fallbackReason})` : ''}
            </div>
          </div>
        </div>
      `;
    }
  }

  renderLoadingMessage() {
    return `
      <div class="message ai" id="loading-message">
        <div class="message-avatar ai">AI</div>
        <div class="message-content ai">
          <p>Sedang memproses pertanyaan Anda...</p>
          <div style="display: flex; gap: 4px; margin-top: 8px;">
            <div style="width: 8px; height: 8px; background-color: #556B2F; border-radius: 50%; animation: pulse 1.5s infinite;"></div>
            <div style="width: 8px; height: 8px; background-color: #556B2F; border-radius: 50%; animation: pulse 1.5s infinite 0.2s;"></div>
            <div style="width: 8px; height: 8px; background-color: #556B2F; border-radius: 50%; animation: pulse 1.5s infinite 0.4s;"></div>
          </div>
        </div>
      </div>
    `;
  }

  appendMessage(messageHtml) {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
      chatMessages.insertAdjacentHTML('beforeend', messageHtml);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  removeLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  clearMessages() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
      chatMessages.innerHTML = `
        <div class="message ai">
          <div class="message-avatar ai">AI</div>
          <div class="message-content ai">
            <p>Assalamu'alaikum! Saya adalah asisten AI untuk pertanyaan seputar Islam. Silakan tanyakan apa saja tentang ibadah, akhlak, atau ajaran Islam lainnya.</p>
            <div class="message-source">
              <div class="source-title">Contoh pertanyaan:</div>
              <div class="source-text">• Bagaimana cara sholat yang benar?</div>
              <div class="source-text">• Kapan waktu puasa Ramadan?</div>
              <div class="source-text">• Apa itu zakat dan siapa yang wajib membayar?</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  getQuestionInput() {
    return document.getElementById('question-input');
  }

  getSendButton() {
    return document.getElementById('send-button');
  }

  getClearButton() {
    // Return null since we don't have clear button in new layout
    // or create a virtual clear function
    return {
      addEventListener: () => {},
      click: () => this.clearMessages()
    };
  }

  toggleMobileSidebar() {
    const sidebar = document.getElementById('chat-sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    if (sidebar && overlay) {
      const isOpen = sidebar.classList.contains('mobile-open');
      
      if (isOpen) {
        sidebar.classList.remove('mobile-open');
      } else {
        sidebar.classList.add('mobile-open');
      }
    }
  }

  clearInput() {
    const input = this.getQuestionInput();
    if (input) {
      input.value = '';
    }
  }

  setButtonLoading(isLoading) {
    const sendButton = this.getSendButton();
    if (sendButton) {
      sendButton.disabled = isLoading;
      
      if (isLoading) {
        sendButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" opacity="0.3"></circle>
            <path d="M12 2 A10 10 0 0 1 22 12" stroke-dasharray="31.416" stroke-dashoffset="31.416">
              <animate attributeName="stroke-dashoffset" dur="1s" values="31.416;0" repeatCount="indefinite"/>
            </path>
          </svg>
        `;
        sendButton.style.background = '#ccc';
        sendButton.style.cursor = 'not-allowed';
      } else {
        sendButton.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9"></polygon>
          </svg>
        `;
        sendButton.style.background = 'linear-gradient(135deg, #556B2F, #6B8E23)';
        sendButton.style.cursor = 'pointer';
      }
    }
  }
}

export default AskAiView;