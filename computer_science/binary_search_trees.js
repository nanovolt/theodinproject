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

class TreeNode {
  constructor(root, left = null, right = null) {
    this.root = root;
    this.data = root;
    this.left = left;
    this.right = right;
  }

  setLeft(left) {
    this.left = left;
  }

  setRight(right) {
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
      return new TreeNode(arr[0], null, null);
    }

    const root = Math.floor(arr.length / 2);
    const left = arr.slice(0, root);
    const right = arr.slice(root + 1);

    // console.log("left:", left, "root:", [arr[root]], "right:", right);

    const leftNode = this.buildTree(left);
    const rightNode = this.buildTree(right);

    this.node = new TreeNode(arr[root], leftNode, rightNode);
    // console.log("node create:", this.node);
    // prettyPrint(node);

    return this.node;
  }

  setRoot(node) {
    this.root = node;
  }

  insert(value, node = this.root) {
    if (value < node.data) {
      if (!node.left) {
        const treeNode = new TreeNode(value);
        node.setLeft(treeNode);
      } else {
        this.insert(value, node.left);
      }
    }

    if (value > node.data) {
      if (!node.right) {
        const treeNode = new TreeNode(value);
        node.setRight(treeNode);
      } else {
        this.insert(value, node.right);
      }
    }
  }
}

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

const tree = new BalancedBST();

// const arr = [1, 4, 5, 8, 9];
// const arr = [1, 4, 5, 8, 9];

const unsortedArr = [6, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedArr = mergeSort(unsortedArr);
// console.log("unsorted array:", unsortedArr);
// console.log("sorted array:", sortedArr);
removeDuplicates(sortedArr);
// console.log("sorted array no dupes:", sortedArr);

const root = tree.buildTree(sortedArr);
tree.setRoot(root);
// tree.setRoot(root);
// prettyPrint(root);
// tree.insert(2, root);
tree.insert(2);
tree.insert(10);
tree.insert(16);
tree.insert(64);
tree.insert(128);
tree.insert(256);

prettyPrint(tree.root);
