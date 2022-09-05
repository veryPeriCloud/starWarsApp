export function render(data) {
  console.log(data.results);

  const container = document.createElement('div');
  container.classList.add('container');

  const title = document.createElement('h1');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  const th1 = document.createElement('th');
  const th2 = document.createElement('th');

  title.classList.add('title');
  table.classList.add('table');
  trHead.classList.add('table__head');
  th1.classList.add('table__column');
  th2.classList.add('table__column');

  title.textContent = 'Star Wars episodes';
  th1.textContent = 'Number of episode';
  th2.textContent = 'Episode';

  table.append(thead);
  thead.append(trHead);
  trHead.append(th1, th2);

  for (let i = 0; i < data.results.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const episode = document.createElement('a');
    const number = document.createElement('span');

    episode.classList.add('table__link');
    number.classList.add('table__span')

    td1.append(number);
    td2.append(episode);
    tr.append(td1, td2);

    let filmNumber = i + 1;
    number.textContent = `${filmNumber}`;
    episode.textContent = data.results[i].title;
    episode.href = `?episodeNumber=${filmNumber}`;


    episode.addEventListener('click', async (evt) => {
      evt.preventDefault();

      history.pushState({ episodeNumber: filmNumber }, '', `?episodeNumber=${filmNumber}`);
      console.log(filmNumber);

      const searchParams = new URLSearchParams(location.search);
      const episodeNumber = searchParams.get('episodeNumber');
      const {renderPage} = await import('./render-app.js');

      renderPage(
        './episode-details.js',
        `https://swapi.dev/api/films/${episodeNumber}`,
        './style.css'
      );
    })

    table.append(tr);
  }
  container.append(title);
  container.append(table);


  return container;
}
