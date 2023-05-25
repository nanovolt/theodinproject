import "./dropdown.css";

export default class Dropdown {
  constructor(selector, dropdownObservable, storage) {
    this.selector = selector;

    this.storage = storage;
    this.dropdownObservable = dropdownObservable;

    this.dropdown = document.querySelector(`.${this.selector}`);
    this.button = this.dropdown.querySelector(".dropdown-button");
    this.dropdownContent = this.dropdown.querySelector(".dropdown-content");
    // this.options = Array.from(this.dropdownContent.children);
    this.options = this.dropdown.querySelectorAll(".dropdown-option");

    this.modes = {
      celcius: "&degC, Metric (km/h)",
      fahrenheit: "&degF, Imperial (mph)",
    };
  }

  optionsEventListeners() {
    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        // e.stopPropagation();

        if (option.dataset.mode !== this.mode) {
          this.mode = option.dataset.mode;
          this.storage.setTempMode(this.mode);
          this.dropdownObservable.changeValues();
        }

        this.button.textContent = option.textContent;
        this.dropdown.classList.remove("active-dropdown");
        this.dropdownContent.classList.remove("active-dropdown-content");
      });
    });
  }

  initializeEventListeners() {
    this.button.addEventListener("click", () => {
      this.dropdown.classList.toggle("active-dropdown");
      this.dropdownContent.classList.toggle("active-dropdown-content");
    });

    this.optionsEventListeners();

    document.addEventListener("click", (e) => {
      if (e.target === this.button || e.target === this.dropdownContent) {
        return;
      }
      this.dropdown.classList.remove("active-dropdown");
      this.dropdownContent.classList.remove("active-dropdown-content");
    });
  }

  init() {
    this.mode = this.storage.getTempMode();

    this.button.innerHTML = this.modes[this.mode];
    this.initializeEventListeners();
  }
}
