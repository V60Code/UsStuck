import DetailForumModel from '../../models/forum/detail-forum-model.js';
import DetailForumView from '../../views/forum/detail-forum-view.js';

class DetailForumPresenter {
  constructor() {
    this.model = new DetailForumModel();
    this.view = new DetailForumView();
    this.currentTopicId = null;
  }

  async init(topicId) {
    this.currentTopicId = parseInt(topicId);
    
    // Load topic details
    const topic = this.model.getTopicDetail(this.currentTopicId);
    if (!topic) {
      this.handleTopicNotFound();
      return;
    }

    // Load comments
    const comments = this.model.getComments(this.currentTopicId);
    
    // Render all components
    this.renderBreadcrumbs(topic);
    this.renderOriginalPost(topic);
    this.renderCommentsSection(comments);
    this.setupEventListeners();
    
    // Update page title
    document.title = `${topic.title} - Forum Diskusi - UsStuck`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `${topic.title} - ${topic.content.substring(0, 150)}...`);
    }
  }

  renderBreadcrumbs(topic) {
    const breadcrumbsContainer = document.getElementById('breadcrumbs');
    if (breadcrumbsContainer) {
      breadcrumbsContainer.innerHTML = this.view.renderBreadcrumbs(topic);
    }
  }

  renderOriginalPost(topic) {
    const originalPostContainer = document.getElementById('original-post');
    if (originalPostContainer) {
      originalPostContainer.innerHTML = this.view.renderOriginalPost(topic);
    }
  }

  renderCommentsSection(comments) {
    // Render comments title
    const commentsTitle = document.getElementById('comments-title');
    if (commentsTitle) {
      commentsTitle.innerHTML = this.view.renderCommentsTitle(comments.length);
    }

    // Render comments list
    const commentsList = document.getElementById('comments-list');
    if (commentsList) {
      commentsList.innerHTML = this.view.renderComments(comments);
    }
  }

  setupEventListeners() {
    // Comment form submission
    const commentForm = this.view.getCommentForm();
    if (commentForm) {
      commentForm.addEventListener('submit', (e) => this.handleCommentSubmit(e));
    }

    // Back to forum button
    const backButton = document.getElementById('back-to-forum');
    if (backButton) {
      backButton.addEventListener('click', () => this.handleBackToForum());
    }

    // Form input focus effects
    this.setupFormEffects();

    // Comment interactions
    this.setupCommentInteractions();

    // Hover effects
    this.setupHoverEffects();
  }

  setupFormEffects() {
    const authorInput = this.view.getCommentAuthorInput();
    const contentInput = this.view.getCommentContentInput();

    [authorInput, contentInput].forEach(input => {
      if (input) {
        input.addEventListener('focus', () => {
          input.style.borderColor = '#556B2F';
          input.style.boxShadow = '0 0 0 3px rgba(85, 107, 47, 0.1)';
        });

        input.addEventListener('blur', () => {
          input.style.borderColor = '#e9ecef';
          input.style.boxShadow = 'none';
        });
      }
    });
  }

  setupCommentInteractions() {
    // Event delegation for like buttons
    document.addEventListener('click', (event) => {
      const likeBtn = event.target.closest('.like-btn');
      if (likeBtn) {
        const commentId = parseInt(likeBtn.getAttribute('data-comment-id'));
        this.handleLikeComment(commentId, likeBtn);
      }

      // Reply button (placeholder functionality)
      const replyBtn = event.target.closest('.reply-btn');
      if (replyBtn) {
        this.handleReplyComment();
      }

      // Comment menu (placeholder functionality)
      const menuBtn = event.target.closest('.comment-menu');
      if (menuBtn) {
        this.handleCommentMenu();
      }
    });
  }

  setupHoverEffects() {
    // Back button hover
    const backButton = document.getElementById('back-to-forum');
    if (backButton) {
      backButton.addEventListener('mouseenter', () => {
        backButton.style.backgroundColor = '#BC9E7C';
      });
      backButton.addEventListener('mouseleave', () => {
        backButton.style.backgroundColor = '#D2B48C';
      });
    }

    // Submit button hover
    const submitButton = document.querySelector('#comment-form button[type="submit"]');
    if (submitButton) {
      submitButton.addEventListener('mouseenter', () => {
        submitButton.style.backgroundColor = '#4a5d29';
      });
      submitButton.addEventListener('mouseleave', () => {
        submitButton.style.backgroundColor = '#556B2F';
      });
    }

    // Comment cards hover effects
    document.addEventListener('mouseenter', (event) => {
      const commentCard = event.target.closest('.comment-card');
      if (commentCard) {
        commentCard.style.transform = 'translateY(-2px)';
        commentCard.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const commentCard = event.target.closest('.comment-card');
      if (commentCard) {
        commentCard.style.transform = 'translateY(0)';
        commentCard.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
      }
    }, true);

    // Button hover effects for like and reply
    document.addEventListener('mouseenter', (event) => {
      const btn = event.target.closest('.like-btn, .reply-btn');
      if (btn) {
        btn.style.color = '#556B2F';
        btn.style.backgroundColor = '#f8f9fa';
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      const btn = event.target.closest('.like-btn, .reply-btn');
      if (btn) {
        btn.style.color = '#8e9aaf';
        btn.style.backgroundColor = 'transparent';
      }
    }, true);
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    
    const authorInput = this.view.getCommentAuthorInput();
    const contentInput = this.view.getCommentContentInput();
    
    const author = authorInput?.value.trim();
    const content = contentInput?.value.trim();
    
    // Validation
    if (!author) {
      this.view.showToast('Silakan masukkan nama Anda', 'error');
      authorInput?.focus();
      return;
    }
    
    if (!content) {
      this.view.showToast('Silakan masukkan komentar Anda', 'error');
      contentInput?.focus();
      return;
    }
    
    if (content.length < 10) {
      this.view.showToast('Komentar minimal 10 karakter', 'error');
      contentInput?.focus();
      return;
    }
    
    // Add comment
    const newComment = this.model.addComment(this.currentTopicId, {
      author: author,
      content: content
    });
    
    if (newComment) {
      // Re-render comments
      const comments = this.model.getCurrentComments();
      this.renderCommentsSection(comments);
      
      // Clear form
      this.view.clearCommentForm();
      
      // Show success message
      this.view.showToast('Komentar berhasil ditambahkan!', 'success');
      
      // Scroll to new comment
      setTimeout(() => {
        const commentsList = document.getElementById('comments-list');
        if (commentsList) {
          const lastComment = commentsList.lastElementChild;
          if (lastComment) {
            lastComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
    } else {
      this.view.showToast('Gagal menambahkan komentar', 'error');
    }
  }

  handleLikeComment(commentId, buttonElement) {
    const comment = this.model.likeComment(commentId);
    
    if (comment) {
      // Update like count in the button
      const likeText = buttonElement.querySelector('span');
      if (likeText) {
        likeText.textContent = `Suka (${comment.likes})`;
      }
      
      // Add visual feedback
      buttonElement.style.color = '#e74c3c';
      setTimeout(() => {
        buttonElement.style.color = '#8e9aaf';
      }, 200);
      
      this.view.showToast('Terima kasih atas apresiasinya!', 'success');
    }
  }

  handleReplyComment() {
    // Scroll to comment form
    const commentForm = document.getElementById('reply-form-section');
    if (commentForm) {
      commentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Focus on content textarea
      setTimeout(() => {
        const contentInput = this.view.getCommentContentInput();
        if (contentInput) {
          contentInput.focus();
        }
      }, 500);
    }
    
    this.view.showToast('Silakan tulis balasan Anda di bawah', 'info');
  }

  handleCommentMenu() {
    this.view.showToast('Fitur menu komentar sedang dalam pengembangan', 'info');
  }

  handleBackToForum() {
    // Navigate back to forum
    window.location.hash = '#/forum';
  }

  handleTopicNotFound() {
    // Show error message and redirect
    this.view.showToast('Topik tidak ditemukan', 'error');
    
    setTimeout(() => {
      window.location.hash = '#/forum';
    }, 2000);
  }

  // Public method to get current topic for external use
  getCurrentTopic() {
    return this.model.getCurrentTopic();
  }

  // Public method to get current comments for external use
  getCurrentComments() {
    return this.model.getCurrentComments();
  }
}

export default DetailForumPresenter;