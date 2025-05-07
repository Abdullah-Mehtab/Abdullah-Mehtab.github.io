document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav');
  const navbarTrigger = document.getElementById('navbar-trigger');
  const drawer = document.getElementById('navbar-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.navbar-drawer-links a');

  // Handle navbar transparency
  function handleScroll() {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Initial check
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Mobile menu handling
  if (navbarTrigger) {
    navbarTrigger.addEventListener('click', () => {
      drawer.showModal();
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', () => {
      drawer.close();
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.close();
    });
  });

  // Close drawer when clicking outside
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.close();
    }
  });
}); 