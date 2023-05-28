import "./current_weather.css";

export default class CurrentWeather {
  constructor(storage) {
    this.storage = storage;

    this.weatherContainer = document.querySelector(".weather-container");

    this.city = this.weatherContainer.querySelector(".city");
    this.country = this.weatherContainer.querySelector(".country");
    this.lastUpdated = this.weatherContainer.querySelector(".last-updated");

    this.tempSign = this.weatherContainer.querySelector(".temp-sign");
    this.temp = this.weatherContainer.querySelector(".temp");
    this.tempFeelslikeSign = this.weatherContainer.querySelector(
      ".temp-feelslike-sign"
    );

    this.tempFeelslike = this.weatherContainer.querySelector(".temp-feelslike");
    this.cf = this.weatherContainer.querySelectorAll(".c-f");
    this.condition = this.weatherContainer.querySelector(".condition");
    this.conditionImage =
      this.weatherContainer.querySelector(".condition-image");
    this.conditionImageWrapper = this.weatherContainer.querySelector(
      ".condition-image-wrapper"
    );

    this.cloud = this.weatherContainer.querySelector(".cloud");
    this.humidity = this.weatherContainer.querySelector(".humidity");
    this.uv = this.weatherContainer.querySelector(".uv");
    this.visibility = this.weatherContainer.querySelector(".visibility");
    this.windDirection = this.weatherContainer.querySelector(".wind-direction");
    this.windSpeed = this.weatherContainer.querySelector(".wind-speed");
    this.speed = this.weatherContainer.querySelectorAll(".speed");
    this.distance = this.weatherContainer.querySelectorAll(".distance");

    this.co = this.weatherContainer.querySelector(".co");
    this.no2 = this.weatherContainer.querySelector(".no2");
    this.o3 = this.weatherContainer.querySelector(".o3");
    this.pm10 = this.weatherContainer.querySelector(".pm10");
    this.pm2_5 = this.weatherContainer.querySelector(".pm2-5");
    this.so2 = this.weatherContainer.querySelector(".so2");

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

    if (this.ajax) {
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
    this.lastUpdated.innerHTML = this.preloadIcon;

    this.condition.innerHTML = this.preloadIcon;
    this.conditionImageWrapper.innerHTML = this.preloadIcon;

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
      this.lastUpdated.textContent = this.ajax.current.last_updated;

      this.conditionImageWrapper.innerHTML = "";
      this.conditionImageWrapper.appendChild(this.conditionImage);
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
