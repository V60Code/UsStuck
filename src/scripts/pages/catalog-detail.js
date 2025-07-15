import DetailCatalogPresenter from '../presenters/catalog/detail-catalog-presenter.js';

class CatalogDetailPage {
  constructor() {
    this.presenter = new DetailCatalogPresenter();
    this.narratorId = '';
  }

  async render(narratorId) {
    this.narratorId = narratorId;
    
    // Validate narrator ID
    if (!this.isValidNarratorId(narratorId)) {
      return this.renderError('Perawi tidak ditemukan');
    }

    try {
      // Initialize the presenter with narrator ID
      setTimeout(async () => {
        await this.presenter.init(narratorId);
      }, 100);
      
      // Return empty div, presenter will handle rendering
      return '<div id="app"></div>';
    } catch (error) {
      console.error('Error rendering catalog detail page:', error);
      return this.renderError('Terjadi kesalahan saat memuat halaman');
    }
  }

  renderError(message) {
    return `
      <div class="error-page" style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      ">
        <div style="
          text-align: center;
          padding: 48px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          max-width: 500px;
          margin: 24px;
        ">
          <div style="
            font-size: 4rem;
            margin-bottom: 24px;
            background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">⚠️</div>
          <h2 style="
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 16px;
            font-weight: 600;
          ">Oops! Terjadi Kesalahan</h2>
          <p style="
            color: #6c757d;
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 32px;
          ">${message}</p>
          <button 
            onclick="window.location.hash = '#/catalog'"
            style="
              background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.3s;
              font-weight: 600;
              font-size: 14px;
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
          >
            ← Kembali ke Katalog
          </button>
        </div>
      </div>
    `;
  }

  isValidNarratorId(narratorId) {
    const validNarrators = [
      'bukhari',
      'muslim', 
      'tirmidzi',
      'abu daud',
      'an-nasa\'i',
      'ibn majah'
    ];
    
    return validNarrators.includes(narratorId);
  }

  // Method to handle page cleanup when navigating away
  destroy() {
    if (this.presenter) {
      this.presenter.destroy();
    }
  }

  // Method to get page title for browser tab
  getPageTitle(narratorId) {
    const narratorNames = {
      'bukhari': 'Hadits Imam Bukhari',
      'muslim': 'Hadits Imam Muslim',
      'tirmidzi': 'Hadits Imam Tirmidzi',
      'abu daud': 'Hadits Imam Abu Daud',
      'an-nasa\'i': 'Hadits Imam An-Nasa\'i',
      'ibn majah': 'Hadits Imam Ibn Majah'
    };
    
    return narratorNames[narratorId] || 'Detail Katalog Hadits';
  }

  // Method to get page meta description
  getPageDescription(narratorId) {
    const descriptions = {
      'bukhari': 'Jelajahi koleksi hadits shahih dari Imam Bukhari yang telah diverifikasi oleh para ulama',
      'muslim': 'Temukan hadits-hadits shahih dari Imam Muslim dengan kualitas sanad yang terpercaya',
      'tirmidzi': 'Pelajari hadits-hadits dari Imam Tirmidzi dengan klasifikasi kualitas yang detail',
      'abu daud': 'Akses koleksi hadits dari Imam Abu Daud yang fokus pada hadits-hadits hukum',
      'an-nasa\'i': 'Baca hadits-hadits dari Imam An-Nasa\'i yang terkenal dengan kehati-hatiannya',
      'ibn majah': 'Eksplorasi hadits dari Imam Ibn Majah yang melengkapi kitab-kitab hadits lainnya'
    };
    
    return descriptions[narratorId] || 'Koleksi hadits dari perawi terpercaya';
  }
}

export default CatalogDetailPage;