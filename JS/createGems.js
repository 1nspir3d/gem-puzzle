import lowerThan from './lowerThan10.js';

export default function createGems(arr, puzzle, size, time) {
  const fragment = document.createDocumentFragment();
  const gemLayout = arr;
  const column = 1;
  const testSize = size;
  const timer = time;
  let row = 1;
  let move = localStorage.getItem('savedMoves') === null ? 0 : parseInt(localStorage.getItem('savedMoves'), 10);
  let check = [...arr];
  check = check.sort((a, b) => a - b);
  check.shift();
  check = check.join('');

  gemLayout.forEach((gem, i) => {
    const audio = new Audio('slideSound.mp3');
    const gemElement = document.createElement('div');
    const tiMer = document.querySelector('.time');
    let moveSize;

    switch (testSize) {
      case 8:
        moveSize = 3;
        if (window.outerWidth > 445) {
          gemElement.style.minWidth = '85px';
          gemElement.style.minHeight = '85px';
          document.querySelector('.menu').style.width = '60vw';
        }
        if (i === 3 || i === 6) {
          row += 1;
        }
        break;

      case 15:
        moveSize = 4;
        if (window.outerWidth < 445) {
          gemElement.style.minWidth = '85px';
          gemElement.style.minHeight = '85px';
          document.querySelector('.menu').style.width = '60vw';
        }
        if (i === 4 || i === 8 || i === 12 || i === 16) {
          row += 1;
        }
        break;

      case 24:
        moveSize = 5;
        if (i === 5 || i === 10 || i === 15 || i === 20) {
          row += 1;
        }
        break;
      case 35:
        moveSize = 6;
        if (window.outerWidth < 445) {
          gemElement.style.minWidth = '80px';
          gemElement.style.minHeight = '80px';
          document.querySelector('.menu').style.width = '60vw';
        } else {
          gemElement.style.minWidth = '80px';
          gemElement.style.minHeight = '80px';
        };
        console.log(window.innerWidth);
        if (i === 6 || i === 12 || i === 18 || i === 24 || i === 30) {
          row += 1;
        }
        break;
      case 48:
        moveSize = 7;
        if (window.outerWidth < 445) {
          gemElement.style.minWidth = '70px';
          gemElement.style.minHeight = '70px';
          document.querySelector('.menu').style.width = '60vw';
        } else {
            gemElement.style.minWidth = '70px';
            gemElement.style.minHeight = '70px';
        };
        if (i === 7 || i === 14 || i === 21 || i === 28 || i === 35 || i === 42) {
          row += 1;
        }
        break;

      case 63:
        moveSize = 8;
        if (window.outerWidth < 445) {
          gemElement.style.minWidth = '70px';
          gemElement.style.minHeight = '70px';
          document.querySelector('.menu').style.width = '60vw';
        } else {
            gemElement.style.minWidth = '70px';
            gemElement.style.minHeight = '70px';
        };
        if (i === 8 || i === 16 || i === 24 || i === 32 || i === 40 || i === 48 || i === 56) {
          row += 1;
        }
        break;
      default:
        break;
    }
    if (gem !== ' ') {
      gemElement.classList.add(`n${i}`, `row${row}`, `col${column}`, `${i}`, 'number');
    } else {
      gemElement.classList.add(`n${i}`, `row${row}`, `col${column}`, `${i}`, 'number', 'test');
    }
    gemElement.draggable = true;
    gemElement.textContent = gem;
    gemElement.id = `id${i}`;

    gemElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', gemElement.id);
      setTimeout(() => {
        gemElement.style.visibility = 'hidden';
      });
    });
    gemElement.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    gemElement.addEventListener('drop', (e) => {
      e.preventDefault();

      const droped = e.dataTransfer.getData('text/plain');
      const dropedElement = document.querySelector(`#${droped}`);
      const dropedArray = [...dropedElement.classList];
      const gemArray = [...gemElement.classList];
      const gemInt = parseInt(gemArray[3], 10);
      const intDroped = parseInt(dropedArray[3], 10);
      const equals = gemElement.classList[1] === dropedElement.classList[1];

      timer.condition = true;
      if (timer.start) {
        timer.start = false;
        const interval = setInterval(() => {
          if (!timer.condition) {
            clearInterval(interval);
          } else {
            timer.seconds += 1;
            tiMer.textContent = `${lowerThan(timer.minutes)}:${lowerThan(timer.seconds)}`;
            if (timer.seconds === 60) {
              timer.seconds = 0;
              timer.minutes += 1;
              tiMer.textContent = `${lowerThan(timer.minutes)}:${lowerThan(timer.seconds)}`;
            }
            if (timer.minutes === 60) {
              timer.minutes = 0;
              tiMer.textContent = `${lowerThan(timer.minutes)}:${lowerThan(timer.seconds)}`;
            }
          }
        }, 1000);
      }
      if (gemElement.textContent === ' ' && ((gemInt === intDroped + 1 && equals) || (gemInt === intDroped - 1 && equals) || gemInt === intDroped + moveSize || gemInt === intDroped - moveSize)) {
        move += 1;
        document.querySelector('.moves').textContent = `MOVES:${move}`;
        gemElement.textContent = dropedElement.textContent;
        gemElement.classList.toggle('test');
        gemElement.draggable = true;
        dropedElement.draggable = false;
        dropedElement.textContent = ' ';
        dropedElement.classList.toggle('test');
      }
    });

    gemElement.addEventListener('dragend', () => {
      gemElement.style.visibility = 'visible';
    });
    gemElement.addEventListener('click', () => {
      timer.condition = true;
      if (timer.start) {
        timer.start = false;
        const interval = setInterval(() => {
          if (!timer.condition) {
            clearInterval(interval);
          } else {
            timer.seconds += 1;
            localStorage.setItem('seconds', lowerThan(timer.seconds));
            tiMer.textContent = `${lowerThan(timer.minutes)}:${lowerThan(timer.seconds)}`;
            if (timer.seconds === 60) {
              timer.seconds = 0;
              localStorage.removeItem('seconds');
              timer.minutes += 1;
              localStorage.setItem('minutes', lowerThan(timer.minutes));
              tiMer.textContent = `${lowerThan(timer.minutes)}:${lowerThan(timer.seconds)}`;
            }
          }
        }, 1000);
      }

      const moves = document.querySelector('.moves');
      const moveBackward1 = document.querySelector(`.n${i - 1}`);
      const moveForward1 = document.querySelector(`.n${i + 1}`);
      const moveBackward4 = document.querySelector(`.n${i - moveSize}`);
      const moveForward4 = document.querySelector(`.n${i + moveSize}`);

      if (moveBackward1 !== null && moveBackward1.textContent === ' ' && moveBackward1.classList[1] === gemElement.classList[1]) {
        audio.play();
        move += 1;
        moves.textContent = `MOVES:${move}`;
        moveBackward1.textContent = gemElement.textContent;
        moveBackward1.classList.toggle('test');
        moveBackward1.draggable = true;
        gemElement.draggable = false;
        gemElement.textContent = ' ';
        gemElement.classList.toggle('test');
      } else if (moveForward1 !== null && moveForward1.textContent === ' ' && moveForward1.classList[1] === gemElement.classList[1]) {
        audio.play();
        move += 1;
        moves.textContent = `MOVES:${move}`;
        moveForward1.textContent = gemElement.textContent;
        moveForward1.classList.toggle('test');
        moveForward1.draggable = true;
        gemElement.draggable = false;
        gemElement.textContent = ' ';
        gemElement.classList.toggle('test');
      } else if (moveBackward4 !== null && moveBackward4.textContent === ' ') {
        audio.play();
        move += 1;
        moves.textContent = `MOVES:${move}`;
        moveBackward4.textContent = gemElement.textContent;
        moveBackward4.classList.toggle('test');
        moveBackward4.draggable = true;
        gemElement.draggable = false;
        gemElement.textContent = ' ';
        gemElement.classList.toggle('test');
      } else if (moveForward4 !== null && moveForward4.textContent === ' ') {
        audio.play();
        move += 1;
        moves.textContent = `MOVES:${move}`;
        moveForward4.textContent = gemElement.textContent;
        moveForward4.classList.toggle('test');
        moveForward4.draggable = true;
        gemElement.draggable = false;
        gemElement.textContent = ' ';
        gemElement.classList.toggle('test');
      }

      let test = [];
      const savedGame = [];
      for (let j = 0; j < puzzle.children.length; j += 1) {
        if (puzzle.children[j].textContent !== 'SCORESETTINGS') {
          savedGame.push(puzzle.children[j].textContent);
        }
        if (puzzle.children[j].textContent !== 'SCORESETTINGS' && puzzle.children[j].textContent !== ' ' && !(puzzle.children[j].textContent.includes('x'))) {
          test.push(puzzle.children[j].textContent);
        }
      }
      test = test.join('');
      if (test.match(check)) {
        timer.start = true;
        timer.condition = false;
        const win = document.querySelector('.win');
        const close = document.createElement('button');
        close.classList.add('close');
        const field = puzzle;
        close.addEventListener('click', () => {
          win.style.visibility = 'hidden';
          field.style.filter = '';
        });
        field.style.filter = 'blur(1px) brightness(0.5)';
        win.innerText = `Ура! Вы решили головоломку за ${document.querySelector('.time').textContent} и ${move} ходов`;
        win.appendChild(close);
        win.style.visibility = 'visible';
        localStorage.removeItem('saved');
        localStorage.removeItem('size');
        localStorage.removeItem('savedMoves');
        localStorage.removeItem('seconds');
        localStorage.removeItem('minutes');
      } else {
        localStorage.setItem('saved', savedGame);
        localStorage.setItem('savedMoves', move);
      }
    });

    fragment.appendChild(gemElement);
  });
  return fragment;
}
