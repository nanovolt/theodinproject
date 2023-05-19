import "./index.css";

import Storage from "./storage";
import Observable from "./observable";

import Dropdown from "./dropdown";
import Search from "./search";
import CurrentWeather from "./current_weather";

const defaultCity = "Almaty";

const storage = new Storage();
const observable = new Observable();

const tempModeDropdown = new Dropdown("temp-mode", observable);
const search = new Search();
const currentWeather = new CurrentWeather(observable, storage);

storage.init();
search.init();
tempModeDropdown.init();

observable.subscribe(storage);
observable.subscribe(currentWeather);

tempModeDropdown.setMode(storage.getTempMode());

currentWeather.updateCurrentWeather(defaultCity);
