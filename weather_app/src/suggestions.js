import "./suggestions.css";
import key from "./key";

export default class Suggestions {
  constructor() {
    this.searchSuggestions = document.querySelector(".search-suggestions");
    this.suggestionList = document.querySelector(".suggestion-list");
    this.focusedSuggestion = -1;
  }

  async search(resource, query) {
    this.resource = "https://api.weatherapi.com/v1/search.json";
    this.key = `?key=${key}`;
    this.query = `&q=${query}`;

    try {
      if (query === "") return;

      const response = await fetch(`${this.resource}${this.key}${this.query}`);

      this.json = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  debounce(func, ms) {
    this.timeout = null;
    return (...arg) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => func.apply(this, arg), ms);
    };
  }

  changeFocusedSuggestion() {
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

  showSuggestions() {
    this.suggestionList.replaceChildren();
    this.searchSuggestions.style.display = "grid";

    this.json.forEach((city, index) => {
      const location = document.createElement("div");
      location.classList.add("location");

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

  init() {
    this.deboundFunction = this.debounce(() => {
      if (this.searchInput.value !== "") {
        this.search(this.searchInput.value).then(() => {
          if (this.searchInput.value !== "" && this.json.length !== 0) {
            // showSuggestions();
            // this.lastUsed.style.display = "none";
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
