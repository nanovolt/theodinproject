import "./search.css";
import Popup from "./popup";

export default class Search {
  constructor(selector, ajax, searchObservable, weatherObservable, storage) {
    this.selector = selector;

    this.ajax = ajax;
    this.searchObservable = searchObservable;
    this.weatherObservable = weatherObservable;

    this.storage = storage;

    this.searchContainer = document.querySelector(this.selector);
    this.searchForm = this.searchContainer.querySelector("#search-form");
    this.searchInput = this.searchContainer.querySelector("#search-input");
    this.submitButton = this.searchContainer.querySelector(
      ".search-submit-button"
    );
    this.searchDropdown =
      this.searchContainer.querySelector(".search-dropdown");
  }

  getFormData() {
    this.formdata = new FormData(this.searchForm);
    const city = this.formdata.get("city").trim().split(/[\s]+/).join(" ");

    console.log("getFormData:", this.formdata);
    return city;
  }

  addSearchedCityToStorage() {
    return this.storage.addLastSearched(this.ajax.getCurrentWeather().location);
  }

  async searchCurrentWeather(query) {
    try {
      this.weatherObservable.preload();
      await this.ajax.requestCurrentWeather(query);

      this.weatherObservable.update({
        currentWeatherAjax: this.ajax.getCurrentWeather(),
      });

      this.clearInput();
      if (this.addSearchedCityToStorage()) {
        this.searchObservable.update();
      }
    } catch (error) {
      this.weatherObservable.update({
        currentWeatherAjax: this.ajax.getCurrentWeather(),
      });

      console.log(error);
      Popup(error);
    }
  }

  async searchWeatherForecast(query) {
    try {
      await this.ajax.requestWeatherForecast(query);

      this.weatherObservable.update({
        weatherForecastAjax: this.ajax.getWeatherForecast(),
      });

      this.clearInput();
    } catch (error) {
      this.weatherObservable.update({
        weatherForecastAjax: this.ajax.getWeatherForecast(),
      });

      console.log(error);
      Popup(error);
    }
  }

  async searchSugestions(input) {
    try {
      // const result = await this.ajax.wait(1000);

      const deboundInput = await this.ajax.debounce(input);
      console.log("input:", input);
      console.log("deboundInput:", deboundInput);

      // await this.ajax.requestSearchSuggestions(input);

      // console.log(this.ajax.getSearchSuggestions());
      // this.searchObservable.suggest(this.ajax.getSearchSuggestions());

      // this.weatherObservable.update({
      //   weatherForecastAjax: this.ajax.getWeatherForecast(),
      // });

      // this.clearInput();
    } catch (error) {
      // this.weatherObservable.update({
      //   weatherForecastAjax: this.ajax.getWeatherForecast(),
      // });

      console.log(error);
      Popup(error);
    }
  }

  clearInput() {
    this.searchInput.value = "";
    this.searchInput.blur();
  }

  searchFormEventListeners() {
    this.searchForm.addEventListener("click", (e) => {
      if (e.target !== this.submitButton) {
        this.searchInput.focus();
      }
    });

    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const selectedSuggestion = this.searchDropdown.querySelector(
        ".selected-suggestion"
      );

      // console.log(selectedSuggestion);

      if (selectedSuggestion) {
        // console.log(`searchObservalbe.isOptionSelected()`);
        // this.weatherObservable.update(this.searchObservable.getSelected());
        this.hideDropdown();

        const q = selectedSuggestion.dataset.latlon;

        this.searchCurrentWeather(q);
      }

      if (this.getFormData() !== "") {
        // this.weatherObservable.preload();
        this.hideDropdown();

        this.searchCurrentWeather(this.getFormData());
        // this.searchWeatherForecast(this.getFormData());
      }
    });
  }

  showDropdown() {
    this.searchDropdown.classList.add("active-search-dropdown");
  }

  hideDropdown() {
    this.searchDropdown.classList.remove("active-search-dropdown");
    this.searchObservable.hide();
  }

  searchInputEventListeners() {
    this.searchInput.addEventListener("keyup", () => {
      // this.weatherObservable.update(this.searchInput.value);
    });

    this.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.searchObservable.selectUp();
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.searchObservable.selectDown();
      }

      if (e.key === "Escape") {
        this.searchObservable.hide();
      }
    });

    this.searchInput.addEventListener("input", () => {
      if (this.searchInput.value) {
        this.searchSugestions(this.searchInput.value);

        return;
      }
      this.searchObservable.show();
    });

    this.searchInput.addEventListener("focus", () => {
      this.showDropdown();
      this.searchObservable.show();
    });
  }

  clickAway() {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".search-container")) {
        return;
      }
      // if (
      //   e.target.closest(".last-searched") ||
      //   e.target.closest("#search-form") ||
      //   e.target.closest(".search-suggestions")
      // ) {
      //   return;
      // }

      if (
        e.target.closest(".last-searched-location") ||
        e.target.closest(".suggested-location")
      ) {
        // this.searchInput.value = "";
        const { latlon } = e.target.closest(".location").dataset;
        this.weatherObservable.update(latlon);
      }

      this.searchInput.value = "";
      // this.searchDropdown.classList.remove("active-search-dropdown");

      this.hideDropdown();

      this.searchObservable.hide();
    });
  }

  initializeEventListeners() {
    this.searchFormEventListeners();
    this.searchInputEventListeners();
    this.clickAway();
  }

  init() {
    this.initializeEventListeners();
  }
}
