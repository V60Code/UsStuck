class CatalogDetailModel {
  constructor() {
    this.allHadits = [];
    this.filteredHadits = [];
    this.currentNarrator = '';
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.searchQuery = '';
    this.isLoading = false;
  }

  async loadHadits() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    try {
      const response = await fetch('./src/scripts/data/hadits.json');
      if (!response.ok) {
        throw new Error('Failed to load hadits data');
      }
      this.allHadits = await response.json();
      this.filterByNarrator(this.currentNarrator);
    } catch (error) {
      console.error('Error loading hadits:', error);
      this.allHadits = [];
      this.filteredHadits = [];
    } finally {
      this.isLoading = false;
    }
  }

  setNarrator(narratorName) {
    this.currentNarrator = narratorName;
    this.currentPage = 1;
    this.searchQuery = '';
    this.filterByNarrator(narratorName);
  }

  filterByNarrator(narratorName) {
    if (!this.allHadits || this.allHadits.length === 0) {
      this.filteredHadits = [];
      return;
    }

    // Map narrator names to match the data format
    const narratorMap = {
      'imam-bukhari': 'Bukhari',
      'imam-muslim': 'Muslim',
      'imam-tirmidzi': 'Tirmidzi',
      'imam-abu-daud': 'Abu Daud',
      'imam-an-nasai': 'An-Nasa\'i',
      'imam-ibn-majah': 'Ibn Majah'
    };

    const targetNarrator = narratorMap[narratorName] || narratorName;
    
    this.filteredHadits = this.allHadits.filter(hadits => {
      return hadits.Nama && hadits.Nama.toLowerCase().includes(targetNarrator.toLowerCase());
    });
  }

  searchHadits(query) {
    this.searchQuery = query.toLowerCase().trim();
    this.currentPage = 1;
    
    if (!this.searchQuery) {
      this.filterByNarrator(this.currentNarrator);
      return;
    }

    // First filter by narrator, then by search query
    this.filterByNarrator(this.currentNarrator);
    
    this.filteredHadits = this.filteredHadits.filter(hadits => {
      const searchFields = [
        hadits.text || '',
        hadits.terjemahan || '',
        hadits.arab || '',
        hadits.id || ''
      ];
      
      return searchFields.some(field => 
        field.toString().toLowerCase().includes(this.searchQuery)
      );
    });
  }

  getCurrentPageHadits() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredHadits.slice(startIndex, endIndex);
  }

  getTotalPages() {
    return Math.ceil(this.filteredHadits.length / this.itemsPerPage);
  }

  getTotalHadits() {
    return this.filteredHadits.length;
  }

  setPage(page) {
    const totalPages = this.getTotalPages();
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      return true;
    }
    return false;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getItemsPerPage() {
    return this.itemsPerPage;
  }

  setItemsPerPage(count) {
    this.itemsPerPage = Math.max(1, Math.min(50, count)); // Limit between 1-50
    this.currentPage = 1;
  }

  getNarratorInfo(narratorId) {
    const narratorInfo = {
      'imam-bukhari': {
        name: 'Imam Bukhari',
        fullName: 'Muhammad ibn Ismail al-Bukhari',
        description: 'Koleksi hadits shahih dari Imam Bukhari yang telah diverifikasi oleh para ulama',
        period: '194-256 H / 810-870 M',
        totalHadits: 'Sekitar 7.275 hadits'
      },
      'imam-muslim': {
        name: 'Imam Muslim',
        fullName: 'Muslim ibn al-Hajjaj an-Naysaburi',
        description: 'Koleksi hadits shahih dari Imam Muslim yang terkenal dengan kualitas sanadnya',
        period: '204-261 H / 820-875 M',
        totalHadits: 'Sekitar 4.000 hadits'
      },
      'imam-tirmidzi': {
        name: 'Imam Tirmidzi',
        fullName: 'Muhammad ibn Isa at-Tirmidzi',
        description: 'Koleksi hadits dari Imam Tirmidzi dengan klasifikasi kualitas hadits yang detail',
        period: '209-279 H / 824-892 M',
        totalHadits: 'Sekitar 3.956 hadits'
      },
      'imam-abu-daud': {
        name: 'Imam Abu Daud',
        fullName: 'Abu Daud Sulayman ibn al-Ash\'ath',
        description: 'Koleksi hadits dari Imam Abu Daud yang fokus pada hadits-hadits hukum',
        period: '202-275 H / 817-889 M',
        totalHadits: 'Sekitar 4.800 hadits'
      },
      'imam-an-nasai': {
        name: 'Imam An-Nasa\'i',
        fullName: 'Ahmad ibn Shu\'ayb an-Nasa\'i',
        description: 'Koleksi hadits dari Imam An-Nasa\'i yang terkenal dengan kehati-hatiannya dalam meriwayatkan',
        period: '215-303 H / 830-915 M',
        totalHadits: 'Sekitar 5.761 hadits'
      },
      'imam-ibn-majah': {
        name: 'Imam Ibn Majah',
        fullName: 'Muhammad ibn Yazid ibn Majah',
        description: 'Koleksi hadits dari Imam Ibn Majah yang melengkapi kitab-kitab hadits lainnya',
        period: '209-273 H / 824-887 M',
        totalHadits: 'Sekitar 4.341 hadits'
      }
    };

    return narratorInfo[narratorId] || {
      name: 'Perawi Hadits',
      description: 'Koleksi hadits dari perawi terpercaya',
      period: '',
      totalHadits: ''
    };
  }

  getSearchQuery() {
    return this.searchQuery;
  }

  clearSearch() {
    this.searchQuery = '';
    this.currentPage = 1;
    this.filterByNarrator(this.currentNarrator);
  }

  isDataLoaded() {
    return this.allHadits.length > 0;
  }

  getLoadingState() {
    return this.isLoading;
  }

  // Helper method to get pagination info
  getPaginationInfo() {
    const totalPages = this.getTotalPages();
    const totalHadits = this.getTotalHadits();
    const startItem = totalHadits > 0 ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
    const endItem = Math.min(this.currentPage * this.itemsPerPage, totalHadits);

    return {
      currentPage: this.currentPage,
      totalPages,
      totalHadits,
      startItem,
      endItem,
      itemsPerPage: this.itemsPerPage
    };
  }

  // Method to validate and sanitize hadits data
  validateHaditsData(hadits) {
    if (!hadits || typeof hadits !== 'object') {
      return false;
    }

    // Basic validation - at least one of these fields should exist
    const hasContent = hadits.text || hadits.terjemahan || hadits.arab;
    const hasNarrator = hadits.Nama;

    return hasContent && hasNarrator;
  }

  // Method to get statistics
  getStatistics() {
    const stats = {
      totalLoaded: this.allHadits.length,
      totalFiltered: this.filteredHadits.length,
      currentNarrator: this.currentNarrator,
      hasSearchQuery: !!this.searchQuery,
      searchQuery: this.searchQuery
    };

    return stats;
  }
}

export default CatalogDetailModel;