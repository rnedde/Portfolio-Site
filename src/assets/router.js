// Single Page App Router with Smooth Transitions
class Router {
  constructor() {
    this.cache = new Map();
    this.currentPath = window.location.pathname;
    this.isTransitioning = false;
    this.init();
  }

  init() {
    // Intercept all internal links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link && !link.hasAttribute('target')) {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.navigateTo(href);
      }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.path) {
        this.loadContent(e.state.path, false);
      }
    });

    // Store initial state
    history.replaceState({ path: this.currentPath }, '', this.currentPath);
  }

  async navigateTo(path) {
    if (this.isTransitioning || path === this.currentPath) return;

    this.isTransitioning = true;

    // Update URL and history
    history.pushState({ path }, '', path);

    // Load and transition content
    await this.loadContent(path, true);

    this.currentPath = path;
    this.isTransitioning = false;
  }

  async loadContent(path, shouldAnimate = true) {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    try {
      // Slide out current content
      if (shouldAnimate) {
        mainContent.classList.add('slide-out');
        await this.wait(300);
      }

      // Get content (from cache or fetch)
      const html = await this.fetchPage(path);

      // Extract main content from fetched page
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newContent = doc.querySelector('.main-content');

      if (newContent) {
        // Update content
        mainContent.innerHTML = newContent.innerHTML;

        // Update active states in sidebar
        this.updateActiveStates(path);

        // Slide in new content
        if (shouldAnimate) {
          mainContent.classList.remove('slide-out');
          mainContent.classList.add('slide-in');

          await this.wait(10);
          mainContent.classList.add('slide-in-active');

          await this.wait(500);
          mainContent.classList.remove('slide-in', 'slide-in-active');
        }
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to regular navigation
      window.location.href = path;
    }
  }

  async fetchPage(path) {
    // Check cache first
    if (this.cache.has(path)) {
      return this.cache.get(path);
    }

    // Fetch from server
    const response = await fetch(path);
    if (!response.ok) throw new Error('Page not found');

    const html = await response.text();

    // Cache for future use
    this.cache.set(path, html);

    return html;
  }

  updateActiveStates(path) {
    // Remove all active states
    document.querySelectorAll('.sidebar a').forEach(link => {
      link.classList.remove('active');
    });

    // Add active state to current page
    document.querySelectorAll(`.sidebar a[href="${path}"]`).forEach(link => {
      link.classList.add('active');
    });

    // Add active state to matching work
    document.querySelectorAll('.works-list li').forEach(li => {
      li.classList.remove('active');
    });

    const activeWork = document.querySelector(`.works-list a[href="${path}"]`);
    if (activeWork) {
      activeWork.closest('li').classList.add('active');
    }
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Router();
  });
} else {
  new Router();
}
