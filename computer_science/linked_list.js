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
    this.string = `( ${this.value} ) -> `;
    if (this.nextNode) {
      this.string += this.nextNode.toString();
    } else {
      this.string += "null";
    }
    return this.string;
  }
}

class LinkedList {
  constructor(name) {
    this.name = name;
    this.lastAppended = null;
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    }
    node.setPrevious(this.lastAppended);

    if (this.lastAppended) {
      this.lastAppended.setNext(node);
    }

    this.lastAppended = node;
  }

  toString() {
    this.string = this.head.toString();
    console.log(this.string);
  }
}

const list = new LinkedList("linked list");
list.append("node 0");
list.append("node 1");
list.append("node 2");
list.append("node 3");
list.append("node 4");
list.append("node 5");
list.append("node 6");
list.append("node 7");
list.append("node 8");
list.append("node 9");

list.toString();
