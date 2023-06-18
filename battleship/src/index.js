import ShipFactory from "./app/ship";
import GameboardFactory from "./app/gameboard";

import "./main.scss";
import "./assets/fonts/fa.css";

console.log("index.js");

const ship1 = ShipFactory(1);
console.log("ship1:", ship1);

const board = GameboardFactory();
board.create();
