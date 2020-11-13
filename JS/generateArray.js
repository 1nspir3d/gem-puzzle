export default function arr(index) {
  let flattedArray = [];
  const array = [];
  for (let i = 0; i < index; i += 1) {
    const test = Math.ceil(Math.random() * index);
    if (!array.includes(test)) {
      array.push(test);
    }
    if (array.length < index && i === index - 1) {
      i = 0;
    }
  }
  const test1 = Math.ceil(Math.random() * index - 1);
  array.splice(test1, 0, ' ');
  switch (index) {
    case 8:
      flattedArray = [[], [], []];
      for (let i = 0; i < array.length; i += 1) {
        if (i <= 2) {
          flattedArray[0].push(array[i]);
        } else if (i <= 5) {
          flattedArray[1].push(array[i]);
        } else {
          flattedArray[2].push(array[i]);
        }
      }
      flattedArray[1].reverse();
      break;

    case 15:
      flattedArray = [[], [], [], []];
      for (let i = 0; i < array.length; i += 1) {
        if (i <= 3) {
          flattedArray[0].push(array[i]);
        } else if (i <= 7) {
          flattedArray[1].push(array[i]);
        } else if (i <= 11) {
          flattedArray[2].push(array[i]);
        } else {
          flattedArray[3].push(array[i]);
        }
      }
      flattedArray[1].reverse();
      flattedArray[3].reverse();
      break;

    case 24:
      flattedArray = [[], [], [], [], []];
      for (let i = 0; i < array.length; i += 1) {
        if (i <= 4) {
          flattedArray[0].push(array[i]);
        } else if (i <= 9) {
          flattedArray[1].push(array[i]);
        } else if (i <= 14) {
          flattedArray[2].push(array[i]);
        } else if (i <= 19) {
          flattedArray[3].push(array[i]);
        } else {
          flattedArray[4].push(array[i]);
        }
      }
      flattedArray[1].reverse();
      flattedArray[3].reverse();
      break;

    case 35:
      flattedArray = [[], [], [], [], [], []];
      for (let i = 0; i < array.length; i += 1) {
        if (i <= 5) {
          flattedArray[0].push(array[i]);
        } else if (i <= 11) {
          flattedArray[1].push(array[i]);
        } else if (i <= 17) {
          flattedArray[2].push(array[i]);
        } else if (i <= 23) {
          flattedArray[3].push(array[i]);
        } else if (i <= 29) {
          flattedArray[4].push(array[i]);
        } else {
          flattedArray[5].push(array[i]);
        }
      }
      flattedArray[1].reverse();
      flattedArray[3].reverse();
      flattedArray[5].reverse();
      break;

    case 48:
      flattedArray = [[], [], [], [], [], [], []];
      for (let i = 0; i < array.length; i += 1) {
        if (i <= 6) {
          flattedArray[0].push(array[i]);
        } else if (i <= 13) {
          flattedArray[1].push(array[i]);
        } else if (i <= 20) {
          flattedArray[2].push(array[i]);
        } else if (i <= 27) {
          flattedArray[3].push(array[i]);
        } else if (i <= 34) {
          flattedArray[4].push(array[i]);
        } else if (i <= 41) {
          flattedArray[5].push(array[i]);
        } else {
          flattedArray[6].push(array[i]);
        }
      }
      break;

    case 63:
      flattedArray = [[], [], [], [], [], [], [], []];
      for (let i = 0; i < array.length; i += 1) {
        if (i <= 7) {
          flattedArray[0].push(array[i]);
        } else if (i <= 15) {
          flattedArray[1].push(array[i]);
        } else if (i <= 23) {
          flattedArray[2].push(array[i]);
        } else if (i <= 34) {
          flattedArray[3].push(array[i]);
        } else if (i <= 42) {
          flattedArray[4].push(array[i]);
        } else if (i <= 50) {
          flattedArray[5].push(array[i]);
        } else if (i <= 58) {
          flattedArray[6].push(array[i]);
        } else {
          flattedArray[7].push(array[i]);
        }
      }
      break;

    default:
      break;
  }
  return flattedArray.flat();
}
