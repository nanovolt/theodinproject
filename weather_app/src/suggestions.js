import "./suggestions.css";

export default class SearchSuggestions {
  constructor(search) {
    this.search = search;
    this.searchStatus = document.querySelector(".search-status");
    this.searchSuggestions = document.querySelector(".search-suggestions");
    this.suggestionList = document.querySelector(".suggestion-list");
    this.selected = -1;
  }

  isOptionSelected() {}

  update(query) {
    // this.search(query);
  }

  noSuggestions() {
    console.log("no suggestions");
  }

  updateFocus() {
    if (document.querySelector(".selected-suggestion")) {
      document
        .querySelector(".selected-suggestion")
        .classList.remove("selected-suggestion");
    }

    if (this.suggestionList.children.length !== 0) {
      this.suggestionList.children[this.focusedSuggestion].classList.add(
        "selected-suggestion"
      );
    }
  }

  removeSelected() {
    if (this.suggestionList.querySelector(".selected-suggestion")) {
      this.suggestionList
        .querySelector(".selected-suggestion")
        .classList.remove("selected-suggestion");
    }
  }

  hide() {
    this.selected = -1;
    this.removeSelected();
    // this.suggestionList.replaceChildren();
    this.searchSuggestions.classList.add("hidden");
  }

  areSuggestionsHidden() {
    return this.searchSuggestions.classList.contains("hidden");
  }

  cityEventListeners() {
    const thisCity = this.suggestionList.lastElementChild;
    thisCity.addEventListener("click", () => {
      // console.log("latlon:", thisCity.dataset.latlon);
      // console.log("name:", thisCity.dataset.name);
      // console.log("city:", thisCity);
      // this.weatherObservable.update(thisCity.dataset.latlon);
      this.search.searchCurrentWeather(thisCity.dataset.latlon);
      this.search.searchWeatherForecast(thisCity.dataset.latlon);
      this.removeSelected();
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

      const index = Array.from(this.suggestionList.children).indexOf(thisCity);
      // console.log("hover:", index);

      this.selected = index;
    });
  }

  addAsyncSuggestions(json) {
    this.suggestionList.replaceChildren();
    this.searchSuggestions.classList.remove("hidden");

    this.json = json;

    this.json.forEach((city) => {
      const location = document.createElement("div");
      location.classList.add("suggested-location");

      location.dataset.name = `${city.name}`;
      location.dataset.id = `${city.id}`;
      location.dataset.latlon = `${city.lat},${city.lon}`;

      const cityName = document.createElement("div");
      cityName.classList.add("city-name");
      const locationDetails = document.createElement("div");
      locationDetails.classList.add("location-details");
      const regionName = document.createElement("span");
      regionName.classList.add("region-name");
      const slash = document.createElement("span");
      slash.textContent = " / ";
      const countryName = document.createElement("span");
      countryName.classList.add("country-name");
      locationDetails.appendChild(regionName);
      locationDetails.appendChild(slash);
      locationDetails.appendChild(countryName);
      cityName.textContent = city.name;
      regionName.textContent = city.region;
      countryName.textContent = city.country;
      location.appendChild(cityName);
      location.appendChild(locationDetails);
      this.suggestionList.appendChild(location);
      this.cityEventListeners();
    });
  }

  showSuggestions() {
    this.searchStatus.textContent = "Search suggestions:";
  }

  showLastSearched() {
    this.hide();
  }

  selectUp() {
    if (!this.areSuggestionsHidden()) {
      this.removeSelected();

      this.selected -= 1;

      if (this.selected <= -1) {
        this.selected = this.suggestionList.children.length - 1;
      }

      // console.log("up:", this.selected);
      this.suggestionList.children[this.selected].classList.add(
        "selected-suggestion"
      );
    }
  }

  selectDown() {
    if (!this.areSuggestionsHidden()) {
      this.removeSelected();

      this.selected += 1;

      if (this.selected === this.suggestionList.children.length) {
        this.selected = 0;
      }

      // console.log("down:", this.selected);
      this.suggestionList.children[this.selected].classList.add(
        "selected-suggestion"
      );
    }
  }

  init() {}
}
