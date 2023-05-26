export default class Storage {
  constructor() {
    this.tempMode = localStorage.getItem("tempMode");
    this.lastSearched = localStorage.getItem("lastSearched");
    this.ipLookup = localStorage.getItem("ipLookup");
  }

  init() {
    if (!this.tempMode) {
      this.setTempMode("celcius");
    }
    if (!this.lastSearched) {
      this.lastSearched = [];
      localStorage.setItem("lastSearched", JSON.stringify(this.lastSearched));
    }

    if (!this.ipLookup) {
      this.setIpLookup({});
    }
  }

  setTempMode(mode) {
    this.tempMode = mode;
    localStorage.setItem("tempMode", mode);
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

  setIpLookup(obj) {
    this.ipLookup = obj;
    localStorage.setItem("ipLookup", JSON.stringify(this.ipLookup));
  }

  getIpLookup() {
    this.ipLookup = JSON.parse(localStorage.getItem("ipLookup"));
    return this.ipLookup;
  }
}
