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

const search = new Search(
  ".search-container",
  ajax,
  searchObservable,
  weatherObservable,
  storage
);

const lastSearched = new LastSearched(search, weatherObservable, storage);
const searchSuggestions = new SearchSuggestions(search);

storage.init();
search.init();
lastSearched.init();
searchSuggestions.init();
dropdown.init();
currentWeather.init();

dropdownObservable.subscribe(currentWeather);
dropdownObservable.subscribe(forecast);

weatherObservable.subscribe(currentWeather);
weatherObservable.subscribe(forecast);

searchObservable.subscribe(lastSearched);
searchObservable.subscribe(searchSuggestions);

async function app() {
  try {
    currentWeather.preload();
    await ajax.requestCityFromIP();
    storage.setIpLookup(ajax.getIpLookup());

    await ajax.requestCurrentWeather(ajax.getCityFromIP());

    currentWeather.update({ currentWeatherAjax: ajax.getCurrentWeather() });

    // ajax.requestWeatherForecast(ajax.getCityFromIP()).then(() => {
    //   forecast.update({ forecast: ajax.getWeatherForecast() });
    // });
  } catch (error) {
    console.log(error);
    Popup(error);
  }
}

app();
