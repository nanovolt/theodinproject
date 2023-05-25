export default class Storage {
  constructor() {
    this.tempMode = localStorage.getItem("tempMode");
    this.lastSearched = localStorage.getItem("lastSearched");
  }

  init() {
    if (!this.tempMode) {
      this.tempMode = "celcius";
      localStorage.setItem("tempMode", this.tempMode);
    }
    if (!this.lastSearched) {
      this.lastSearched = [];
      localStorage.setItem("lastSearched", JSON.stringify(this.lastSearched));
    }
  }

  setTempMode(mode) {
    localStorage.setItem("tempMode", mode);
    this.tempMode = mode;
  }

  getTempMode() {
    this.tempMode = localStorage.getItem("tempMode");
    return this.tempMode;
  }

  addLastSearched(city) {
    this.getLastSearched();
    this.lastSearched = this.lastSearched.slice(-2);

    if (typeof city !== "object") {
      this.lastSearched.push({ name: city });
    } else {
      this.lastSearched.push(city);
    }

    localStorage.setItem("lastSearched", JSON.stringify(this.lastSearched));
  }

  getLastSearched() {
    this.lastSearched = JSON.parse(localStorage.getItem("lastSearched"));
    return this.lastSearched;
  }
}
