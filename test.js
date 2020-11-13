import result from './JS/calculateParityOfArray.js';
import arr from './JS/generateArray.js';
import createGems from './JS/createGems.js';
import createOptions from './JS/createOptions.js';

const field = document.createElement('div');
const gemPuzzle = document.createElement('div');
const mainMenu = document.createElement('div');
const newGameButton = document.createElement('button');
const select = document.createElement('select');
const time = {
  condition: false,
  start: true,
  seconds: localStorage.getItem('seconds') === null ? 0 : parseInt(localStorage.getItem('seconds'), 10),
  minutes: localStorage.getItem('minutes') === null ? 0 : parseInt(localStorage.getItem('minutes'), 10),
};
let size = localStorage.getItem('size') !== null ? parseInt(localStorage.getItem('size'), 10) : 15;

// [1, 2, 3, 6, 5, 4, 7, 8]

function clearGems(puzzle) {
  while (puzzle.firstChild) {
    puzzle.removeChild(puzzle.firstChild);
  }
}

function appendGems(test, puzzle, size1, condition) {
  if (localStorage.getItem('saved') !== null) {
    document.querySelector('.saved').style.visibility = 'visible';
    gemPuzzle.appendChild(createGems(test, puzzle, size1, condition));
  } else if (result(test, size1)) {
    localStorage.setItem('saved', test);
    gemPuzzle.appendChild(createGems(test, puzzle, size1, condition));
  } else {
    appendGems(arr(size), gemPuzzle, size, time);
  }
}

function addTransition() {
  const gem = document.querySelectorAll('.number');
  gem.forEach((element) => {
    const item = element;
    item.style.transition = 'opacity .45s ease-out';
  });
}

function createMenu() {
  const menu = document.createElement('div');
  const timer = document.createElement('span');
  const moves = document.createElement('span');
  const menuButton = document.createElement('button');

  menu.classList.add('menu');
  timer.classList.add('time');
  moves.classList.add('moves');
  menu.append(timer, moves, menuButton, newGameButton);
  timer.textContent = '00:00';
  moves.textContent = 'MOVES: 0';
  menuButton.innerText = 'MENU';
  newGameButton.innerText = 'NEW GAME';

  newGameButton.addEventListener('click', () => {
    document.querySelector('.moves').textContent = 'MOVES: 0';
    localStorage.removeItem('saved');
    localStorage.removeItem('savedMoves');
    localStorage.removeItem('seconds');
    localStorage.removeItem('minutes');
    clearGems(gemPuzzle);
    appendGems(arr(size), gemPuzzle, size, time);
    addTransition();
    gemPuzzle.appendChild(mainMenu);
    time.start = true;
    time.condition = false;
    time.seconds = 0;
    time.minutes = 0;
    timer.textContent = '00:00';
  });

  menuButton.addEventListener('click', () => {
    mainMenu.style.opacity = 1;
    mainMenu.style.left = '50%';
  });

  return menu;
}

function createWinModal() {
  const win = document.createElement('div');
  win.classList.add('win');
  return win;
}

function createSavedGameModal() {
  const savedModal = document.createElement('div');
  savedModal.classList.add('saved');
  savedModal.textContent = 'У вас есть сохранённая игра, продолжить?';
  const closeSaved = document.createElement('div');
  const yes = document.createElement('button');
  yes.classList.add('yes');
  yes.textContent = 'Yes';
  closeSaved.classList.add('close');
  closeSaved.addEventListener('click', () => {
    savedModal.style.visibility = 'hidden';
  });
  yes.addEventListener('click', () => {
    let me = localStorage.getItem('saved');
    me = me.split(',');
    document.querySelector('.moves').textContent = `MOVES: ${(localStorage.getItem('savedMoves') || 0)}`;
    document.querySelector('.time').textContent = `${(localStorage.getItem('minutes') || '00')}:${localStorage.getItem('seconds') || '00'}`;
    clearGems(gemPuzzle);
    gemPuzzle.appendChild(createGems(me, gemPuzzle, size, time));
    savedModal.style.visibility = 'hidden';
    gemPuzzle.appendChild(mainMenu);
    mainMenu.style.opacity = 0;
    mainMenu.style.left = '200%';
    addTransition();
  });
  savedModal.appendChild(closeSaved);
  savedModal.appendChild(yes);
  return savedModal;
}

