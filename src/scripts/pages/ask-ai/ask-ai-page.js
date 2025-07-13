import AskAiPresenter from '../../presenters/ask-ai/ask-ai-presenter.js';
import AskAiView from '../../views/ask-ai/ask-ai-view.js';

export default class AskAiPage {
  constructor() {
    this.presenter = new AskAiPresenter();
    this.view = new AskAiView();
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    // Update page title and meta tags
    document.title = 'Ask AI - UsStuck';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Tanyakan pertanyaan tentang Islam kepada AI Assistant - UsStuck');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Tanyakan pertanyaan tentang Islam kepada AI Assistant - UsStuck';
      document.head.appendChild(meta);
    }

    // Initialize presenter
    await this.presenter.init();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
}