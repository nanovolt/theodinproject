import "./search.css";

export default class Search {
  constructor(observable, currentWeather) {
    this.observable = observable;
    this.currentWeather = currentWeather;
    this.cityForm = document.querySelector("#city-form");
    this.cityInput = document.querySelector("#city-input");
    this.key = "7af186cb5b0740ea9b182108231405";
    this.submitButton = document.querySelector(".arrow");
    this.searchSuggestions = document.querySelector(".search-suggestions");
    this.suggestionList = document.querySelector(".suggestion-list");
    this.focusedSuggestion = -1;
  }

  showSuggestions() {
    this.suggestionList.replaceChildren();
    this.searchSuggestions.style.display = "grid";

    this.json.forEach((city) => {
      const location = document.createElement("div");
      location.classList.add("location");

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
        `https://api.weatherapi.com/v1/search.json?key=${this.key}&q=${city}`
      );

      this.json = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  init() {
    this.cityForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const selected = document.querySelector(".selected");

      if (selected) {
        // console.log(selected.dataset.latlon);
        this.currentWeather.updateCurrentWeather(selected.dataset.latlon);
      } else {
        const formdata = new FormData(this.cityForm);
        const cityName = formdata.get("city");
        // this.observable.notify();
        if (cityName) this.currentWeather.updateCurrentWeather(cityName);
      }

      this.cityInput.value = "";
      this.suggestionList.replaceChildren();
      this.searchSuggestions.style.display = "none";
    });

    this.cityForm.addEventListener("click", (e) => {
      if (e.target !== this.submitButton) this.cityInput.focus();
    });

    this.cityInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        // console.log(this.suggestionList);
        if (
          this.focusedSuggestion ===
          this.suggestionList.children.length - 1
        ) {
          this.focusedSuggestion = -1;
        }

        this.focusedSuggestion += 1;
        // console.log(this.suggestionList.children[this.focusedSuggestion]);

        if (document.querySelector(".selected"))
          document.querySelector(".selected").classList.remove("selected");

        this.suggestionList.children[this.focusedSuggestion].classList.add(
          "selected"
        );
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        if (this.focusedSuggestion === -1 || this.focusedSuggestion === 0) {
          this.focusedSuggestion = this.suggestionList.children.length;
        }

        this.focusedSuggestion -= 1;
        // console.log(this.focusedSuggestion);
        // console.log(this.suggestionList.children[this.focusedSuggestion]);
        if (document.querySelector(".selected"))
          document.querySelector(".selected").classList.remove("selected");

        this.suggestionList.children[this.focusedSuggestion].classList.add(
          "selected"
        );
        return;
      }

      if (e.key === "Escape") {
        // this.suggestionList.replaceChildren();
        this.searchSuggestions.style.display = "none";
      }

      this.focusedSuggestion = -1;
    });

    this.cityInput.addEventListener("input", () => {
      if (!this.cityInput.value) {
        this.suggestionList.replaceChildren();
        this.searchSuggestions.style.display = "none";
      }

      this.search(this.cityInput.value).then(() => {
        if (this.json.length !== 0) this.showSuggestions();
      });
    });

    // this.cityInput.addEventListener("blur", (e) => {
    //   if (!e.target.closest("#city-form")) {
    //     this.cityInput.value = "";
    //   }
    // });

    this.cityInput.addEventListener("focus", () => {
      this.focusedSuggestion = -1;

      if (this.cityInput.value) {
        this.showSuggestions();
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.closest(".location")) {
        const { latlon } = e.target.closest(".location").dataset;

        // console.log("latlon:", latlon);
        // console.log("id:", id);

        this.currentWeather.updateCurrentWeather(latlon);
        this.cityInput.value = "";

        this.suggestionList.replaceChildren();
        this.searchSuggestions.style.display = "none";

        return;
      }

      if (
        e.target.closest("#city-form") ||
        e.target.closest(".search-suggestions")
      ) {
        return;
      }
      this.cityInput.value = "";

      this.focusedSuggestion = -1;
      this.searchSuggestions.style.display = "none";
    });

    // this.cityInput.addEventListener("blur", (e) => {
    //   // this.suggestionList.replaceChildren();
    //   // console.log(e.relatedTarget);
    //   // if (e.relatedTarget) {
    //   this.searchSuggestions.style.display = "none";
    //   // }
    // });
  }
}
