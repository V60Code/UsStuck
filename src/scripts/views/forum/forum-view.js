class ForumView {
  constructor() {
    this.container = null;
  }

  render() {
    return `
      <div class="container">
        <div class="section">
          <div class="forum-header" style="
            display: flex; 
            align-items: center; 
            gap: 40px; 
            margin-bottom: 48px; 
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
            padding: 40px; 
            border-radius: 20px;
            flex-direction: row;
          ">
            <div style="
              flex: 1; 
              max-width: 400px;
              min-width: 250px;
            ">
              <img src="/forum.png" alt="Forum Discussion" style="
                width: 100%; 
                height: auto; 
                border-radius: 15px;
                max-height: 300px;
                object-fit: cover;
              " />
            </div>
            <div style="
              flex: 1; 
              text-align: left;
              min-width: 300px;
            ">
              <h1 style="
                font-size: clamp(1.8rem, 4vw, 2.5rem); 
                color: #2c3e50; 
                margin-bottom: 16px; 
                font-weight: 700;
                line-height: 1.2;
              ">Gabung Forum <span style="color: #D2B48C;">Diskusi</span></h1>
              <p style="
                color: #6c757d; 
                font-size: clamp(1rem, 2.5vw, 1.1rem); 
                line-height: 1.6; 
                margin-bottom: 24px;
              ">
                Tempat berbagi pengetahuan diskusi dan tanya jawab<br>
                seputar Islam
              </p>
              <div style="
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
                gap: 16px; 
                margin-top: 24px;
              ">
                <div id="forum-stats-inline" class="forum-stats-inline">
                  <!-- Inline stats will be rendered here -->
                </div>
              </div>
            </div>
          </div>
          
          <style>
            @media (max-width: 768px) {
              .forum-header {
                flex-direction: column !important;
                text-align: center !important;
                padding: 24px !important;
                gap: 24px !important;
              }
              .forum-header > div:first-child {
                max-width: 100% !important;
                min-width: auto !important;
              }
              .forum-header > div:last-child {
                text-align: center !important;
                min-width: auto !important;
              }
              .forum-header h1 {
                font-size: 2rem !important;
              }
              .forum-header p {
                font-size: 1rem !important;
              }
            }
            
            @media (max-width: 480px) {
              .forum-header {
                padding: 20px !important;
                margin-bottom: 32px !important;
              }
              .forum-header h1 {
                font-size: 1.75rem !important;
              }
              .forum-header img {
                max-height: 200px !important;
              }
            }
          </style>

          <!-- Forum Controls -->
          <div class="forum-controls" style="margin-bottom: 32px; background: white; padding: 24px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
            <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; justify-content: space-between; margin-bottom: 20px;">
              <div style="display: flex; gap: 12px; flex: 1; min-width: 300px;">
                <input 
                  type="text" 
                  id="search-input" 
                  placeholder="Cari topik diskusi..."
                  style="
                    flex: 1;
                    padding: 14px 18px;
                    border: 2px solid #e9ecef;
                    border-radius: 12px;
                    font-size: 15px;
                    transition: all 0.2s;
                    background: #f8f9fa;
                  "
                />
                <button 
                  id="search-button"
                  style="
                    background-color: #556B2F;
                    color: white;
                    border: none;
                    padding: 14px 24px;
                    border-radius: 12px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px rgba(85, 107, 47, 0.3);
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
                  padding: 14px 28px;
                  border-radius: 12px;
                  font-size: 15px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s;
                  box-shadow: 0 2px 8px rgba(210, 180, 140, 0.3);
                "
              >
                + Topik
              </button>
            </div>
            
            <!-- Category Filter -->
            <div id="category-filter" class="category-filter">
              <!-- Categories will be rendered here -->
            </div>
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
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div style="text-align: center; padding: 16px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold; margin-bottom: 4px;">${stats.totalTopics}</div>
          <div style="color: #6c757d; font-size: 13px; font-weight: 500;">Total Topik</div>
        </div>
        <div style="text-align: center; padding: 16px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold; margin-bottom: 4px;">${stats.totalReplies}</div>
          <div style="color: #6c757d; font-size: 13px; font-weight: 500;">Total Balasan</div>
        </div>
        <div style="text-align: center; padding: 16px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold; margin-bottom: 4px;">${stats.totalViews}</div>
          <div style="color: #6c757d; font-size: 13px; font-weight: 500;">Total Views</div>
        </div>
        <div style="text-align: center; padding: 16px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="font-size: 2rem; color: #556B2F; font-weight: bold; margin-bottom: 4px;">${stats.activeUsers}</div>
          <div style="color: #6c757d; font-size: 13px; font-weight: 500;">Pengguna Aktif</div>
        </div>
      </div>
    `;
  }

  renderCategoryFilter(categories) {
    return `
      <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-start;">
        ${categories.map(category => `
          <button 
            class="category-btn ${category.id === 'all' ? 'active' : ''}" 
            data-category="${category.id}"
            style="
              background-color: ${category.id === 'all' ? category.color : '#f8f9fa'};
              color: ${category.id === 'all' ? 'white' : '#6c757d'};
              border: 2px solid ${category.id === 'all' ? category.color : '#e9ecef'};
              padding: 10px 20px;
              border-radius: 25px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: ${category.id === 'all' ? '0 2px 8px rgba(85, 107, 47, 0.2)' : 'none'};
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
        margin-bottom: 20px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        border: 1px solid #f1f3f4;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      " data-topic-id="${topic.id}">
        
        ${topic.isPinned ? `
          <div style="
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #333;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            position: absolute;
            top: 16px;
            right: 16px;
            box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
          ">
            📌 PINNED
          </div>
        ` : ''}

        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="
              background: linear-gradient(135deg, ${this.getCategoryColor(topic.category)}, ${this.getCategoryColor(topic.category)}dd);
              color: white;
              padding: 6px 14px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              box-shadow: 0 2px 6px ${this.getCategoryColor(topic.category)}40;
            ">
              ${topic.category}
            </span>
            <span style="color: #8e9aaf; font-size: 13px; font-weight: 500;">${topic.lastActivity}</span>
          </div>
          
          <h3 style="color: #2c3e50; margin-bottom: 12px; font-size: 19px; line-height: 1.4; font-weight: 600;">
            ${topic.title}
          </h3>
          
          <p style="color: #6c757d; font-size: 15px; margin-bottom: 16px; line-height: 1.6;">
            ${topic.content.substring(0, 120)}${topic.content.length > 120 ? '...' : ''}
          </p>
          
          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 16px; border-top: 1px solid #f1f3f4;">
            <div style="display: flex; align-items: center; gap: 4px; color: #6c757d; font-size: 13px; font-weight: 500;">
              <span style="color: #8e9aaf;">👤</span>
              <span>${topic.author}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px; color: #8e9aaf; font-size: 13px; font-weight: 500;">
              <span style="display: flex; align-items: center; gap: 4px;">
                <span>💬</span>
                <span>${topic.replies}</span>
              </span>
              <span style="display: flex; align-items: center; gap: 4px;">
                <span>👁️</span>
                <span>${topic.views}</span>
              </span>
            </div>
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