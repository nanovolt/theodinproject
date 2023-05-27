export default class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  changeMode() {
    this.observers.forEach((observer) => observer.changeMode());
  }

  changeValues() {
    this.observers.forEach((observer) => observer.changeValues());
  }

  update(arg) {
    this.observers.forEach((observer) => {
      observer.update(arg);
    });
  }

  preload() {
    this.observers.forEach((observer) => observer.preload());
  }

  recover() {
    this.observers.forEach((observer) => observer.recover());
  }

  show(arg) {
    this.observers.forEach((observer) => observer.show(arg));
  }

  hide() {
    this.observers.forEach((observer) => observer.hide());
  }

  clear() {
    this.observers.forEach((observer) => observer.clear());
  }

  selectDown() {
    this.observers.forEach((observer) => observer.selectDown());
  }

  selectUp() {
    this.observers.forEach((observer) => observer.selectUp());
  }

  isSelected() {
    this.observers.forEach((observer) => observer.isSelected());
  }

  getSelected() {
    this.observers.forEach((observer) => observer.getSelected());
  }

  isOptionSelected() {
    this.observers.forEach((observer) => observer.isOptionSelected());
  }
}
