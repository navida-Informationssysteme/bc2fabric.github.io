(function () {
  const body = document.body;
  const toggleButton = document.querySelector('[data-sidebar-toggle]');
  const sidebar = document.querySelector('[data-sidebar]');
  const backdrop = document.querySelector('[data-sidebar-backdrop]');
  const mediaQuery = window.matchMedia('(max-width: 960px)');
  const navLinks = document.querySelectorAll('[data-doc-link]');

  const updateToggleState = (expanded) => {
    if (!toggleButton) {
      return;
    }

    toggleButton.setAttribute('aria-expanded', String(expanded));
    toggleButton.setAttribute(
      'aria-label',
      expanded ? 'Close navigation' : 'Open navigation'
    );
  };

  const setSidebarVisibility = (hidden) => {
    if (!sidebar) {
      return;
    }

    sidebar.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  };

  const openSidebar = () => {
    body.classList.add('sidebar-open');
    updateToggleState(true);
    setSidebarVisibility(false);
  };

  const closeSidebar = () => {
    if (!body.classList.contains('sidebar-open')) {
      if (mediaQuery.matches) {
        setSidebarVisibility(true);
      }
      updateToggleState(false);
      return;
    }

    body.classList.remove('sidebar-open');
    updateToggleState(false);
    setSidebarVisibility(mediaQuery.matches);
  };

  const syncSidebarForViewport = () => {
    if (!mediaQuery.matches) {
      body.classList.remove('sidebar-open');
      updateToggleState(false);
      setSidebarVisibility(false);
    } else if (!body.classList.contains('sidebar-open')) {
      updateToggleState(false);
      setSidebarVisibility(true);
    }
  };

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      if (body.classList.contains('sidebar-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeSidebar();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSidebar();
    }
  });

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', syncSidebarForViewport);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(syncSidebarForViewport);
  }

  syncSidebarForViewport();

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mediaQuery.matches) {
        closeSidebar();
      }
    });
  });

  const normalizePath = (path) => {
    let normalized = path.replace(/index\.html$/, '');
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized || '/';
  };

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
