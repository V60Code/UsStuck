import AboutPresenter from '../../presenters/about/about-presenters.js';

export default class AboutPage {
  async render() {
    return `
      <div id="about-page">
        <!-- Content will be rendered by AboutPresenter -->
      </div>
    `;
  }

  async afterRender() {
    try {
      // Initialize the About presenter
      await AboutPresenter.init();
      
      // Update page title
      document.title = 'About Us - UsStuck';
      
      // Add page-specific meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = 'Learn about UsStuck - AI-powered Islamic education platform. Meet our team and discover our mission to make Islamic knowledge accessible to everyone.';
      
      // Scroll to top
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Error in AboutPage afterRender:', error);
    }
  }
}
