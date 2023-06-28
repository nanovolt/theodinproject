import GameboardFactory from "./gameboard";
import Player from "./player";
import UI from "./ui";

export default function Game(dragAndDropObservable) {
  const ui = UI(dragAndDropObservable);

  const startButton = document.querySelector(".start");
  const restartButton = document.querySelector(".restart");
  const randomizeButton = document.querySelector(".randomize");

  const winMessageElement = document.querySelector(".winMessage");

  let computerBoardElement;

  let playerBoard;
  let computerBoard;

  let player1;
  let player2;

  let gameLoop;

  function removeShip(coordinates) {
    console.log("remove ship at coordinates:", JSON.stringify(coordinates));
    const disabledCells = playerBoard.removeShip(coordinates);

    if (disabledCells === null) {
      return;
    }

    // console.log("d:", disabledCells);
    // ui.removeDisabledCells(playerBoard.removeShip(coordinates));

    ui.removeClasses(coordinates, ["ship"]);
    ui.removeClasses(disabledCells, ["disabled"]);
    ui.addClasses(disabledCells, ["droppable"]);

    // console.log("------------------------------------------------------------");
    // console.log(
    //   "after remove diabled cells:",
    //   JSON.stringify(playerBoard.disabledCells)
    // );
    // console.log(
    //   "after remove placed cells:",
    //   JSON.stringify(playerBoard.placedCells)
    // );
    // console.log("after remove ships:", playerBoard.ships);

    // console.log("ui.removeDisabledCells:", playerBoard.disabledCellsForRemoval);
    // console.log("------------------------------------------------------------");

    // ui.drawDisabledCells(playerBoard.disabledCells);
  }

  function showDisabledSymbols() {
    ui.showDisabledSymbols(playerBoard.disabledCells);
  }

  function hideDisabledSymbols() {
    ui.hideDisabledSymbols(playerBoard.disabledCells);
  }

  function placeShip(coordinates) {
    // console.log("place ship at coordinates:", JSON.stringify(coordinates));
    playerBoard.addShip(coordinates);

    // console.log("diabled cells:", playerBoard.disabledCells.length);
    // console.log("placed cells:", playerBoard.placedCells.length);
    // console.log("ships:", playerBoard.ships);

    // ui.drawShip(coordinates);

    ui.removeClasses(playerBoard.disabledCells, ["droppable"]);
    ui.addClasses(playerBoard.disabledCells, ["disabled"]);

    ui.removeClasses(coordinates, ["droppable"]);
    ui.addClasses(coordinates, ["ship"]);

    // ui.addClasses(coordinates, ["disabled"]);

    // ui.drawDisabledCells(playerBoard.disabledCells);

    // ui.addClasses(playerBoard.disabledCells, ["disabled"]);
    // ui.removeClasses(playerBoard.disabledCells, ["droppable"]);
  }

  function finishGame(message) {
    computerBoardElement.removeEventListener("click", gameLoop);
    winMessageElement.textContent = message;
  }

  gameLoop = (e) => {
    if (!e.target.classList.contains("cell")) {
      return;
    }

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    // console.log("made attacks:", player1.madeAttacks);

    if (player1.findSubArray(player1.madeAttacks, [x, y])) {
      // console.log("adf");
      return;
    }

    player1.attack([x, y]);

    ui.receiveAttack("Computer", [x, y], computerBoard);

    player2.attack();

    // console.log("xy", [x, y]);
    // console.log("made", player2.madeAttacks.at(-1));
    ui.receiveAttack("Player", player2.madeAttacks.at(-1), playerBoard);

    if (playerBoard.allShipsDestroyed) {
      finishGame("Computer wins");
    }

    if (computerBoard.allShipsDestroyed) {
      finishGame("You win!");
    }
  };

  function start() {
    if (playerBoard.ships.length < 5) {
      console.log("playerBoard.ships:", playerBoard.ships.length);
      return;
    }

    ui.clearSymbols();
    ui.createBoard("Computer");

    computerBoard.autoPlaceShips();
    computerBoardElement = document.querySelector(".Computer");

    // console.log("computerBoard.ships:", computerBoard.ships);

    for (const ship of computerBoard.ships) {
      // ui.placeShipsByCoordinates(".Computer", ship.coordinates);
      ui.addClasses(ship.coordinates, ["ship"], true);
    }

    computerBoardElement.addEventListener("click", gameLoop);
    ui.hideUI();
  }

  function initBoardsAndPlayers() {
    playerBoard = GameboardFactory();
    computerBoard = GameboardFactory();

    playerBoard.create();
    computerBoard.create();

    player1 = Player(computerBoard);
    player2 = Player(playerBoard, true);

    ui.createBoard("Player");
  }

  function initShipYard() {
    ui.createShipYard();
    // const shipYardShips = document.querySelectorAll(".shipYard .ship");
    // const a = playerBoard;
    // for (const ship of shipYardShips) {
    //   ship.addEventListener("click", () => {
    //     const coordinates = [];
    //     ui.placeShip(".Player", ship);
    //     for (const shipCell of ship.children) {
    //       coordinates.push([
    //         Number(shipCell.dataset.x),
    //         Number(shipCell.dataset.y),
    //       ]);
    //     }
    //     // console.log("coordinates:", coordinates);
    //     a.placeShip(coordinates);
    //   });
    // }
  }

  function init() {
    initBoardsAndPlayers();
    initShipYard();
  }

  function restart() {
    winMessageElement.textContent = "";
    ui.clear();
    ui.showUI();
    init();
  }

  function randomize() {
    // ui.hideShipYard();
    ui.clearCells();

    playerBoard.clear();
    playerBoard.autoPlaceShips();
    // console.log("playerBoard.ships:", playerBoard.ships);

    ui.removeClasses(playerBoard.disabledCells, ["droppable"]);
    ui.addClasses(playerBoard.disabledCells, ["disabled"]);

    for (const ship of playerBoard.ships) {
      // ui.placeShipsByCoordinates(".Player", ship.coordinates);
      ui.addClasses(ship.coordinates, ["ship"]);
      ui.removeClasses(ship.coordinates, ["droppable"]);

      // console.log(
      //   // ship,
      //   // ship.ship.getLength(),
      //   ship.coordinates
      //   // playerBoard.ships.indexOf(ship)
      // );

      ui.dropShip(ship.coordinates, playerBoard, ship);
    }
  }

  function initButtons() {
    startButton.addEventListener("click", start);
    restartButton.addEventListener("click", restart);
    randomizeButton.addEventListener("click", randomize);
    init();
  }

  function gamePlayerVSComputer() {}

  return {
    gamePlayerVSComputer,
    initButtons,
    placeShip,
    removeShip,
    showDisabledSymbols,
    hideDisabledSymbols,
  };
}
