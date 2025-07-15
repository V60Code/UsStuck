import CatalogModel from '../../models/catalog/catalog-model.js';
import CatalogView from '../../views/catalog/catalog-view.js';

class CatalogPresenter {
  constructor() {
    this.model = new CatalogModel();
    this.view = new CatalogView();
  }

  async init() {
    this.renderCategories();
    this.renderCategoryFilter();
    this.setupEventListeners();
  }

  renderCategories() {
    const categories = this.model.getCategories();
    const categoriesGrid = document.getElementById('categories-grid');
    
    if (categoriesGrid) {
      categoriesGrid.className = 'grid grid-cols-3';
      categoriesGrid.style.gap = '24px';
      categoriesGrid.innerHTML = this.view.renderCategories(categories);
    }
  }

  renderCategoryFilter() {
    const categories = this.model.getCategories();
    const categoryFilter = document.getElementById('category-filter');
    
    if (categoryFilter) {
      categoryFilter.innerHTML = this.view.renderCategoryFilter(categories);
    }
  }

  setupEventListeners() {
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
        searchInput.style.borderColor = '#556B2F';
      });

      searchInput.addEventListener('blur', () => {
        searchInput.style.borderColor = '#e0e0e0';
      });
    }

    // Category cards click
    document.addEventListener('click', (event) => {
      const categoryCard = event.target.closest('.category-card');
      if (categoryCard) {
        const categoryId = categoryCard.getAttribute('data-category');
        this.handleCategorySelect(categoryId);
      }

      // Category filter buttons
      const filterBtn = event.target.closest('.category-filter-btn');
      if (filterBtn) {
        const categoryId = filterBtn.getAttribute('data-category');
        this.handleCategoryFilter(categoryId);
      }

      // Back to categories button
      const backBtn = event.target.closest('#back-to-categories');
      if (backBtn) {
        this.handleBackToCategories();
      }

      // Item action buttons
      const viewBtn = event.target.closest('.btn-view');
      if (viewBtn) {
        const itemId = viewBtn.getAttribute('data-item-id');
        this.handleViewItem(itemId);
      }

      const downloadBtn = event.target.closest('.btn-download');
      if (downloadBtn) {
        const itemId = downloadBtn.getAttribute('data-item-id');
        this.handleDownloadItem(itemId);
      }
    });

    // Hover effects for category cards
    document.addEventListener('mouseenter', (event) => {
      const categoryCard = event.target.closest('.category-card');
      if (categoryCard) {
        categoryCard.style.transform = 'translateY(-5px)';
        categoryCard.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const categoryCard = event.target.closest('.category-card');
      if (categoryCard) {
        categoryCard.style.transform = 'translateY(0)';
        categoryCard.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
      }
    }, true);

    // Button hover effects
    this.setupButtonHoverEffects();
  }

  setupButtonHoverEffects() {
    // Search button hover
    const searchButton = this.view.getSearchButton();
    if (searchButton) {
      searchButton.addEventListener('mouseenter', () => {
        searchButton.style.backgroundColor = '#4a5d29';
      });
      searchButton.addEventListener('mouseleave', () => {
        searchButton.style.backgroundColor = '#556B2F';
      });
    }

    // Dynamic button hover effects
    document.addEventListener('mouseenter', (event) => {
      const viewBtn = event.target.closest('.btn-view');
      if (viewBtn) {
        viewBtn.style.backgroundColor = '#4a5d29';
      }

      const downloadBtn = event.target.closest('.btn-download');
      if (downloadBtn) {
        downloadBtn.style.backgroundColor = '#556B2F';
        downloadBtn.style.color = 'white';
      }

      const backBtn = event.target.closest('#back-to-categories');
      if (backBtn) {
        backBtn.style.backgroundColor = '#556B2F';
        backBtn.style.color = 'white';
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const viewBtn = event.target.closest('.btn-view');
      if (viewBtn) {
        viewBtn.style.backgroundColor = '#556B2F';
      }

      const downloadBtn = event.target.closest('.btn-download');
      if (downloadBtn) {
        downloadBtn.style.backgroundColor = 'transparent';
        downloadBtn.style.color = '#556B2F';
      }

      const backBtn = event.target.closest('#back-to-categories');
      if (backBtn) {
        backBtn.style.backgroundColor = 'transparent';
        backBtn.style.color = '#556B2F';
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

    const results = this.model.searchItems(query);
    this.renderSearchResults(query, results);
  }

  handleCategorySelect(categoryId) {
    // Map category ID to narrator name for hadits data
    const narratorMap = {
      'bukhari': 'bukhari',
      'muslim': 'muslim',
      'tirmidzi': 'tirmidzi',
      'abu-daud': 'abu daud',
      'an-nasai': 'an-nasa\'i',
      'ibn-majah': 'ibn majah'
    };
    
    const narrator = narratorMap[categoryId];
    if (narrator) {
      // Navigate to detail catalog page
      window.location.hash = `#/catalog/detail/${narrator}`;
    } else {
      // Fallback to original behavior for unknown categories
      const items = this.model.getItemsByCategory(categoryId);
      this.renderCategoryItems(items);
      this.view.showItems();
    }
  }

  handleCategoryFilter(categoryId) {
    this.model.filterByCategory(categoryId);
    this.view.updateCategoryFilter(categoryId);

    if (categoryId === 'all') {
      this.view.showCategories();
    } else {
      const items = this.model.getItemsByCategory(categoryId);
      this.renderSearchResults(`Kategori: ${this.getCategoryName(categoryId)}`, items);
    }
  }

  handleBackToCategories() {
    this.view.showCategories();
    this.view.clearSearch();
    this.model.filterByCategory('all');
    this.view.updateCategoryFilter('all');
  }

  handleViewItem(itemId) {
    const item = this.model.getItemById(itemId);
    if (item) {
      this.showItemDetail(item);
    }
  }

  handleDownloadItem(itemId) {
    const item = this.model.getItemById(itemId);
    if (item) {
      this.showToast(`Download "${item.title}" akan segera dimulai (fitur dalam pengembangan)`);
    }
  }

  renderCategoryItems(items) {
    const itemsGrid = document.getElementById('items-grid');
    if (itemsGrid) {
      itemsGrid.innerHTML = this.view.renderItems(items);
    }
  }

  renderSearchResults(query, results) {
    const searchResultsGrid = document.getElementById('search-results-grid');
    if (searchResultsGrid) {
      searchResultsGrid.innerHTML = this.view.renderItems(results);
    }
    this.view.showSearchResults(query, results.length);
  }

  getCategoryName(categoryId) {
    const category = this.model.getCategories().find(cat => cat.id === categoryId);
    return category ? category.name : 'Tidak Diketahui';
  }

  showItemDetail(item) {
    const detail = `
      Judul: ${item.title}
      Penulis: ${item.author}
      Kategori: ${item.category}
      Tipe: ${item.type}
      
      Fitur detail item sedang dalam pengembangan.
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

export default CatalogPresenter;