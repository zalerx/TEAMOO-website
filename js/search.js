// Simple search box logic for product.html

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.navbar-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'search-results.html?search=1';
      }
    }
  });
});

