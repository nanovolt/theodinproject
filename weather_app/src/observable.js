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

  hide() {
    this.observers.forEach((observer) => observer.hide());
  }

  selectDown() {
    this.observers.forEach((observer) => observer.selectDown());
  }

  selectUp() {
    this.observers.forEach((observer) => observer.selectUp());
  }

  showLastSearched(arg) {
    this.observers.forEach((observer) => observer.showLastSearched(arg));
  }

  showSuggestions(json) {
    this.observers.forEach((observer) => observer.showSuggestions(json));
  }

  addAsyncSuggestions(json) {
    this.observers.forEach((observer) => observer.addAsyncSuggestions(json));
  }
}
