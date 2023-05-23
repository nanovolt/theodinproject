import "./search.css";
import key from "./key";

export default class Search {
  constructor(storage, observable, currentWeather) {
    this.storage = storage;
    this.observable = observable;
    this.currentWeather = currentWeather;
    this.cityForm = document.querySelector("#city-form");
    this.cityInput = document.querySelector("#city-input");
    this.submitButton = document.querySelector(".arrow");
    this.lastUsed = document.querySelector(".last-used");
    this.lastUsedList = document.querySelector(".last-used-list");
    this.searchSuggestions = document.querySelector(".search-suggestions");
    this.suggestionList = document.querySelector(".suggestion-list");
    this.focusedLast = -1;
    this.focusedSuggestion = -1;
    this.popup = document.querySelector(".error-popup");
    this.usedCities = [];
  }

  showLastUsedCities() {
    this.lastUsed.style.display = "block";
    this.lastUsedList.style.display = "grid";
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

  async search(city) {
    try {
      if (city === "") return;

      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${key}&q=${city}`
      );

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

  init() {
    this.setLastUsedCities();

    const deboundFunction = this.debounce(() => {
      if (this.cityInput.value !== "") {
        this.search(this.cityInput.value).then(() => {
          if (this.cityInput.value !== "" && this.json.length !== 0) {
            this.showSuggestions();
            this.lastUsed.style.display = "none";
          }
        });
      } else {
        this.suggestionList.replaceChildren();
        this.searchSuggestions.style.display = "none";
      }
    }, 200);

    this.cityForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const selectedSuggestion = document.querySelector(".selected-suggestion");

      if (selectedSuggestion) {
        this.currentWeather
          .updateCurrentWeather(selectedSuggestion.dataset.latlon)
          .then((arg) => {
            if (arg) {
              this.updateLastUsedList(arg);
              this.lastUsed.firstElementChild.textContent = "Last used:";
            }
          });
      } else {
        const formdata = new FormData(this.cityForm);
        const cityName = formdata.get("city");
        if (cityName) {
          this.currentWeather.updateCurrentWeather(cityName).then((arg) => {
            if (arg) {
              this.updateLastUsedList(arg);
              this.lastUsed.firstElementChild.textContent = "Last used:";
            }
          });
        }
      }

      this.cityInput.value = "";
      this.suggestionList.replaceChildren();
      this.searchSuggestions.style.display = "none";
    });

    this.cityForm.addEventListener("click", (e) => {
      if (e.target !== this.submitButton) this.cityInput.focus();
    });

    this.cityInput.addEventListener("keyup", (e) => {
      if (!this.cityInput.value) {
        this.lastUsed.style.display = "block";
      }
    });

    this.cityInput.addEventListener("keydown", (e) => {
      if (!this.cityInput.value) {
        this.lastUsed.style.display = "block";
        this.suggestionList.replaceChildren();
        this.searchSuggestions.style.display = "none";
      }
      const isLastUsedDisplayed = this.lastUsed.style.display !== "none";
      const issearchSuggestionsDisplayed =
        this.searchSuggestions.style.display !== "none";

      if (e.key === "ArrowDown") {
        e.preventDefault();

        if (isLastUsedDisplayed) {
          if (this.focusedLast >= this.lastUsedList.children.length - 1) {
            this.focusedLast = -1;
          }
          this.focusedLast += 1;
          this.changeFocusedLastUsed();
        }

        if (issearchSuggestionsDisplayed) {
          if (
            this.focusedSuggestion >=
            this.suggestionList.children.length - 1
          ) {
            this.focusedSuggestion = -1;
          }
          this.focusedSuggestion += 1;
          this.changeFocusedSuggestion();
        }
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        if (isLastUsedDisplayed) {
        }

        if (issearchSuggestionsDisplayed) {
          if (this.focusedSuggestion <= -1 || this.focusedSuggestion === 0) {
            this.focusedSuggestion = this.suggestionList.children.length;
          }
          this.focusedSuggestion -= 1;
          this.changeFocusedSuggestion();
        }
        return;
      }

      if (e.key === "Escape") {
        this.searchSuggestions.style.display = "none";
      }
    });

    this.cityInput.addEventListener("input", () => {
      deboundFunction();
    });

    this.cityInput.addEventListener("focus", () => {
      this.focusedSuggestion = -1;
      this.showLastUsedCities();

      if (this.cityInput.value) {
        this.showSuggestions();
        this.lastUsed.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.closest(".location")) {
        const { latlon } = e.target.closest(".location").dataset;

        this.currentWeather.updateCurrentWeather(latlon);
        this.cityInput.value = "";

        this.suggestionList.replaceChildren();
        this.searchSuggestions.style.display = "none";

        return;
      }

      if (
        e.target.closest(".last-used") ||
        e.target.closest("#city-form") ||
        e.target.closest(".search-suggestions")
      ) {
        return;
      }
      this.lastUsed.style.display = "none";

      this.cityInput.value = "";
      this.focusedSuggestion = -1;
      this.searchSuggestions.style.display = "none";
    });
  }
}
