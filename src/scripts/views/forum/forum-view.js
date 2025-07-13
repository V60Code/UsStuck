class ForumView {
  constructor() {
    this.container = null;
  }

  render() {
    return `
      <div class="container">
        <div class="section">
          <div class="forum-header" style="text-align: center; margin-bottom: 48px;">
            <div style="font-size: 4rem; margin-bottom: 24px;">💬</div>
            <h1 class="section-title">Forum Diskusi Islam</h1>
            <p class="section-subtitle">
              Tempat berbagi pengetahuan, diskusi, dan tanya jawab seputar Islam
            </p>
          </div>

          <!-- Forum Stats -->
          <div id="forum-stats" class="forum-stats" style="margin-bottom: 32px;">
            <!-- Stats will be rendered here -->
          </div>

          <!-- Forum Controls -->
          <div class="forum-controls" style="margin-bottom: 32px;">
            <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; justify-content: space-between;">
              <div style="display: flex; gap: 12px; flex: 1; min-width: 300px;">
                <input 
                  type="text" 
                  id="search-input" 
                  placeholder="Cari topik diskusi..."
                  style="
                    flex: 1;
                    padding: 12px 16px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: border-color 0.2s;
                  "
                />
                <button 
                  id="search-button"
                  style="
                    background-color: #556B2F;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                  "
                >
                  Cari
                </button>
              </div>
              
              <button 
                id="new-topic-button"
                style="
                  background-color: #D2B48C;
                  color: white;
                  border: none;
                  padding: 12px 24px;
                  border-radius: 8px;
                  font-size: 14px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: background-color 0.2s;
                "
              >
                + Topik Baru
              </button>
            </div>
          </div>

          <!-- Category Filter -->
          <div id="category-filter" class="category-filter" style="margin-bottom: 32px;">
            <!-- Categories will be rendered here -->
          </div>

          <!-- Topics List -->
          <div id="topics-container">
            <div id="topics-list">
              <!-- Topics will be rendered here -->
            </div>
          </div>

          <!-- New Topic Modal -->
          <div id="new-topic-modal" class="modal" style="display: none;">
            <!-- Modal content will be rendered here -->
          </div>
        </div>
      </div>
    `;
  }

  renderForumStats(stats) {
    return `
      <div class="grid-cols-4" style="gap: 16px; text-align: center;">
        <div class="card" style="padding: 20px;">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold;">${stats.totalTopics}</div>
          <div style="color: #666; font-size: 14px;">Total Topik</div>
        </div>
        <div class="card" style="padding: 20px;">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold;">${stats.totalReplies}</div>
          <div style="color: #666; font-size: 14px;">Total Balasan</div>
        </div>
        <div class="card" style="padding: 20px;">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold;">${stats.totalViews}</div>
          <div style="color: #666; font-size: 14px;">Total Views</div>
        </div>
        <div class="card" style="padding: 20px;">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold;">${stats.activeUsers}</div>
          <div style="color: #666; font-size: 14px;">Pengguna Aktif</div>
        </div>
      </div>
    `;
  }

  renderCategoryFilter(categories) {
    return `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
        ${categories.map(category => `
          <button 
            class="category-btn ${category.id === 'all' ? 'active' : ''}" 
            data-category="${category.id}"
            style="
              background-color: ${category.id === 'all' ? category.color : '#f5f5f5'};
              color: ${category.id === 'all' ? 'white' : '#666'};
              border: none;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s;
            "
          >
            ${category.name}
          </button>
        `).join('')}
      </div>
    `;
  }

  renderTopics(topics) {
    if (topics.length === 0) {
      return `
        <div style="text-align: center; padding: 48px; color: #666;">
          <div style="font-size: 3rem; margin-bottom: 16px;">📭</div>
          <h3>Tidak ada topik ditemukan</h3>
          <p>Coba ubah kata kunci pencarian atau pilih kategori lain</p>
        </div>
      `;
    }

    return topics.map(topic => `
      <div class="card forum-card" style="
        padding: 24px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 16px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
      " data-topic-id="${topic.id}">
        
        ${topic.isPinned ? `
          <div style="
            background-color: #FFD700;
            color: #333;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            position: absolute;
            top: 8px;
            right: 8px;
          ">
            📌 PINNED
          </div>
        ` : ''}

        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="
              background-color: ${this.getCategoryColor(topic.category)};
              color: white;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
            ">
              ${topic.category}
            </span>
            <span style="color: #999; font-size: 12px;">${topic.lastActivity}</span>
          </div>
          
          <h3 style="color: #333; margin-bottom: 8px; font-size: 18px; line-height: 1.4;">
            ${topic.title}
          </h3>
          
          <p style="color: #666; font-size: 14px; margin-bottom: 12px; line-height: 1.5;">
            ${topic.content.substring(0, 120)}${topic.content.length > 120 ? '...' : ''}
          </p>
          
          <div style="display: flex; align-items: center; gap: 16px; color: #999; font-size: 12px;">
            <span>👤 ${topic.author}</span>
            <span>💬 ${topic.replies} balasan</span>
            <span>👁️ ${topic.views} views</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderNewTopicModal() {
    return `
      <div class="modal-overlay" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      ">
        <div class="modal-content" style="
          background: white;
          padding: 32px;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2 style="color: #333; margin: 0;">Buat Topik Baru</h2>
            <button id="close-modal" style="
              background: none;
              border: none;
              font-size: 24px;
              cursor: pointer;
              color: #999;
            ">×</button>
          </div>
          
          <form id="new-topic-form">
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                Judul Topik *
              </label>
              <input 
                type="text" 
                id="topic-title" 
                required
                placeholder="Masukkan judul topik diskusi..."
                style="
                  width: 100%;
                  padding: 12px;
                  border: 2px solid #e0e0e0;
                  border-radius: 8px;
                  font-size: 16px;
                  transition: border-color 0.2s;
                "
              />
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                Kategori *
              </label>
              <select 
                id="topic-category" 
                required
                style="
                  width: 100%;
                  padding: 12px;
                  border: 2px solid #e0e0e0;
                  border-radius: 8px;
                  font-size: 16px;
                  transition: border-color 0.2s;
                "
              >
                <option value="">Pilih kategori...</option>
                <option value="Tafsir">Tafsir</option>
                <option value="Fiqh">Fiqh</option>
                <option value="Ibadah">Ibadah</option>
                <option value="Parenting">Parenting</option>
                <option value="Akhlaq">Akhlaq</option>
              </select>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                Nama Anda *
              </label>
              <input 
                type="text" 
                id="topic-author" 
                required
                placeholder="Masukkan nama Anda..."
                style="
                  width: 100%;
                  padding: 12px;
                  border: 2px solid #e0e0e0;
                  border-radius: 8px;
                  font-size: 16px;
                  transition: border-color 0.2s;
                "
              />
            </div>
            
            <div style="margin-bottom: 24px;">
              <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
                Isi Diskusi *
              </label>
              <textarea 
                id="topic-content" 
                required
                placeholder="Tuliskan topik diskusi Anda..."
                rows="6"
                style="
                  width: 100%;
                  padding: 12px;
                  border: 2px solid #e0e0e0;
                  border-radius: 8px;
                  font-size: 16px;
                  font-family: inherit;
                  resize: vertical;
                  transition: border-color 0.2s;
                "
              ></textarea>
            </div>
            
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
              <button 
                type="button" 
                id="cancel-topic"
                style="
                  background: none;
                  border: 1px solid #ccc;
                  color: #666;
                  padding: 12px 24px;
                  border-radius: 8px;
                  cursor: pointer;
                  transition: all 0.2s;
                "
              >
                Batal
              </button>
              <button 
                type="submit"
                style="
                  background-color: #556B2F;
                  color: white;
                  border: none;
                  padding: 12px 24px;
                  border-radius: 8px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: background-color 0.2s;
                "
              >
                Buat Topik
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  getCategoryColor(category) {
    const colors = {
      'Tafsir': '#8B4513',
      'Fiqh': '#2E8B57',
      'Ibadah': '#4682B4',
      'Parenting': '#9932CC',
      'Akhlaq': '#DC143C'
    };
    return colors[category] || '#556B2F';
  }

  showModal() {
    const modal = document.getElementById('new-topic-modal');
    if (modal) {
      modal.style.display = 'block';
      modal.innerHTML = this.renderNewTopicModal();
    }
  }

  hideModal() {
    const modal = document.getElementById('new-topic-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  updateCategoryFilter(activeCategory, categories) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categoryFilter.innerHTML = this.renderCategoryFilter(categories);
      
      // Update active state
      const buttons = categoryFilter.querySelectorAll('.category-btn');
      buttons.forEach(btn => {
        const category = btn.getAttribute('data-category');
        const categoryData = categories.find(cat => cat.id === category);
        
        if (category === activeCategory) {
          btn.style.backgroundColor = categoryData.color;
          btn.style.color = 'white';
          btn.classList.add('active');
        } else {
          btn.style.backgroundColor = '#f5f5f5';
          btn.style.color = '#666';
          btn.classList.remove('active');
        }
      });
    }
  }

  getSearchInput() {
    return document.getElementById('search-input');
  }

  clearSearch() {
    const searchInput = this.getSearchInput();
    if (searchInput) {
      searchInput.value = '';
    }
  }
}

export default ForumView;