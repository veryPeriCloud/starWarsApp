(async () => {
  const { renderPage } = await import('./render-app.js');

  renderPage(
    './episods-list.js',
    'https://swapi.dev/api/films',
    './style.css',
  );

  window.addEventListener('popstate', () => {
    console.log('popstate');
    renderPage(
      './episods-list.js',
      'https://swapi.dev/api/films',
      './style.css',
    );
  })
})();

window.onload = function () {
  const preloader = document.getElementById('preloader');

  preloader.classList.add('hide-preloader');

  setInterval(function () {
    preloader.classList.add('preloader-hidden');
  }, 1000);
}
