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

  alreadySearched(arg) {
    return this.getLastSearched().find((city) => {
      if (
        city.country === arg.country &&
        city.lat === arg.lat &&
        city.lon === arg.lon &&
        city.name === arg.name &&
        city.region === arg.region &&
        city.tz_id === arg.tz_id
      ) {
        return true;
      }
      return false;
    });
  }

  addLastSearched(arg) {
    if (this.alreadySearched(arg)) {
      return false;
    }

    this.lastSearched = this.lastSearched.slice(-2);
    this.lastSearched.push(arg);
    localStorage.setItem("lastSearched", JSON.stringify(this.lastSearched));

    return true;
  }

  getLastSearched() {
    this.lastSearched = JSON.parse(localStorage.getItem("lastSearched"));
    return this.lastSearched;
  }

  hasLastSearched() {
    this.getLastSearched();
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
