import "./current_weather.css";

export default class CurrentWeather {
  constructor(storage) {
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

    this.preloadIcon = `<i class="fa-solid fa-spinner fa-spin"></i>`;
  }

  init() {
    this.mode = this.storage.getTempMode();
    this.changeMode();
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
    let temp = null;
    let feelslike = null;
    let visibility = null;
    let wind = null;

    this.changeMode();

    if (this.mode === "celcius") {
      temp = this.ajax.current.temp_c;
      feelslike = this.ajax.current.feelslike_c;
      visibility = this.ajax.current.vis_km;
      wind = this.ajax.current.wind_kph;
    } else {
      temp = this.ajax.current.temp_f;
      feelslike = this.ajax.current.feelslike_f;
      visibility = this.ajax.current.vis_miles;
      wind = this.ajax.current.wind_mph;
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

  preload() {
    this.city.innerHTML = this.preloadIcon;
    this.country.innerHTML = this.preloadIcon;
    this.condition.innerHTML = this.preloadIcon;
    this.conditionImage.innerHTML = this.preloadIcon;

    this.temp.innerHTML = this.preloadIcon;
    this.tempFeelslike.innerHTML = this.preloadIcon;
    this.visibility.innerHTML = this.preloadIcon;
    this.windSpeed.innerHTML = this.preloadIcon;

    this.cloud.innerHTML = this.preloadIcon;
    this.humidity.innerHTML = this.preloadIcon;
    this.uv.innerHTML = this.preloadIcon;
    this.windDirection.innerHTML = this.preloadIcon;

    this.co.innerHTML = this.preloadIcon;
    this.no2.innerHTML = this.preloadIcon;
    this.o3.innerHTML = this.preloadIcon;
    this.pm10.innerHTML = this.preloadIcon;
    this.pm2_5.innerHTML = this.preloadIcon;
    this.so2.innerHTML = this.preloadIcon;
  }

  getCurrent() {
    return this.current;
  }

  update(obj) {
    if ("currentWeatherAjax" in obj) {
      this.ajax = obj.currentWeatherAjax;

      this.city.textContent = this.ajax.location.name;
      this.country.textContent = this.ajax.location.country;
      this.condition.textContent = this.ajax.current.condition.text;
      this.conditionImage.src = this.ajax.current.condition.icon;

      this.changeValues();

      this.cloud.textContent = this.ajax.current.cloud;
      this.humidity.textContent = this.ajax.current.humidity;
      this.uv.textContent = this.ajax.current.uv;
      this.windDirection.textContent = this.ajax.current.wind_dir;

      this.co.textContent = this.ajax.current.air_quality.co.toFixed(2);
      this.no2.textContent = this.ajax.current.air_quality.no2.toFixed(2);
      this.o3.textContent = this.ajax.current.air_quality.o3.toFixed(2);
      this.pm10.textContent = this.ajax.current.air_quality.pm10.toFixed(2);
      this.pm2_5.textContent = this.ajax.current.air_quality.pm2_5.toFixed(2);
      this.so2.textContent = this.ajax.current.air_quality.so2.toFixed(2);
    }
  }
}
