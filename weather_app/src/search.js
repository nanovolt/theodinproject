import "./search.css";

export default class Search {
  constructor() {
    this.cityForm = document.querySelector("#city-form");
    this.cityInput = document.querySelector("#city-input");
  }

  init() {
    this.cityForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formdata = new FormData(this.cityForm);
      const cityName = formdata.get("city");
      // currentWeather.updateCurrentWeather(cityName);
      this.cityInput.value = "";
    });

    this.cityForm.addEventListener("click", () => {
      this.cityInput.focus();
    });
  }
}
