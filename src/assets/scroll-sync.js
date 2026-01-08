// Rubber-band overscroll effect
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  if (!sidebar || !mainContent) return;

  // Check if element can scroll in a direction
  function canScrollDown(element) {
    const maxScroll = element.scrollHeight - element.clientHeight;
    return element.scrollTop < maxScroll - 1;
  }

  function canScrollUp(element) {
    return element.scrollTop > 1;
  }

  // Create overscroll bounce effect - only for main content
  function createOverscroll(element) {
    let overscrollAmount = 0;
    let animationFrame = null;
    let lastScrollTime = 0;
    let scrollTimeout = null;

    function applyOverscroll(delta) {
      const currentTime = performance.now();

      // Very light resistance
      const resistance = 0.05;
      overscrollAmount += delta * resistance;

      // Small max distance
      overscrollAmount = Math.max(-15, Math.min(15, overscrollAmount));

      // Apply transform
      element.style.transform = `translateY(${-overscrollAmount}px)`;

      lastScrollTime = currentTime;

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Start spring back after just 5ms of no input
      scrollTimeout = setTimeout(() => {
        springBack();
      }, 5);

      // Also continuously check
      if (!animationFrame) {
        checkForRelease();
      }
    }

    function checkForRelease() {
      const currentTime = performance.now();
      const timeSinceLastScroll = currentTime - lastScrollTime;

      // Spring back immediately after 8ms
      if (timeSinceLastScroll > 8) {
        springBack();
      } else {
        animationFrame = requestAnimationFrame(checkForRelease);
      }
    }

    function springBack() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }

      // Much stronger spring for faster snap back
      const springStrength = 0.7;

      overscrollAmount *= (1 - springStrength);

      if (Math.abs(overscrollAmount) > 0.01) {
        element.style.transform = `translateY(${-overscrollAmount}px)`;
        requestAnimationFrame(springBack);
      } else {
        // Finished
        overscrollAmount = 0;
        element.style.transform = '';
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      }
    }

    return { applyOverscroll };
  }

  const mainOverscroll = createOverscroll(mainContent);
  const sidebarOverscroll = createOverscroll(sidebar);

  // Handle wheel events on main content (right side)
  mainContent.addEventListener('wheel', (e) => {
    const delta = e.deltaY;
    const scrollingDown = delta > 0;
    const scrollingUp = delta < 0;

    // Check if at limit
    if (scrollingDown && !canScrollDown(mainContent)) {
      e.preventDefault();
      // Try to scroll sidebar, or bounce if sidebar also at limit
      if (canScrollDown(sidebar)) {
        sidebar.scrollBy(0, delta);
      } else {
        mainOverscroll.applyOverscroll(delta);
      }
    } else if (scrollingUp && !canScrollUp(mainContent)) {
      e.preventDefault();
      // Try to scroll sidebar, or bounce if sidebar also at limit
      if (canScrollUp(sidebar)) {
        sidebar.scrollBy(0, delta);
      } else {
        mainOverscroll.applyOverscroll(delta);
      }
    }
  }, { passive: false });

  // Handle wheel events on sidebar (left side)
  sidebar.addEventListener('wheel', (e) => {
    const delta = e.deltaY;
    const scrollingDown = delta > 0;
    const scrollingUp = delta < 0;

    // Check if at limit
    if (scrollingDown && !canScrollDown(sidebar)) {
      e.preventDefault();
      // Try to scroll main content, or bounce if main also at limit
      if (canScrollDown(mainContent)) {
        mainContent.scrollBy(0, delta);
      } else {
        sidebarOverscroll.applyOverscroll(delta);
      }
    } else if (scrollingUp && !canScrollUp(sidebar)) {
      e.preventDefault();
      // Try to scroll main content, or bounce if main also at limit
      if (canScrollUp(mainContent)) {
        mainContent.scrollBy(0, delta);
      } else {
        sidebarOverscroll.applyOverscroll(delta);
      }
    }
  }, { passive: false });
});
