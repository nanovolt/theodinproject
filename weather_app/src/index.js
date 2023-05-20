import "./index.css";

import Storage from "./storage";
import Observable from "./observable";

import Dropdown from "./dropdown";
import Search from "./search";
import CurrentWeather from "./current_weather";

const defaultCity = "Almaty";

const storage = new Storage();
const observable = new Observable();

const tempModeDropdown = new Dropdown("temp-mode", storage, observable);
const currentWeather = new CurrentWeather(storage);
const search = new Search(observable, currentWeather);

observable.subscribe(currentWeather);

storage.init();
search.init();
tempModeDropdown.init();

// tempModeDropdown.setMode(storage.getTempMode());

currentWeather.updateCurrentWeather(defaultCity);
