import HomePresenter from '../../presenters/home/home-presenters.js';

export default class HomePage {
  async render() {
    // Return empty string since presenter will handle the rendering
    return '';
  }

  async afterRender() {
    // Initialize the home presenter
    await HomePresenter.init();
  }
}
