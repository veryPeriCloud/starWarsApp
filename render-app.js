
const appContainer = document.getElementById('app');
const cssPromises = {};

function loadResource(src) {
  //JS module
  if (src.endsWith('.js')) {
    return import(src);
  }
  //CSS file
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;

      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => {
          resolve()
        });
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  //данные сервера
  return fetch(src).then(res => res.json())
}

export function renderPage(moduleName, apiURL, css) {

  Promise.all([moduleName, apiURL, css].map(src => loadResource(src)))
    .then(async ([pageModule, data]) => {
      if (pageModule.renderDetails) {
        appContainer.innerHTML = '';
        const arrayUrlPlanets = data.planets;
        const arrayFetchPlanets = arrayUrlPlanets.map(src => loadResource(src));

        const arrayUrlSpecies = data.species;
        const arrayFetchSpecies = arrayUrlSpecies.map(src => loadResource(src));

        const arrayUrlStarships = data.starships;
        const arrayFetchStarships = arrayUrlStarships.map(src => loadResource(src));

        async function getData(fetchArr) {
          const data = await Promise.all(fetchArr);
          return data;
        }
        const planets = await getData(arrayFetchPlanets);
        const species = await getData(arrayFetchSpecies);
        const starships = await getData(arrayFetchStarships);

        appContainer.append(pageModule.renderDetails(data, planets, species, starships));
      } else {
        appContainer.innerHTML = '';
        appContainer.append(pageModule.render(data));
      }
    })
}

