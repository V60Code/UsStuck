class PrivacyPage {
  async render() {
    return `
      <div class="container">
        <div class="section">
          <h1 class="section-title">Privacy Policy</h1>
          <div class="section-subtitle">
            <p>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.</p>
          </div>
          
          <div class="card" style="text-align: left; max-width: 800px; margin: 0 auto;">
            <h3>Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>
            
            <h3>How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            
            <h3>Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h3>Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@usstuck.com</p>
            
            <p><em>Last updated: December 2024</em></p>
          </div>
        </div>
      </div>
    `;
  }

  async afterRender() {
    // Update page title and meta tags
    document.title = 'Privacy Policy - UsStuck';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Privacy Policy for UsStuck - AI-Powered Islamic Education Platform');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Privacy Policy for UsStuck - AI-Powered Islamic Education Platform';
      document.head.appendChild(meta);
    }
  }
}

export default PrivacyPage;