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
    console.log("show");
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

    if (this.mode === "celcius") {
      for (const el of this.cf) {
        el.innerHTML = "&degC";
      }
      for (const s of this.speed) {
        s.textContent = "km/h";
      }
      for (const d of this.distance) {
        d.textContent = "km";
      }
    } else {
      for (const el of this.cf) {
        el.innerHTML = "&degF";
      }
      for (const s of this.speed) {
        s.textContent = "mph";
      }
      for (const d of this.distance) {
        d.textContent = "mi";
      }
    }
  }

  changeValues() {
    console.log("forecast change");
  }

  update(obj) {
    if ("weatherForecastAjax" in obj) {
      this.ajax = obj.weatherForecastAjax;

      console.log("forecast ajax:", this.ajax);
    }
  }

  preload() {}

  getNotified(arg) {
    this.showCelciusOrFahrenheit(arg);
  }
}
