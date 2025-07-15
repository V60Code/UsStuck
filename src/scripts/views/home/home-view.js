class HomeView {
  static createHeroSection() {
    return `
      <section class="hero-section" style="
        background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/bg-hero.jpg');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        min-height: 100vh;
        display: flex;
        align-items: center;
        color: white;
        text-align: center;
      ">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding: 0 20px;">
          <h1 style="
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            margin-bottom: 24px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          ">Cari Jawaban Anda</h1>
          <p style="
            font-size: clamp(1.1rem, 2.5vw, 1.5rem);
            line-height: 1.6;
            margin-bottom: 40px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          ">Dapatkan pemahaman Islam yang mendalam berdasarkan Al-Qur'an dan Hadits melalui teknologi AI yang terpercaya.</p>
          <div style="margin-top: 32px;">
            <a href="#/ask-ai" style="
              background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
              color: white;
              padding: 16px 40px;
              border-radius: 50px;
              text-decoration: none;
              font-weight: 600;
              font-size: 1.2rem;
              display: inline-block;
              transition: all 0.3s ease;
              box-shadow: 0 8px 25px rgba(210, 180, 140, 0.3);
              border: none;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 35px rgba(210, 180, 140, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(210, 180, 140, 0.3)'">Mulai Bertanya</a>
          </div>
        </div>
      </section>
    `;
  }

  static createAskAISection(chatExample) {
    return `
      <section class="section" style="background: #f8f9fa; padding: 80px 0;">
        <div class="container">
          <!-- Images Section -->
          <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 48px; flex-wrap: wrap;">
            <div style="text-align: center;">
              <div style="
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 auto 16px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                border: 4px solid #D2B48C;
              ">
                <img src="/ustad1.jpg" alt="Ustad" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>
            <div style="text-align: center;">
              <div style="
                width: 120px;
                height: 120px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 auto 16px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                border: 4px solid #D2B48C;
              ">
                <img src="/ustazah.jpg" alt="Ustazah" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 style="
              font-size: clamp(2rem, 4vw, 3rem);
              color: #2c3e50;
              margin-bottom: 16px;
              font-weight: 700;
            ">Tanya <span style="color: #D2B48C;">UsStuck AI</span></h2>
            <p style="
              color: #6c757d;
              font-size: clamp(1rem, 2.5vw, 1.2rem);
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto;
            ">Punya pertanyaan tentang fiqh, aqidah, atau sejarah Islam? Tanyakan kepada bot AI cerdas kami. Setiap jawaban bersumber dari Al-Qur'an dan Hadits yang relevan.</p>
          </div>
          
          <div style="
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            overflow: hidden;
          ">
            <div style="padding: 40px;">
              <div class="chat-messages" style="margin-bottom: 24px;">
                <div style="
                  display: flex;
                  gap: 16px;
                  margin-bottom: 24px;
                  align-items: flex-start;
                ">
                  <div style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    flex-shrink: 0;
                  ">U</div>
                  <div style="
                    background: #f1f3f4;
                    padding: 16px 20px;
                    border-radius: 18px;
                    border-top-left-radius: 4px;
                    max-width: 70%;
                  ">
                    <p style="margin: 0; color: #2c3e50;">${chatExample.userMessage}</p>
                  </div>
                </div>
                
                <div style="
                  display: flex;
                  gap: 16px;
                  align-items: flex-start;
                  flex-direction: row-reverse;
                ">
                  <div style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 600;
                    flex-shrink: 0;
                  ">AI</div>
                  <div style="
                    background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 18px;
                    border-top-right-radius: 4px;
                    max-width: 70%;
                  ">
                    <p style="margin: 0 0 16px 0; line-height: 1.6;">${chatExample.aiResponse.text}</p>
                    <div style="
                      background: rgba(255,255,255,0.1);
                      padding: 12px;
                      border-radius: 8px;
                      border-left: 3px solid rgba(255,255,255,0.3);
                    ">
                      <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 0.9rem;">${chatExample.aiResponse.source.title}</p>
                      <p style="margin: 0 0 8px 0; font-style: italic; font-size: 0.9rem;">${chatExample.aiResponse.source.text}</p>
                      <p style="margin: 0; font-size: 0.8rem; opacity: 0.9;">- ${chatExample.aiResponse.source.reference}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style="
                display: flex;
                gap: 12px;
                padding: 16px;
                background: #f8f9fa;
                border-radius: 12px;
                align-items: center;
              ">
                <input type="text" placeholder="Ketik pertanyaan Anda di sini..." style="
                  flex: 1;
                  padding: 12px 16px;
                  border: 2px solid #e9ecef;
                  border-radius: 25px;
                  font-size: 1rem;
                  outline: none;
                  transition: border-color 0.3s ease;
                " onfocus="this.style.borderColor='#D2B48C'" onblur="this.style.borderColor='#e9ecef'">
                <button style="
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
                  border: none;
                  color: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 15px rgba(210, 180, 140, 0.3);
                " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(210, 180, 140, 0.4)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(210, 180, 140, 0.3)'">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  static createTrendingSection(trendingTopics) {
    const topicsHTML = trendingTopics.map(topic => `
      <div style="
        background: white;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
        cursor: pointer;
      " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.08)'">
        <p style="
          color: #2c3e50;
          line-height: 1.6;
          margin: 0;
          font-size: 1rem;
        ">${topic.question}</p>
        <div style="
          margin-top: 12px;
          padding: 6px 12px;
          background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
          color: white;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
        ">${topic.category}</div>
      </div>
    `).join('');

    return `
      <section style="padding: 80px 0; background: white;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 style="
              font-size: clamp(2rem, 4vw, 3rem);
              color: #2c3e50;
              margin-bottom: 16px;
              font-weight: 700;
            ">Populer di Kalangan <span style="color: #D2B48C;">Umur Anda</span></h2>
            <p style="
              color: #6c757d;
              font-size: clamp(1rem, 2.5vw, 1.2rem);
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto;
            ">Lihat topik dan pertanyaan populer yang sedang dibahas oleh berbagai kelompok umur.</p>
          </div>
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
          ">
            ${topicsHTML}
          </div>
        </div>
      </section>
    `;
  }

  static createHadithCatalogSection(hadithCatalog) {
    const hadithHTML = hadithCatalog.map(hadith => `
      <div style="
        background: white;
        padding: 32px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
      " onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.08)'">
        <h3 style="
          color: #2c3e50;
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 12px 0;
          line-height: 1.3;
        ">${hadith.title}</h3>
        <p style="
          color: #D2B48C;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 16px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">${hadith.book}</p>
        <p style="
          color: #6c757d;
          line-height: 1.6;
          margin: 0 0 24px 0;
          flex: 1;
          font-size: 0.95rem;
        ">${hadith.text}</p>
        <a href="${hadith.link}" style="
          color: #D2B48C;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s ease;
        " onmouseover="this.style.color='#B8860B'" onmouseout="this.style.color='#D2B48C'">Baca Selengkapnya →</a>
      </div>
    `).join('');

    return `
      <section style="padding: 80px 0; background: #f8f9fa;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 style="
              font-size: clamp(2rem, 4vw, 3rem);
              color: #2c3e50;
              margin-bottom: 16px;
              font-weight: 700;
            ">Pustaka <span style="color: #D2B48C;">Hadis</span></h2>
            <p style="
              color: #6c757d;
              font-size: clamp(1rem, 2.5vw, 1.2rem);
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto;
            ">Akses koleksi digital ayat Al-Qur'an dan Hadis kami. Gunakan pencarian untuk belajar dan mencari dalil secara mandiri.</p>
          </div>
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
          ">
            ${hadithHTML}
          </div>
          <div style="text-align: center; margin-top: 48px;">
            <a href="#/catalog" style="
              background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
              color: white;
              padding: 16px 32px;
              border-radius: 50px;
              text-decoration: none;
              font-weight: 600;
              font-size: 1.1rem;
              display: inline-block;
              transition: all 0.3s ease;
              box-shadow: 0 8px 25px rgba(210, 180, 140, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 35px rgba(210, 180, 140, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(210, 180, 140, 0.3)'">Lihat Katalog Lengkap</a>
          </div>
        </div>
      </section>
    `;
  }

  static createForumSection(forumDiscussions) {
    const forumHTML = forumDiscussions.map(discussion => `
      <div style="
        background: white;
        padding: 24px;
        border-radius: 16px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        border: 1px solid #f0f0f0;
        transition: all 0.3s ease;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 30px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.08)'">
        <div style="flex: 1;">
          <h4 style="
            color: #2c3e50;
            font-size: 1.1rem;
            font-weight: 600;
            margin: 0 0 8px 0;
            line-height: 1.4;
          ">${discussion.title}</h4>
          <p style="
            color: #6c757d;
            font-size: 0.9rem;
            margin: 0;
          ">oleh ${discussion.author}</p>
        </div>
        <div style="
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          min-width: 120px;
        ">
          <p style="
            color: #D2B48C;
            font-size: 0.9rem;
            font-weight: 600;
            margin: 0;
          ">${discussion.replies} Balasan</p>
          <p style="
            color: #6c757d;
            font-size: 0.8rem;
            margin: 0;
          ">Terakhir ${discussion.lastReply}</p>
        </div>
      </div>
    `).join('');

    return `
      <section style="padding: 80px 0; background: white;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 style="
              font-size: clamp(2rem, 4vw, 3rem);
              color: #2c3e50;
              margin-bottom: 16px;
              font-weight: 700;
            ">Gabung Forum <span style="color: #D2B48C;">Diskusi</span></h2>
            <p style="
              color: #6c757d;
              font-size: clamp(1rem, 2.5vw, 1.2rem);
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto;
            ">Tempat berbagi pengetahuan diskusi dan tanya jawab seputar Islam</p>
          </div>
          <div style="
            max-width: 800px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
          ">
            ${forumHTML}
          </div>
          <div style="text-align: center; margin-top: 48px;">
            <a href="#/forum" style="
              background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
              color: white;
              padding: 16px 32px;
              border-radius: 50px;
              text-decoration: none;
              font-weight: 600;
              font-size: 1.1rem;
              display: inline-block;
              transition: all 0.3s ease;
              box-shadow: 0 8px 25px rgba(210, 180, 140, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 35px rgba(210, 180, 140, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(210, 180, 140, 0.3)'">Kunjungi Forum</a>
          </div>
        </div>
      </section>
    `;
  }

  static createAboutSection() {
    return `
      <section style="
        padding: 80px 0;
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        text-align: center;
      ">
        <div class="container">
          <h2 style="
            font-size: clamp(2rem, 4vw, 3rem);
            margin-bottom: 24px;
            font-weight: 700;
          ">Tentang <span style="color: #D2B48C;">UsStuck</span></h2>
          <p style="
            font-size: clamp(1rem, 2.5vw, 1.2rem);
            line-height: 1.8;
            max-width: 800px;
            margin: 0 auto 40px;
            opacity: 0.9;
          ">UsStuck lahir dari filosofi sederhana: membuat pengetahuan Islam yang autentik dapat diakses dan relevan untuk dunia modern. Misi kami adalah memberikan jawaban yang jelas dan bersumber untuk pertanyaan Anda, memupuk koneksi yang lebih dalam dengan iman melalui teknologi. Kami berdedikasi untuk menciptakan komunitas yang mendukung pembelajaran dan pertumbuhan.</p>
          <div style="margin-top: 40px;">
            <a href="#/donate" style="
              background: linear-gradient(135deg, #D2B48C 0%, #B8860B 100%);
              color: white;
              padding: 18px 40px;
              border-radius: 50px;
              text-decoration: none;
              font-weight: 600;
              font-size: 1.2rem;
              display: inline-block;
              transition: all 0.3s ease;
              box-shadow: 0 8px 25px rgba(210, 180, 140, 0.3);
            " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 35px rgba(210, 180, 140, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(210, 180, 140, 0.3)'">Dukung Misi Kami (Donasi)</a>
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