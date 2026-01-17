// Mobile Navigation Dropdown
function initMobileNav() {
  const toggle = document.querySelector('.mobile-works-toggle');
  const dropdown = document.querySelector('.mobile-works-list');

  if (!toggle || !dropdown) return;

  // Remove existing listeners by cloning
  const newToggle = toggle.cloneNode(true);
  toggle.parentNode.replaceChild(newToggle, toggle);

  // Toggle dropdown on click, navigate to gallery on second tap
  newToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');

    if (isOpen) {
      // Second tap: navigate to gallery
      window.location.href = '/';
    } else {
      dropdown.classList.add('open');
      newToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-works-dropdown')) {
      dropdown.classList.remove('open');
      newToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close dropdown when a link is clicked
  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      dropdown.classList.remove('open');
      newToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initMobileNav);

// Reinitialize after SPA navigation (if using custom router)
window.addEventListener('popstate', () => {
  setTimeout(initMobileNav, 100);
});
