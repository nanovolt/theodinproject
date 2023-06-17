export default function CellFactory(xArg, yArg) {
  const x = xArg;
  const y = yArg;

  const disabledCells = [];

  function setDisabledCells() {
    let cellX = x;
    let cellY = y;

    for (let i = 0; i < 8; i += 1) {
      if (i === 0) {
        cellY += 1;
      }

      if (i === 1) {
        cellX += 1;
        cellY += 1;
      }

      if (i === 2) {
        cellX += 1;
      }

      if (i === 3) {
        cellX += 1;
        cellY -= 1;
      }

      if (i === 4) {
        cellY -= 1;
      }

      if (i === 5) {
        cellX -= 1;
        cellY -= 1;
      }

      if (i === 6) {
        cellX -= 1;
      }

      if (i === 7) {
        cellX -= 1;
        cellY += 1;
      }

      if (cellX >= 1 && cellX <= 10 && cellY >= 1 && cellY <= 10) {
        // console.log(`[${cellX} ${cellY}]`);
        disabledCells.push([cellX, cellY]);
      }

      cellX = x;
      cellY = y;
    }
  }

  function init() {
    setDisabledCells();
  }

  return {
    x,
    y,
    init,
    get disabledCells() {
      return disabledCells;
    },
  };
}
