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

  // eslint-disable-next-line class-methods-use-this
  hasLastUsedCities() {
    if (localStorage.getItem("lastUsedCities")) {
      return true;
    }
    return false;
  }

  setLastUsedCities(cities) {
    this.lastUsedCities = cities;
    localStorage.setItem("lastUsedCities", JSON.stringify(this.lastUsedCities));
  }

  getLastUsedCities() {
    this.lastUsedCities = JSON.parse(localStorage.getItem("lastUsedCities"));
    return this.lastUsedCities;
  }

  getTempMode() {
    return this.tempMode;
  }

  getNotified(arg) {
    console.log("storage notified:", arg);
    this.setTempMode(arg);
  }
}
