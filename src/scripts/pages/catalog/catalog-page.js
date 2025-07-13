import CatalogPresenter from '../../presenters/catalog/catalog-presenter.js';
import CatalogView from '../../views/catalog/catalog-view.js';

export default class CatalogPage {
  constructor() {
    this.presenter = new CatalogPresenter();
    this.view = new CatalogView();
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    // Update page title and meta tags
    document.title = 'Catalog - UsStuck';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Catalog lengkap materi pembelajaran Islam - Al-Quran, Hadits, Fiqh, dan lainnya');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Catalog lengkap materi pembelajaran Islam - Al-Quran, Hadits, Fiqh, dan lainnya';
      document.head.appendChild(meta);
    }

    // Initialize presenter
    await this.presenter.init();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
}