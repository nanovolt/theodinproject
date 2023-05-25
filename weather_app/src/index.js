import "./index.css";

import Storage from "./storage";
import Observable from "./observable";

import Dropdown from "./dropdown";
import Search from "./search";
import LastSearched from "./last_searched";
import SearchSuggestions from "./suggestions";
import CurrentWeather from "./current_weather";
import Forecast from "./forecast";
import AjaxRequester from "./ajaxRequester";
import Popup from "./popup";

// disable annoying transition animations on page load
// added no-transition class to <body> in index.html
document.addEventListener(
  "DOMContentLoaded",
  () => {
    document.body.classList.remove("no-transition");
  },
  false
);

const storage = new Storage();
const ajax = new AjaxRequester();

const dropdownObservable = new Observable();
const weatherObservable = new Observable();
const searchObservable = new Observable();

const dropdown = new Dropdown("temp-mode", dropdownObservable, storage);

const currentWeather = new CurrentWeather(storage);
const forecast = new Forecast(storage);

const lastSearched = new LastSearched(storage);
const searchSuggestions = new SearchSuggestions();

dropdownObservable.subscribe(currentWeather);
dropdownObservable.subscribe(forecast);

weatherObservable.subscribe(currentWeather);
weatherObservable.subscribe(forecast);

searchObservable.subscribe(lastSearched);
searchObservable.subscribe(searchSuggestions);

const search = new Search(
  ".search-container",
  ajax,
  searchObservable,
  weatherObservable,
  storage
);

storage.init();
search.init();
lastSearched.init();
searchSuggestions.init();
dropdown.init();
currentWeather.init();
currentWeather.preload();

async function app() {
  try {
    await ajax.requestCityFromIP();

    ajax.requestCurrentWeather(ajax.getCityFromIP()).then(() => {
      currentWeather.update({ current: ajax.getCurrentWeather() });
    });

    ajax.requestWeatherForecast(ajax.getCityFromIP()).then(() => {
      forecast.update({ forecast: ajax.getWeatherForecast() });
    });
  } catch (err) {
    console.log(err);
  }
}

app();

// let arr = [1, 2, 3, 4];
// arr = arr.slice(-3);

// console.log(arr);
