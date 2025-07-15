import DetailCatalogModel from '../../models/catalog/detail-catalog-model.js';
import DetailCatalogView from '../../views/catalog/detail-catalog-view.js';

class DetailCatalogPresenter {
  constructor() {
    this.model = new DetailCatalogModel();
    this.view = new DetailCatalogView();
    this.currentNarrator = '';
    this.isSearchMode = false;
    this.currentSearchQuery = '';
  }

  async init(narrator) {
    this.currentNarrator = narrator;
    
    // Load hadits data
    await this.model.loadHaditsData();
    
    // Render initial view
    this.renderPage();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Load initial data
    this.loadHaditsData();
  }

  renderPage() {
    const narratorDisplayName = this.model.getNarratorDisplayName(this.currentNarrator);
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = this.view.render(narratorDisplayName);
    }
  }

  setupEventListeners() {
    // Back to catalog button
    const backBtn = document.getElementById('back-to-catalog');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.hash = '#/catalog';
      });
    }

    // Search functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-hadits');
    const clearSearchBtn = document.getElementById('clear-search');

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
        searchInput.style.borderColor = '#e9ecef';
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => this.clearSearch());
    }

    // Items per page selector
    const itemsPerPageSelect = document.getElementById('items-per-page');
    if (itemsPerPageSelect) {
      itemsPerPageSelect.addEventListener('change', (event) => {
        this.model.setItemsPerPage(parseInt(event.target.value));
        this.loadHaditsData();
      });
    }

    // Pagination event delegation
    document.addEventListener('click', (event) => {
      const paginationBtn = event.target.closest('.pagination-btn');
      if (paginationBtn && !paginationBtn.disabled) {
        const page = parseInt(paginationBtn.getAttribute('data-page'));
        this.handlePageChange(page);
      }

      // Copy hadits button
      const copyBtn = event.target.closest('.btn-copy');
      if (copyBtn) {
        const haditsId = copyBtn.getAttribute('data-hadits-id');
        this.handleCopyHadits(haditsId);
      }

      // Share hadits button
      const shareBtn = event.target.closest('.btn-share');
      if (shareBtn) {
        const haditsId = shareBtn.getAttribute('data-hadits-id');
        this.handleShareHadits(haditsId);
      }
    });
  }

  loadHaditsData() {
    let haditsData;
    
    if (this.isSearchMode && this.currentSearchQuery) {
      haditsData = this.model.searchInCurrentNarrator(this.currentSearchQuery);
    } else {
      haditsData = this.model.getCurrentPageData(this.currentNarrator);
    }

    this.renderHaditsData(haditsData);
  }

  renderHaditsData(haditsData) {
    const haditsListContainer = document.getElementById('hadits-list');
    const paginationContainer = document.getElementById('pagination-container');
    const resultsInfo = document.getElementById('results-info');
    const totalInfo = document.getElementById('total-info');

    if (haditsListContainer) {
      haditsListContainer.innerHTML = this.view.renderHaditsList(haditsData);
    }

    if (paginationContainer) {
      const currentPage = this.model.getCurrentPage();
      const totalPages = this.model.getTotalPages();
      const totalItems = this.model.getTotalItems();
      
      paginationContainer.innerHTML = this.view.renderPagination(currentPage, totalPages, totalItems);
    }

    if (totalInfo) {
      const currentPage = this.model.getCurrentPage();
      const totalPages = this.model.getTotalPages();
      const totalItems = this.model.getTotalItems();
      const itemsPerPage = this.model.getItemsPerPage();
      
      totalInfo.textContent = this.view.updateResultsInfo(currentPage, totalPages, totalItems, itemsPerPage);
    }

    // Show/hide results info based on data availability
    if (resultsInfo) {
      resultsInfo.style.display = haditsData && haditsData.length > 0 ? 'flex' : 'none';
    }
  }

  handleSearch() {
    const searchInput = document.getElementById('search-hadits');
    const query = searchInput?.value.trim();

    if (!query) {
      this.view.showToast('Silakan masukkan kata kunci pencarian', 'error');
      return;
    }

    this.currentSearchQuery = query;
    this.isSearchMode = true;
    this.model.setPage(1); // Reset to first page
    
    const results = this.model.searchInCurrentNarrator(query);
    this.renderHaditsData(results);
    
    this.view.showToast(`Ditemukan ${this.model.getTotalItems()} hadits untuk "${query}"`);
  }

  clearSearch() {
    const searchInput = document.getElementById('search-hadits');
    if (searchInput) {
      searchInput.value = '';
    }

    this.currentSearchQuery = '';
    this.isSearchMode = false;
    this.model.setPage(1);
    
    this.loadHaditsData();
    this.view.showToast('Pencarian dibersihkan');
  }

  handlePageChange(page) {
    if (this.model.setPage(page)) {
      this.loadHaditsData();
      
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  handleCopyHadits(haditsId) {
    const haditsData = this.isSearchMode && this.currentSearchQuery 
      ? this.model.searchInCurrentNarrator(this.currentSearchQuery)
      : this.model.getCurrentPageData(this.currentNarrator);
    
    const hadits = haditsData[parseInt(haditsId)];
    
    if (hadits) {
      const textToCopy = this.formatHaditsForCopy(hadits);
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          this.view.showToast('Hadits berhasil disalin ke clipboard!');
        }).catch(() => {
          this.fallbackCopyToClipboard(textToCopy);
        });
      } else {
        this.fallbackCopyToClipboard(textToCopy);
      }
    }
  }

  formatHaditsForCopy(hadits) {
    let text = `📚 ${hadits.Perawi || 'Hadits'}\n`;
    text += `📖 ID: ${hadits.id || '-'} • ${hadits.Nama || 'Perawi'}\n\n`;
    
    if (hadits.Arab) {
      text += `📜 Teks Arab:\n${hadits.Arab}\n\n`;
    }
    
    if (hadits.Terjemahan) {
      text += `🇮🇩 Terjemahan Indonesia:\n${hadits.Terjemahan}\n\n`;
    }
    
    text += `Sumber: Aplikasi Pustaka Perawi Hadits`;
    
    return text;
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.view.showToast('Hadits berhasil disalin ke clipboard!');
    } catch (err) {
      this.view.showToast('Gagal menyalin hadits', 'error');
    }
    
    document.body.removeChild(textArea);
  }

  handleShareHadits(haditsId) {
    const haditsData = this.isSearchMode && this.currentSearchQuery 
      ? this.model.searchInCurrentNarrator(this.currentSearchQuery)
      : this.model.getCurrentPageData(this.currentNarrator);
    
    const hadits = haditsData[parseInt(haditsId)];
    
    if (hadits) {
      const shareText = this.formatHaditsForShare(hadits);
      
      if (navigator.share) {
        navigator.share({
          title: `${hadits.Perawi || 'Hadits'} - ID: ${hadits.id || '-'}`,
          text: shareText,
          url: window.location.href
        }).then(() => {
          this.view.showToast('Hadits berhasil dibagikan!');
        }).catch(() => {
          this.fallbackShare(shareText);
        });
      } else {
        this.fallbackShare(shareText);
      }
    }
  }

  formatHaditsForShare(hadits) {
    let text = `📚 ${hadits.Perawi || 'Hadits'} - ID: ${hadits.id || '-'}\n\n`;
    
    if (hadits.Terjemahan) {
      text += `${hadits.Terjemahan}\n\n`;
    }
    
    text += `Diriwayatkan oleh ${hadits.Nama || 'Perawi'}\n`;
    text += `Sumber: Pustaka Perawi Hadits`;
    
    return text;
  }

  fallbackShare(text) {
    // Copy to clipboard as fallback
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.view.showToast('Teks hadits disalin ke clipboard untuk dibagikan!');
      });
    } else {
      this.fallbackCopyToClipboard(text);
    }
  }
}

export default DetailCatalogPresenter;