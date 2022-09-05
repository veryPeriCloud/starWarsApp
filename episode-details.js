export function renderDetails(data, planetsArr, speciesArr, starshipsArr) {
  const container = document.createElement('div');
  container.classList.add('container');

  const title = document.createElement('h1');
  const buttonBack = document.createElement('a');
  const descr = document.createElement('p');
  const releaseDate = document.createElement('p');
  const detailsWrapper = document.createElement('ul');
  const planetsCard = document.createElement('li');
  const speciesCard = document.createElement('li');
  const starshipsCard = document.createElement('li');
  const planetsTitle = document.createElement('h2');
  const speciesTitle = document.createElement('h2');
  const starshipsTitle = document.createElement('h2');
  const planetsList = document.createElement('ul');
  const speciesList = document.createElement('ul');
  const starshipsList = document.createElement('ul');

  title.classList.add('title');
  buttonBack.classList.add('details__btn')
  descr.classList.add('details__descr');
  releaseDate.classList.add('details__descr');
  detailsWrapper.classList.add('details__wrapper');
  planetsCard.classList.add('details__card');
  speciesCard.classList.add('details__card');
  starshipsCard.classList.add('details__card');
  planetsTitle.classList.add('details__subtitle');
  speciesTitle.classList.add('details__subtitle');
  starshipsTitle.classList.add('details__subtitle');
  planetsList.classList.add('details__list');
  speciesList.classList.add('details__list');
  starshipsList.classList.add('details__list');

  buttonBack.textContent = 'Back to episodes';
  title.textContent = `${data.title + ', ' + 'episode' + ' ' + 'N' + ' ' + data.episode_id}`;
  releaseDate.textContent = `${'Release date:' + ' ' + data.release_date}`;
  descr.textContent = data.opening_crawl;
  planetsTitle.textContent = 'Planets:';
  speciesTitle.textContent = 'Species:';
  starshipsTitle.textContent = 'Starships:';

  buttonBack.addEventListener('click', () => {
    history.back();
    console.log('back');
  });

  function createList(arr, list) {
    for (let i = 0; i < arr.length; i++) {
      const item = document.createElement('li');
      item.classList.add('details__item');
      item.textContent = arr[i].name;
      list.append(item);
    }
  }
  createList(planetsArr, planetsList);
  createList(speciesArr, speciesList);
  createList(starshipsArr, starshipsList);


  planetsCard.append(planetsTitle, planetsList);
  speciesCard.append(speciesTitle, speciesList);
  starshipsCard.append(starshipsTitle, starshipsList);
  detailsWrapper.append(planetsCard, speciesCard, starshipsCard);


  container.append(buttonBack, title, releaseDate, descr, detailsWrapper);


  return container;
}

