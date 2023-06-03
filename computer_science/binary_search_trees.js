/* eslint-disable max-classes-per-file */

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }

  const pivot = Math.floor(arr.length / 2);
  const left = arr.slice(0, pivot);
  const right = arr.slice(pivot);

  // console.log("left:", left, "right:", right);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  let merged = [];

  // console.log("sortedLeft:", sortedLeft, "sortedRight:", sortedRight);
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
  // console.log("merged:", merged);
  return merged;
}

function removeDuplicates(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (i > 0 && arr[i - 1] === arr[i]) {
      arr.splice(i, 1);
    }
  }
}

function prettyPrint(node, prefix = "", isLeft = false) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

class Node {
  constructor(root, left = null, right = null) {
    this.root = root;
    this.data = root;
    this.left = left;
    this.right = right;
  }
}

class BalancedBST {
  buildTree(arr) {
    // console.log("length:", arr.length);
    if (arr.length === 0) {
      return null;
    }
    if (arr.length === 1) {
      // console.log(`new node ${arr[0]}`);
      return new Node(arr[0], null, null);
    }

    const root = Math.floor(arr.length / 2);
    const left = arr.slice(0, root);
    const right = arr.slice(root + 1);

    console.log("left:", left, "root:", [arr[root]], "right:", right);

    const leftNode = this.buildTree(left);
    const rightNode = this.buildTree(right);

    const node = new Node(arr[root], leftNode, rightNode);
    console.log("node create:", node);
    // prettyPrint(node);

    return node;
  }
}

const tree = new BalancedBST();

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const unsortedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArr = mergeSort(unsortedArr);
console.log("unsorted array:", unsortedArr);
console.log("sorted array:", sortedArr);
removeDuplicates(sortedArr);
console.log("sorted array no dupes:", sortedArr);

// const arr = [
//   "one",
//   "two",
//   "tree",
//   "four",
//   "five",
//   "six",
//   "seven",
//   "eight",
//   "nine",
//   "ten",
// ];

const root = tree.buildTree(sortedArr);
prettyPrint(root);
