class AboutView {
  static createHeroSection(aboutInfo) {
    return `
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">${aboutInfo.title}</h1>
          <p class="hero-subtitle">${aboutInfo.subtitle}</p>
        </div>
      </section>
    `;
  }

  static createMissionSection(aboutInfo) {
    return `
      <section class="section">
        <div class="container">
          <div style="max-width: 800px; margin: 0 auto; text-align: center;">
            <h2 class="section-title">Our <span class="brand-text">Mission</span></h2>
            <p style="font-size: 1.125rem; line-height: 1.8; color: #666; margin-bottom: 32px;">${aboutInfo.mission}</p>
            
            <h3 style="font-size: 1.5rem; font-weight: 600; color: #333; margin-bottom: 16px;">Our Vision</h3>
            <p style="font-size: 1rem; line-height: 1.7; color: #666;">${aboutInfo.vision}</p>
          </div>
        </div>
      </section>
    `;
  }

  static createValuesSection(values) {
    const valuesHTML = values.map(value => `
      <div class="card" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 16px;">${value.icon}</div>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin-bottom: 12px;">${value.title}</h3>
        <p style="color: #666; line-height: 1.6;">${value.description}</p>
      </div>
    `).join('');

    return `
      <section class="section section-white">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Our <span class="brand-text">Values</span></h2>
            <p class="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div class="grid grid-cols-2" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
            ${valuesHTML}
          </div>
        </div>
      </section>
    `;
  }

  static createStatsSection(stats) {
    const statsHTML = stats.map(stat => `
      <div style="text-align: center;">
        <div style="font-size: 2.5rem; font-weight: bold; color: #556B2F; margin-bottom: 8px;">${stat.number}</div>
        <div style="font-size: 1.125rem; font-weight: 600; color: #333; margin-bottom: 4px;">${stat.label}</div>
        <div style="font-size: 0.875rem; color: #666;">${stat.description}</div>
      </div>
    `).join('');

    return `
      <section class="section" style="background-color: #f8f7f4;">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">UsStuck <span class="brand-text">by Numbers</span></h2>
            <p class="section-subtitle">Our impact on the Muslim community worldwide</p>
          </div>
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 48px;">
            ${statsHTML}
          </div>
        </div>
      </section>
    `;
  }

  static createDevelopersSection(developers) {
    const developersHTML = developers.map(dev => `
      <div class="card developer-card">
        <div style="text-align: center; margin-bottom: 24px;">
          <div class="developer-avatar">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#556B2F"/>
              <circle cx="40" cy="32" r="12" fill="white"/>
              <path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="white"/>
            </svg>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 600; color: #333; margin: 16px 0 4px;">${dev.name}</h3>
          <p style="color: #D2B48C; font-weight: 500; margin-bottom: 12px;">${dev.role}</p>
        </div>
        
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px; text-align: center;">${dev.description}</p>
        
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 0.875rem; font-weight: 600; color: #333; margin-bottom: 8px; text-align: center;">Expertise:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
            ${dev.expertise.map(skill => `
              <span style="background-color: #f0f0f0; color: #556B2F; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500;">${skill}</span>
            `).join('')}
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; gap: 16px;">
          <a href="${dev.social.github}" class="social-link" aria-label="GitHub">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="${dev.social.linkedin}" class="social-link" aria-label="LinkedIn">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:${dev.social.email}" class="social-link" aria-label="Email">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
            </svg>
          </a>
        </div>
      </div>
    `).join('');

    return `
      <section class="section section-white">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Meet Our <span class="brand-text">Team</span></h2>
            <p class="section-subtitle">The passionate individuals behind UsStuck</p>
          </div>
          <div class="grid grid-cols-3" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
            ${developersHTML}
          </div>
        </div>
      </section>
    `;
  }

  static createFeaturesSection(features) {
    const featuresHTML = features.map(feature => `
      <div class="card" style="text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 16px;">${feature.icon}</div>
        <h3 style="font-size: 1.125rem; font-weight: 600; color: #333; margin-bottom: 12px;">${feature.title}</h3>
        <p style="color: #666; line-height: 1.6;">${feature.description}</p>
      </div>
    `).join('');

    return `
      <section class="section">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Platform <span class="brand-text">Features</span></h2>
            <p class="section-subtitle">Everything you need for Islamic learning in one place</p>
          </div>
          <div class="grid grid-cols-3" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
            ${featuresHTML}
          </div>
        </div>
      </section>
    `;
  }

  static createContactSection(contact) {
    return `
      <section class="section section-white">
        <div class="container">
          <div style="text-align: center; margin-bottom: 48px;">
            <h2 class="section-title">Get in <span class="brand-text">Touch</span></h2>
            <p class="section-subtitle">Have questions or suggestions? We'd love to hear from you</p>
          </div>
          
          <div style="max-width: 600px; margin: 0 auto;">
            <div class="card" style="text-align: center;">
              <div style="display: grid; gap: 24px; margin-bottom: 32px;">
                <div>
                  <h4 style="font-weight: 600; color: #333; margin-bottom: 8px;">Email</h4>
                  <a href="mailto:${contact.email}" style="color: #556B2F; text-decoration: none;">${contact.email}</a>
                </div>
                <div>
                  <h4 style="font-weight: 600; color: #333; margin-bottom: 8px;">Phone</h4>
                  <a href="tel:${contact.phone}" style="color: #556B2F; text-decoration: none;">${contact.phone}</a>
                </div>
                <div>
                  <h4 style="font-weight: 600; color: #333; margin-bottom: 8px;">Address</h4>
                  <p style="color: #666; margin: 0;">${contact.address}</p>
                </div>
              </div>
              
              <div>
                <h4 style="font-weight: 600; color: #333; margin-bottom: 16px;">Follow Us</h4>
                <div style="display: flex; justify-content: center; gap: 16px;">
                  <a href="${contact.social.facebook}" class="social-link" aria-label="Facebook">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="${contact.social.twitter}" class="social-link" aria-label="Twitter">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="${contact.social.instagram}" class="social-link" aria-label="Instagram">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clip-rule="evenodd" />
                    </svg>
                  </a>
                  <a href="${contact.social.youtube}" class="social-link" aria-label="YouTube">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  static render(data) {
    return `
      ${this.createHeroSection(data.aboutInfo)}
      ${this.createMissionSection(data.aboutInfo)}
      ${this.createStatsSection(data.stats)}
      ${this.createDevelopersSection(data.developers)}
      ${this.createFeaturesSection(data.features)}
      ${this.createContactSection(data.contact)}
    `;
  }
}

export default AboutView;