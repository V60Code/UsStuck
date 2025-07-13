class HomeView {
  static createHeroSection() {
    return `
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">Find Your Answers</h1>
          <p class="hero-subtitle">Gain deep Islamic understanding based on the Qur'an and Hadith through trusted AI technology.</p>
          <div style="margin-top: 32px;">
            <a href="#/ask-ai" class="btn-primary">Start Asking</a>
          </div>
        </div>
      </section>
    `;
  }

  static createAskAISection(chatExample) {
    return `
      <section class="section">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Ask <span class="brand-text">UsStuck AI</span></h2>
            <p class="section-subtitle">Have questions about fiqh, aqidah, or Islamic history? Ask our intelligent AI bot. Every answer is sourced from the Qur'an and relevant Hadith.</p>
          </div>
          <div class="chat-container card">
            <div class="chat-messages">
              <div class="message user">
                <div class="message-avatar user">U</div>
                <div class="message-content user">
                  <p>${chatExample.userMessage}</p>
                </div>
              </div>
              <div class="message ai">
                <div class="message-content ai">
                  <p>${chatExample.aiResponse.text}</p>
                  <div class="message-source">
                    <p class="source-title">${chatExample.aiResponse.source.title}</p>
                    <p class="source-text">${chatExample.aiResponse.source.text}</p>
                    <p class="source-ref">- ${chatExample.aiResponse.source.reference}</p>
                  </div>
                </div>
                <div class="message-avatar ai">AI</div>
              </div>
            </div>
            <div class="chat-input-container">
              <input type="text" placeholder="Type your question here..." class="chat-input">
              <button class="chat-send-btn">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  static createTrendingSection(trendingTopics) {
    const topicsHTML = trendingTopics.map(topic => `
      <div class="card">
        <p style="color: #666; line-height: 1.6;">${topic.question}</p>
      </div>
    `).join('');

    return `
      <section class="section section-white">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Trending In <span class="brand-text">Your Age Group</span></h2>
            <p class="section-subtitle">See popular topics and questions discussed by users in their 20s.</p>
          </div>
          <div class="grid grid-cols-3">
            ${topicsHTML}
          </div>
        </div>
      </section>
    `;
  }

  static createHadithCatalogSection(hadithCatalog) {
    const hadithHTML = hadithCatalog.map(hadith => `
      <div class="card hadith-card">
        <h3 class="hadith-title">${hadith.title}</h3>
        <p class="hadith-book">${hadith.book}</p>
        <p class="hadith-text">${hadith.text}</p>
        <a href="${hadith.link}" class="hadith-link">Read More →</a>
      </div>
    `).join('');

    return `
      <section class="section">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Explore <span class="brand-text">Hadith & Ayat</span></h2>
            <p class="section-subtitle">Access our digital library of Qur'anic verses and Hadith collections. Use the search to study and find evidence independently.</p>
          </div>
          <div class="grid grid-cols-3">
            ${hadithHTML}
          </div>
          <div style="text-align: center; margin-top: 48px;">
            <a href="#/catalog" class="btn-primary">View Full Catalog</a>
          </div>
        </div>
      </section>
    `;
  }

  static createForumSection(forumDiscussions) {
    const forumHTML = forumDiscussions.map(discussion => `
      <div class="card forum-card">
        <div>
          <h4 class="forum-title">${discussion.title}</h4>
          <p class="forum-author">by ${discussion.author}</p>
        </div>
        <div class="forum-stats">
          <p class="forum-replies">${discussion.replies} Replies</p>
          <p class="forum-time">Last reply ${discussion.lastReply}</p>
        </div>
      </div>
    `).join('');

    return `
      <section class="section section-white">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Join The <span class="brand-text">Discussion</span></h2>
            <p class="section-subtitle">A place for logged-in users to ask questions and seek perspectives from others, creating a communal learning environment.</p>
          </div>
          <div style="max-width: 1024px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
            ${forumHTML}
          </div>
          <div style="text-align: center; margin-top: 48px;">
            <a href="#/forum" class="btn-primary">Go to Forum</a>
          </div>
        </div>
      </section>
    `;
  }

  static createAboutSection() {
    return `
      <section class="section">
        <div class="container" style="text-align: center;">
          <h2 class="section-title">About <span class="brand-text">UsStuck</span></h2>
          <p style="color: #666; margin-top: 16px; max-width: 768px; margin-left: auto; margin-right: auto;">UsStuck was born from a simple philosophy: to make authentic Islamic knowledge accessible and relatable for the modern world. Our mission is to provide clear, well-sourced answers to your questions, fostering a deeper connection with faith through technology. We are dedicated to creating a supportive community for learning and growth.</p>
          <div style="margin-top: 32px;">
            <a href="#/donate" style="background-color: #556B2F; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.125rem; display: inline-block; transition: background-color 0.3s ease;">Support Our Mission (Donate)</a>
          </div>
        </div>
      </section>
    `;
  }

  static render(data) {
    return `
      ${this.createHeroSection()}
      ${this.createAskAISection(data.chatExample)}
      ${this.createTrendingSection(data.trendingTopics)}
      ${this.createHadithCatalogSection(data.hadithCatalog)}
      ${this.createForumSection(data.forumDiscussions)}
      ${this.createAboutSection()}
    `;
  }
}

export default HomeView;