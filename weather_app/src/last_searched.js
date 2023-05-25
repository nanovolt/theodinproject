import "./last_searched.css";

export default class LastSearched {
  constructor(storage) {
    this.searchStatus = document.querySelector(".search-status");
    this.lastSearched = document.querySelector(".last-searched");
    this.lastSearchedList = this.lastSearched.querySelector(
      ".last-searched-list"
    );

    this.storage = storage;

    this.focusedLast = -1;
    this.usedCities = [];
  }

  init() {}

  update(arg) {
    console.log("searched:", arg);
    this.storage.addLastSearched(arg);
  }

  isSelected() {}

  show(inputValue) {
    if (this.storage.getLastSearched().length === 0) {
      this.searchStatus.textContent = "Last searched: None";
    } else {
      this.searchStatus.textContent = "Last searched:";
    }
  }

  hide() {}

  clear() {}

  selectDown() {}

  selectUp() {}

  updatelastSearchedList(arg, index) {
    this.usedCities.push(arg);
    this.usedCities = this.usedCities.slice(-3);
    // console.log("used cities:", this.usedCities);

    if (this.lastSearchedList.children.length > 2) {
      this.lastSearchedList.removeChild(
        this.lastSearchedList.firstElementChild
      );
    }

    this.storage.setlastSearchedCities(this.usedCities);

    const lastSearchedCity = document.createElement("div");
    lastSearchedCity.classList.add("last-searched-city");

    const cityEl = document.createElement("span");
    cityEl.textContent = arg.name;
    const slash = document.createElement("span");
    slash.textContent = " / ";
    const countryEl = document.createElement("span");
    countryEl.textContent = arg.country;

    lastSearchedCity.appendChild(cityEl);
    lastSearchedCity.appendChild(slash);
    lastSearchedCity.appendChild(countryEl);

    if (index === 0) {
      this.focusedLast = 0;
      lastSearchedCity.classList.add("selected-suggestion");
    }

    this.lastSearchedList.appendChild(lastSearchedCity);
  }

  changeFocusedlastSearched() {
    if (document.querySelector(".selected-last-city")) {
      document
        .querySelector(".selected-last-city")
        .classList.remove("selected-last-city");
    }
    if (this.lastSearchedList.children.length !== 0) {
      this.lastSearchedList.children[this.focusedLast].classList.add(
        "selected-last-city"
      );
    }
  }

  setlastSearchedCities() {
    if (this.storage.haslastSearchedCities()) {
      const cities = this.storage.getlastSearchedCities();
      cities.forEach((city, index) => {
        this.updatelastSearchedList(city, index);
      });
    } else {
      console.log("else");
      this.lastSearchedList.style.display = "none";
      this.lastSearched.firstElementChild.textContent += " None.";
    }
  }
}
