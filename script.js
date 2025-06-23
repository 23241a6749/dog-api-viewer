const container = document.getElementById('dogContainer');
const breedInput = document.getElementById('breedInput');

async function loadRandomDogs() {
  container.innerHTML = 'Loading random dogs...';
  const res = await fetch('https://dog.ceo/api/breeds/image/random/10');
  const data = await res.json();
  displayDogs(data.message);
}

async function searchBreed() {
  const breed = breedInput.value.trim().toLowerCase();
  if (!breed) return;

  container.innerHTML = 'Searching...';

  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`);
    const data = await res.json();

    if (data.status === "error") {
      container.innerHTML = `<p>No dogs found for breed "${breed}". Try another!</p>`;
    } else {
      displayDogs(data.message, breed);
    }
  } catch (err) {
    container.innerHTML = `<p>Error fetching breed. Check the name and try again.</p>`;
  }
}

function displayDogs(urls, breed = '') {
  container.innerHTML = '';
  urls.forEach(url => {
    const card = document.createElement('div');
    card.className = 'dog-card';
    card.innerHTML = `
      <img src="${url}" alt="dog image">
      <p>${breed || extractBreedFromURL(url)}</p>
    `;
    container.appendChild(card);
  });
}

function extractBreedFromURL(url) {
  const parts = url.split('/');
  const breedSlug = parts[parts.indexOf('breeds') + 1];
  return breedSlug.replace('-', ' ');
}

// Load initial random dogs
loadRandomDogs();
