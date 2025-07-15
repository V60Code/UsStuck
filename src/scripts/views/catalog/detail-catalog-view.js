class DetailCatalogView {
  render(narrator) {
    return `
      <div class="detail-catalog-container" style="
        min-height: 100vh;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        padding: 80px 0 40px;
      ">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <!-- Header Section -->
          <div style="
            text-align: center;
            margin-bottom: 48px;
            padding: 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          ">
            <button 
              id="back-to-catalog"
              style="
                position: absolute;
                top: 20px;
                left: 20px;
                background: none;
                border: 1px solid #D2B48C;
                color: #D2B48C;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 14px;
              "
              onmouseover="this.style.backgroundColor='#D2B48C'; this.style.color='white'"
              onmouseout="this.style.backgroundColor='transparent'; this.style.color='#D2B48C'"
            >
              ← Kembali ke Katalog
            </button>
            
            <div style="
              font-size: 3rem;
              margin-bottom: 16px;
              background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            ">📚</div>
            
            <h1 id="narrator-title" style="
              font-size: 2.5rem;
              font-weight: 700;
              color: #2c3e50;
              margin-bottom: 12px;
            ">Koleksi Hadits ${narrator}</h1>
            
            <p style="
              font-size: 1.1rem;
              color: #6c757d;
              max-width: 600px;
              margin: 0 auto;
              line-height: 1.6;
            ">Jelajahi koleksi hadits shahih yang telah diriwayatkan dan dikumpulkan</p>
          </div>

          <!-- Search Section -->
          <div style="
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            margin-bottom: 32px;
          ">
            <div style="display: flex; gap: 12px; align-items: center;">
              <input 
                type="text" 
                id="search-hadits"
                placeholder="Cari hadits berdasarkan teks Arab, Indonesia, kitab, atau nomor..."
                style="
                  flex: 1;
                  padding: 12px 16px;
                  border: 2px solid #e9ecef;
                  border-radius: 8px;
                  font-size: 16px;
                  transition: border-color 0.3s;
                "
              />
              <button 
                id="search-button"
                style="
                  background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                  color: white;
                  border: none;
                  padding: 12px 24px;
                  border-radius: 8px;
                  font-size: 16px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s;
                  box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
                "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(210, 180, 140, 0.3)'"
              >
                🔍 Cari
              </button>
              <button 
                id="clear-search"
                style="
                  background: white;
                  color: #6c757d;
                  border: 2px solid #e9ecef;
                  padding: 12px 16px;
                  border-radius: 8px;
                  font-size: 16px;
                  cursor: pointer;
                  transition: all 0.3s;
                "
                onmouseover="this.style.borderColor='#D2B48C'; this.style.color='#D2B48C'"
                onmouseout="this.style.borderColor='#e9ecef'; this.style.color='#6c757d'"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Results Info -->
          <div id="results-info" style="
            background: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
            <div id="total-info" style="color: #6c757d; font-size: 14px;"></div>
            <div style="display: flex; gap: 12px; align-items: center;">
              <label style="color: #6c757d; font-size: 14px;">Tampilkan:</label>
              <select id="items-per-page" style="
                padding: 6px 12px;
                border: 1px solid #e9ecef;
                border-radius: 6px;
                font-size: 14px;
              ">
                <option value="12">12 per halaman</option>
                <option value="24" selected>24 per halaman</option>
                <option value="48">48 per halaman</option>
              </select>
            </div>
          </div>

          <!-- Hadits List -->
          <div id="hadits-list" style="margin-bottom: 32px;">
            <!-- Hadits items will be rendered here -->
          </div>

          <!-- Pagination -->
          <div id="pagination-container" style="
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            text-align: center;
          ">
            <!-- Pagination will be rendered here -->
          </div>
        </div>
      </div>
    `;
  }

  renderHaditsList(haditsData) {
    if (!haditsData || haditsData.length === 0) {
      return `
        <div style="
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
          ">Coba ubah kata kunci pencarian atau periksa ejaan</p>
        </div>
      `;
    }

    return haditsData.map((hadits, index) => `
      <div class="hadits-card" 
           data-hadits-id="${hadits.id}" 
           data-hadits-index="${index}"
           style="
        background: white;
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        border-left: 4px solid #D2B48C;
        transition: all 0.3s ease;
        cursor: pointer;
      "
      onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.12)'"
      onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.08)'">
        
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div style="flex: 1;">
            <h3 style="
              color: #2c3e50;
              font-size: 1.1rem;
              font-weight: 600;
              margin: 0;
              line-height: 1.4;
            ">${hadits.Perawi || 'Hadits'}</h3>
            <p style="
              color: #6c757d;
              font-size: 0.85rem;
              margin: 4px 0 0 0;
            ">ID: ${hadits.id || '-'} • ${hadits.Nama || 'Perawi'}</p>
          </div>
          
          <div style="
            background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
            color: white;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            min-width: 40px;
            text-align: center;
          ">
            #${index + 1}
          </div>
        </div>
      </div>
    `).join('');
  }

  renderDetailedHaditsList(haditsData) {
    if (!haditsData || haditsData.length === 0) {
      return `
        <div style="
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
          ">Coba ubah kata kunci pencarian atau periksa ejaan</p>
        </div>
      `;
    }

    return haditsData.map((hadits, index) => `
       <div class="hadits-card" style="
         background: white;
         border-radius: 16px;
         padding: 32px;
         margin-bottom: 24px;
         box-shadow: 0 8px 25px rgba(0,0,0,0.1);
         border-left: 4px solid #D2B48C;
         transition: all 0.3s ease;
       "
       onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 35px rgba(0,0,0,0.15)'"
       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)'">
         
         <!-- Header -->
         <div style="
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 20px;
           padding-bottom: 16px;
           border-bottom: 1px solid #f0f0f0;
         ">
           <div>
             <h3 style="
               color: #2c3e50;
               font-size: 1.2rem;
               font-weight: 600;
               margin-bottom: 4px;
             ">${hadits.Perawi || 'Hadits'}</h3>
             <p style="
               color: #6c757d;
               font-size: 0.9rem;
               margin: 0;
             ">ID: ${hadits.id || '-'} • ${hadits.Nama || 'Perawi'}</p>
           </div>
           <div style="
             background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
             color: white;
             padding: 6px 12px;
             border-radius: 20px;
             font-size: 0.8rem;
             font-weight: 600;
           ">
             #${index + 1}
           </div>
         </div>

         <!-- Arabic Text -->
         ${hadits.Arab ? `
           <div style="margin-bottom: 20px;">
             <h4 style="
               color: #2c3e50;
               font-size: 1rem;
               font-weight: 600;
               margin-bottom: 12px;
               display: flex;
               align-items: center;
               gap: 8px;
             ">
               <span style="color: #D2B48C;">📜</span> Teks Arab
             </h4>
             <p style="
               font-family: 'Amiri', 'Times New Roman', serif;
               font-size: 1.3rem;
               line-height: 2;
               color: #2c3e50;
               text-align: right;
               direction: rtl;
               background: #f8f9fa;
               padding: 20px;
               border-radius: 12px;
               border-right: 3px solid #D2B48C;
             ">${hadits.Arab}</p>
           </div>
         ` : ''}

         <!-- Indonesian Translation -->
         ${hadits.Terjemahan ? `
           <div style="margin-bottom: 20px;">
             <h4 style="
               color: #2c3e50;
               font-size: 1rem;
               font-weight: 600;
               margin-bottom: 12px;
               display: flex;
               align-items: center;
               gap: 8px;
             ">
               <span style="color: #D2B48C;">🇮🇩</span> Terjemahan Indonesia
             </h4>
             <p style="
               font-size: 1.1rem;
               line-height: 1.7;
               color: #495057;
               background: #f8f9fa;
               padding: 20px;
               border-radius: 12px;
               border-left: 3px solid #D2B48C;
             ">${hadits.Terjemahan}</p>
           </div>
         ` : ''}

         <!-- Actions -->
         <div style="
           display: flex;
           gap: 12px;
           margin-top: 24px;
           padding-top: 20px;
           border-top: 1px solid #f0f0f0;
         ">
           <button 
             class="btn-copy" 
             data-hadits-id="${index}"
             style="
               background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
               color: white;
               border: none;
               padding: 10px 20px;
               border-radius: 8px;
               font-size: 14px;
               font-weight: 600;
               cursor: pointer;
               transition: all 0.3s;
               box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
             "
             onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'"
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(210, 180, 140, 0.3)'"
           >
             📋 Salin Hadits
           </button>
           
           <button 
             class="btn-share" 
             data-hadits-id="${index}"
             style="
               background: white;
               color: #D2B48C;
               border: 2px solid #D2B48C;
               padding: 10px 20px;
               border-radius: 8px;
               font-size: 14px;
               font-weight: 600;
               cursor: pointer;
               transition: all 0.3s;
             "
             onmouseover="this.style.backgroundColor='#D2B48C'; this.style.color='white'"
             onmouseout="this.style.backgroundColor='white'; this.style.color='#D2B48C'"
           >
             📤 Bagikan
           </button>
         </div>
       </div>
     `).join('');
  }

  renderPagination(currentPage, totalPages, totalItems) {
    if (totalPages <= 1) return '';

    let paginationHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;
      ">
    `;

    // Previous button
    paginationHTML += `
      <button 
        class="pagination-btn" 
        data-page="${currentPage - 1}"
        ${currentPage === 1 ? 'disabled' : ''}
        style="
          padding: 8px 12px;
          border: 1px solid ${currentPage === 1 ? '#e9ecef' : '#D2B48C'};
          background: ${currentPage === 1 ? '#f8f9fa' : 'white'};
          color: ${currentPage === 1 ? '#6c757d' : '#D2B48C'};
          border-radius: 6px;
          cursor: ${currentPage === 1 ? 'not-allowed' : 'pointer'};
          transition: all 0.3s;
        "
      >
        ← Sebelumnya
      </button>
    `;

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      paginationHTML += `
        <button class="pagination-btn" data-page="1" style="
          padding: 8px 12px;
          border: 1px solid #D2B48C;
          background: white;
          color: #D2B48C;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        ">1</button>
      `;
      if (startPage > 2) {
        paginationHTML += '<span style="color: #6c757d; padding: 0 8px;">...</span>';
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <button 
          class="pagination-btn" 
          data-page="${i}"
          style="
            padding: 8px 12px;
            border: 1px solid #D2B48C;
            background: ${i === currentPage ? 'linear-gradient(135deg, #D2B48C 0%, #B8860B 100%)' : 'white'};
            color: ${i === currentPage ? 'white' : '#D2B48C'};
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: ${i === currentPage ? '600' : '400'};
          "
        >${i}</button>
      `;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += '<span style="color: #6c757d; padding: 0 8px;">...</span>';
      }
      paginationHTML += `
        <button class="pagination-btn" data-page="${totalPages}" style="
          padding: 8px 12px;
          border: 1px solid #D2B48C;
          background: white;
          color: #D2B48C;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        ">${totalPages}</button>
      `;
    }

    // Next button
    paginationHTML += `
      <button 
        class="pagination-btn" 
        data-page="${currentPage + 1}"
        ${currentPage === totalPages ? 'disabled' : ''}
        style="
          padding: 8px 12px;
          border: 1px solid ${currentPage === totalPages ? '#e9ecef' : '#D2B48C'};
          background: ${currentPage === totalPages ? '#f8f9fa' : 'white'};
          color: ${currentPage === totalPages ? '#6c757d' : '#D2B48C'};
          border-radius: 6px;
          cursor: ${currentPage === totalPages ? 'not-allowed' : 'pointer'};
          transition: all 0.3s;
        "
      >
        Selanjutnya →
      </button>
    `;

    paginationHTML += '</div>';

    // Page info
    paginationHTML += `
      <div style="
        text-align: center;
        color: #6c757d;
        font-size: 14px;
      ">
        Halaman ${currentPage} dari ${totalPages} • Total ${totalItems} hadits
      </div>
    `;

    return paginationHTML;
  }

  updateResultsInfo(currentPage, totalPages, totalItems, itemsPerPage) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    return `Menampilkan ${startItem}-${endItem} dari ${totalItems} hadits`;
  }

  renderHaditsModal(hadits) {
    return `
      <div id="hadits-modal" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
      ">
        <div style="
          background: white;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        ">
          <!-- Close Button -->
          <button id="close-modal" style="
            position: absolute;
            top: 20px;
            right: 20px;
            background: #f8f9fa;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #6c757d;
            transition: all 0.3s;
            z-index: 10001;
          "
          onmouseover="this.style.backgroundColor='#e9ecef'; this.style.color='#495057'"
          onmouseout="this.style.backgroundColor='#f8f9fa'; this.style.color='#6c757d'">
            ✕
          </button>

          <div style="padding: 40px;">
            <!-- Header -->
            <div style="
              text-align: center;
              margin-bottom: 32px;
              padding-bottom: 24px;
              border-bottom: 2px solid #f0f0f0;
            ">
              <div style="
                font-size: 3rem;
                margin-bottom: 16px;
                background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              ">📜</div>
              <h2 style="
                color: #2c3e50;
                font-size: 1.8rem;
                font-weight: 700;
                margin-bottom: 8px;
              ">${hadits.Perawi || 'Hadits'}</h2>
              <p style="
                color: #6c757d;
                font-size: 1rem;
                margin: 0;
              ">ID: ${hadits.id || '-'} • ${hadits.Nama || 'Perawi'}</p>
            </div>

            <!-- Arabic Text -->
            ${hadits.Arab ? `
              <div style="margin-bottom: 32px;">
                <h3 style="
                  color: #2c3e50;
                  font-size: 1.2rem;
                  font-weight: 600;
                  margin-bottom: 16px;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                ">
                  <span style="color: #D2B48C;">📜</span> النص العربي
                </h3>
                <div style="
                  font-family: 'Amiri', 'Times New Roman', serif;
                  font-size: 1.4rem;
                  line-height: 2.2;
                  color: #2c3e50;
                  text-align: right;
                  direction: rtl;
                  background: #f8f9fa;
                  padding: 24px;
                  border-radius: 12px;
                  border-right: 4px solid #D2B48C;
                ">${hadits.Arab}</div>
              </div>
            ` : ''}

            <!-- Indonesian Translation -->
            ${hadits.Terjemahan ? `
              <div style="margin-bottom: 32px;">
                <h3 style="
                  color: #2c3e50;
                  font-size: 1.2rem;
                  font-weight: 600;
                  margin-bottom: 16px;
                  display: flex;
                  align-items: center;
                  gap: 8px;
                ">
                  <span style="color: #D2B48C;">🇮🇩</span> Terjemahan Indonesia
                </h3>
                <div style="
                  font-size: 1.1rem;
                  line-height: 1.8;
                  color: #495057;
                  background: #f8f9fa;
                  padding: 24px;
                  border-radius: 12px;
                  border-left: 4px solid #D2B48C;
                ">${hadits.Terjemahan}</div>
              </div>
            ` : ''}

            <!-- Actions -->
            <div style="
              display: flex;
              gap: 12px;
              justify-content: center;
              margin-top: 32px;
              padding-top: 24px;
              border-top: 2px solid #f0f0f0;
            ">
              <button 
                class="btn-copy-modal" 
                style="
                  background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                  color: white;
                  border: none;
                  padding: 12px 24px;
                  border-radius: 8px;
                  font-size: 14px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s;
                  box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
                "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(210, 180, 140, 0.3)'"
              >
                📋 Salin Hadits
              </button>
              
              <button 
                class="btn-share-modal" 
                style="
                  background: white;
                  color: #D2B48C;
                  border: 2px solid #D2B48C;
                  padding: 12px 24px;
                  border-radius: 8px;
                  font-size: 14px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s;
                "
                onmouseover="this.style.backgroundColor='#D2B48C'; this.style.color='white'"
                onmouseout="this.style.backgroundColor='white'; this.style.color='#D2B48C'"
              >
                📤 Bagikan
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #e74c3c)'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: 600;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

export default DetailCatalogView;