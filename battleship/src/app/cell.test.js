import CellFactory from "./cell";

test("creates cell", () => {
  const cell = CellFactory(1, 2);
  expect(cell.x).toBe(1);
  expect(cell.y).toBe(2);
});

test("shows disabled cells", () => {
  const cell = CellFactory(1, 1);
  cell.init();
  expect(cell.disabledCells.length).toBeGreaterThan(1);
});
