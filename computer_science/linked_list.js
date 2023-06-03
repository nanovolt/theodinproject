/* eslint-disable max-classes-per-file */
class Node {
  constructor(value = null) {
    this.value = value;
    this.previousNode = null;
    // this.nextNode = { value: null, previousNode: null, nextNode: null };
    this.nextNode = null;
  }

  setPrevious(value) {
    this.previousNode = value;
  }

  setNext(value) {
    this.nextNode = value;
  }

  toString() {
    let string = "";
    if (this.nextNode) {
      string = `( ${this.value} ) -> ${this.nextNode.toString()} `;
    } else {
      string = `( ${this.value} ) -> null`;
    }
    return string;
  }
}

class LinkedList {
  constructor(name) {
    this.name = name;
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    console.log("appending: ", value);
    const node = new Node(value);
    this.size += 1;

    if (!this.head) {
      this.head = node;
    }

    if (this.tail) {
      this.tail.setNext(node);
    }

    node.setPrevious(this.tail);

    this.tail = node;
  }

  prepend(value) {
    console.log("prepending: ", value);
    const node = new Node(value);
    this.size += 1;

    if (!this.tail) {
      this.tail = node;
    }

    if (this.head) {
      this.head.setPrevious(node);
      node.setNext(this.head);
    }

    this.head = node;
  }

  toString() {
    this.string = this.head.toString();
    return this.string;
  }

  at(index) {
    const maxIndex = this.size - 1;
    const minIndex = this.size * -1;

    if (index > maxIndex) {
      console.log("can't search outside the list");
      console.log("your index:", index);
      console.log("max index:", maxIndex);
      return null;
    }
    if (index < minIndex) {
      console.log("can't search outside the list");
      console.log("your index:", index);
      console.log("min index:", minIndex);
      return null;
    }

    let node = this.head;

    if (index > 0) {
      for (let i = 0; i < index; i += 1) {
        node = node.nextNode;
      }
    }

    if (index < 0) {
      node = this.tail;
      for (let i = index; i < -1; i += 1) {
        node = node.previousNode;
      }
    }

    return node;
  }

  pop() {
    console.log(`popped: ${this.tail}`);
    if (this.tail.previousNode) {
      this.tail = this.tail.previousNode;
    }
    this.tail.setNext(null);
    this.size -= 1;
  }

  contains(value) {
    let node = this.head;

    for (let i = 0; i < this.size; i += 1) {
      if (node.value === value) {
        return true;
      }

      if (node.nextNode) {
        node = node.nextNode;
      }
    }

    return false;
  }

  find(value) {
    let node = this.head;

    for (let i = 0; i < this.size; i += 1) {
      if (node.value === value) {
        return i;
      }

      if (node.nextNode) {
        node = node.nextNode;
      }
    }

    return null;
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.size - 1 || index === -1) {
      this.append(value);
      return;
    }

    const oldNode = this.at(index);
    if (!oldNode) {
      return;
    }

    console.log(`inserting at ${index}:`, value);
    const newNode = new Node(value);
    this.size += 1;

    newNode.nextNode = oldNode;
    newNode.previousNode = oldNode.previousNode;

    oldNode.previousNode = newNode;
    newNode.previousNode.nextNode = newNode;
  }

  removeAt(index) {
    if (index === 0) {
      console.log("removing the head");
      this.head = this.head.nextNode;
      this.head.previousNode = null;
      this.size -= 1;
      return;
    }

    console.log("index:", index, "size-1:", this.size - 1);
    if (index === this.size - 1 || index === -1) {
      this.pop();
      return;
    }

    console.log(`removing at: ${index}`);
    const oldNode = this.at(index);
    oldNode.previousNode.nextNode = oldNode.nextNode;
    oldNode.nextNode.previousNode = oldNode.previousNode;
    this.size -= 1;
  }
}

const list = new LinkedList("linked list");
list.append("node 0");
list.append("node 1");
list.append("node 2 pop");
list.pop();
list.prepend("node 3");
list.append("node 4");
list.prepend("node 5");
list.append("node 6");
list.append("node 7 pop");

// console.log(list);
// list.toString();
console.log(`linked list string: ${list}`);
console.log("linked list:", list);
// console.log(`size: ${list.size} head: ${list.head} tail: ${list.tail}`);
console.log("size:", list.size);
console.log("head:", list.head);
console.log("tail:", list.tail);

list.pop();
console.log(`linked list string: ${list}`);

console.log("at(6):", list.at(6));
console.log("at(-3):", list.at(-3));

console.log(`linked list string: ${list}`);
console.log("linked list:", list);

const contains = "node 3";
console.log(`contains ${contains}:`, list.contains(contains));
console.log(`find ${contains}:`, list.find(contains));

list.insertAt("insert at 0", 0);
console.log(`linked list string: ${list}`);

list.insertAt("insert at 6", 6);
console.log(`linked list string: ${list}`);

list.insertAt("insert at 4", 4);
console.log(`linked list string: ${list}`);
// list.showHead();
// list.showTail();

list.insertAt("insert at -1", -1);
console.log(`linked list string: ${list}`);

list.removeAt(-1);
console.log(`linked list string: ${list}`);

list.removeAt(0);
console.log(`linked list string: ${list}`);

list.removeAt(3);
console.log(`linked list string: ${list}`);

list.removeAt(6);
console.log(`linked list string: ${list}`);

list.insertAt("HELLO", 1);
console.log(`linked list string: ${list}`);

list.insertAt("WORLD", -2);
console.log(`linked list string: ${list}`);
