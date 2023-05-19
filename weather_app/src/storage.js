export default class Storage {
  constructor() {
    this.tempMode = localStorage.getItem("tempMode");
  }

  init() {
    if (!this.hasTempMode()) {
      this.setTempMode("celcius");
    }
  }

  hasTempMode() {
    if (this.tempMode) {
      return true;
    }
    return false;
  }

  setTempMode(mode) {
    localStorage.setItem("tempMode", mode);
    this.tempMode = mode;
  }

  getTempMode() {
    return this.tempMode;
  }

  getNotified(arg) {
    console.log("storage notified:", arg);
    this.setTempMode(arg);
  }
}
