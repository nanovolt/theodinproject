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
    // this.parent = null;
  }

  setLeft(left) {
    this.left = left;
  }

  setRight(right) {
    this.right = right;
  }
}

class BalancedBST {
  constructor() {
    this.parent = null;
    this.recurseLeftParent = null;
  }

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

  find(value, node = this.root) {
    if (value === node.data) {
      // console.log("found", value, "at:", this.parent);
      return { node, parent: this.parent };
    }

    if (value < node.data && node.left) {
      this.parent = node;
      return this.find(value, node.left);
    }
    if (value > node.data && node.right) {
      this.parent = node;
      return this.find(value, node.right);
    }
    console.log(`didn't find: ${value}`);
    return null;
  }

  recurseLeft(node, parent) {
    if (!node.left) {
      return node;
    }
    this.recurseLeftParent = parent;
    console.log("recursive parent:", this.recurseLeftParent.data);

    return this.recurseLeft(node.left, parent.left);
  }

  delete(value) {
    console.log("deleting:", value);
    const { node, parent } = this.find(value);
    if (!node) {
      return;
    }

    // console.log("found node:", node);
    // console.log("parent:", parent);

    if (!node.left && !node.right) {
      console.log(value, "is a leaf");

      if (node === parent.left) {
        parent.left = null;
      } else {
        parent.right = null;
      }
      console.log("parent", parent.data, "removed", node.data);
    }

    if (node.left && !node.right) {
      console.log(value, "is not a leaf, node has left child:", node.left.data);
      if (node === parent.left) {
        parent.left = node.left;
        console.log("parent:", parent.data, "attached:", node.left.data);
      } else {
        parent.right = node.left;
        console.log("parent:", parent.data, "attached:", node.left.data);
      }
    }

    if (node.right && !node.left) {
      console.log(
        value,
        "is not a leaf, node has right child:",
        node.right.data
      );
      if (node === parent.left) {
        parent.left = node.right;
        console.log("parent:", parent.data, "attached:", node.right.data);
      } else {
        parent.right = node.right;
        console.log("parent:", parent.data, "attached:", node.right.data);
      }
    }

    if (node.right && node.left) {
      console.log(
        value,
        "is not a leaf, node has both children:",
        node.left.data,
        node.right.data
      );
      // console.log("parent:", node);
      const smallest = this.recurseLeft(node.right, node.right);
      console.log("smallest:", smallest.data);
      // console.log("parent:", parent.data);

      if (this.recurseLeftParent) {
        // attach the rest of children that are not on the recursive left
        this.recurseLeftParent.left = smallest.right;

        if (smallest.right) {
          console.log(
            "recursive left parent:",
            this.recurseLeftParent.data,
            "attached:",
            smallest.right.data
          );

          smallest.right = node.right;

          console.log(
            "smallest:",
            smallest.data,
            "attached right:",
            node.right.data
          );
        } else {
          console.log(
            "recursive left parent:",
            this.recurseLeftParent.data,
            "attached:",
            null
          );
        }

        smallest.left = node.left;

        console.log(
          "smallest:",
          smallest.data,
          "attached left:",
          node.left.data
        );
      } else {
        console.log("no recursive parents");
        console.log("smallest:", smallest.data, "attached:", node.left.data);
        smallest.left = node.left;
      }

      this.recurseLeftParent = null;

      if (parent) {
        if (node === parent.left) {
          parent.left = smallest;
        } else {
          parent.right = smallest;
        }
        console.log(
          "parent:",
          parent.data,
          "replaced",
          node.data,
          "with:",
          smallest.data
        );
      } else {
      }

      // if right has no left child, replace node with the right
      // if (!node.right.left) {
      //   console.log(
      //     "it's not a leaf, node has both childs, right doesn't have left to recurse"
      //   );
      //   node.right.left = node.left;
      //   if (node === parent.left) {
      //     parent.left = node.right;
      //   } else {
      //     parent.right = node.right;
      //   }
      // }

      // but if it has, recursively find smallest, and replace
      // if (node.right.left) {
      //   console.log(
      //     "it's not a leaf, node has both childs, right has left to recurse"
      //   );
      //   const smallest = this.recurseLeft(node.right);
      //   console.log("smallest:", smallest);
      // }
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

const unsortedArr = [6, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 360, 324];
const sortedArr = mergeSort(unsortedArr);
const fullArr = [];
for (let i = 0; i < 64; i += 1) {
  fullArr.push(i);
}
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
tree.insert(48);
tree.insert(27);
tree.insert(26);
tree.insert(24);
tree.insert(25);

tree.insert(400);

tree.insert(385);
tree.insert(381);
tree.insert(382);
tree.insert(383);
tree.insert(384);

tree.insert(550);
tree.insert(500);
tree.insert(600);

// tree.insert(10);
// tree.insert(16);
// tree.insert(64);
// tree.insert(128);
// tree.insert(256);
// tree.insert(65);
// tree.insert(60);
// tree.insert(50);
// tree.insert(40);
// tree.insert(66);

// tree.insert(70);
// tree.insert(80);
// tree.insert(90);
// tree.insert(68);
// tree.insert(69);

prettyPrint(tree.root);
// tree.find(5);

tree.delete(23);
prettyPrint(tree.root);

tree.delete(360);
prettyPrint(tree.root);

tree.delete(550);
prettyPrint(tree.root);
// tree.delete(3);
// prettyPrint(tree.root);

// tree.delete(64);
// prettyPrint(tree.root);

// tree.delete(67);
// prettyPrint(tree.root);
