class CatalogModel {
  constructor() {
    this.categories = [
      {
        id: 'quran',
        name: 'Al-Quran',
        description: 'Mushaf Al-Quran dengan terjemahan dan tafsir',
        icon: '📖',
        items: [
          { id: 1, title: 'Al-Quran Terjemahan Indonesia', type: 'book', author: 'Kementerian Agama RI' },
          { id: 2, title: 'Tafsir Ibnu Katsir', type: 'book', author: 'Ibnu Katsir' },
          { id: 3, title: 'Tafsir Al-Misbah', type: 'book', author: 'M. Quraish Shihab' }
        ]
      },
      {
        id: 'hadits',
        name: 'Hadits',
        description: 'Koleksi hadits shahih dari berbagai kitab',
        icon: '📚',
        items: [
          { id: 4, title: 'Shahih Bukhari', type: 'book', author: 'Imam Bukhari' },
          { id: 5, title: 'Shahih Muslim', type: 'book', author: 'Imam Muslim' },
          { id: 6, title: 'Sunan Abu Dawud', type: 'book', author: 'Abu Dawud' }
        ]
      },
      {
        id: 'fiqh',
        name: 'Fiqh',
        description: 'Buku-buku fiqh dan hukum Islam',
        icon: '⚖️',
        items: [
          { id: 7, title: 'Fiqh Sunnah', type: 'book', author: 'Sayyid Sabiq' },
          { id: 8, title: 'Bidayatul Mujtahid', type: 'book', author: 'Ibnu Rusyd' },
          { id: 9, title: 'Fiqh Islam Wa Adillatuhu', type: 'book', author: 'Wahbah Zuhaili' }
        ]
      },
      {
        id: 'akhlaq',
        name: 'Akhlaq',
        description: 'Buku-buku tentang akhlaq dan tasawuf',
        icon: '🤲',
        items: [
          { id: 10, title: 'Ihya Ulumuddin', type: 'book', author: 'Imam Al-Ghazali' },
          { id: 11, title: 'Riyadhus Shalihin', type: 'book', author: 'Imam An-Nawawi' },
          { id: 12, title: 'Akhlaq Lil Banin', type: 'book', author: 'Umar bin Ahmad Baraja' }
        ]
      },
      {
        id: 'audio',
        name: 'Audio & Video',
        description: 'Ceramah dan kajian dalam format audio/video',
        icon: '🎧',
        items: [
          { id: 13, title: 'Kajian Tafsir Al-Quran', type: 'video', author: 'Ustadz Abdul Somad' },
          { id: 14, title: 'Ceramah Akhlaq Mulia', type: 'audio', author: 'Ustadz Yusuf Mansur' },
          { id: 15, title: 'Fiqh Sehari-hari', type: 'video', author: 'Ustadz Khalid Basalamah' }
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