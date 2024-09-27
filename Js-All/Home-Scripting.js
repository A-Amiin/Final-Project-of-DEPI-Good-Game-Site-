const filterSelect = document.getElementById('filterSelect');
const freeGamesSection = document.getElementById('freeGamesSection');
const premiumGamesSection = document.getElementById('premiumGamesSection');

filterSelect.addEventListener('change', () => {
  const selectedValue = filterSelect.value;

  if (selectedValue === 'free') {
    freeGamesSection.style.display = 'block';
    premiumGamesSection.style.display = 'none';
  } else if (selectedValue === 'premium') {
    freeGamesSection.style.display = 'none';
    premiumGamesSection.style.display = 'block';
  } else {
    freeGamesSection.style.display = 'block';
    premiumGamesSection.style.display = 'block';
  }
});

document.querySelectorAll('.game-image-container').forEach(container => {
  const button = container.querySelector('.play-game-btn');
  const overlay = container.querySelector('.overlay');
  button.style.display = 'none';
  overlay.style.display = 'none';

  container.addEventListener('mouseover', () => {
    button.style.display = 'block';
    overlay.style.display = 'flex'; // Use flex to center button
  });

  container.addEventListener('mouseout', () => {
    button.style.display = 'none';
    overlay.style.display = 'none';
  });
});

const gameImages = document.querySelectorAll('.game-image');
gameImages.forEach(img => {
  const gameInfoOverlay = img.querySelector('.game-info');
  const gameName = img.getAttribute('data-name');
  const gamePrice = img.getAttribute('data-price');

  gameInfoOverlay.innerHTML = `<strong>${gameName}</strong><br>Price: ${gamePrice}`;

  img.addEventListener('mouseover', function () {
    gameInfoOverlay.style.opacity = '1';
  });

  img.addEventListener('mouseout', function () {
    gameInfoOverlay.style.opacity = '0';
  });
});

function adjustGridItems() {
  const gridItems = Array.from(document.querySelectorAll('.grid-item'));
  let screenWidth = window.innerWidth;
  let itemsPerRow;

  if (screenWidth <= 480) {
    itemsPerRow = 1;
  } else if (screenWidth <= 768) {
    itemsPerRow = 2;
  } else if (screenWidth <= 1024) {
    itemsPerRow = 3;
  } else {
    itemsPerRow = 4;
  }
  const itemWidth = `calc(${100 / itemsPerRow}% - 20px)`;
  gridItems.map(item => {
    item.style.flexBasis = itemWidth;
  });
}

window.addEventListener('load', adjustGridItems);

window.addEventListener('resize', adjustGridItems);

function openConnect4() {
  window.open('../Html files/Connect4-index.html', '_self');
}

function openTicTacToe() {
  window.open('../Html files/Tic-Tac-Toe-index.html', '_self');
}

function openPinky() {
  window.open('../Html files/Dice-index.html', '_self');
}