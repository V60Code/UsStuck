import HomePage from '../pages/home/home-page.js';
import AboutPage from '../pages/about/about-page.js';
import AskAiPage from '../pages/ask-ai/ask-ai-page.js';
import CatalogPage from '../pages/catalog/catalog-page.js';
import ForumPage from '../pages/forum/forum-page.js';
import LoginPage from '../pages/login/login-page.js';
import PrivacyPage from '../pages/privacy/privacy-page.js';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/ask-ai': AskAiPage,
  '/catalog': CatalogPage,
  '/forum': ForumPage,
  '/login': LoginPage,
  '/privacy': PrivacyPage,
};

export default routes;
