import "./current_weather.css";

export default class CurrentWeather {
  constructor(storage, displayPopup) {
    this.key = "7af186cb5b0740ea9b182108231405";
    this.storage = storage;
    this.signs = document.querySelectorAll(".sign");
    this.city = document.querySelector(".city");
    this.country = document.querySelector(".country");
    this.temp = document.querySelector(".temp");
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
    this.displayPopup = displayPopup;
  }

  showCelciusOrFahrenheit(mode) {
    if (mode === "celcius") {
      this.temp.textContent = this.json.current.temp_c;
      this.tempFeelslike.textContent = this.json.current.feelslike_c;
      this.visibility.textContent = this.json.current.vis_km;
      this.windSpeed.textContent = this.json.current.wind_kph;

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
      this.temp.textContent = this.json.current.temp_f;
      this.tempFeelslike.textContent = this.json.current.feelslike_f;
      this.visibility.textContent = this.json.current.vis_miles;
      this.windSpeed.textContent = this.json.current.wind_mph;
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

  async updateCurrentWeather(q) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${q}`
      );
      const json = await response.json();
      this.json = json;

      this.city.textContent = json.location.name;
      this.country.textContent = json.location.country;
      this.condition.textContent = json.current.condition.text;
      this.conditionImage.src = json.current.condition.icon;

      if (json.current.temp_c > 0 || json.current.temp_f > 0) {
        for (const sign of this.signs) {
          sign.textContent = "+";
        }
      } else if (json.current.temp_c < 0 || json.current.temp_f < 0) {
        for (const sign of this.signs) {
          sign.textContent = "+";
        }
      } else {
        for (const sign of this.signs) {
          sign.textContent = "+";
        }
      }

      this.mode = this.storage.getTempMode();

      this.cloud.textContent = json.current.cloud;
      this.humidity.textContent = json.current.humidity;
      this.uv.textContent = json.current.uv;
      this.windDirection.textContent = json.current.wind_dir;

      this.showCelciusOrFahrenheit(this.mode);
    } catch (error) {
      console.log(error);
      this.displayPopup(q, "not found");
    }
  }

  getNotified(arg) {
    // this.updateCurrentWeather(arg);
    this.showCelciusOrFahrenheit(arg);
  }
}
