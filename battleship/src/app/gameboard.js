import CellFactory from "./cell";
import ShipFactory from "./ship";

export default function GameboardFactory() {
  const side = 10;
  const xAxis = ["    A ", "B ", "C ", "D ", "E ", "F ", "G ", "H ", "I ", "J"];
  // const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const cells = [];
  let size = 0;
  const disabledCells = [];
  const placedCells = [];
  const ships = [];

  const hitShots = [];
  const missedShots = [];

  let allShipsDestroyed = false;

  let sunkShips = 0;
  function findCell([x, y]) {
    return cells.find((cell) => cell.x === x && cell.y === y);
  }

  function create() {
    for (let y = 1; y <= side; y += 1) {
      for (let x = 1; x <= side; x += 1) {
        const cell = CellFactory(x, y);
        cell.init();
        // console.log(`cell: [${xAxis[cell.x - 1]} ${cell.y}]`);
        // console.log("disabled cells:", cell.disabledCells);

        cells.push(cell);
      }
    }

    // console.log(cells);
    size = cells.length;
  }

  const compareArrays = (a, b) => a.every((item, i) => item === b[i]);

  function findSubArray(arr, sub) {
    for (const item of arr) {
      // console.log("comparing:", item, "and", sub);
      if (compareArrays(item, sub)) {
        // console.log("found");
        return true;
      }
    }
    return false;
  }

  function findSubArrayCoordinate(arr, sub) {
    for (const item of arr) {
      // console.log("comparing:", item, "and", sub);
      if (compareArrays(item, sub)) {
        // console.log("found");
        return item;
      }
    }
    return null;
  }

  function placeShip(coordinates) {
    for (const coordinate of coordinates) {
      // console.log("finding:", coordinate);
      // console.log("find:", findSubArray(disabledCells, coordinate));

      if (!findSubArray(disabledCells, coordinate)) {
        disabledCells.push(coordinate);
        // console.log("pushed coordinate:", [...disabledCells]);
      } else {
        // console.log("for:", coordinates, "disabledCells:", [...disabledCells]);
        return false;
      }

      const cell = findCell(coordinate);
      // console.log("coordinate:", coordinate, "disabled:", cell.disabledCells);

      for (const d of cell.disabledCells) {
        // console.log("pushing disabled:", d);
        if (!findSubArray(disabledCells, d) && !findSubArray(coordinates, d)) {
          disabledCells.push(d);
          // console.log("pushed disabled:", d);
        }
      }
    }

    const ship = ShipFactory(coordinates.length);
    ships.push({ ship, coordinates });

    for (const coordinate of coordinates) {
      placedCells.push(coordinate);

      const cell = findCell(coordinate);
      // console.log("place cell:", [cell.x, cell.y]);
      cell.setSymbol("o");
    }

    for (const d of disabledCells) {
      if (!findSubArray(placedCells, d)) {
        const dc = findCell(d);
        dc.setSymbol("-");
      }
    }

    // console.log("for:", coordinates, "disabledCells:", [...disabledCells]);

    return true;
  }

  function drawBoard(name) {
    let str = "";

    console.log(name);
    console.log("-: disabled, x: hit, .: miss, o:ship, #: sunk ship");
    console.log(...xAxis);

    // for (let i = 0; i < 100; i += 1) {
    //   str += cells[i].renderString();
    //   // console.log(cells[i].renderString());
    // }

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        str += cells[i * 10 + j].renderString();
      }
      if (i < 9) {
        console.log(`${i + 1}  ${str}`);
      } else {
        console.log(`${i + 1} ${str}`);
      }
      str = "";
    }
    console.log("---------------------------------");
  }

  function findShip(coordinates) {
    for (const ship of ships) {
      const coord = findSubArrayCoordinate(ship.coordinates, coordinates);
      if (coord) {
        return ship;
      }
    }
    return null;
  }

  function receiveAttack(coordinates) {
    // console.log("attack:", coordinates);

    const ship = findShip(coordinates);
    if (ship) {
      hitShots.push(coordinates);

      const attackedCell = findCell(coordinates);
      attackedCell.setSymbol("x");

      ship.ship.hit();
      // console.log("hit:", coordinates);

      if (ship.ship.isSunk()) {
        for (const c of ship.coordinates) {
          const sunkCell = findCell(c);
          sunkCell.setSymbol("#");
        }

        sunkShips += 1;
        // console.log("sunk ship:", ship);

        // console.log("sunkShips:", sunkShips, "ships.length:", ships.length);
        if (sunkShips >= ships.length) {
          // console.log("All ship destroyed");
          allShipsDestroyed = true;
        }
      }

      return true;
    }
    missedShots.push(coordinates);
    const cell = findCell(coordinates);
    cell.setSymbol(".");
    // console.log("missed:", coordinates);

    return false;
  }

  return {
    create,
    placeShip,
    drawBoard,
    receiveAttack,
    get size() {
      return size;
    },
    get ships() {
      return ships;
    },
    get hitShots() {
      return hitShots;
    },
    get missedShots() {
      return missedShots;
    },
    get allShipsDestroyed() {
      return allShipsDestroyed;
    },
  };
}
