import "./current_weather.css";
import key from "./key";

export default class CurrentWeather {
  constructor(storage, displayPopup) {
    this.storage = storage;
    this.city = document.querySelector(".city");
    this.country = document.querySelector(".country");
    this.tempSign = document.querySelector(".temp-sign");
    this.temp = document.querySelector(".temp");
    this.tempFeelslikeSign = document.querySelector(".temp-feelslike-sign");

    this.tempFeelslike = document.querySelector(".temp-feelslike");
    this.cf = document.querySelectorAll(".c-f");
    this.condition = document.querySelector(".condition");
    this.conditionImage = document.querySelector(".condition-image");
    this.cloud = document.querySelector(".cloud");
    this.humidity = document.querySelector(".humidity");
    this.uv = document.querySelector(".uv");
    this.visibility = document.querySelector(".visibility");
    this.windDirection = document.querySelector(".wind-direction");
    this.windSpeed = document.querySelector(".wind-speed");
    this.speed = document.querySelectorAll(".speed");
    this.distance = document.querySelectorAll(".distance");

    this.co = document.querySelector(".co");
    this.no2 = document.querySelector(".no2");
    this.o3 = document.querySelector(".o3");
    this.pm10 = document.querySelector(".pm10");
    this.pm2_5 = document.querySelector(".pm2-5");
    this.so2 = document.querySelector(".so2");

    this.displayPopup = displayPopup;

    this.trimAll = document.querySelectorAll(".trim");

    // for (const el of this.trimAll) {
    // el.textContent.trim().replace(/^(&nbsp;|\s)*/, "");
    // el.textContent.replace(/&nbsp;/, "");
    // el.textContent.replace(/[\n\r]+|[\s]{2,}/g, "").trim();
    // el.textContent.replace(/[\n]/g, "");
    // el.textContent.replace(/>\s+</g, "><");
    // el.textContent.replace(/\s+/g, " ").trim();
    // el.textContent.trim();
    // console.log(el);
    // }
    // this.trimAll.forEach((el) => {
    //   console.log(el.textContent);
    // });
  }

  showCelciusOrFahrenheit(mode) {
    let temp = null;
    let feelslike = null;
    let visibility = null;
    let wind = null;

    if (mode === "celcius") {
      temp = this.json.current.temp_c;
      feelslike = this.json.current.feelslike_c;
      visibility = this.json.current.vis_km;
      wind = this.json.current.wind_kph;

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
      temp = this.json.current.temp_f;
      feelslike = this.json.current.feelslike_f;
      visibility = this.json.current.vis_miles;
      wind = this.json.current.wind_mph;

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

    if (temp > 0) {
      this.tempSign.textContent = "+";
    } else if (temp < 0) {
      this.tempSign.textContent = "-";
    } else {
      this.tempSign.textContent = "";
    }

    if (feelslike > 0) {
      this.tempFeelslikeSign.textContent = "+";
    } else if (feelslike < 0) {
      this.tempFeelslikeSign.textContent = "-";
    } else {
      this.tempFeelslikeSign.textContent = "";
    }

    this.temp.textContent = temp;
    this.tempFeelslike.textContent = feelslike;
    this.visibility.textContent = visibility;
    this.windSpeed.textContent = wind;
  }

  async updateCurrentWeather(q) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${q}&aqi=yes`
      );
      const json = await response.json();
      this.json = json;

      this.city.textContent = json.location.name;
      this.country.textContent = json.location.country;
      this.condition.textContent = json.current.condition.text;
      this.conditionImage.src = json.current.condition.icon;

      this.mode = this.storage.getTempMode();
      this.showCelciusOrFahrenheit(this.mode);

      this.cloud.textContent = json.current.cloud;
      this.humidity.textContent = json.current.humidity;
      this.uv.textContent = json.current.uv;
      this.windDirection.textContent = json.current.wind_dir;

      this.co.textContent = json.current.air_quality.co.toFixed(2);
      this.no2.textContent = json.current.air_quality.no2.toFixed(2);
      this.o3.textContent = json.current.air_quality.o3.toFixed(2);
      this.pm10.textContent = json.current.air_quality.pm10.toFixed(2);
      this.pm2_5.textContent = json.current.air_quality.pm2_5.toFixed(2);
      this.so2.textContent = json.current.air_quality.so2.toFixed(2);
    } catch (error) {
      // console.log(error);
      this.displayPopup(q, "not found");
    }

    return this.json.location;
  }

  getNotified(arg) {
    // this.updateCurrentWeather(arg);
    this.showCelciusOrFahrenheit(arg);
  }
}
