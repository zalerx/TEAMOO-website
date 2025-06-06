  // Fullscreen nav open/close logic
  const bars = document.querySelector('.bars');
  const navOverlay = document.getElementById('fullscreenNav');
  const closeNavBtn = document.getElementById('closeNavBtn');


  if (bars && navOverlay && closeNavBtn) {
    bars.addEventListener('click', () => {
      navOverlay.classList.add('active');
      navOverlay.setAttribute('aria-hidden', 'false');
      closeNavBtn.focus();
    });
    closeNavBtn.addEventListener('click', () => {
      navOverlay.classList.remove('active');
      navOverlay.setAttribute('aria-hidden', 'true');
      bars.querySelector('i').focus();
    });
    document.addEventListener('keydown', (e) => {
      if (navOverlay.classList.contains('active') && e.key === 'Escape') {
        navOverlay.classList.remove('active');
        navOverlay.setAttribute('aria-hidden', 'true');
        bars.querySelector('i').focus();
      }
    });
    
    document.getElementById('cart').addEventListener('click', () => {
      navOverlay.classList.remove('active');
      navOverlay.setAttribute('aria-hidden', 'true');
      document.querySelector('.cart-trigger').click();
    });

  }