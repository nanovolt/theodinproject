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

  // console.log("for:", [1, 1], [2, 1], "disabledCells:", board.disabledCells);

  expect(
    board.placeShip([
      [3, 1],
      [4, 1],
    ])
  ).toBeFalsy();

  // console.log("for:", [3, 1], [4, 1], "disabledCells:", board.disabledCells);

  expect(
    board.placeShip([
      [4, 1],
      [5, 1],
    ])
  ).toBeTruthy();

  // console.log("for:", [4, 1], [5, 1], "disabledCells:", board.disabledCells);

  expect(
    board.placeShip([
      [3, 6],
      [4, 6],
      [5, 6],
      [6, 6],
    ])
  ).toBeTruthy();

  // console.log(
  //   "for:",
  //   [3, 6],
  //   [4, 6],
  //   [5, 6],
  //   [6, 6],
  //   "disabledCells:",
  //   board.disabledCells
  // );

  expect(
    board.placeShip([
      [7, 3],
      [7, 4],
    ])
  ).toBeTruthy();

  // console.log("for:", [7, 3], [7, 4], "disabledCells:", board.disabledCells);
});

test("receives attack", () => {
  const board = GameboardFactory();
  board.create();
  board.placeShip([
    [1, 1],
    [2, 1],
  ]);

  expect(board.receiveAttack([2, 1])).toBeTruthy();
  expect(board.receiveAttack([1, 1])).toBeTruthy();
  expect(board.receiveAttack([3, 1])).toBeFalsy();
});

test("gets ships", () => {
  const board = GameboardFactory();
  board.create();
  board.placeShip([
    [1, 1],
    [2, 1],
  ]);

  expect(board.ships).toBeDefined();
});
