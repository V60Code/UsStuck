import AboutModel from '../../models/about/about-models.js';
import AboutView from '../../views/about/about-view.js';

class AboutPresenter {
  static async init() {
    try {
      // Get data from model
      const aboutInfo = AboutModel.getAboutInfo();
      const developers = AboutModel.getDevelopers();
      const features = AboutModel.getFeatures();
      const stats = AboutModel.getStats();
      const contact = AboutModel.getContact();

      // Prepare data for view
      const data = {
        aboutInfo,
        developers,
        features,
        stats,
        contact
      };

      // Render view
      const aboutHTML = AboutView.render(data);
      
      // Insert into main content
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.innerHTML = aboutHTML;
        
        // Initialize event listeners
        this.initEventListeners();
      }
    } catch (error) {
      console.error('Error initializing About page:', error);
      this.displayError('Failed to load About page. Please try again.');
    }
  }

  static initEventListeners() {
    // Add smooth scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add hover effects for developer cards
    const developerCards = document.querySelectorAll('.developer-card');
    developerCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
    });

    // Add click tracking for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const platform = link.getAttribute('aria-label');
        console.log(`Social link clicked: ${platform}`);
        // Here you could add analytics tracking
      });
    });

    // Add animation on scroll for stats
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('[style*="font-size: 2.5rem"]');
          statNumbers.forEach((stat, index) => {
            setTimeout(() => {
              stat.style.animation = 'countUp 1s ease-out forwards';
            }, index * 200);
          });
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('[style*="background-color: #f8f7f4"]');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // Add copy email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.textContent;
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            this.showToast('Email copied to clipboard!');
          }).catch(() => {
            // Fallback: open email client
            window.location.href = link.href;
          });
        } else {
          // Fallback: open email client
          window.location.href = link.href;
        }
      });
    });
  }

  static showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #556B2F;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      font-size: 14px;
      font-weight: 500;
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
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  static displayError(message) {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="container" style="text-align: center; padding: 64px 16px;">
          <div style="max-width: 400px; margin: 0 auto;">
            <div style="font-size: 4rem; margin-bottom: 24px;">😔</div>
            <h2 style="color: #333; margin-bottom: 16px;">Oops! Something went wrong</h2>
            <p style="color: #666; margin-bottom: 32px;">${message}</p>
            <button onclick="window.location.reload()" style="
              background-color: #556B2F;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#4a5d29'" onmouseout="this.style.backgroundColor='#556B2F'">
              Try Again
            </button>
          </div>
        </div>
      `;
    }
  }
}

export default AboutPresenter;