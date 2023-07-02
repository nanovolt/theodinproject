import GameboardFactory from "./gameboard";
import Player from "./player";
import UI from "./ui";
import DragAndDrop from "./drag_and_drop";

export default function Game(dragAndDropObservable) {
  const ui = UI();

  let playerBoard;
  let computerBoard;

  let player1;
  let player2;

  let gameLoop;

  let draggableShips = [];

  function removeShip(coordinates) {
    const disabledCells = playerBoard.removeShip(coordinates);

    if (disabledCells === null) {
      return;
    }

    ui.removeClasses(coordinates, ["ship"]);
    ui.removeClasses(disabledCells, ["disabled"]);
    ui.addClasses(disabledCells, ["droppable"]);
  }

  function showDisabledSymbols() {
    ui.showDisabledSymbols(playerBoard.disabledCells);
  }

  function hideDisabledSymbols() {
    ui.hideDisabledSymbols(playerBoard.disabledCells);
  }

  function placeShip(coordinates) {
    playerBoard.addShip(coordinates);

    ui.removeClasses(playerBoard.disabledCells, ["droppable"]);
    ui.addClasses(playerBoard.disabledCells, ["disabled"]);

    ui.removeClasses(coordinates, ["droppable"]);
    ui.addClasses(coordinates, ["ship"]);
  }

  function finishGame(message) {
    ui.removeComputerBoardClickHandler(gameLoop);
    ui.showWinMessage(message);
  }

  gameLoop = (e) => {
    if (!e.target.classList.contains("cell")) {
      return;
    }

    const x = Number(e.target.dataset.x);
    const y = Number(e.target.dataset.y);

    if (player1.findSubArray(player1.madeAttacks, [x, y])) {
      return;
    }

    let attackCoordinates = player1.attack([x, y]);
    const { hit, sunk } = computerBoard.receiveAttack(attackCoordinates);

    let ship = computerBoard.findShip(attackCoordinates);

    ui.receiveAttack("Computer", [x, y], hit, sunk, ship);

    attackCoordinates = player2.smartAttack();

    const { hit: AIhit, sunk: AIsunk } =
      playerBoard.receiveAttack(attackCoordinates);

    player2.rememberLastAttack(AIhit, AIsunk, attackCoordinates);

    ship = playerBoard.findShip(attackCoordinates);

    ui.receiveAttack("Player", player2.madeAttacks.at(-1), AIhit, AIsunk, ship);

    if (playerBoard.allShipsDestroyed) {
      finishGame("Computer wins");
    }

    if (computerBoard.allShipsDestroyed) {
      finishGame("You win!");
    }
  };

  function start() {
    if (playerBoard.ships.length < 5) {
      return;
    }

    ui.clearSymbols();
    ui.createBoard("Computer");

    computerBoard.autoPlaceShips();

    for (const ship of computerBoard.ships) {
      ui.addClasses(ship.coordinates, ["ship"], true);
    }

    ui.initComputerBoardClickHandler(gameLoop);

    ui.hideUI();
  }

  function initBoardsAndPlayers() {
    playerBoard = GameboardFactory();
    computerBoard = GameboardFactory();

    playerBoard.create();
    computerBoard.create();

    player1 = Player();
    player2 = Player(true);

    ui.createBoard("Player");
  }

  function setDraggable() {
    draggableShips = [];

    const ships = ui.getDraggableShips();

    for (const ship of ships) {
      draggableShips.push(DragAndDrop(ship, dragAndDropObservable));
    }

    for (const draggableShip of draggableShips) {
      draggableShip.init();
    }
  }

  function restart() {
    ui.showWinMessage("");
    ui.clear();
    ui.showUI();
    initBoardsAndPlayers();
    ui.createShipYard();

    setDraggable();
  }

  function randomize() {
    ui.clearCells();

    playerBoard.clear();
    playerBoard.autoPlaceShips();

    ui.removeClasses(playerBoard.disabledCells, ["droppable"]);
    ui.addClasses(playerBoard.disabledCells, ["disabled"]);

    for (const ship of playerBoard.ships) {
      ui.addClasses(ship.coordinates, ["ship"]);
      ui.removeClasses(ship.coordinates, ["droppable"]);

      ui.dropShip(ship.coordinates, playerBoard, ship);
    }

    playerBoard.ships.map((s, i) =>
      draggableShips[i].setDropTargets(s.coordinates)
    );
  }

  function init() {
    ui.initEventListeners(start, restart, randomize);
    initBoardsAndPlayers();
    ui.createShipYard();

    setDraggable();
  }

  return {
    init,
    placeShip,
    removeShip,
    showDisabledSymbols,
    hideDisabledSymbols,
  };
}
