import CatalogDetailModel from '../../models/catalog/catalog-detail-model.js';
import CatalogDetailView from '../../views/catalog/catalog-detail-view.js';

class CatalogDetailPresenter {
  constructor() {
    this.model = new CatalogDetailModel();
    this.view = new CatalogDetailView();
    this.narratorId = '';
  }

  async init(narratorId) {
    this.narratorId = narratorId;
    
    // Set narrator in model
    this.model.setNarrator(narratorId);
    
    // Update page title and description
    const narratorInfo = this.model.getNarratorInfo(narratorId);
    this.view.updateTitle(narratorInfo.name, narratorInfo.description);
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Load data
    await this.loadData();
  }

  async loadData() {
    this.view.showLoading();
    
    try {
      await this.model.loadHadits();
      this.renderCurrentPage();
    } catch (error) {
      console.error('Error loading hadits data:', error);
      this.view.showNoResults();
      this.showToast('Gagal memuat data hadits. Silakan coba lagi.');
    }
  }

  setupEventListeners() {
    // Back to catalog button
    document.addEventListener('click', (event) => {
      const backBtn = event.target.closest('#back-to-catalog');
      if (backBtn) {
        this.handleBackToCatalog();
      }

      // Pagination buttons
      const pageBtn = event.target.closest('.pagination-btn');
      if (pageBtn && !pageBtn.disabled) {
        const page = parseInt(pageBtn.getAttribute('data-page'));
        if (page) {
          this.handlePageChange(page);
        }
      }
    });

    // Search functionality
    const searchButton = this.view.getSearchButton();
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

      // Focus and blur effects
      searchInput.addEventListener('focus', () => {
        searchInput.style.borderColor = '#D2B48C';
      });

      searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e0e0e0';
      });
    }

    // Button hover effects
    this.setupButtonHoverEffects();
  }

  setupButtonHoverEffects() {
    // Back button hover
    document.addEventListener('mouseenter', (event) => {
      const backBtn = event.target.closest('#back-to-catalog');
      if (backBtn) {
        backBtn.style.backgroundColor = '#556B2F';
        backBtn.style.color = 'white';
      }

      const searchBtn = event.target.closest('#search-hadits-btn');
      if (searchBtn) {
        searchBtn.style.transform = 'translateY(-2px)';
        searchBtn.style.boxShadow = '0 6px 20px rgba(210, 180, 140, 0.4)';
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const backBtn = event.target.closest('#back-to-catalog');
      if (backBtn) {
        backBtn.style.backgroundColor = 'transparent';
        backBtn.style.color = '#556B2F';
      }

      const searchBtn = event.target.closest('#search-hadits-btn');
      if (searchBtn) {
        searchBtn.style.transform = 'translateY(0)';
        searchBtn.style.boxShadow = 'none';
      }
    }, true);
  }

  handleBackToCatalog() {
    // Navigate back to catalog page
    window.location.hash = '#/catalog';
  }

  handleSearch() {
    const searchInput = this.view.getSearchInput();
    const query = searchInput?.value.trim();

    if (query === this.model.getSearchQuery()) {
      return; // No change in search query
    }

    this.view.showLoading();
    
    // Small delay to show loading state
    setTimeout(() => {
      this.model.searchHadits(query || '');
      this.renderCurrentPage();
    }, 300);
  }

  handlePageChange(page) {
    if (this.model.setPage(page)) {
      this.renderCurrentPage();
      this.scrollToTop();
    }
  }

  renderCurrentPage() {
    const hadits = this.model.getCurrentPageHadits();
    const paginationInfo = this.model.getPaginationInfo();
    
    if (hadits.length === 0 && this.model.getTotalHadits() === 0) {
      this.view.showNoResults();
      this.view.updateStats(0, 1, 1);
      this.renderPagination(1, 1);
      return;
    }

    // Hide loading and show content
    this.view.hideLoading();
    
    // Render hadits
    const haditsListElement = document.getElementById('hadits-list');
    if (haditsListElement) {
      haditsListElement.innerHTML = this.view.renderHadits(hadits);
    }

    // Update stats
    this.view.updateStats(
      paginationInfo.totalHadits,
      paginationInfo.currentPage,
      paginationInfo.totalPages
    );

    // Render pagination
    this.renderPagination(paginationInfo.currentPage, paginationInfo.totalPages);
  }

  renderPagination(currentPage, totalPages) {
    const paginationElement = document.getElementById('pagination');
    if (paginationElement) {
      paginationElement.innerHTML = this.view.renderPagination(
        currentPage,
        totalPages,
        (page) => this.handlePageChange(page)
      );
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  showToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
      ">
        ${message}
      </div>
      <style>
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      </style>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove toast
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 300);
      }
    }, 4000);
  }

  // Method to handle URL parameters
  handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page'));
    const search = urlParams.get('search');

    if (search) {
      const searchInput = this.view.getSearchInput();
      if (searchInput) {
        searchInput.value = search;
        this.model.searchHadits(search);
      }
    }

    if (page && page > 0) {
      this.model.setPage(page);
    }
  }

  // Method to update URL with current state
  updateUrl() {
    const params = new URLSearchParams();
    
    if (this.model.getCurrentPage() > 1) {
      params.set('page', this.model.getCurrentPage().toString());
    }
    
    if (this.model.getSearchQuery()) {
      params.set('search', this.model.getSearchQuery());
    }

    const newUrl = `${window.location.pathname}${window.location.hash}${
      params.toString() ? '?' + params.toString() : ''
    }`;
    
    window.history.replaceState({}, '', newUrl);
  }

  // Method to get current state for debugging
  getState() {
    return {
      narratorId: this.narratorId,
      modelStats: this.model.getStatistics(),
      paginationInfo: this.model.getPaginationInfo(),
      isLoading: this.model.getLoadingState()
    };
  }

  // Method to refresh data
  async refresh() {
    await this.loadData();
  }

  // Method to clear all filters and search
  resetFilters() {
    const searchInput = this.view.getSearchInput();
    if (searchInput) {
      searchInput.value = '';
    }
    
    this.model.clearSearch();
    this.renderCurrentPage();
    this.updateUrl();
  }

  // Cleanup method
  destroy() {
    // Remove event listeners if needed
    // This method can be called when navigating away from the page
  }
}

export default CatalogDetailPresenter;