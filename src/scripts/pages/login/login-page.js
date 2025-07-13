import LoginPresenter from '../../presenters/login/login-presenter.js';
import LoginView from '../../views/login/login-view.js';

export default class LoginPage {
  constructor() {
    this.title = 'Login';
    this.presenter = new LoginPresenter();
    this.view = new LoginView();
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
      metaDescription.setAttribute('content', 'Login ke UsStuck - Platform edukasi Islam untuk belajar Al-Quran, hadits, dan ilmu keislaman');
    }

    // Initialize presenter
    await this.presenter.init();
  }
}