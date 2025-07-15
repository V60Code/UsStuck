class CatalogModel {
  constructor() {
    this.categories = [
      {
        id: 'bukhari',
        name: 'Imam Bukhari',
        description: 'Penyusun kitab hadits paling otentik, Shahih al-Bukhari, yang menjadi rujukan utama umat Islam setelah Al-Quran',
        icon: '📖',
        items: [
          { id: 1, title: 'Shahih Bukhari - Kitab Iman', type: 'book', author: 'Imam Bukhari' },
          { id: 2, title: 'Shahih Bukhari - Kitab Ilmu', type: 'book', author: 'Imam Bukhari' },
          { id: 3, title: 'Shahih Bukhari - Kitab Wudhu', type: 'book', author: 'Imam Bukhari' }
        ]
      },
      {
        id: 'muslim',
        name: 'Imam Muslim',
        description: 'Kitabnya, Shahih Muslim, dikenal dengan sebagai koleksi hadits paling kedua setelah Shahih al-Bukhari',
        icon: '📚',
        items: [
          { id: 4, title: 'Shahih Muslim - Kitab Iman', type: 'book', author: 'Imam Muslim' },
          { id: 5, title: 'Shahih Muslim - Kitab Thaharah', type: 'book', author: 'Imam Muslim' },
          { id: 6, title: 'Shahih Muslim - Kitab Shalat', type: 'book', author: 'Imam Muslim' }
        ]
      },
      {
        id: 'tirmidzi',
        name: 'Imam Tirmidzi',
        description: 'Dikenal dengan karyanya Jami at-Tirmidzi (Sunan at-Tirmidzi), yang juga memuat penilaian derajat hadits',
        icon: '📜',
        items: [
          { id: 7, title: 'Sunan Tirmidzi - Kitab Thaharah', type: 'book', author: 'Imam Tirmidzi' },
          { id: 8, title: 'Sunan Tirmidzi - Kitab Shalat', type: 'book', author: 'Imam Tirmidzi' },
          { id: 9, title: 'Sunan Tirmidzi - Kitab Zakat', type: 'book', author: 'Imam Tirmidzi' }
        ]
      },
      {
        id: 'abu-daud',
        name: 'Imam Abu Daud',
        description: 'Karyanya, Sunan Abi Daud, berfokus pada pengumpulan hadits-hadits yang berkaitan dengan hukum fiqh',
        icon: '⚖️',
        items: [
          { id: 10, title: 'Sunan Abu Daud - Kitab Thaharah', type: 'book', author: 'Abu Daud Sulaiman bin al-Asy\'ats as-Sijistani' },
          { id: 11, title: 'Sunan Abu Daud - Kitab Shalat', type: 'book', author: 'Abu Daud Sulaiman bin al-Asy\'ats as-Sijistani' },
          { id: 12, title: 'Sunan Abu Daud - Kitab Zakat', type: 'book', author: 'Abu Daud Sulaiman bin al-Asy\'ats as-Sijistani' }
        ]
      },
      {
        id: 'nasai',
        name: 'Imam An-Nasa\'i',
        description: 'Menyusun kitab sunan an-Nasa\'i (al-Mujtaba), yang dikenal memiliki syarat penyaringan hadits yang sangat ketat',
        icon: '🔍',
        items: [
          { id: 13, title: 'Sunan an-Nasa\'i - Kitab Thaharah', type: 'book', author: 'Ahmad bin Syu\'aib an-Nasa\'i' },
          { id: 14, title: 'Sunan an-Nasa\'i - Kitab Shalat', type: 'book', author: 'Ahmad bin Syu\'aib an-Nasa\'i' },
          { id: 15, title: 'Sunan an-Nasa\'i - Kitab Zakat', type: 'book', author: 'Ahmad bin Syu\'aib an-Nasa\'i' }
        ]
      },
      {
        id: 'ibn-majah',
        name: 'Imam Ibn Majah',
        description: 'Karyanya, Sunan Ibn Majah, melengkapi enam kitab hadits utama (Kutubussittah), meskipun beberapa hadits di dalamnya diperdebatkan',
        icon: '📋',
        items: [
          { id: 16, title: 'Sunan Ibn Majah - Kitab Thaharah', type: 'book', author: 'Abu Abdullah Muhammad bin Yazid al-Majah' },
          { id: 17, title: 'Sunan Ibn Majah - Kitab Shalat', type: 'book', author: 'Abu Abdullah Muhammad bin Yazid al-Majah' },
          { id: 18, title: 'Sunan Ibn Majah - Kitab Nikah', type: 'book', author: 'Abu Abdullah Muhammad bin Yazid al-Majah' }
        ]
      }
    ];
    
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.filteredItems = [];
  }

  getCategories() {
    return this.categories;
  }

  getAllItems() {
    return this.categories.flatMap(category => 
      category.items.map(item => ({
        ...item,
        category: category.name,
        categoryId: category.id
      }))
    );
  }

  searchItems(query) {
    this.searchQuery = query.toLowerCase();
    this.updateFilteredItems();
    return this.filteredItems;
  }

  filterByCategory(categoryId) {
    this.selectedCategory = categoryId;
    this.updateFilteredItems();
    return this.filteredItems;
  }

  updateFilteredItems() {
    let items = this.getAllItems();

    // Filter by category
    if (this.selectedCategory !== 'all') {
      items = items.filter(item => item.categoryId === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.author.toLowerCase().includes(this.searchQuery) ||
        item.category.toLowerCase().includes(this.searchQuery)
      );
    }

    this.filteredItems = items;
  }

  getItemById(id) {
    return this.getAllItems().find(item => item.id === parseInt(id));
  }

  getItemsByCategory(categoryId) {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.items : [];
  }

  getSearchQuery() {
    return this.searchQuery;
  }

  getSelectedCategory() {
    return this.selectedCategory;
  }
}

export default CatalogModel;