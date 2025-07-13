import ForumPresenter from '../../presenters/forum/forum-presenter.js';
import ForumView from '../../views/forum/forum-view.js';

export default class ForumPage {
  constructor() {
    this.title = 'Forum Diskusi';
    this.presenter = new ForumPresenter();
    this.view = new ForumView();
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    // Set page title
    document.title = `${this.title} - UsStuck`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Forum diskusi untuk komunitas muslim - berbagi pengalaman, tanya jawab, dan diskusi keislaman');
    }

    // Initialize presenter
    await this.presenter.init();
  }
}