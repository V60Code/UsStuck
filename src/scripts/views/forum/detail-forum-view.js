class DetailForumView {
  constructor() {
    this.container = null;
  }

  render() {
    return `
      <div class="container">
        <div class="section">
          <!-- Breadcrumbs -->
          <div id="breadcrumbs" class="breadcrumbs" style="
            font-size: 14px;
            color: #6c757d;
            margin-bottom: 24px;
            padding: 16px 0;
          ">
            <!-- Breadcrumbs will be rendered here -->
          </div>

          <!-- Original Post -->
          <div id="original-post" class="original-post" style="
            background: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            border: 1px solid #f1f3f4;
            margin-bottom: 32px;
          ">
            <!-- Original post content will be rendered here -->
          </div>

          <!-- Comments Section -->
          <div id="comments-section" class="comments-section">
            <h2 style="
              font-size: 20px;
              font-weight: 700;
              color: #2c3e50;
              padding-bottom: 16px;
              border-bottom: 2px solid #e9ecef;
              margin-bottom: 24px;
            " id="comments-title">
              <!-- Comments count will be rendered here -->
            </h2>
            
            <div id="comments-list" class="comments-list" style="margin-bottom: 40px;">
              <!-- Comments will be rendered here -->
            </div>
          </div>

          <!-- Reply Form -->
          <div id="reply-form-section" class="reply-form-section">
            <div style="
              background: white;
              padding: 24px;
              border-radius: 16px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
              border: 1px solid #f1f3f4;
              display: flex;
              align-items: flex-start;
              gap: 16px;
            ">
              <img src="https://placehold.co/48x48/D2B48C/FFFFFF?text=A" alt="Avatar Anda" style="
                width: 48px;
                height: 48px;
                border-radius: 50%;
                flex-shrink: 0;
              " />
              <div style="flex: 1;">
                <h4 style="
                  font-weight: 600;
                  color: #2c3e50;
                  margin-bottom: 12px;
                  font-size: 16px;
                ">Tambahkan Komentar</h4>
                <form id="comment-form">
                  <div style="margin-bottom: 16px;">
                    <input 
                      type="text" 
                      id="comment-author" 
                      placeholder="Nama Anda"
                      required
                      style="
                        width: 100%;
                        padding: 12px 16px;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        font-size: 14px;
                        transition: border-color 0.3s ease;
                        margin-bottom: 12px;
                      "
                    />
                    <textarea 
                      id="comment-content" 
                      rows="4" 
                      placeholder="Tulis balasan Anda di sini..."
                      required
                      style="
                        width: 100%;
                        padding: 12px 16px;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        font-size: 14px;
                        font-family: inherit;
                        resize: vertical;
                        transition: border-color 0.3s ease;
                      "
                    ></textarea>
                  </div>
                  <div style="display: flex; justify-content: flex-end;">
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
                        font-size: 14px;
                      "
                    >
                      Kirim Balasan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Back to Forum Button -->
          <div style="margin-top: 32px; text-align: center;">
            <button 
              id="back-to-forum"
              style="
                background-color: #D2B48C;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
                font-size: 14px;
              "
            >
              ← Kembali ke Forum
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderBreadcrumbs(topic) {
    return `
      <a href="#/forum" style="color: #6c757d; text-decoration: none;">Forum Diskusi</a>
      <span style="margin: 0 8px; color: #adb5bd;">›</span>
      <span style="color: #6c757d;">${topic.category}</span>
      <span style="margin: 0 8px; color: #adb5bd;">›</span>
      <span style="font-weight: 600; color: #2c3e50;">${topic.title}</span>
    `;
  }

  renderOriginalPost(topic) {
    return `
      <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px;">
        <img src="https://placehold.co/48x48/D2B48C/FFFFFF?text=${topic.author.substring(0, 2).toUpperCase()}" 
             alt="Avatar ${topic.author}" 
             style="width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;" />
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <h3 style="font-weight: 700; color: #2c3e50; margin: 0; font-size: 16px;">${topic.author}</h3>
            <span style="font-size: 12px; color: #8e9aaf;">${topic.createdAt}</span>
          </div>
          <span style="
            background: linear-gradient(135deg, ${this.getCategoryColor(topic.category)}, ${this.getCategoryColor(topic.category)}dd);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            display: inline-block;
          ">
            ${topic.category}
          </span>
        </div>
        ${topic.isPinned ? `
          <div style="
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #333;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 600;
            box-shadow: 0 2px 6px rgba(255, 215, 0, 0.3);
          ">
            📌 PINNED
          </div>
        ` : ''}
      </div>
      
      <div style="margin-left: 0; padding-left: 0;">
        <h1 style="
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px;
          line-height: 1.3;
        ">${topic.title}</h1>
        
        <div style="
          color: #495057;
          font-size: 15px;
          line-height: 1.7;
          white-space: pre-line;
        ">${topic.content}</div>
        
        <div style="
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          color: #8e9aaf;
          font-size: 13px;
          font-weight: 500;
        ">
          <span style="display: flex; align-items: center; gap: 6px;">
            <span>💬</span>
            <span>${topic.replies} Balasan</span>
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <span>👁️</span>
            <span>${topic.views} Views</span>
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <span>🕒</span>
            <span>Terakhir aktif ${topic.lastActivity}</span>
          </span>
        </div>
      </div>
    `;
  }

  renderCommentsTitle(commentsCount) {
    return `${commentsCount} Balasan`;
  }

  renderComments(comments) {
    if (comments.length === 0) {
      return `
        <div style="
          text-align: center;
          padding: 48px;
          color: #8e9aaf;
          background: #f8f9fa;
          border-radius: 12px;
        ">
          <div style="font-size: 48px; margin-bottom: 16px;">💬</div>
          <h3 style="color: #6c757d; margin-bottom: 8px;">Belum ada komentar</h3>
          <p>Jadilah yang pertama memberikan komentar pada diskusi ini</p>
        </div>
      `;
    }

    return comments.map(comment => `
      <div class="comment-card" style="
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        border: 1px solid #f1f3f4;
        margin-bottom: 16px;
        display: flex;
        align-items: flex-start;
        gap: 16px;
      ">
        <img src="https://placehold.co/48x48/A0AEC0/FFFFFF?text=${comment.avatar}" 
             alt="Avatar ${comment.author}" 
             style="width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0;" />
        
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div>
              <h4 style="font-weight: 700; color: #2c3e50; margin: 0; font-size: 15px;">${comment.author}</h4>
              <p style="font-size: 12px; color: #8e9aaf; margin: 4px 0 0 0;">${comment.createdAt}</p>
            </div>
            <button class="comment-menu" style="
              background: none;
              border: none;
              color: #8e9aaf;
              cursor: pointer;
              padding: 4px;
              border-radius: 4px;
              transition: color 0.2s;
            ">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>
          
          <p style="
            color: #495057;
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 16px;
          ">${comment.content}</p>
          
          <div style="display: flex; align-items: center; gap: 16px; font-size: 13px; color: #8e9aaf;">
            <button class="like-btn" data-comment-id="${comment.id}" style="
              background: none;
              border: none;
              display: flex;
              align-items: center;
              gap: 6px;
              cursor: pointer;
              color: #8e9aaf;
              transition: color 0.2s;
              padding: 4px 8px;
              border-radius: 6px;
            ">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
              <span>Suka (${comment.likes})</span>
            </button>
            <button class="reply-btn" style="
              background: none;
              border: none;
              display: flex;
              align-items: center;
              gap: 6px;
              cursor: pointer;
              color: #8e9aaf;
              transition: color 0.2s;
              padding: 4px 8px;
              border-radius: 6px;
            ">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <span>Balas</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
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

  getCommentForm() {
    return document.getElementById('comment-form');
  }

  getCommentAuthorInput() {
    return document.getElementById('comment-author');
  }

  getCommentContentInput() {
    return document.getElementById('comment-content');
  }

  clearCommentForm() {
    const authorInput = this.getCommentAuthorInput();
    const contentInput = this.getCommentContentInput();
    
    if (authorInput) authorInput.value = '';
    if (contentInput) contentInput.value = '';
  }

  showToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#556B2F'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

export default DetailForumView;