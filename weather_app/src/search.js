import "./search.css";

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

  searchFormEventListeners() {
    this.searchForm.addEventListener("click", (e) => {
      if (e.target !== this.submitButton) {
        this.searchInput.focus();
      }
    });

    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.searchObservable.isSelected()) {
        this.weatherObservable.update(this.searchObservable.getSelected());
        this.searchInput.value = "";
      }

      if (this.getFormData() !== "") {
        this.ajax.requestCurrentWeather(this.getFormData()).then(() => {
          this.weatherObservable.update({
            current: this.ajax.getCurrentWeather(),
          });
        });

        this.ajax.requestWeatherForecast(this.getFormData()).then(() => {
          this.weatherObservable.update({
            forecast: this.ajax.getCurrentWeather(),
          });
        });

        // this.weatherObservable.update([1, 2]);

        // console.log("search promise:", promise);
        // this.weatherObservable.update(this.getFormData());
        // this.searchObservable.update(this.getFormData());
        this.searchInput.value = "";
        this.searchDropdown.classList.remove("active-search-dropdown");
      }

      // this.searchObservable.hide();
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
