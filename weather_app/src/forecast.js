import "./forecast.css";
import key from "./key";

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

  async updateForecast(q) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${q}&days=3`
      );
      const json = await response.json();
      this.json = json;

      // console.log(this.json.forecast);
      this.json.forecast.forecastday.forEach((f, index) => {
        this.dates[index].textContent = f.date;

        // console.log(f.date);
        // console.log(this.dates[index]);
      });
    } catch (error) {
      console.log(error);
    }
  }

  getNotified(arg) {
    this.showCelciusOrFahrenheit(arg);
  }
}
