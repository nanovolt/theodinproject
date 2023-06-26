import Player from "./player";
import GameboardFactory from "./gameboard";

test("creates player", () => {
  const player1 = Player();
  const obj = { madeAttacks: [] };
  expect(JSON.stringify(player1)).toBe(JSON.stringify(obj));
});

test("player attacks", () => {
  const board = GameboardFactory();
  board.create();

  board.placeShip([
    [2, 2],
    [2, 3],
  ]);

  const player1 = Player(board);
  expect(player1.attack([2, 2])).toBeTruthy();
  expect(player1.attack([2, 4])).toBeFalsy();
});

test("computer attacks until it wins", () => {
  const board = GameboardFactory();
  board.create();

  board.placeShip([
    [2, 2],
    [2, 3],
  ]);

  const computer = Player(board, true);

  while (!board.allShipsDestroyed) {
    computer.attack();
  }
  expect(board.allShipsDestroyed).toBeTruthy();
});
