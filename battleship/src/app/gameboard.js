import CellFactory from "./cell";

export default function GameboardFactory() {
  const side = 10;
  const xAxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  // const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const cells = [];
  let size = 0;
  const disabledCells = [];

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

    // console.log("for:", coordinates, "disabledCells:", [...disabledCells]);

    return true;
  }

  return {
    create,
    placeShip,
    get size() {
      return size;
    },
    get disabledCells() {
      return disabledCells;
    },
  };
}
