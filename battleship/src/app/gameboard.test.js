import GameboardFactory from "./gameboard";

test("creates a board", () => {
  const board = GameboardFactory();
  board.create();
  expect(board.size).toBe(100);
});

test("place ship correctly", () => {
  const board = GameboardFactory();
  board.create();

  expect(
    board.placeShip([
      [1, 1],
      [2, 1],
    ])
  ).toBeTruthy();

  console.log("board.disabledCells:", board.disabledCells);

  expect(
    board.placeShip([
      [3, 1],
      [4, 1],
    ])
  ).toBeFalsy();

  expect(
    board.place([
      [4, 1],
      [5, 1],
    ])
  ).toBeTruthy();

  console.log("board.disabledCells:", board.disabledCells);
});
