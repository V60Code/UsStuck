class DetailCatalogModel {
  constructor() {
    this.haditsData = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.currentNarrator = '';
    this.totalItems = 0;
  }

  async loadHaditsData() {
    try {
      const response = await fetch('/src/scripts/data/hadits.json');
      this.haditsData = await response.json();
      return this.haditsData;
    } catch (error) {
      console.error('Error loading hadits data:', error);
      return [];
    }
  }

  filterByNarrator(narrator) {
    this.currentNarrator = narrator;
    this.currentPage = 1;
    
    const filteredData = this.haditsData.filter(hadits => 
      hadits.Nama && hadits.Nama.toLowerCase() === narrator.toLowerCase()
    );
    
    this.totalItems = filteredData.length;
    return filteredData;
  }

  getPaginatedData(data) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return data.slice(startIndex, endIndex);
  }

  getCurrentPageData(narrator) {
    const filteredData = this.filterByNarrator(narrator);
    return this.getPaginatedData(filteredData);
  }

  getTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  setPage(page) {
    if (page >= 1 && page <= this.getTotalPages()) {
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

  setItemsPerPage(items) {
    this.itemsPerPage = items;
    this.currentPage = 1;
  }

  getTotalItems() {
    return this.totalItems;
  }

  searchInCurrentNarrator(query) {
    if (!this.currentNarrator) return [];
    
    const filteredData = this.haditsData.filter(hadits => {
      if (hadits.Nama && hadits.Nama.toLowerCase() !== this.currentNarrator.toLowerCase()) {
        return false;
      }
      
      const searchFields = [
        hadits.Arab || '',
        hadits.Indonesia || '',
        hadits.Kitab || '',
        hadits.Nomor || ''
      ];
      
      return searchFields.some(field => 
        field.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
    
    this.totalItems = filteredData.length;
    return this.getPaginatedData(filteredData);
  }

  getNarratorDisplayName(narrator) {
    const narratorMap = {
      'bukhari': 'Imam Bukhari',
      'muslim': 'Imam Muslim', 
      'tirmidzi': 'Imam Tirmidzi',
      'abu daud': 'Imam Abu Daud',
      'an-nasa\'i': 'Imam An-Nasa\'i',
      'ibn majah': 'Imam Ibn Majah'
    };
    
    return narratorMap[narrator.toLowerCase()] || narrator;
  }
}

export default DetailCatalogModel;