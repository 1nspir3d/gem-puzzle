export default function result(array) {
  if (Array.isArray(array) !== true || array === [] || arguments.length === 0) {
    return 'Invalid type of argument';
  }
  let invalidPair = 0;
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length; j += 1) {
      if (array[i] > array[j] && i < j) {
        invalidPair += 1;
      }
    }
  }
  if (invalidPair % 2 !== 0) {
    return false;
  }
  return true;
}
