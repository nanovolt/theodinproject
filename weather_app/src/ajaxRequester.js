import key from "./key";

export default class AjaxRequester {
  constructor() {
    this.url = "https://api.weatherapi.com/v1/";
    this.key = `?key=${key}`;

    this.time = null;
  }

  async requestCityFromIP() {
    const method = "ip.json";
    const query = `&q=auto:ip`;

    try {
      const response = await fetch(`${this.url}${method}${this.key}${query}`, {
        method: "GET",
      });

      if (response.ok) {
        this.json = await response.json();
        this.cityFromIP = this.json.city;
      } else {
        throw Error();
      }
    } catch (err) {
      // console.log("could not get ip address");
      throw Error("could not get ip address");
    }
  }

  getIpLookup() {
    return this.json;
  }

  async requestCurrentWeather(q) {
    const method = "current.json";
    const query = `&q=${q}`;
    const airQuality = `&aqi=yes`;

    try {
      const response = await fetch(
        ` ${this.url}${method}${this.key}${query}${airQuality}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const json = await response.json();
        this.currentWeather = json;
      } else {
        throw Error();
      }
    } catch (error) {
      throw Error(`did not find current weather for "${q}"`);
    }
  }

  async requestWeatherForecast(q) {
    const method = "forecast.json";
    const query = `&q=${q}`;
    const days = "&days=3";

    try {
      const response = await fetch(
        `${this.url}${method}${this.key}${query}${days}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const json = await response.json();
        this.weatherForecast = json;
      } else {
        throw Error();
      }
    } catch (error) {
      throw Error(`did not find forecast for: ${q}`);
    }
  }

  OLDdebounce(func, ms) {
    this.timeout = null;
    return (...arg) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => func.apply(this, arg), ms);
    };
  }

  async debounce() {
    clearTimeout(this.time);
    return new Promise((resolve) => {
      this.time = setTimeout(async () => {
        // insert an async function you want to debouce
        resolve();
        // try {
        //   await this.requestSearchSuggestions(arg);
        //   // await func(arg);
        // } catch (error) {
        //   console.log(error);
        // } finally {
        //   resolve(this.getSearchSuggestions());
        // }
      }, 200);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, ms);
    });
  }

  async requestSearchSuggestions(q) {
    const method = "search.json";
    const query = `&q=${q}`;

    try {
      const response = await fetch(`${this.url}${method}${this.key}${query}`, {
        method: "GET",
      });

      if (response.ok) {
        const json = await response.json();
        this.searchSuggestions = json;
      } else {
        throw Error();
      }
    } catch (err) {
      throw Error(`did not find search suggestions for: ${q}`);
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
