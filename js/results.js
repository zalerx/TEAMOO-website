// logic to displays search results on search-results.html
  document.addEventListener('DOMContentLoaded', () => {
    const searchHeading = document.getElementById('searchHeading');
    const query = localStorage.getItem('searchQuery');

    if (query && searchHeading) {
      searchHeading.textContent = `"${query}"`;
    }
  });
