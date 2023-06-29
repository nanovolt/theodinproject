import CellFactory from "./cell";
import ShipFactory from "./ship";

export default function GameboardFactory() {
  const side = 10;

  const cells = [];
  let size = 0;

  let disabledCells = [];
  let ships = [];

  const hitShots = [];
  const missedShots = [];

  let allShipsDestroyed = false;

  let sunkShips = 0;

  function findCell([x, y]) {
    return cells.find((cell) => cell.x === x && cell.y === y);
  }

  function clear() {
    disabledCells = [];
    ships = [];
  }

  function create() {
    for (let y = 1; y <= side; y += 1) {
      for (let x = 1; x <= side; x += 1) {
        const cell = CellFactory(x, y);
        cell.init();

        cells.push(cell);
      }
    }

    size = cells.length;
  }

  const compareArrays = (a, b) => a.every((item, i) => item === b[i]);

  function findSubArray(arr, sub) {
    for (const item of arr) {
      if (compareArrays(item, sub)) {
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
    return arr.filter((a) => sub.find((s) => s.every((p, k) => p === a[k])));
  }

  function findSubArrayCoordinate(arr, sub) {
    for (const item of arr) {
      if (compareArrays(item, sub)) {
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
      if (!findSubArray(disabledCells, ship.disabled)) {
        disabledCells.push(...ship.disabled);
      }
    }
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
    return disabledCellsForRemoval;
  }

  function addShip(coordinates) {
    for (const coordinate of coordinates) {
      if (coordinate[0] > 10 || coordinate[1] > 10) {
        return false;
      }
    }

    if (findSub(disabledCells, coordinates).length === 0) {
      for (const coordinate of coordinates) {
        disabledCells.push(coordinate);
      }
    } else {
      return false;
    }

    const shipDisabledCells = [];

    for (const coordinate of coordinates) {
      const cell = findCell(coordinate);

      addSub(shipDisabledCells, cell.disabledCells);
    }

    const ship = ShipFactory(coordinates.length);
    ships.push({ ship, coordinates, disabled: shipDisabledCells });

    recalibrateDisabledCells();
    return true;
  }

  function generateShip(shipSize) {
    const ship = [];
    const dir = getRandomInteger(0, 1);

    const x = getRandomInteger(1, 10);
    const y = getRandomInteger(1, 10);

    ship.push([x, y]);

    if (dir) {
      for (let i = 1; i < shipSize; i += 1) {
        ship.push([x + i, y]);
      }
    } else {
      for (let i = 1; i < shipSize; i += 1) {
        ship.push([x, y + i]);
      }
    }

    return ship;
  }

  function autoPlaceShips() {
    const fleet = [5, 4, 3, 3, 2];
    for (const ship of fleet) {
      let isPlaced = false;
      while (!isPlaced) {
        const generatedShip = generateShip(ship);

        if (addShip(generatedShip)) {
          isPlaced = true;
        }
      }
    }
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
    const ship = findShip(coordinates);
    if (ship) {
      hitShots.push(coordinates);

      ship.ship.hit();

      if (ship.ship.isSunk()) {
        sunkShips += 1;

        if (sunkShips >= ships.length) {
          allShipsDestroyed = true;
        }

        return { hit: true, sunk: true };
      }

      return { hit: true, sunk: false };
    }
    missedShots.push(coordinates);

    return { hit: false, sunk: false };
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
  };
}
