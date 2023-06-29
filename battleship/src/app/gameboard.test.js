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
    board.addShip([
      [1, 1],
      [2, 1],
    ])
  ).toBeTruthy();

  expect(
    board.addShip([
      [3, 1],
      [4, 1],
    ])
  ).toBeFalsy();

  expect(
    board.addShip([
      [4, 1],
      [5, 1],
    ])
  ).toBeTruthy();

  expect(
    board.addShip([
      [3, 6],
      [4, 6],
      [5, 6],
      [6, 6],
    ])
  ).toBeTruthy();

  expect(
    board.addShip([
      [7, 3],
      [7, 4],
    ])
  ).toBeTruthy();
});

test("receives attack", () => {
  const board = GameboardFactory();
  board.create();
  board.addShip([
    [1, 1],
    [2, 1],
  ]);

  expect(board.receiveAttack([2, 1])).toEqual({ hit: true, sunk: false });
  expect(board.receiveAttack([1, 1])).toEqual({ hit: true, sunk: true });
  expect(board.receiveAttack([3, 1])).toEqual({ hit: false, sunk: false });
});

test("gets ships", () => {
  const board = GameboardFactory();
  board.create();
  board.addShip([
    [1, 1],
    [2, 1],
  ]);

  expect(board.ships).toBeDefined();
});
