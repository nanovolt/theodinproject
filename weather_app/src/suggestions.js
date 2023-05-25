import "./suggestions.css";

export default class SearchSuggestions {
  constructor() {
    this.searchStatus = document.querySelector(".search-status");
    this.searchSuggestions = document.querySelector(".search-suggestions");
    this.suggestionList = document.querySelector(".suggestion-list");
    this.focusedSuggestion = -1;
  }

  debounce(func, ms) {
    this.timeout = null;
    return (...arg) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => func.apply(this, arg), ms);
    };
  }

  isSelected() {}

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

  hide() {
    this.suggestionList.replaceChildren();
  }

  show(inputValue) {
    if (inputValue) {
      this.deboundFunction(inputValue);
    } else {
    }
  }

  showSuggestions() {
    this.suggestionList.replaceChildren();

    this.json.forEach((city, index) => {
      const location = document.createElement("div");
      location.classList.add("suggested-location");

      if (index === 0) {
        this.focusedSuggestion = 0;
        location.classList.add("selected-suggestion");
      }

      location.setAttribute("tabindex", 0);
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
    });
  }

  selectDown() {}

  selectUp() {}

  init() {
    this.deboundFunction = this.debounce((inputValue) => {
      if (!this.searchSuggestions.classList.contains("hidden")) {
        this.search(inputValue).then(() => {
          if (this.json.length === 0) {
            this.noSuggestions();
            // this.lastUsed.style.display = "none";
          } else {
            this.showSuggestions();
          }
        });
      }
      // else {
      //   this.suggestionList.replaceChildren();
      //   this.searchSuggestions.style.display = "none";
      // }
    }, 200);
  }
}
