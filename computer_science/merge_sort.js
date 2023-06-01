function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }

  const pivot = Math.floor(arr.length / 2);
  const left = arr.slice(0, pivot);
  const right = arr.slice(pivot);

  console.log("left:", left, "right:", right);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  let merged = [];

  console.log("sortedLeft:", sortedLeft, "sortedRight:", sortedRight);
  const length = sortedLeft.length + sortedRight.length;

  let i = 0;
  let j = 0;

  while (merged.length < length) {
    if (sortedLeft[i] < sortedRight[j]) {
      merged.push(sortedLeft[i]);
      i += 1;

      if (i === sortedLeft.length) {
        merged = merged.concat(sortedRight.slice(j));
      }
    } else {
      merged.push(sortedRight[j]);
      j += 1;

      if (j === sortedRight.length) {
        merged = merged.concat(sortedLeft.slice(i));
      }
    }
  }
  console.log("merged:", merged);
  return merged;
}

const unsortedArr = [5, 0, 8, 6, 9, 1, 3, 7, 2];
console.log("unsorted array:", unsortedArr);
// const unsortedArr = [6, 4, 8, 9, 3, 1];
// const unsortedArr = [4, 3, 2, 1];

console.log("mergeSort finish:", mergeSort(unsortedArr));
