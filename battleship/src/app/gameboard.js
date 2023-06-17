import CellFactory from "./cell";

export default function GameboardFactory() {
  const side = 10;
  const xAxis = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  // const yAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const cells = [];
  let size = 0;
  let disabledCells = [];

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

  function placeShip(coordinates) {
    for (const coordinate of coordinates) {
      if (disabledCells.includes(coordinate)) {
        return false;
      }

      console.log("coordinate:", coordinate);
      // console.log(findCell(coordinate));
      const cell = findCell(coordinate);
      console.log("d:", cell.disabledCells);
      disabledCells = disabledCells.concat(coordinate);
      console.log("disabledCells coordinate:", disabledCells);

      for (const d of cell.disabledCells) {
        disabledCells.push(d);
      }
      console.log("disabledCells:", disabledCells);
    }

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
