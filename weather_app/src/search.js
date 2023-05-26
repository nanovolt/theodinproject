import "./search.css";
import Popup from "./popup";

export default class Search {
  constructor(selector, ajax, searchObservable, weatherObservable) {
    this.selector = selector;

    this.ajax = ajax;
    this.searchObservable = searchObservable;
    this.weatherObservable = weatherObservable;

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
    const data = new FormData(this.searchForm);
    return data.get("city").trim().split(/[\s]+/).join(" ");
  }

  async searchCurrentWeather(query) {
    try {
      await this.ajax.requestCurrentWeather(query);
      this.weatherObservable.update({
        currentWeatherAjax: this.ajax.getCurrentWeather(),
      });
      this.clearInput();
    } catch (error) {
      this.weatherObservable.update({
        currentWeatherAjax: this.ajax.getCurrentWeather(),
      });
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

      if (this.searchObservable.isSelected()) {
        console.log(`searchObservalbe.isSelected()`);
        // this.weatherObservable.update(this.searchObservable.getSelected());
      }

      if (this.getFormData() !== "") {
        this.weatherObservable.preload();
        this.searchCurrentWeather(this.getFormData());
        this.searchWeatherForecast(this.getFormData());

        this.searchDropdown.classList.remove("active-search-dropdown");
      }
    });
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
      this.searchObservable.show(this.searchInput.value);
    });

    this.searchInput.addEventListener("focus", () => {
      this.searchDropdown.classList.add("active-search-dropdown");
      this.searchObservable.show(this.searchInput.value);
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
      this.searchDropdown.classList.remove("active-search-dropdown");

      // this.searchObservable.hide();
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
