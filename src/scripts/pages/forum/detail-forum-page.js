import DetailForumPresenter from '../../presenters/forum/detail-forum-presenter.js';
import DetailForumView from '../../views/forum/detail-forum-view.js';

export default class DetailForumPage {
  constructor() {
    this.title = 'Detail Forum Diskusi';
    this.presenter = new DetailForumPresenter();
    this.view = new DetailForumView();
    this.topicId = null;
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    // Extract topic ID from URL hash
    this.extractTopicId();
    
    if (!this.topicId) {
      this.handleInvalidTopicId();
      return;
    }

    // Set initial page title
    document.title = `${this.title} - UsStuck`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Detail diskusi forum komunitas muslim - berbagi pengalaman, tanya jawab, dan diskusi keislaman');
    }

    // Initialize presenter with topic ID
    try {
      await this.presenter.init(this.topicId);
    } catch (error) {
      console.error('Error initializing detail forum:', error);
      this.handleInitializationError();
    }
  }

  extractTopicId() {
    // Extract topic ID from URL hash
    // Expected format: #/forum/detail/1 or #/forum/1
    const hash = window.location.hash;
    const matches = hash.match(/\/forum\/(?:detail\/)?([0-9]+)/);
    
    if (matches && matches[1]) {
      this.topicId = parseInt(matches[1]);
    } else {
      // Try to get from URL parameters if available
      const urlParams = new URLSearchParams(window.location.search);
      const topicParam = urlParams.get('topic');
      if (topicParam) {
        this.topicId = parseInt(topicParam);
      }
    }
  }

  handleInvalidTopicId() {
    // Show error message
    const container = document.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="section" style="text-align: center; padding: 80px 20px;">
          <div style="
            background: white;
            padding: 48px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            max-width: 500px;
            margin: 0 auto;
          ">
            <div style="font-size: 64px; margin-bottom: 24px;">❌</div>
            <h2 style="color: #e74c3c; margin-bottom: 16px; font-size: 24px;">Topik Tidak Valid</h2>
            <p style="color: #6c757d; margin-bottom: 32px; line-height: 1.6;">
              ID topik tidak ditemukan atau tidak valid. Silakan kembali ke halaman forum untuk melihat daftar topik yang tersedia.
            </p>
            <button 
              onclick="window.location.hash = '#/forum'"
              style="
                background-color: #556B2F;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
                font-size: 14px;
              "
            >
              ← Kembali ke Forum
            </button>
          </div>
        </div>
      `;
    }
    
    // Update page title
    document.title = 'Topik Tidak Ditemukan - UsStuck';
  }

  handleInitializationError() {
    // Show error message
    const container = document.querySelector('.container');
    if (container) {
      container.innerHTML = `
        <div class="section" style="text-align: center; padding: 80px 20px;">
          <div style="
            background: white;
            padding: 48px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            max-width: 500px;
            margin: 0 auto;
          ">
            <div style="font-size: 64px; margin-bottom: 24px;">⚠️</div>
            <h2 style="color: #f39c12; margin-bottom: 16px; font-size: 24px;">Terjadi Kesalahan</h2>
            <p style="color: #6c757d; margin-bottom: 32px; line-height: 1.6;">
              Maaf, terjadi kesalahan saat memuat detail topik. Silakan coba lagi atau kembali ke halaman forum.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <button 
                onclick="window.location.reload()"
                style="
                  background-color: #f39c12;
                  color: white;
                  border: none;
                  padding: 12px 20px;
                  border-radius: 8px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: background-color 0.2s;
                  font-size: 14px;
                "
              >
                🔄 Coba Lagi
              </button>
              <button 
                onclick="window.location.hash = '#/forum'"
                style="
                  background-color: #556B2F;
                  color: white;
                  border: none;
                  padding: 12px 20px;
                  border-radius: 8px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: background-color 0.2s;
                  font-size: 14px;
                "
              >
                ← Kembali ke Forum
              </button>
            </div>
          </div>
        </div>
      `;
    }
    
    // Update page title
    document.title = 'Kesalahan - UsStuck';
  }

  // Method to handle URL changes (for SPA navigation)
  onHashChange() {
    this.extractTopicId();
    if (this.topicId && this.presenter) {
      this.presenter.init(this.topicId);
    }
  }

  // Cleanup method
  destroy() {
    // Remove any event listeners or cleanup resources if needed
    this.presenter = null;
    this.view = null;
    this.topicId = null;
  }

  // Public getter for topic ID
  getTopicId() {
    return this.topicId;
  }

  // Public getter for current topic data
  getCurrentTopic() {
    return this.presenter ? this.presenter.getCurrentTopic() : null;
  }

  // Public getter for current comments data
  getCurrentComments() {
    return this.presenter ? this.presenter.getCurrentComments() : [];
  }
}