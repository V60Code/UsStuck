class CatalogView {
  constructor() {
    this.container = null;
  }

  render() {
    return `
      <div class="container">
        <div class="section">
          <div class="catalog-header" style="text-align: center; margin-bottom: 48px;">
            <div style="font-size: 4rem; margin-bottom: 24px;">📚</div>
            <h1 class="section-title">Catalog Pembelajaran Islam</h1>
            <p class="section-subtitle">
              Koleksi lengkap materi pembelajaran Islam dari Al-Quran, Hadits, hingga buku-buku klasik
            </p>
          </div>

          <!-- Search and Filter Section -->
          <div class="catalog-controls" style="margin-bottom: 48px;">
            <div style="max-width: 600px; margin: 0 auto;">
              <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                <input 
                  type="text" 
                  id="search-input" 
                  placeholder="Cari buku, hadits, atau materi..."
                  style="
                    flex: 1;
                    padding: 16px;
                    border: 2px solid #e0e0e0;
                    border-radius: 12px;
                    font-size: 16px;
                    transition: border-color 0.2s;
                  "
                />
                <button 
                  id="search-button"
                  style="
                    background-color: #556B2F;
                    color: white;
                    border: none;
                    padding: 16px 24px;
                    border-radius: 12px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                  "
                >
                  Cari
                </button>
              </div>
              
              <!-- Category Filter -->
              <div id="category-filter" class="category-filter" style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
                <!-- Categories will be rendered here -->
              </div>
            </div>
          </div>

          <!-- Categories Grid -->
          <div id="categories-grid" class="categories-grid" style="margin-bottom: 48px;">
            <!-- Categories will be rendered here -->
          </div>

          <!-- Items Grid -->
          <div id="items-container" style="display: none;">
            <div style="margin-bottom: 24px; text-align: center;">
              <button 
                id="back-to-categories"
                style="
                  background: none;
                  border: 1px solid #556B2F;
                  color: #556B2F;
                  padding: 8px 16px;
                  border-radius: 6px;
                  cursor: pointer;
                  transition: all 0.2s;
                "
              >
                ← Kembali ke Kategori
              </button>
            </div>
            <div id="items-grid" class="grid-cols-3" style="gap: 24px;">
              <!-- Items will be rendered here -->
            </div>
          </div>

          <!-- Search Results -->
          <div id="search-results" style="display: none;">
            <h3 id="search-results-title" style="margin-bottom: 24px; text-align: center;"></h3>
            <div id="search-results-grid" class="grid-cols-3" style="gap: 24px;">
              <!-- Search results will be rendered here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderCategories(categories) {
    return categories.map(category => `
      <div class="card category-card" data-category="${category.id}" style="
        cursor: pointer;
        text-align: center;
        padding: 32px 24px;
        transition: transform 0.2s, box-shadow 0.2s;
      ">
        <div style="font-size: 3rem; margin-bottom: 16px;">${category.icon}</div>
        <h3 style="color: #333; margin-bottom: 8px;">${category.name}</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">${category.description}</p>
        <div style="
          background-color: #556B2F;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          display: inline-block;
        ">
          Lihat Koleksi
        </div>
      </div>
    `).join('');
  }

  renderCategoryFilter(categories) {
    const allButton = `
      <button class="category-filter-btn active" data-category="all" style="
        background-color: #556B2F;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
      ">
        Semua
      </button>
    `;

    const categoryButtons = categories.map(category => `
      <button class="category-filter-btn" data-category="${category.id}" style="
        background-color: #f5f5f5;
        color: #666;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
      ">
        ${category.name}
      </button>
    `).join('');

    return allButton + categoryButtons;
  }

  renderItems(items) {
    if (items.length === 0) {
      return `
        <div style="text-align: center; padding: 48px; color: #666;">
          <div style="font-size: 3rem; margin-bottom: 16px;">📭</div>
          <h3>Tidak ada item ditemukan</h3>
          <p>Coba ubah kata kunci pencarian atau pilih kategori lain</p>
        </div>
      `;
    }

    return items.map(item => `
      <div class="card item-card" style="padding: 24px; text-align: left;">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="
            background-color: #f8f7f4;
            padding: 8px;
            border-radius: 8px;
            margin-right: 12px;
            font-size: 20px;
          ">
            ${this.getItemIcon(item.type)}
          </div>
          <div>
            <div style="font-size: 12px; color: #556B2F; font-weight: 500; text-transform: uppercase;">
              ${item.category || 'Umum'}
            </div>
            <div style="font-size: 10px; color: #999; text-transform: uppercase;">
              ${item.type}
            </div>
          </div>
        </div>
        
        <h4 style="color: #333; margin-bottom: 8px; line-height: 1.4;">${item.title}</h4>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">Oleh: ${item.author}</p>
        
        <div style="display: flex; gap: 8px;">
          <button class="btn-view" data-item-id="${item.id}" style="
            flex: 1;
            background-color: #556B2F;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s;
          ">
            Lihat Detail
          </button>
          <button class="btn-download" data-item-id="${item.id}" style="
            background: none;
            border: 1px solid #556B2F;
            color: #556B2F;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
          ">
            📥
          </button>
        </div>
      </div>
    `).join('');
  }

  getItemIcon(type) {
    const icons = {
      'book': '📖',
      'audio': '🎧',
      'video': '🎥',
      'pdf': '📄'
    };
    return icons[type] || '📄';
  }

  showCategories() {
    document.getElementById('categories-grid').style.display = 'grid';
    document.getElementById('items-container').style.display = 'none';
    document.getElementById('search-results').style.display = 'none';
  }

  showItems() {
    document.getElementById('categories-grid').style.display = 'none';
    document.getElementById('items-container').style.display = 'block';
    document.getElementById('search-results').style.display = 'none';
  }

  showSearchResults(query, count) {
    document.getElementById('categories-grid').style.display = 'none';
    document.getElementById('items-container').style.display = 'none';
    document.getElementById('search-results').style.display = 'block';
    
    const title = document.getElementById('search-results-title');
    if (title) {
      title.textContent = `Hasil pencarian "${query}" (${count} item ditemukan)`;
    }
  }

  updateCategoryFilter(activeCategory) {
    const buttons = document.querySelectorAll('.category-filter-btn');
    buttons.forEach(btn => {
      const category = btn.getAttribute('data-category');
      if (category === activeCategory) {
        btn.style.backgroundColor = '#556B2F';
        btn.style.color = 'white';
        btn.classList.add('active');
      } else {
        btn.style.backgroundColor = '#f5f5f5';
        btn.style.color = '#666';
        btn.classList.remove('active');
      }
    });
  }

  getSearchInput() {
    return document.getElementById('search-input');
  }

  getSearchButton() {
    return document.getElementById('search-button');
  }

  clearSearch() {
    const searchInput = this.getSearchInput();
    if (searchInput) {
      searchInput.value = '';
    }
  }
}

export default CatalogView;