export default class StateMachine {
  constructor() {
    this.state = null;
  }

  setState(state) {
    this.state = state;
  }
}
