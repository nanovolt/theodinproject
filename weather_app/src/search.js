import "./search.css";
import key from "./key";

export default class Search {
  constructor(
    currentWeather,
    lastSearched,
    searchSuggestions,
    storage,
    observable
  ) {
    this.currentWeather = currentWeather;
    this.lastSearched = lastSearched;
    this.searchSuggestions = searchSuggestions;

    this.storage = storage;
    this.observable = observable;

    this.searchForm = document.querySelector("#search-form");
    this.searchInput = document.querySelector("#search-input");
    this.submitButton = document.querySelector(".search-submit-button");
    this.popup = document.querySelector(".error-popup");
  }

  getFormData() {
    const data = new FormData(this.searchForm);
    this.formdata = {};
    this.formdata.city = data.get("city");
    return this.formdata;
  }

  search(query) {
    this.query = query;
    console.log(`searching: ${query} ...`);
  }

  searchFormEventListeners() {
    this.searchForm.addEventListener("click", (e) => {
      if (e.target !== this.submitButton) {
        this.searchInput.focus();
      }
    });

    this.searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this.searchInput.value = "";
      this.search(this.getFormData());

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
      } else if (cityName) {
        this.currentWeather.updateCurrentWeather(cityName).then((arg) => {
          if (arg) {
            this.updateLastUsedList(arg);
            this.lastUsed.firstElementChild.textContent = "Last used:";
          }
        });
      }

      // this.suggestionList.replaceChildren();
      // this.searchSuggestions.style.display = "none";
    });
  }

  searchInputEventListeners() {
    this.searchInput.addEventListener("keyup", () => {
      if (!this.searchInput.value) {
        // this.lastUsed.style.display = "block";
      }
    });

    this.searchInput.addEventListener("keydown", (e) => {
      if (!this.searchInput.value) {
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

    this.searchInput.addEventListener("input", () => {
      // dependency
      // TODO update suggestions
      // end dependency
    });

    this.searchInput.addEventListener("focus", () => {
      // dependency
      if (this.searchInput.value && this.searchSuggestions) {
        // TODO show suggestions
      } else if (this.lastSearched) {
        // TODO show last searched
      }
      // end dependency
    });
  }

  initializeEventListeners() {
    this.searchFormEventListeners();
    this.searchInputEventListeners();
    // document.addEventListener("click", (e) => {
    //   if (e.target.closest(".location")) {
    //     const { latlon } = e.target.closest(".location").dataset;
    //     this.currentWeather.updateCurrentWeather(latlon);
    //     this.cityInput.value = "";
    //     this.suggestionList.replaceChildren();
    //     this.searchSuggestions.style.display = "none";
    //     return;
    //   }
    //   if (
    //     e.target.closest(".last-used") ||
    //     e.target.closest("#city-form") ||
    //     e.target.closest(".search-suggestions")
    //   ) {
    //     return;
    //   }
    //   this.lastUsed.style.display = "none";
    //   this.cityInput.value = "";
    //   this.focusedSuggestion = -1;
    //   this.searchSuggestions.style.display = "none";
    // });
  }

  init() {
    this.initializeEventListeners();
  }
}
