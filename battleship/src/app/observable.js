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

  placeShip(targets) {
    this.observers.forEach((observer) => observer.placeShip(targets));
  }

  removeShip(coordinates) {
    this.observers.forEach((observer) => observer.removeShip(coordinates));
  }

  showDisabledSymbols() {
    this.observers.forEach((observer) => observer.showDisabledSymbols());
  }

  hideDisabledSymbols() {
    this.observers.forEach((observer) => observer.hideDisabledSymbols());
  }
}
