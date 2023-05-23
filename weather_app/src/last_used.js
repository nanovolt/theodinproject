export default class lastUsed {
  constructor(selector) {
    this.selector = selector;
    this.lastUsed = document.querySelector(selector);
    this.lastUsedList = this.lastUsed.querySelector(".last-used-list");
    this.focusedLast = -1;
    this.usedCities = [];
  }

  showLastUsedCities() {
    this.lastUsed.style.display = "block";
    this.lastUsedList.style.display = "grid";
  }

  updateLastUsedList(arg, index) {
    this.usedCities.push(arg);
    this.usedCities = this.usedCities.slice(-3);
    // console.log("used cities:", this.usedCities);

    if (this.lastUsedList.children.length > 2) {
      this.lastUsedList.removeChild(this.lastUsedList.firstElementChild);
    }

    this.storage.setLastUsedCities(this.usedCities);

    const lastUsedCity = document.createElement("div");
    lastUsedCity.classList.add("last-used-city");

    const cityEl = document.createElement("span");
    cityEl.textContent = arg.name;
    const slash = document.createElement("span");
    slash.textContent = " / ";
    const countryEl = document.createElement("span");
    countryEl.textContent = arg.country;

    lastUsedCity.appendChild(cityEl);
    lastUsedCity.appendChild(slash);
    lastUsedCity.appendChild(countryEl);

    if (index === 0) {
      this.focusedLast = 0;
      lastUsedCity.classList.add("selected-suggestion");
    }

    this.lastUsedList.appendChild(lastUsedCity);
  }

  changeFocusedLastUsed() {
    if (document.querySelector(".selected-last-city")) {
      document
        .querySelector(".selected-last-city")
        .classList.remove("selected-last-city");
    }
    if (this.lastUsedList.children.length !== 0) {
      this.lastUsedList.children[this.focusedLast].classList.add(
        "selected-last-city"
      );
    }
  }

  setLastUsedCities() {
    if (this.storage.hasLastUsedCities()) {
      const cities = this.storage.getLastUsedCities();
      cities.forEach((city, index) => {
        this.updateLastUsedList(city, index);
      });
    } else {
      console.log("else");
      this.lastUsedList.style.display = "none";
      this.lastUsed.firstElementChild.textContent += " None.";
    }
  }

  hide() {
    this.lastUsed.style.display = "none";
  }
}
