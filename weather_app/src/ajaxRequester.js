import key from "./key";

export default class AjaxRequester {
  constructor() {
    this.url = "https://api.weatherapi.com/v1/";
    this.key = `?key=${key}`;
  }

  async wait() {
    console.log("waiting...");
    setTimeout(() => {
      console.log("wait");
      return "finished waiting";
    }, 10000);
  }

  async requestCityFromIP() {
    const method = "ip.json";
    const query = `&q=auto:ip`;

    try {
      const response = await fetch(`${this.url}${method}${this.key}${query}`);
      const json = await response.json();
      this.cityFromIP = json.city;
    } catch (err) {
      console.log("could not get ip address");
    }
  }

  async requestCurrentWeather(q) {
    const method = "current.json";
    const query = `&q=${q}`;
    const airQuality = `&aqi=yes`;

    try {
      const response = await fetch(
        ` ${this.url}${method}${this.key}${query}${airQuality}`
      );
      const json = await response.json();
      this.currentWeather = json;
    } catch (error) {
      console.log(`did not find current for: ${q}`);
    }
  }

  async requestWeatherForecast(q) {
    const method = "forecast.json";
    const query = `&q=${q}`;
    const days = "&days=3";

    try {
      const response = await fetch(
        `${this.url}${method}${this.key}${query}${days}`
      );
      const json = await response.json();
      this.weatherForecast = json;

      // this.weatherForecast.forecast.forecastday.forEach((f, index) => {
      //   this.dates[index].textContent = f.date;

      //   // console.log(f.date);
      //   // console.log(this.dates[index]);
      // });
    } catch (error) {
      console.log(`did not find forecast for: ${q}`);
    }
  }

  async requestSearchSuggestions(q) {
    const method = "search.json";
    const query = `&q=${q}`;

    try {
      const response = await fetch(`${this.url}${method}${this.key}${query}`);
      this.searchSuggestions = await response.json();
    } catch (err) {
      console.log(`did not find search suggestions for: ${q}`);
    }
  }

  getCityFromIP() {
    return this.cityFromIP;
  }

  getCurrentWeather() {
    return this.currentWeather;
  }

  getWeatherForecast() {
    return this.weatherForecast;
  }

  getSearchSuggestions() {
    return this.searchSuggestions;
  }
}
