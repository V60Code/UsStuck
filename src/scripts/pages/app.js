import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
    this.#setupNavigationListeners();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const PageClass = routes[url];

    if (PageClass) {
      const page = new PageClass();
      this.#content.innerHTML = await page.render();
      await page.afterRender();
      
      // Update active navigation state
      this.#updateActiveNavigation();
      
      // Setup navigation event listeners
      this.#setupNavigationListeners();
    } else {
      // Handle 404 - redirect to home
      window.location.hash = '/';
    }
  }

  #setupNavigationListeners() {
    // Setup navigation links event listeners
    const navLinks = document.querySelectorAll('#nav-list a, .footer-links a, .brand-name');
    
    navLinks.forEach(link => {
      // Remove existing event listeners to prevent duplicates
      link.removeEventListener('click', this.#handleNavClick);
      // Add new event listener
      link.addEventListener('click', this.#handleNavClick.bind(this));
    });
  }

  #handleNavClick(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href') || event.currentTarget.getAttribute('href');
    
    if (href && href.startsWith('#/')) {
      window.location.hash = href;
    }
  }

  #updateActiveNavigation() {
    const currentHash = window.location.hash || '#/';
    
    // Get all navigation links (nav, footer, and brand)
    const navLinks = document.querySelectorAll('#nav-list a, .footer-links a');
    const brandLink = document.querySelector('.brand-name');
    
    // Remove active class from all navigation links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to matching links
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('active');
      }
    });
    
    // Handle brand link active state (only for home page)
    if (brandLink) {
      if (currentHash === '#/' || currentHash === '') {
        brandLink.style.fontWeight = '700';
        brandLink.style.color = '#556B2F';
      } else {
        brandLink.style.fontWeight = '600';
        brandLink.style.color = '';
      }
    }
  }
}

export default App;
