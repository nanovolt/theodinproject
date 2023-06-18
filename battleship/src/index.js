import GameboardFactory from "./app/gameboard";
import Player from "./app/player";

import "./main.scss";
import "./assets/fonts/fa.css";

const playerBoard = GameboardFactory();
playerBoard.create();

const computerBoard = GameboardFactory();
computerBoard.create();

const player1 = Player(computerBoard);
const computer = Player(playerBoard, true);

playerBoard.placeShip([
  [1, 1],
  [1, 2],
]);

playerBoard.placeShip([
  [5, 9],
  [5, 10],
]);

playerBoard.placeShip([
  [2, 4],
  [3, 4],
  [4, 4],
]);
playerBoard.placeShip([
  [4, 2],
  [5, 2],
  [6, 2],
]);
playerBoard.placeShip([
  [9, 3],
  [9, 4],
  [9, 5],
  [9, 6],
]);
playerBoard.placeShip([
  [3, 7],
  [4, 7],
  [5, 7],
  [6, 7],
  [7, 7],
]);

// computerBoard.placeShip([
//   [1, 1],
//   [2, 1],
// ]);
// computerBoard.placeShip([
//   [4, 3],
//   [5, 3],
// ]);
// computerBoard.placeShip([
//   [2, 4],
//   [2, 5],
//   [2, 6],
// ]);
// computerBoard.placeShip([
//   [4, 5],
//   [4, 6],
//   [4, 7],
//   [4, 8],
// ]);
// computerBoard.placeShip([
//   [7, 3],
//   [7, 4],
//   [7, 5],
//   [7, 6],
//   [7, 7],
// ]);

playerBoard.drawBoard("player");
// computerBoard.drawBoard("computer");

// player1.attack([4, 3]);
// computerBoard.drawBoard("computer");
// console.log("allShipsDestroyed:", computerBoard.allShipsDestroyed);

// player1.attack([5, 3]);
// computerBoard.drawBoard("computer");
// console.log("allShipsDestroyed:", computerBoard.allShipsDestroyed);

// console.log("if", !computerBoard.allShipsDestroyed);

// computer.attack();
// playerBoard.drawBoard("player");
// console.log("allShipsDestroyed:", playerBoard.allShipsDestroyed);

while (!playerBoard.allShipsDestroyed && !computerBoard.allShipsDestroyed) {
  computer.attack();

  // player1.attack([4, 3]);
  // playerBoard.drawBoard("computer");
  // console.log("allShipsDestroyed:", computerBoard.allShipsDestroyed);

  // player1.attack([5, 3]);
  // computerBoard.drawBoard("computer");
  // console.log("allShipsDestroyed:", playerBoard.allShipsDestroyed);
}
playerBoard.drawBoard("player");
console.log("allShipsDestroyed:", playerBoard.allShipsDestroyed);
console.log("hitShots:", playerBoard.hitShots);
console.log("missedShots:", playerBoard.missedShots);

const accuracy = (
  (playerBoard.hitShots.length /
    (playerBoard.missedShots.length + playerBoard.hitShots.length)) *
  100
).toFixed(2);
console.log(`computer's accuracy: ${accuracy} %`);
