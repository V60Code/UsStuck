import ForumModel from '../../models/forum/forum-model.js';
import ForumView from '../../views/forum/forum-view.js';

class ForumPresenter {
  constructor() {
    this.model = new ForumModel();
    this.view = new ForumView();
  }

  async init() {
    this.renderForumStats();
    this.renderCategoryFilter();
    this.renderTopics();
    this.setupEventListeners();
  }

  renderForumStats() {
    const stats = this.model.getForumStats();
    const statsContainer = document.getElementById('forum-stats');
    
    if (statsContainer) {
      statsContainer.innerHTML = this.view.renderForumStats(stats);
    }
  }

  renderCategoryFilter() {
    const categories = this.model.getCategories();
    const categoryFilter = document.getElementById('category-filter');
    
    if (categoryFilter) {
      categoryFilter.innerHTML = this.view.renderCategoryFilter(categories);
    }
  }

  renderTopics() {
    const topics = this.model.getTopics();
    const topicsList = document.getElementById('topics-list');
    
    if (topicsList) {
      topicsList.innerHTML = this.view.renderTopics(topics);
    }
  }

  setupEventListeners() {
    // Search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = this.view.getSearchInput();

    if (searchButton) {
      searchButton.addEventListener('click', () => this.handleSearch());
    }

    if (searchInput) {
      searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.handleSearch();
        }
      });

      // Focus effects
      searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#556B2F';
      });

      searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e0e0e0';
      });
    }

    // New topic button
    const newTopicButton = document.getElementById('new-topic-button');
    if (newTopicButton) {
      newTopicButton.addEventListener('click', () => this.handleNewTopic());
    }

    // Event delegation for dynamic elements
    document.addEventListener('click', (event) => {
      // Category filter buttons
      const categoryBtn = event.target.closest('.category-btn');
      if (categoryBtn) {
        const categoryId = categoryBtn.getAttribute('data-category');
        this.handleCategoryFilter(categoryId);
      }

      // Topic cards
      const topicCard = event.target.closest('.forum-card');
      if (topicCard) {
        const topicId = topicCard.getAttribute('data-topic-id');
        this.handleTopicClick(topicId);
      }

      // Modal close buttons
      const closeModal = event.target.closest('#close-modal, #cancel-topic');
      if (closeModal) {
        this.view.hideModal();
      }

      // Modal overlay click
      const modalOverlay = event.target.closest('.modal-overlay');
      if (modalOverlay && event.target === modalOverlay) {
        this.view.hideModal();
      }
    });

    // Form submission
    document.addEventListener('submit', (event) => {
      const newTopicForm = event.target.closest('#new-topic-form');
      if (newTopicForm) {
        event.preventDefault();
        this.handleNewTopicSubmit();
      }
    });

    // Hover effects
    this.setupHoverEffects();
  }

  setupHoverEffects() {
    // Search button hover
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
      searchButton.addEventListener('mouseenter', () => {
        searchButton.style.backgroundColor = '#4a5d29';
      });
      searchButton.addEventListener('mouseleave', () => {
        searchButton.style.backgroundColor = '#556B2F';
      });
    }

    // New topic button hover
    const newTopicButton = document.getElementById('new-topic-button');
    if (newTopicButton) {
      newTopicButton.addEventListener('mouseenter', () => {
        newTopicButton.style.backgroundColor = '#BC9E7C';
      });
      newTopicButton.addEventListener('mouseleave', () => {
        newTopicButton.style.backgroundColor = '#D2B48C';
      });
    }

    // Dynamic hover effects for topic cards
    document.addEventListener('mouseenter', (event) => {
      const topicCard = event.target.closest('.forum-card');
      if (topicCard) {
        topicCard.style.transform = 'translateY(-2px)';
        topicCard.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const topicCard = event.target.closest('.forum-card');
      if (topicCard) {
        topicCard.style.transform = 'translateY(0)';
        topicCard.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
      }
    }, true);
  }

  handleSearch() {
    const searchInput = this.view.getSearchInput();
    const query = searchInput?.value.trim();

    if (!query) {
      this.showToast('Silakan masukkan kata kunci pencarian');
      return;
    }

    const results = this.model.searchTopics(query);
    this.renderTopics();
    
    if (results.length === 0) {
      this.showToast(`Tidak ditemukan topik dengan kata kunci "${query}"`);
    } else {
      this.showToast(`Ditemukan ${results.length} topik dengan kata kunci "${query}"`);
    }
  }

  handleCategoryFilter(categoryId) {
    this.model.filterByCategory(categoryId);
    this.view.updateCategoryFilter(categoryId, this.model.getCategories());
    this.renderTopics();
  }

  handleNewTopic() {
    this.view.showModal();
    
    // Setup modal form event listeners
    setTimeout(() => {
      const form = document.getElementById('new-topic-form');
      if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          input.addEventListener('focus', () => {
            input.style.borderColor = '#556B2F';
          });
          input.addEventListener('blur', () => {
            input.style.borderColor = '#e0e0e0';
          });
        });
      }
    }, 100);
  }

  handleNewTopicSubmit() {
    const title = document.getElementById('topic-title')?.value.trim();
    const category = document.getElementById('topic-category')?.value;
    const author = document.getElementById('topic-author')?.value.trim();
    const content = document.getElementById('topic-content')?.value.trim();

    if (!title || !category || !author || !content) {
      this.showToast('Semua field harus diisi');
      return;
    }

    const newTopic = this.model.addTopic({
      title,
      category,
      author,
      content
    });

    this.view.hideModal();
    this.renderTopics();
    this.renderForumStats();
    this.showToast('Topik baru berhasil dibuat!');
  }

  handleTopicClick(topicId) {
    const topic = this.model.getTopicById(topicId);
    if (topic) {
      this.showTopicDetail(topic);
    }
  }

  showTopicDetail(topic) {
    const detail = `
      Judul: ${topic.title}
      Kategori: ${topic.category}
      Penulis: ${topic.author}
      Balasan: ${topic.replies}
      Views: ${topic.views}
      
      Isi:
      ${topic.content}
      
      Fitur detail topik dan sistem balasan sedang dalam pengembangan.
    `;
    alert(detail);
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
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

export default ForumPresenter;