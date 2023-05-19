import "./current_weather.css";

export default class CurrentWeather {
  constructor(observable, storage) {
    this.key = "7af186cb5b0740ea9b182108231405";
    this.storage = storage;
    this.observable = observable;
    this.signs = document.querySelectorAll(".sign");
    this.city = document.querySelector(".city");
    this.country = document.querySelector(".country");
    this.temp = document.querySelector(".temp");
    this.tempFeelslike = document.querySelector(".temp-feelslike");
    this.cf = document.querySelectorAll(".c-f");
    this.condition = document.querySelector(".condition");
    this.conditionImage = document.querySelector(".condition-image");
  }

  async updateCurrentWeather(q) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${q}`
      );
      const json = await response.json();
      console.log(json);
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

      if (this.storage.getTempMode() === "celcius") {
        this.temp.textContent = json.current.temp_c;
        this.tempFeelslike.textContent = json.current.feelslike_c;

        for (const el of this.cf) {
          el.innerHTML = "&degC";
        }
      } else {
        this.temp.textContent = json.current.temp_f;
        this.tempFeelslike.textContent = json.current.feelslike_f;
        for (const el of this.cf) {
          el.innerHTML = "&degF";
        }
      }

      document.querySelector(".humidity").textContent = json.current.humidity;
    } catch (error) {
      console.log(error);
    }
  }

  getNotified(arg) {
    console.log("got notified:", arg);
  }
}
