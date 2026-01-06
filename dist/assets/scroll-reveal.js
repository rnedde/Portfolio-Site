(function(){
  // selectors for the main sections we want to animate on enter
  const selectors = [
    'main.border-1',
    'header',
    '.about-container',
    '.about-block',
    '.work-body',
    '.work-detail',
    '.portfolio-list',
    '.contact',
    '.footer-container'
  ].join(',');

  const nodes = document.querySelectorAll(selectors);
  if (!nodes.length) return;

  // add the base class so elements start hidden
  nodes.forEach(n => n.classList.add('reveal-on-scroll'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  nodes.forEach(n => observer.observe(n));
})();
