import "./last_searched.css";

export default class LastSearched {
  constructor(search, weatherObservable, storage) {
    this.search = search;
    this.weatherObservable = weatherObservable;
    this.searchStatus = document.querySelector(".search-status");
    this.lastSearched = document.querySelector(".last-searched");
    this.lastSearchedList = this.lastSearched.querySelector(
      ".last-searched-list"
    );

    this.storage = storage;

    this.selected = -1;
  }

  init() {
    this.lastSearchData = this.storage.getLastSearched();
    if (this.lastSearchData.length !== 0) {
      this.lastSearchData = this.storage.getLastSearched();

      this.lastSearchData.forEach((city) => {
        this.createCity(city);
      });

      // this.lastSearchedList.firstElementChild.classList.add(
      //   "selected-suggestion"
      // );
    }
  }

  createCity(city) {
    const cityEl = document.createElement("div");
    cityEl.classList.add("searched-city");

    const cityName = document.createElement("span");
    cityName.textContent = city.name;

    const slash = document.createElement("span");
    slash.textContent = " / ";

    const countryName = document.createElement("span");
    countryName.textContent = city.country;

    cityEl.appendChild(cityName);
    cityEl.appendChild(slash);
    cityEl.appendChild(countryName);
    cityEl.dataset.name = city.name;
    cityEl.dataset.latlon = `${city.lat},${city.lon}`;

    this.lastSearchedList.prepend(cityEl);
    this.cityEventListeners();
  }

  cityEventListeners() {
    const thisCity = this.lastSearchedList.firstElementChild;
    thisCity.addEventListener("click", () => {
      console.log("latlon:", thisCity.dataset.latlon);
      console.log("name:", thisCity.dataset.name);

      // this.weatherObservable.update(thisCity.dataset.latlon);
      this.search.searchCurrentWeather(thisCity.dataset.latlon);
      this.search.hideDropdown();
      // const form = document.querySelector("#search-form");
      // const data = new FormData(form);
      // this.search.formdata.set("city", thisCity.dataset.latlon);

      // console.log("set data:", this.search.formdata);
      // form.preventDefault();
      // form.requestSubmit();
    });

    thisCity.addEventListener("mouseover", () => {
      this.removeSelected();

      thisCity.classList.add("selected-suggestion");

      const index = Array.from(this.lastSearchedList.children).indexOf(
        thisCity
      );
      // console.log("hover:", index);

      this.selected = index;
    });
  }

  removeSelected() {
    if (this.lastSearchedList.querySelector(".selected-suggestion")) {
      this.lastSearchedList
        .querySelector(".selected-suggestion")
        .classList.remove("selected-suggestion");
    }
  }

  update() {
    this.lastSearchData = this.storage.getLastSearched().reverse();

    const city = this.lastSearchData.at(0);

    this.createCity(city);

    if (this.lastSearchedList.children.length > 3) {
      this.lastSearchedList.removeChild(this.lastSearchedList.lastElementChild);
    }

    if (this.lastSearchedList.children.length > 1) {
      this.removeSelected();
    }

    this.lastSearchedList.firstElementChild.classList.add(
      "selected-suggestion"
    );
  }

  isOptionSelected() {
    // if (this.lastSearchedList.children.length !== 0) return true;
    // return false;
  }

  show() {
    this.selected = -1;
    if (this.storage.getLastSearched().length === 0) {
      this.searchStatus.textContent = "Last searched: None";
    } else {
      // this.lastSearchedList
      //   .querySelector(".selected-suggestion")
      //   .classList.remove("selected-suggestion");

      // this.lastSearchedList.firstElementChild.classList.add(
      //   "selected-suggestion"
      // );

      this.searchStatus.textContent = "Last searched:";
      this.lastSearched.classList.remove("hidden");
    }
  }

  hide() {
    this.selected = -1;
    this.removeSelected();
  }

  clear() {}

  selectUp() {
    if (this.storage.getLastSearched().length === 0) {
      return;
    }

    this.removeSelected();

    this.selected -= 1;

    if (this.selected <= -1) {
      this.selected = this.lastSearchedList.children.length - 1;
    }

    // console.log("up:", this.selected);
    this.lastSearchedList.children[this.selected].classList.add(
      "selected-suggestion"
    );
  }

  selectDown() {
    if (this.storage.getLastSearched().length === 0) {
      return;
    }

    this.removeSelected();

    this.selected += 1;

    if (this.selected === this.lastSearchedList.children.length) {
      this.selected = 0;
    }

    // console.log("down:", this.selected);
    this.lastSearchedList.children[this.selected].classList.add(
      "selected-suggestion"
    );
  }
}
