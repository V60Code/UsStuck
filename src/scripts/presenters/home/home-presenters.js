import HomeModel from '../../models/home/home-models.js';
import HomeView from '../../views/home/home-view.js';

class HomePresenter {
  static async init() {
    try {
      // Get data from model
      const data = {
        trendingTopics: HomeModel.getTrendingTopics(),
        hadithCatalog: HomeModel.getHadithCatalog(),
        forumDiscussions: HomeModel.getForumDiscussions(),
        chatExample: HomeModel.getChatExample()
      };

      // Render view with data
      const homeHTML = HomeView.render(data);
      
      // Insert into main content
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = homeHTML;
      }

      // Initialize event listeners
      this.initEventListeners();

    } catch (error) {
      console.error('Error initializing home page:', error);
      this.showError();
    }
  }

  static initEventListeners() {
    // Chat input functionality
    const chatInput = document.querySelector('.chat-input');
    const chatSendBtn = document.querySelector('.chat-send-btn');

    if (chatInput && chatSendBtn) {
      const handleSendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
          // For now, just show an alert. In a real app, this would send to AI
          alert(`You asked: "${message}"\n\nThis would be sent to the AI bot for processing.`);
          chatInput.value = '';
        }
      };

      chatSendBtn.addEventListener('click', handleSendMessage);
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleSendMessage();
        }
      });
    }

    // Add click handlers for cards (optional enhancement)
    const trendingCards = document.querySelectorAll('.section-white .card');
    trendingCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        // Navigate to ask AI with pre-filled question
        const topics = HomeModel.getTrendingTopics();
        if (topics[index]) {
          window.location.hash = `#/ask-ai?q=${encodeURIComponent(topics[index].question)}`;
        }
      });
      
      // Add cursor pointer style
      card.style.cursor = 'pointer';
    });

    // Forum card click handlers
    const forumCards = document.querySelectorAll('.forum-card');
    forumCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const discussions = HomeModel.getForumDiscussions();
        if (discussions[index]) {
          window.location.hash = `#/forum/discussion/${discussions[index].id}`;
        }
      });
      
      // Add cursor pointer style
      card.style.cursor = 'pointer';
    });
  }

  static showError() {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="container" style="padding: 80px 0; text-align: center;">
          <h2 style="color: #666; margin-bottom: 16px;">Oops! Something went wrong</h2>
          <p style="color: #999;">We're having trouble loading the page. Please try refreshing.</p>
          <button onclick="location.reload()" style="margin-top: 24px; background-color: #556B2F; color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
}

export default HomePresenter;