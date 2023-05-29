/* eslint-disable no-param-reassign */
import "./forecast.css";
import format from "date-fns/format";
import { parseISO } from "date-fns/esm";

export default class Forecast {
  constructor(storage) {
    this.storage = storage;
    this.forecastContainer = document.querySelector(".forecast-container");
    this.items = this.forecastContainer.querySelectorAll(".forecast-item");
    this.dates = this.forecastContainer.querySelectorAll(".date");

    this.cf = this.forecastContainer.querySelectorAll(".c-f");

    this.avgTemps = this.forecastContainer.querySelectorAll(".avg-temp");

    this.fConditions = this.forecastContainer.querySelectorAll(".f-condition");

    this.conditionImageWrappers = this.forecastContainer.querySelectorAll(
      ".condition-image-wrapper"
    );

    this.fConditionImages =
      this.forecastContainer.querySelectorAll(".condition-image");

    this.rainChances = this.forecastContainer.querySelectorAll(".rain-chance");
    this.snowChances = this.forecastContainer.querySelectorAll(".snow-chance");

    this.maxTemps = this.forecastContainer.querySelectorAll(".max-temp");
    this.minTemps = this.forecastContainer.querySelectorAll(".min-temp");

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
    } else {
      for (const el of this.cf) {
        el.innerHTML = "&degF";
      }
    }
  }

  changeValues() {
    this.changeMode();

    if (this.ajax) {
      this.days.forEach((day, i) => {
        this.signs = this.items[i].querySelectorAll(".sign");

        let avgTemp = null;
        let maxTemp = null;
        let minTemp = null;

        if (this.mode === "celcius") {
          avgTemp = day.day.avgtemp_c;
          maxTemp = day.day.maxtemp_c;
          minTemp = day.day.mintemp_c;
        } else {
          avgTemp = day.day.avgtemp_f;
          maxTemp = day.day.maxtemp_f;
          minTemp = day.day.mintemp_f;
        }

        if (avgTemp > 0) {
          this.signs[0].textContent = "+";
        } else if (avgTemp < 0) {
          this.signs[0].textContent = "-";
        } else {
          this.signs[0].textContent = "";
        }

        if (maxTemp > 0) {
          this.signs[1].textContent = "+";
        } else if (maxTemp < 0) {
          this.signs[1].textContent = "-";
        } else {
          this.signs[1].textContent = "";
        }

        if (minTemp > 0) {
          this.signs[2].textContent = "+";
        } else if (minTemp < 0) {
          this.signs[2].textContent = "-";
        } else {
          this.signs[2].textContent = "";
        }

        this.avgTemps[i].textContent = avgTemp;
        this.maxTemps[i].textContent = maxTemp;
        this.minTemps[i].textContent = minTemp;
      });
    }
  }

  update(obj) {
    if ("weatherForecastAjax" in obj) {
      this.ajax = obj.weatherForecastAjax;
      this.days = this.ajax.forecast.forecastday;

      this.changeValues();

      this.days.forEach((day, i) => {
        const formattedDate = format(parseISO(day.date), "d MMM");

        this.dates[i].textContent = formattedDate;
        this.fConditions[i].textContent = day.day.condition.text;

        this.conditionImageWrappers[i].innerHTML = "";
        this.conditionImageWrappers[i].appendChild(this.fConditionImages[i]);
        this.fConditionImages[i].src = day.day.condition.icon;

        this.rainChances[i].textContent = day.day.daily_chance_of_rain;
        this.snowChances[i].textContent = day.day.daily_chance_of_snow;
      });
    }
  }

  preload() {
    this.items.forEach((item, i) => {
      this.dates[i].innerHTML = this.preloadIcon;
      this.avgTemps[i].innerHTML = this.preloadIcon;
      this.fConditions[i].innerHTML = this.preloadIcon;

      this.conditionImageWrappers[i].innerHTML = this.preloadIcon;

      this.rainChances[i].innerHTML = this.preloadIcon;
      this.snowChances[i].innerHTML = this.preloadIcon;

      this.maxTemps[i].innerHTML = this.preloadIcon;
      this.minTemps[i].innerHTML = this.preloadIcon;
    });

    // this.dates.forEach((date) => {
    //   date.innerHTML = this.preloadIcon;
    // });

    // this.avgTemps.forEach((avgTtemp) => {
    //   avgTtemp.innerHTML = this.preloadIcon;
    // });

    // this.fConditions.forEach((condition) => {
    //   condition.innerHTML = this.preloadIcon;
    // });

    // this.conditionImageWrappers.forEach((wrapper) => {
    //   wrapper.innerHTML = this.preloadIcon;
    // });

    // this.fConditions.forEach((condition) => {
    //   condition.innerHTML = this.preloadIcon;
    // });

    // this.dates.forEach((date) => {
    //   date.innerHTML = this.preloadIcon;
    // });

    // this.dates.forEach((date) => {
    //   date.innerHTML = this.preloadIcon;
    // });
    // this.fConditions[i].innerHTML = day.day.condition.text;
    // this.fConditionImages[i].src = day.day.condition.icon;
    // this.rainChances[i].textContent = day.day.daily_chance_of_rain;
    // this.snowChances[i].textContent = day.day.daily_chance_of_snow;
  }

  getNotified(arg) {
    this.showCelciusOrFahrenheit(arg);
  }
}
