import "./forecast.css";

export default class Forecast {
  constructor(storage) {
    this.storage = storage;
    this.forecastContainer = document.querySelector(".forecast-container");
    this.days = document.querySelectorAll(".day");
    this.dates = document.querySelectorAll(".f-date");
    this.avgtemps = document.querySelectorAll(".avg-temp");
    this.fConditions = document.querySelectorAll(".f-condition");
    this.fConditionImages = document.querySelectorAll(".f-condition-image");
    this.rainChances = document.querySelectorAll(".rain-chance");
    this.snowChances = document.querySelectorAll(".snow-chance");

    this.preloadIcon = `<i class="fa-solid fa-spinner fa-spin"></i>`;
  }

  init() {
    this.mode = this.storage.getTempMode();
    this.changeMode();
  }

  showCelciusOrFahrenheit(mode, el, temp, unit) {
    if (mode === "celcius") {
    } else {
      this.temp.textContent = this.json.current.temp_f;
      this.tempFeelslike.textContent = this.json.current.feelslike_f;
      this.visibility.textContent = this.json.current.vis_miles;
      this.windSpeed.textContent = this.json.current.wind_mph;
    }
  }

  changeMode() {
    this.mode = this.storage.getTempMode();
  }

  changeValues() {
    this.mode = this.storage.getTempMode();
  }

  update(obj) {
    if ("weatherForecastAjax" in obj) {
      this.ajax = obj.weatherForecastAjax;
    }
  }

  preload() {}

  getNotified(arg) {
    this.showCelciusOrFahrenheit(arg);
  }
}
