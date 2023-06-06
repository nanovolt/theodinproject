/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
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
    console.log(`┌── ${"null"}`);
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
    this.levelOrderQueueArray = [];
    this.levelOrderRecursionArray = [];
    this.preorderArray = [];
    this.inorderArray = [];
    this.postorderArray = [];
    this.nodeDepth = 0;
    this.nodeHeight = 0;
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
    const { node: foundNode } = this.find(value);
    if (foundNode) {
      console.log(`insert aborted, already have:`, value);
      return;
    }

    if (!this.root) {
      const treeNode = new TreeNode(value);
      this.root = treeNode;
      return;
    }

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

    console.log("found node:", node.data);
    if (parent) {
      console.log("parent:", parent.data);
    } else {
      console.log("parent: null");
    }

    if (node === this.root) {
      if (!node.left && !node.right) {
        this.root = null;
        console.log("this.root = null");
        return;
      }

      if (node.left && !node.right) {
        this.root = node.left;
        console.log(`this.root attached: ${node.left.data}`);
        return;
      }

      // if (!node.left && node.right) {
      //   this.root = node.right;
      //   console.log(`this.root = ${node.right.data}`);
      //   return;
      // }
    }

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

      // if (node === this.root) {
      //   this.root = node.right;
      //   console.log("this.root attached:", node.right.data);
      // }

      if (parent && node === parent.left) {
        parent.left = node.right;
        console.log("parent.left:", parent.data, "attached:", node.right.data);

        console.log("node left:", node.left);
        if (!node.left) {
          return;
        }
      }

      if (parent && node === parent.right) {
        parent.right = node.right;
        console.log("parent.right:", parent.data, "attached:", node.right.data);
      }
    }

    if (node.right) {
      if (node.left) {
        console.log(
          value,
          "is not a leaf, node has both children:",
          node.left.data,
          node.right.data
        );
      }
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
        } else {
          console.log(
            "recursive left parent:",
            this.recurseLeftParent.data,
            "attached:",
            null
          );
        }

        smallest.left = node.left;
        smallest.right = node.right;

        if (node.left) {
          console.log(
            "smallest:",
            smallest.data,
            "attached left:",
            node.left.data
          );
        }

        // if (node.right) {

        console.log(
          "smallest:",
          smallest.data,
          "attached right:",
          node.right.data
        );
        // }
      } else {
        console.log("no recursive parents");
        if (node.left) {
          console.log("smallest:", smallest.data, "attached:", node.left.data);
          smallest.left = node.left;
        }
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
      }

      // console.log("NODE:", node, "this.root:", this.root);

      if (node === this.root) {
        console.log("it's a root");
        const rootData = this.root.data;
        this.root = smallest;
        console.log(
          "replaced this.root:",
          rootData,
          "with smallest:",
          smallest.data
        );
      }
    }

    // if (node === this.root) {
    //   console.log("it's a root");
    // }
  }

  levelOrderQueue() {
    if (!this.root) {
      return null;
    }

    const queue = [];
    this.levelOrderQueueArray = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const queuedNode = queue.shift();
      // console.log("queuedNode:", queuedNode.data);
      this.levelOrderQueueArray.push(queuedNode.data);

      if (queuedNode.left) {
        queue.push(queuedNode.left);
      }
      if (queuedNode.right) {
        queue.push(queuedNode.right);
      }
    }
    return this.levelOrderQueueArray;
  }

  preorder(node = this.root, arr = []) {
    if (!node) {
      return null;
    }

    arr.push(node.data);
    // console.log(node.data);
    // this.preorderArray.push(node.data);
    this.preorder(node.left, arr);
    this.preorder(node.right, arr);

    return arr;
    // return this.preorderArray;
  }

  inorder(node = this.root, arr = []) {
    if (!node) {
      return null;
    }

    this.inorder(node.left, arr);
    // console.log(node.data);
    // this.inorderArray.push(node.data);
    arr.push(node.data);
    this.inorder(node.right, arr);

    return arr;
    // return this.inorderArray;
  }

  postorder(node = this.root, arr = []) {
    if (!node) {
      return null;
    }

    this.postorder(node.left, arr);
    this.postorder(node.right, arr);
    // console.log(node.data);
    // this.postorderArray.push(node.data);
    arr.push(node.data);

    return arr;
    // return this.postorderArray;
  }

  find(value, node = this.root) {
    if (value === node.data) {
      // console.log("found", value, "at:", this.parent);
      console.log("found:", value);
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
    // console.log(`didn't find: ${value}`);
    return { node: null, parent: null };
  }

  height(node, parentHeight = 0) {
    if (!node) {
      return 0;
    }

    let height = parentHeight;
    // console.log("height node:", node.data, "height:", height);

    if (!node.left && !node.right) {
      // console.log("from leaf:", node.data, "height:", height);

      if (height > this.nodeHeight) {
        this.nodeHeight = height;
      }
    }

    height += 1;

    this.height(node.left, height);
    this.height(node.right, height);
    // const heightResult = this.nodeHeight;
    // this.nodeHeight = 0;
    // console.log("hhhhh", heightResult);
    return this.nodeHeight;
  }

  // eslint-disable-next-line no-shadow
  depth(target, node = this.root) {
    if (!target) {
      return null;
    }

    this.nodeDepth += 1;

    if (target.data === node.data) {
      const depth = this.nodeDepth - 1;
      // console.log("found", target.data, " at depth:", depth);
      this.nodeDepth = 0;
      return depth;
    }

    if (target.data < node.data && node.left) {
      return this.depth(target, node.left);
    }
    if (target.data > node.data && node.right) {
      return this.depth(target, node.right);
    }
    return null;
  }

  isBalanced(node = this.root, state = true) {
    let currentState = state;
    currentState = true;
    if (!node) {
      return null;
    }

    this.isBalanced(node.left);
    this.nodeHeight = 0;
    const leftSubtreeHeight = this.height(node.left);
    this.nodeHeight = 0;
    const rightSubtreeHeight = this.height(node.right);

    if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) {
      console.log(
        "node",
        node.data,
        "is unbalanced,",
        `left subtree height:`,
        leftSubtreeHeight,
        `right subtree height:`,
        rightSubtreeHeight
      );
      currentState = false;
      // return false;
    }

    this.isBalanced(node.right, currentState);

    return currentState;
  }

  rebalance() {
    console.log("rebalaned tree:");
    // console.log("this inorder:", this.inorder());
    this.setRoot(this.buildTree(this.inorder()));
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

function test0() {
  const root = tree.buildTree([]);
  tree.setRoot(root);
  prettyPrint(tree.root);

  tree.insert(10);
  prettyPrint(tree.root);

  tree.delete(999);
  prettyPrint(tree.root);

  tree.insert(5);
  prettyPrint(tree.root);

  // tree.insert(20);
  // prettyPrint(tree.root);

  // tree.insert(25);
  // prettyPrint(tree.root);

  // tree.insert(24);
  // prettyPrint(tree.root);

  tree.delete(10);
  prettyPrint(tree.root);

  // tree.delete(20);
  // prettyPrint(tree.root);

  // tree.delete(24);
  // prettyPrint(tree.root);

  // tree.delete(25);
  // prettyPrint(tree.root);
}

function generateArray(n) {
  const generatedArr = [];
  let size = n;
  let cycles = 0;
  while (size > 0) {
    const randomNumber = Math.round(Math.random() * 100);
    if (!generatedArr.includes(randomNumber)) {
      // console.log("random number:", randomNumber);`
      generatedArr.push(randomNumber);
      size -= 1;
    }
    cycles += 1;
  }

  return { generatedArr, cycles };
}

function test1() {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 9];

  const unsortedArr = [6, 1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 360, 324];
  // console.log("unsorted array:", unsortedArr);
  // const sortedArr = mergeSort(unsortedArr);
  // console.log("sorted array:", sortedArr);
  // removeDuplicates(sortedArr);
  // console.log("sorted array no dupes:", sortedArr);

  const { generatedArr, cycles } = generateArray(16);

  console.log("generated array:", generatedArr);
  console.log("generated array length:", generatedArr.length);
  console.log("cycles:", cycles);

  const sortedArr = mergeSort(generatedArr);
  removeDuplicates(sortedArr);

  const root = tree.buildTree(sortedArr);
  tree.setRoot(root);

  // tree.insert(10);
  // tree.insert(48);
  // tree.insert(27);
  // tree.insert(26);
  // tree.insert(24);
  // tree.insert(25);

  // tree.insert(400);

  // tree.insert(385);
  // tree.insert(381);
  // tree.insert(382);
  // tree.insert(383);
  // tree.insert(384);

  // tree.insert(550);
  // tree.insert(500);
  // tree.insert(600);

  // tree.delete(23);
  // prettyPrint(tree.root);

  // tree.delete(360);
  // prettyPrint(tree.root);

  // tree.delete(550);
  // prettyPrint(tree.root);

  // tree.delete(400);
  // prettyPrint(tree.root);

  // tree.delete(67);
  // prettyPrint(tree.root);

  // tree.delete(8);
  // prettyPrint(tree.root);

  // tree.delete(9);
  // prettyPrint(tree.root);

  // tree.delete(24);
  // prettyPrint(tree.root);

  // tree.delete(385);
  // prettyPrint(tree.root);

  // tree.delete(5);
  // prettyPrint(tree.root);

  // tree.delete(500);
  // prettyPrint(tree.root);

  // console.log("level order array queue:", tree.levelOrderQueue());

  // console.log("preorder array:", tree.preorder());
  // console.log("inorder array:", tree.inorder());
  // console.log("postorder array:", tree.postorder());

  // const findNode = 23;
  // console.log(
  //   `max height of ${findNode} from any leaf:`,
  //   tree.height(tree.find(findNode).node)
  // );
  // console.log(
  //   `depth of ${findNode} from the root:`,
  //   tree.depth(tree.find(findNode).node)
  // );

  prettyPrint(tree.root);

  console.log("tree.isBalanced:", tree.isBalanced());
  console.log("level order array queue:", tree.levelOrderQueue());
  console.log("preorder array:", tree.preorder());
  console.log("inorder array:", tree.inorder());
  console.log("postorder array:", tree.postorder());

  tree.insert(1000);
  tree.insert(1500);
  tree.insert(1100);
  tree.insert(1200);
  tree.insert(1600);

  prettyPrint(tree.root);

  console.log("tree.isBalanced:", tree.isBalanced());
  console.log("level order array queue:", tree.levelOrderQueue());
  console.log("preorder array:", tree.preorder());
  console.log("inorder array:", tree.inorder());
  console.log("postorder array:", tree.postorder());

  tree.rebalance();

  prettyPrint(tree.root);

  console.log("tree.isBalanced:", tree.isBalanced());
  console.log("level order array queue:", tree.levelOrderQueue());
  console.log("preorder array:", tree.preorder());
  console.log("inorder array:", tree.inorder());
  console.log("postorder array:", tree.postorder());
}

function test2() {
  const fullArr = [];

  const root = tree.buildTree(fullArr);
  tree.setRoot(root);
  for (let i = 0; i < 16; i += 1) {
    tree.insert(i);
  }
  prettyPrint(tree.root);

  console.log("level order array queue:", tree.levelOrderQueue());

  // tree.delete(1);
  // prettyPrint(tree.root);
  // tree.delete(0);
  // prettyPrint(tree.root);
  // tree.delete(2);
  // prettyPrint(tree.root);
}

// test0();
test1();
// test2();
