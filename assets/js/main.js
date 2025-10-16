(function () {
  const normalizePath = (path) => {
    let normalized = path.replace(/index\.html$/, '');
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized || '/';
  };

  const navLinks = document.querySelectorAll('[data-doc-link]');
  const currentPath = normalizePath(window.location.pathname);

  navLinks.forEach((link) => {
    const linkPath = normalizePath(new URL(link.href).pathname);
    if (currentPath === linkPath) {
      const item = link.closest('.nav-item, .nav-subitem');
      if (item) {
        item.classList.add('active');
        const parent = item.closest('.nav-item');
        if (parent && parent !== item) {
          parent.classList.add('active');
        }
      }
    }
  });
})();
