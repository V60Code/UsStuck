class AskAiView {
  constructor() {
    this.container = null;
  }

  render() {
    return `
      <div class="container">
        <div class="section">
          <div class="ask-ai-header" style="text-align: center; margin-bottom: 48px;">
            <div style="font-size: 4rem; margin-bottom: 24px;">🤖</div>
            <h1 class="section-title">Ask AI Islamic Assistant</h1>
            <p class="section-subtitle">
              Tanyakan pertanyaan tentang Islam dan dapatkan jawaban berdasarkan Al-Quran dan Hadits
            </p>
            
            <!-- AI Status Display -->
            <div class="ai-status-container">
              <div id="ai-status" class="ai-status">
                <div class="status-indicator unknown">
                  <span class="status-dot"></span>
                  <span class="status-text">⚪ Memuat...</span>
                </div>
                <div class="status-details">
                  <div>📊 Cache Hit: 0%</div>
                  <div>📈 Quota: 0/1500</div>
                </div>
              </div>
              <button id="status-toggle" class="status-toggle-btn" title="Toggle detailed status">
                📊
              </button>
            </div>
            
            <!-- Detailed Status Panel (Hidden by default) -->
            <div id="status-panel" class="status-panel" style="display: none;">
              <div class="status-panel-header">
                <h3>📊 AI System Status</h3>
                <div class="status-actions">
                  <button id="clear-cache-btn" class="action-btn">🗑️ Clear Cache</button>
                  <button id="export-cache-btn" class="action-btn">📤 Export Cache</button>
                </div>
              </div>
              <div id="status-details" class="status-panel-content">
                Loading status...
              </div>
            </div>
          </div>

          <div class="chat-container">
            <div id="chat-messages" class="chat-messages">
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
            </div>

            <!-- Modern Chat Input Container -->
            <div class="modern-chat-input">
              <div class="input-wrapper">
                <div class="input-container">
                  <textarea 
                    id="question-input" 
                    placeholder="Ketik pertanyaan Anda tentang Islam..."
                    rows="1"
                  ></textarea>
                  <div class="input-actions">
                    <button id="send-button" class="send-btn" title="Kirim pesan">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22,2 15,22 11,13 2,9"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="chat-controls">
                  <button id="clear-button" class="clear-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    </svg>
                    Hapus Percakapan
                  </button>
                </div>
              </div>
            </div>
          </div>

          <style>
            .chat-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
              overflow: hidden;
            }

            .chat-messages {
              max-height: 500px;
              overflow-y: auto;
              padding: 24px;
              background: #fafafa;
            }

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

            /* Modern Chat Input Styles */
            .modern-chat-input {
              background: white;
              border-top: 1px solid #e5e5e5;
              padding: 20px 24px;
            }

            .input-wrapper {
              max-width: 100%;
            }

            .input-container {
              display: flex;
              align-items: flex-end;
              gap: 12px;
              background: #f8f9fa;
              border: 2px solid #e5e5e5;
              border-radius: 24px;
              padding: 8px 8px 8px 20px;
              transition: all 0.3s ease;
              position: relative;
            }

            .input-container:focus-within {
              border-color: #556B2F;
              background: white;
              box-shadow: 0 0 0 3px rgba(85, 107, 47, 0.1);
            }

            .input-container textarea {
              flex: 1;
              border: none;
              background: transparent;
              resize: none;
              outline: none;
              font-family: inherit;
              font-size: 16px;
              line-height: 1.5;
              padding: 12px 0;
              max-height: 120px;
              min-height: 24px;
            }

            .input-container textarea::placeholder {
              color: #999;
            }

            .input-actions {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .send-btn {
              width: 44px;
              height: 44px;
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

            .send-btn:active {
              transform: translateY(0);
            }

            .send-btn:disabled {
              background: #ccc;
              cursor: not-allowed;
              transform: none;
              box-shadow: none;
            }

            .chat-controls {
              display: flex;
              justify-content: center;
              margin-top: 16px;
            }

            .clear-btn {
              display: flex;
              align-items: center;
              gap: 8px;
              background: none;
              border: 1px solid #e5e5e5;
              color: #666;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .clear-btn:hover {
              background: #f8f9fa;
              border-color: #ccc;
              color: #333;
            }

            .clear-btn svg {
              opacity: 0.7;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
              .chat-container {
                margin: 0 -16px;
                border-radius: 0;
              }

              .modern-chat-input {
                padding: 16px 20px;
              }

              .input-container {
                padding: 6px 6px 6px 16px;
              }

              .send-btn {
                width: 40px;
                height: 40px;
              }

              .message-content.user {
                max-width: 85%;
              }
            }

            /* Auto-resize textarea */
             .input-container textarea {
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
                <div class="hadits-dropdown-header" 
                     style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-weight: 600; color: #556B2F; margin-bottom: 12px; font-size: 14px; padding: 8px; background: white; border-radius: 6px; border: 1px solid #e9ecef; transition: all 0.3s ease;"
                     onmouseover="this.style.backgroundColor = '#f8f9fa'; this.style.borderColor = '#556B2F';"
                     onmouseout="this.style.backgroundColor = 'white'; this.style.borderColor = '#e9ecef';"
                     onclick="this.parentElement.querySelector('.hadits-dropdown-content').style.display = this.parentElement.querySelector('.hadits-dropdown-content').style.display === 'none' ? 'block' : 'none'; this.querySelector('.dropdown-arrow').style.transform = this.parentElement.querySelector('.hadits-dropdown-content').style.display === 'none' ? 'rotate(0deg)' : 'rotate(180deg)';">
                  <span>📖 Hadits yang Digunakan (${response.haditsUsed.length} hadits)</span>
                  <span class="dropdown-arrow" style="transition: transform 0.3s ease; font-size: 12px;">▼</span>
                </div>
                <div class="hadits-dropdown-content" style="display: none;">
                  ${response.haditsUsed.map((hadits, index) => {
                    // Get the hadits text - use text field which contains the translation
                    const haditsText = hadits.text || hadits.translation || hadits.terjemahan || '';
                    const arabicText = hadits.arabic || hadits.Arab || hadits.arab || '';
                    
                    return `
                      <div class="hadits-item" style="margin-bottom: 12px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #e9ecef;">
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
                    `;
                  }).join('')}
                </div>
              </div>
            ` : ''}
            
            ${response.references && response.references.length > 0 ? `
              <div class="message-source">
                <div class="source-title">Referensi:</div>
                ${response.references.map(ref => `<div class="source-text">• ${ref}</div>`).join('')}
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
    return document.getElementById('clear-button');
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