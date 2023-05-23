import "./index.css";

import Storage from "./storage";
import Observable from "./observable";

import Dropdown from "./dropdown";
import Search from "./search";
import CurrentWeather from "./current_weather";
import IPLookup from "./ip";

import displayPopup from "./error_popup";
import Forecast from "./forecast";

const storage = new Storage();
const observable = new Observable();

const tempModeDropdown = new Dropdown("temp-mode", storage, observable);
const currentWeather = new CurrentWeather(storage, displayPopup);
const search = new Search(storage, observable, currentWeather);
const ip = new IPLookup();
const forecast = new Forecast(storage);

observable.subscribe(currentWeather);
observable.subscribe(forecast);

storage.init();
search.init();
tempModeDropdown.init();
tempModeDropdown.setMode(storage.getTempMode());

// ip.requestIP()
//   .then(() => {
//     currentWeather.updateCurrentWeather(ip.getCity());
//   })
//   .catch((err) => {});

async function requestAPI() {
  try {
    await ip.requestIP();
    await currentWeather.updateCurrentWeather(ip.getCity());
    await forecast.updateForecast(ip.getCity());
  } catch (err) {
    console.log(err);
  }
}

requestAPI();