function newGame() {
  localStorage.removeItem('saved');
  localStorage.removeItem('savedMoves');
  localStorage.removeItem('seconds');
  localStorage.removeItem('minutes');
  clearGems(gemPuzzle);
  appendGems(arr(size), gemPuzzle, size, time);
  gemPuzzle.appendChild(mainMenu);
  mainMenu.style.opacity = 0;
  mainMenu.style.left = '200%';
  addTransition();
}

function createMainMenu() {
  const scoreButton = document.createElement('button');
  const settingsButton = document.createElement('button');
  const closeButton = document.createElement('div');
  const backButton = document.createElement('div');

  scoreButton.innerText = 'SCORE';
  settingsButton.innerText = 'SETTINGS';

  backButton.classList.add('back');
  closeButton.classList.add('close');
  mainMenu.classList.add('main-menu');
  select.classList.add('select');
  select.value = 4;

  select.addEventListener('change', () => {
    localStorage.removeItem('saved');
    document.querySelector('.moves').textContent = 'MOVES: 0';
    time.start = true;
    time.condition = false;
    time.seconds = 0;
    time.minutes = 0;
    document.querySelector('.time').textContent = '00:00';
    size = (parseInt(select.value, 10) * parseInt(select.value, 10)) - 1;

    switch (size) {
      case 8:
        localStorage.setItem('size', size);
        gemPuzzle.style.gridTemplateColumns = 'repeat(3, 1fr)';
        newGame();
        break;
      case 15:
        localStorage.setItem('size', size);
        gemPuzzle.style.gridTemplateColumns = 'repeat(4, 1fr)';
        newGame();
        break;
      case 24:
        localStorage.setItem('size', size);
        gemPuzzle.style.gridTemplateColumns = 'repeat(5, 1fr)';
        newGame();
        break;
      case 35:
        localStorage.setItem('size', size);
        gemPuzzle.style.gridTemplateColumns = 'repeat(6, 1fr)';
        newGame();
        break;
      case 48:
        localStorage.setItem('size', size);
        gemPuzzle.style.gridTemplateColumns = 'repeat(7, 1fr)';
        newGame();
        break;
      case 63:
        localStorage.setItem('size', size);
        gemPuzzle.style.gridTemplateColumns = 'repeat(8, 1fr)';
        newGame();
        break;
      default:
        break;
    }
  });
  backButton.addEventListener('click', () => {
    while (mainMenu.firstChild) {
      mainMenu.removeChild(mainMenu.firstChild);
    }
    mainMenu.appendChild(scoreButton);
    mainMenu.appendChild(settingsButton);
    mainMenu.appendChild(closeButton);
  });
  settingsButton.addEventListener('click', () => {
    while (mainMenu.firstChild) {
      mainMenu.removeChild(mainMenu.firstChild);
    }
    mainMenu.append(closeButton, backButton, select);
  });
  closeButton.addEventListener('click', () => {
    mainMenu.style.opacity = 0;
    mainMenu.style.left = '200%';
  });

  select.appendChild(createOptions());
  mainMenu.appendChild(scoreButton);
  mainMenu.appendChild(settingsButton);
  mainMenu.appendChild(closeButton);
  return mainMenu;
}

function init(array, puzzle, size1, time1) {
  if (localStorage.getItem('score') === null) {
    localStorage.setItem('score', { test: 2 });
  }
  field.classList.add('field');
  gemPuzzle.classList.add('gem-puzzle');
  switch (size1) {
    case 8:
      gemPuzzle.style.gridTemplateColumns = 'repeat(3, 1fr)';
      break;
    case 15:
      gemPuzzle.style.gridTemplateColumns = 'repeat(4, 1fr)';
      break;
    case 24:
      gemPuzzle.style.gridTemplateColumns = 'repeat(5, 1fr)';
      break;
    case 35:
      gemPuzzle.style.gridTemplateColumns = 'repeat(6, 1fr)';
      break;
    case 48:
      gemPuzzle.style.gridTemplateColumns = 'repeat(7, 1fr)';
      break;
    case 63:
      gemPuzzle.style.gridTemplateColumns = 'repeat(8, 1fr)';
      break;
    default:
      break;
  }
  document.body.appendChild(field);
  // field.appendChild(createMenu());
  // field.appendChild(gemPuzzle);
  field.append(createMenu(), gemPuzzle, createWinModal(), createSavedGameModal());
  appendGems(array, puzzle, size1, time1);
  addTransition();
  gemPuzzle.appendChild(createMainMenu());
}

window.addEventListener('DOMContentLoaded', init(arr(size), gemPuzzle, size, time));
