class DetailCatalogModel {
  constructor() {
    this.haditsData = [];
    this.currentPage = 1;
    this.itemsPerPage = 24;
    this.currentNarrator = '';
    this.totalItems = 0;
  }

  async loadHaditsData() {
    try {
      const response = await fetch('/hadits.json');
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
    
    // Convert URL parameter to data format
    const narratorMapping = {
      'bukhari': 'Bukhari',
      'muslim': 'Muslim',
      'tirmidzi': 'Tirmidzi',
      'abu-daud': 'Abu Daud',
      'nasai': 'Nasai',
      'ibn-majah': 'Ibnu Majah'
    };
    
    const mappedNarrator = narratorMapping[narrator.toLowerCase()] || narrator;
    
    const filteredData = this.haditsData.filter(hadits => 
      hadits.Nama && hadits.Nama === mappedNarrator
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
    
    // Convert URL parameter to data format
    const narratorMapping = {
      'bukhari': 'Bukhari',
      'muslim': 'Muslim',
      'tirmidzi': 'Tirmidzi',
      'abu-daud': 'Abu Daud',
      'nasai': 'Nasai',
      'ibn-majah': 'Ibnu Majah'
    };
    
    const mappedNarrator = narratorMapping[this.currentNarrator.toLowerCase()] || this.currentNarrator;
    
    const filteredData = this.haditsData.filter(hadits => {
      if (hadits.Nama && hadits.Nama !== mappedNarrator) {
        return false;
      }
      
      const searchFields = [
        hadits.Arab || '',
        hadits.Terjemahan || '',
        hadits.Perawi || '',
        hadits.id || ''
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
      'Bukhari': 'Imam Bukhari',
      'Muslim': 'Imam Muslim', 
      'Tirmidzi': 'Imam Tirmidzi',
      'Abu Daud': 'Imam Abu Daud',
      'Nasai': 'Imam An-Nasa\'i',
      'Ibnu Majah': 'Imam Ibn Majah'
    };
    
    return narratorMap[narrator] || narrator;
  }
}

export default DetailCatalogModel;