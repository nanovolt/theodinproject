import CellFactory from "./cell";
import ShipFactory from "./ship";

export default function GameboardFactory() {
  const side = 10;
  const xAxis = ["    A ", "B ", "C ", "D ", "E ", "F ", "G ", "H ", "I ", "J"];
  // const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const cells = [];
  let size = 0;

  let disabledCells = [];
  // let placedCells = [];
  let ships = [];

  const hitShots = [];
  const missedShots = [];

  let allShipsDestroyed = false;

  let sunkShips = 0;

  // let disabledCellsForRemoval = [];

  function findCell([x, y]) {
    return cells.find((cell) => cell.x === x && cell.y === y);
  }

  function clear() {
    disabledCells = [];
    // placedCells = [];
    ships = [];
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

  function addSub(arr, sub) {
    const found = sub.filter(
      (a) => !arr.find((s) => s.every((p, k) => p === a[k]))
    );

    for (const f of found) {
      arr.push(f);
    }
  }

  function findSub(arr, sub) {
    return arr.filter((a, i) =>
      sub.find((s, j) => s.every((p, k) => p === a[k]))
    );
  }

  function removeSubArray(arr, sub) {
    return arr.filter((a) => !sub.find((s) => s[0] === a[0] && s[1] === a[1]));
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

  function getRandomInteger(low, high) {
    const r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
  }

  function removeShipFromArray(ship) {
    ships.splice(ships.indexOf(ship), 1);
    // console.log("removed ship:", ship);
  }

  function findShipByCoordinates(coordinates) {
    for (const ship of ships) {
      const foundShip = findSub(ship.coordinates, coordinates);
      if (foundShip.length > 0) {
        return ship;
      }
    }
    return null;
  }

  function recalibrateDisabledCells() {
    disabledCells = [];
    for (const ship of ships) {
      // console.log(ship.disabledCellsAroundShip);
      if (!findSubArray(disabledCells, ship.disabled)) {
        disabledCells.push(...ship.disabled);
      }
    }

    // console.log("recalibrated disabled cells:", disabledCells.length);
  }

  function getDisabledCellsForRemoval(arr) {
    return arr.filter(
      (a) => !disabledCells.find((s) => s[0] === a[0] && s[1] === a[1])
    );
  }

  function removeShip(coordinates) {
    const ship = findShipByCoordinates(coordinates);
    if (!ship) {
      return null;
    }

    removeShipFromArray(ship);
    recalibrateDisabledCells();

    const disabledCellsForRemoval = getDisabledCellsForRemoval(ship.disabled);
    // console.log("disabledCellsForRemoval:", disabledCellsForRemoval.length);
    return disabledCellsForRemoval;
  }

  function addShip(coordinates) {
    for (const coordinate of coordinates) {
      if (coordinate[0] > 10 || coordinate[1] > 10) {
        return false;
      }
    }

    // console.log("____________________________________________________________");

    // console.log("disabledCells:", JSON.stringify(disabledCells));
    // console.log("coordinates:", JSON.stringify(coordinates));
    // console.log("find:", JSON.stringify(findSub(disabledCells, coordinates)));

    // if didn't find coordinates in disabledCells, add them
    if (findSub(disabledCells, coordinates).length === 0) {
      for (const coordinate of coordinates) {
        disabledCells.push(coordinate);
      }
    } else {
      // console.log("didn't place, because found");
      return false;
    }

    const shipDisabledCells = [];

    for (const coordinate of coordinates) {
      const cell = findCell(coordinate);
      // console.log("cell disabled:", cell.disabledCells);

      // console.log("find:", JSON.stringify(cell.disabledCells));
      // console.log("in:", JSON.stringify(shipDisabledCells));

      addSub(shipDisabledCells, cell.disabledCells);

      // console.log("SHIP:", JSON.stringify(shipDisabledCells));
    }

    const ship = ShipFactory(coordinates.length);
    ships.push({ ship, coordinates, disabled: shipDisabledCells });

    recalibrateDisabledCells();
    return true;
  }

  function generateShip(size) {
    const ship = [];
    const dir = getRandomInteger(0, 1);

    const x = getRandomInteger(1, 10);
    const y = getRandomInteger(1, 10);

    ship.push([x, y]);

    if (dir) {
      for (let i = 1; i < size; i += 1) {
        ship.push([x + i, y]);
      }
    } else {
      for (let i = 1; i < size; i += 1) {
        ship.push([x, y + i]);
      }
    }

    return ship;
  }

  function autoPlaceShips() {
    const n = 0;

    const fleet = [5, 4, 3, 3, 2];
    // console.clear();
    for (const ship of fleet) {
      let isPlaced = false;
      while (!isPlaced) {
        const generatedShip = generateShip(ship);

        // console.log(
        //   "generated ship:",
        //   generatedShip.length,
        //   JSON.stringify(generatedShip)
        // );
        if (addShip(generatedShip)) {
          isPlaced = true;
          // console.log(
          //   "placed ship:",
          //   generatedShip.length,
          //   JSON.stringify(generatedShip)
          // );
        }
      }
    }

    // console.log("placeShip:", placeShip());
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
    addShip,
    removeShip,
    receiveAttack,
    findShip,
    autoPlaceShips,
    clear,
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
    get disabledCells() {
      return disabledCells;
    },
    // get placedCells() {
    //   return placedCells;
    // },
  };
}
