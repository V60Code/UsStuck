class CatalogView {
  constructor() {
    this.container = null;
  }

  render() {
    return `
      <!-- Hero Section -->
      <section style="
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 80px 0;
        text-align: center;
      ">
        <div class="container">
          <div style="font-size: 4rem; margin-bottom: 24px;">📚</div>
          <h1 style="
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            margin-bottom: 24px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          ">Pustaka <span style="color: #D2B48C;">Perawi Hadis</span></h1>
          <p style="
            font-size: clamp(1rem, 2.5vw, 1.2rem);
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            opacity: 0.9;
          ">Telusuri koleksi hadits shahih dari para perawi terkemuka dalam sejarah Islam.</p>
        </div>
      </section>

      <div class="container">
        <div class="section">
          <!-- Search and Filter Section -->
          <div style="
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            margin: -40px auto 60px;
            max-width: 800px;
            position: relative;
            z-index: 10;
          ">
            <div style="text-align: center; margin-bottom: 32px;">
              <h2 style="
                color: #2c3e50;
                font-size: 1.8rem;
                margin-bottom: 8px;
                font-weight: 600;
              ">Cari Koleksi Hadits</h2>
              <p style="color: #6c757d; font-size: 1rem;">Temukan hadits berdasarkan perawi, kitab, atau kata kunci</p>
            </div>
            
            <div style="margin-bottom: 24px;">
              <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                <input 
                  type="text" 
                  id="search-input" 
                  placeholder="Cari berdasarkan perawi, kitab, atau kata kunci..."
                  style="
                    flex: 1;
                    padding: 16px 20px;
                    border: 2px solid #e9ecef;
                    border-radius: 25px;
                    font-size: 16px;
                    outline: none;
                    transition: all 0.3s ease;
                  "
                  onfocus="this.style.borderColor='#D2B48C'; this.style.boxShadow='0 0 0 3px rgba(210, 180, 140, 0.1)'"
                  onblur="this.style.borderColor='#e9ecef'; this.style.boxShadow='none'"
                />
                <button 
                  id="search-button"
                  style="
                    background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                    color: white;
                    border: none;
                    padding: 16px 32px;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
                  "
                  onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'"
                  onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(210, 180, 140, 0.3)'"
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
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 style="
              color: #2c3e50;
              font-size: 2.5rem;
              margin-bottom: 16px;
              font-weight: 700;
            ">Koleksi <span style="color: #D2B48C;">Perawi Hadits</span></h2>
            <p style="
              color: #6c757d;
              font-size: 1.1rem;
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto 48px;
            ">Jelajahi hadits dari para perawi terpercaya yang telah dikumpulkan dan diverifikasi oleh para ulama</p>
          </div>
          
          <div id="categories-grid" class="grid grid-cols-3" style="gap: 32px; margin-bottom: 48px;">
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
            <div id="items-grid" class="grid grid-cols-3" style="gap: 24px;">
              <!-- Items will be rendered here -->
            </div>
          </div>

          <!-- Search Results -->
          <div id="search-results" style="display: none;">
            <h3 id="search-results-title" style="margin-bottom: 24px; text-align: center;"></h3>
            <div id="search-results-grid" class="grid grid-cols-3" style="gap: 24px;">
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
        padding: 40px 32px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        border: 1px solid #f0f0f0;
        position: relative;
        overflow: hidden;
      "
      onmouseover="
        this.style.transform='translateY(-8px)';
        this.style.boxShadow='0 20px 40px rgba(0,0,0,0.15)';
        this.style.borderColor='#D2B48C';
      "
      onmouseout="
        this.style.transform='translateY(0)';
        this.style.boxShadow='0 10px 30px rgba(0,0,0,0.1)';
        this.style.borderColor='#f0f0f0';
      ">
        <div style="
          font-size: 4rem;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        ">${category.icon}</div>
        <h3 style="
          color: #2c3e50;
          margin-bottom: 12px;
          font-size: 1.5rem;
          font-weight: 600;
        ">${category.name}</h3>
        <p style="
          color: #6c757d;
          font-size: 1rem;
          margin-bottom: 24px;
          line-height: 1.5;
        ">${category.description}</p>
        <div style="
          background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
        ">
          Lihat Koleksi Hadits
        </div>
      </div>
    `).join('');
  }

  renderCategoryFilter(categories) {
    const allButton = `
      <button class="category-filter-btn active" data-category="all" style="
        background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
      "
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(210, 180, 140, 0.3)'">
        Semua
      </button>
    `;

    const categoryButtons = categories.map(category => `
      <button class="category-filter-btn" data-category="${category.id}" style="
        background: white;
        color: #6c757d;
        border: 2px solid #e9ecef;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      "
      onmouseover="this.style.borderColor='#D2B48C'; this.style.color='#D2B48C'; this.style.transform='translateY(-2px)'"
      onmouseout="this.style.borderColor='#e9ecef'; this.style.color='#6c757d'; this.style.transform='translateY(0)'">
        ${category.name}
      </button>
    `).join('');

    return allButton + categoryButtons;
  }

  renderItems(items) {
    if (items.length === 0) {
      return `
        <div style="
          text-align: center;
          padding: 80px 40px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin: 40px 0;
        ">
          <div style="
            font-size: 4rem;
            margin-bottom: 24px;
            background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">📭</div>
          <h3 style="
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 12px;
            font-weight: 600;
          ">Tidak ada hadits ditemukan</h3>
          <p style="
            color: #6c757d;
            font-size: 1rem;
            line-height: 1.5;
          ">Coba ubah kata kunci pencarian atau pilih perawi lain</p>
        </div>
      `;
    }

    return items.map(item => `
      <div class="card item-card" style="
        padding: 32px;
        text-align: left;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        border: 1px solid #f0f0f0;
        position: relative;
        overflow: hidden;
      "
      onmouseover="
        this.style.transform='translateY(-5px)';
        this.style.boxShadow='0 15px 40px rgba(0,0,0,0.15)';
        this.style.borderColor='#D2B48C';
      "
      onmouseout="
        this.style.transform='translateY(0)';
        this.style.boxShadow='0 10px 30px rgba(0,0,0,0.1)';
        this.style.borderColor='#f0f0f0';
      ">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="
            background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
            padding: 12px;
            border-radius: 12px;
            margin-right: 16px;
            font-size: 24px;
            color: white;
            box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
          ">
            ${this.getItemIcon(item.type)}
          </div>
          <div>
            <div style="
              font-size: 12px;
              color: #D2B48C;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            ">
              ${item.category || 'Umum'}
            </div>
            <div style="
              font-size: 10px;
              color: #6c757d;
              text-transform: uppercase;
              margin-top: 2px;
            ">
              ${item.type}
            </div>
          </div>
        </div>
        
        <h4 style="
          color: #2c3e50;
          margin-bottom: 12px;
          line-height: 1.4;
          font-size: 1.2rem;
          font-weight: 600;
        ">${item.title}</h4>
        <p style="
          color: #6c757d;
          font-size: 1rem;
          margin-bottom: 24px;
          line-height: 1.5;
        ">Oleh: <span style="color: #D2B48C; font-weight: 500;">${item.author}</span></p>
        
        <div style="display: flex; gap: 12px;">
          <button class="btn-view" data-item-id="${item.id}" style="
            flex: 1;
            background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
          "
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(210, 180, 140, 0.3)'">
            Lihat Koleksi Hadits
          </button>
          <button class="btn-download" data-item-id="${item.id}" style="
            background: white;
            border: 2px solid #D2B48C;
            color: #D2B48C;
            padding: 12px 16px;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
          onmouseover="this.style.background='#D2B48C'; this.style.color='white'; this.style.transform='translateY(-2px)'"
          onmouseout="this.style.background='white'; this.style.color='#D2B48C'; this.style.transform='translateY(0)'">
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