class CatalogDetailView {
  render() {
    return `
      <div class="catalog-detail-page">
        <!-- Hero Section -->
        <div style="
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        ">
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
            opacity: 0.3;
          "></div>
          <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1;">
            <div style="
              font-size: 3rem;
              margin-bottom: 16px;
              background: linear-gradient(135deg, #D2B48C 0%, #F4E4BC 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">📚</div>
            <h1 id="narrator-title" style="
              font-size: 3rem;
              font-weight: 700;
              margin-bottom: 16px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            ">Hadits Imam Bukhari</h1>
            <p id="narrator-description" style="
              font-size: 1.25rem;
              opacity: 0.9;
              max-width: 600px;
              margin: 0 auto;
              line-height: 1.6;
            ">Koleksi hadits shahih dari Imam Bukhari yang telah diverifikasi oleh para ulama</p>
          </div>
        </div>

        <!-- Content Section -->
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 48px 24px;">
          <!-- Navigation -->
          <div style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <button 
              id="back-to-catalog"
              style="
                background: none;
                border: 2px solid #556B2F;
                color: #556B2F;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
              "
            >
              ← Kembali ke Katalog
            </button>
            
            <!-- Search -->
            <div style="display: flex; gap: 12px; align-items: center;">
              <input 
                type="text" 
                id="hadits-search" 
                placeholder="Cari hadits..."
                style="
                  padding: 12px 16px;
                  border: 2px solid #e0e0e0;
                  border-radius: 8px;
                  font-size: 14px;
                  width: 250px;
                  transition: border-color 0.3s;
                "
              />
              <button 
                id="search-hadits-btn"
                style="
                  background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                  color: white;
                  border: none;
                  padding: 12px 20px;
                  border-radius: 8px;
                  cursor: pointer;
                  transition: all 0.3s;
                  font-weight: 600;
                "
              >
                Cari
              </button>
            </div>
          </div>

          <!-- Stats -->
          <div style="
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
          ">
            <div>
              <h3 id="total-hadits" style="
                font-size: 2rem;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 4px;
              ">0</h3>
              <p style="color: #6c757d; margin: 0;">Total Hadits</p>
            </div>
            <div>
              <h3 id="current-page-info" style="
                font-size: 1.25rem;
                font-weight: 600;
                color: #556B2F;
                margin-bottom: 4px;
              ">Halaman 1</h3>
              <p style="color: #6c757d; margin: 0;">dari <span id="total-pages">1</span> halaman</p>
            </div>
          </div>

          <!-- Hadits List -->
          <div id="hadits-list" class="grid" style="gap: 24px; margin-bottom: 48px;">
            <!-- Hadits will be rendered here -->
          </div>

          <!-- Pagination -->
          <div id="pagination" style="
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 12px;
            margin-top: 48px;
          ">
            <!-- Pagination will be rendered here -->
          </div>

          <!-- Loading State -->
          <div id="loading-state" style="
            display: none;
            text-align: center;
            padding: 80px 40px;
          ">
            <div style="
              font-size: 3rem;
              margin-bottom: 16px;
              animation: spin 1s linear infinite;
            ">⏳</div>
            <p style="color: #6c757d; font-size: 1.125rem;">Memuat hadits...</p>
          </div>

          <!-- No Results -->
          <div id="no-results" style="
            display: none;
            text-align: center;
            padding: 80px 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          ">
            <div style="
              font-size: 4rem;
              margin-bottom: 24px;
              background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">🔍</div>
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
            ">Coba ubah kata kunci pencarian atau kembali ke halaman sebelumnya</p>
          </div>
        </div>
      </div>

      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .hadits-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          border-left: 4px solid #D2B48C;
          transition: all 0.3s ease;
        }
        
        .hadits-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }
        
        .pagination-btn {
          padding: 10px 16px;
          border: 2px solid #e0e0e0;
          background: white;
          color: #6c757d;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
        }
        
        .pagination-btn:hover {
          border-color: #D2B48C;
          color: #D2B48C;
        }
        
        .pagination-btn.active {
          background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
          color: white;
          border-color: transparent;
        }
        
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .hadits-card {
            padding: 24px;
          }
          
          #hadits-search {
            width: 200px;
          }
        }
      </style>
    `;
  }

  renderHadits(hadits) {
    if (!hadits || hadits.length === 0) {
      return '';
    }

    return hadits.map((hadits, index) => `
      <div class="hadits-card">
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        ">
          <div style="
            background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          ">
            Hadits #${hadits.id || index + 1}
          </div>
          <div style="
            color: #6c757d;
            font-size: 14px;
            font-weight: 500;
          ">
            ${hadits.Nama || 'Unknown'}
          </div>
        </div>
        
        ${hadits.arab ? `
          <div style="
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 16px;
            border-right: 4px solid #D2B48C;
          ">
            <p style="
              font-family: 'Amiri', 'Times New Roman', serif;
              font-size: 1.25rem;
              line-height: 2;
              text-align: right;
              color: #2c3e50;
              margin: 0;
            ">${hadits.arab}</p>
          </div>
        ` : ''}
        
        ${hadits.terjemahan ? `
          <div style="
            padding: 16px 0;
            border-bottom: 1px solid #e9ecef;
            margin-bottom: 16px;
          ">
            <h4 style="
              color: #2c3e50;
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 8px;
            ">Terjemahan:</h4>
            <p style="
              color: #495057;
              line-height: 1.6;
              margin: 0;
            ">${hadits.terjemahan}</p>
          </div>
        ` : ''}
        
        ${hadits.text ? `
          <div>
            <h4 style="
              color: #2c3e50;
              font-size: 1rem;
              font-weight: 600;
              margin-bottom: 8px;
            ">Matan Hadits:</h4>
            <p style="
              color: #495057;
              line-height: 1.6;
              margin: 0;
            ">${hadits.text}</p>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  renderPagination(currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) return '';

    let pagination = '';
    
    // Previous button
    pagination += `
      <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
        ← Sebelumnya
      </button>
    `;
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
      pagination += `<button class="pagination-btn" data-page="1">1</button>`;
      if (startPage > 2) {
        pagination += `<span style="padding: 10px; color: #6c757d;">...</span>`;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pagination += `
        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagination += `<span style="padding: 10px; color: #6c757d;">...</span>`;
      }
      pagination += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
    }
    
    // Next button
    pagination += `
      <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
        Selanjutnya →
      </button>
    `;
    
    return pagination;
  }

  showLoading() {
    document.getElementById('loading-state').style.display = 'block';
    document.getElementById('hadits-list').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';
  }

  hideLoading() {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('hadits-list').style.display = 'grid';
  }

  showNoResults() {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('hadits-list').style.display = 'none';
    document.getElementById('no-results').style.display = 'block';
  }

  updateStats(total, currentPage, totalPages) {
    document.getElementById('total-hadits').textContent = total;
    document.getElementById('current-page-info').textContent = `Halaman ${currentPage}`;
    document.getElementById('total-pages').textContent = totalPages;
  }

  updateTitle(narratorName, description) {
    document.getElementById('narrator-title').textContent = `Hadits ${narratorName}`;
    document.getElementById('narrator-description').textContent = description;
  }

  getSearchInput() {
    return document.getElementById('hadits-search');
  }

  getSearchButton() {
    return document.getElementById('search-hadits-btn');
  }

  getBackButton() {
    return document.getElementById('back-to-catalog');
  }
}

export default CatalogDetailView;