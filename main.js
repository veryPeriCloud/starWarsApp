(async () => {
  const { renderPage } = await import('./render-app.js');

  renderPage(
    './episods-list.js',
    'https://swapi.dev/api/films',
    './style.css',
  )
  function preloader() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hide-preloader');
    preloader.classList.add('preloader-hidden');
  }
  preloader() ;

  window.addEventListener('popstate', () => {
    console.log('popstate');
    renderPage(
      './episods-list.js',
      'https://swapi.dev/api/films',
      './style.css',
    );
  })
})();
