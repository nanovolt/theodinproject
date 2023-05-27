import key from "./key";

export default class AjaxRequester {
  constructor() {
    this.url = "https://api.weatherapi.com/v1/";
    this.key = `?key=${key}`;

    this.time = null;
  }

  OLDdebounce(func, ms) {
    this.timeout = null;
    return (...arg) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => func.apply(this, arg), ms);
    };
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

      // this.weatherForecast.forecast.forecastday.forEach((f, index) => {
      //   this.dates[index].textContent = f.date;

      //   // console.log(f.date);
      //   // console.log(this.dates[index]);
      // });
    } catch (error) {
      throw Error(`did not find forecast for: ${q}`);
    }
  }

  sayHi() {
    console.log("hi");
  }

  async debounce(arg) {
    clearTimeout(this.time);
    return new Promise((resolve) => {
      this.time = setTimeout(async () => {
        // insert an async function you want to debouce
        await this.requestSearchSuggestions(arg);
        console.log("timer");
        resolve(this.getSearchSuggestions());
      }, 1000);
    });
  }

  async wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.sayHi();
        resolve("resolved");
      }, ms);
    });
  }

  initDebouce() {
    // this.sayHiDebouce = this.debounce(this.sayHi, 1000);

    this.deboundFunction = this.debounce((inputValue) => {
      console.log("debounce:", inputValue);
      this.requestSearchSuggestions(inputValue);
      // this.search(inputValue).then(() => {
      //   if (this.json.length === 0) {
      //     this.noSuggestions();
      //     // this.lastUsed.style.display = "none";
      //   } else {
      //     this.showSuggestions();
      //   }
      // });
      // else {
      //   this.suggestionList.replaceChildren();
      //   this.searchSuggestions.style.display = "none";
      // }
    }, 1000);
  }

  async requestSearchSuggestions(q) {
    // this.deboundFunction(q);

    const method = "search.json";
    const query = `&q=${q}`;

    try {
      const response = await fetch(`${this.url}${method}${this.key}${query}`, {
        method: "GET",
      });

      if (response.ok) {
        const json = await response.json();
        this.searchSuggestions = json;

        console.log(this.searchSuggestions);
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
