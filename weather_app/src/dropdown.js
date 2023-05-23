import "./dropdown.css";

export default class Dropdown {
  constructor(selector, storage, observable) {
    this.selector = selector;

    this.storage = storage;
    this.observable = observable;

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

  setMode(arg) {
    this.mode = arg;
    this.button.innerHTML = this.modes[this.mode];

    // if (this.observable) {
    //   this.observable.notify(this.mode);
    //   console.log("notified:", this.mode);
    // }
  }

  optionsEventListeners() {
    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        // e.stopPropagation();

        // dependency
        if (this.storage) {
          this.storage.setTempMode(option.className);
        }
        if (this.observable) {
          this.observable.notify(option.className);
        }
        // end dependency

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
    // dependency
    if (this.storage) {
      this.setMode(this.storage.getTempMode());
    }
    // end dependency

    this.initializeEventListeners();
  }
}
