import ShipFactory from "./ship";

// test("Ship factory creates ships with default parameters", () => {
//   expect(new Ship()).toEqual({ length: 0, hits: 0, isSunk: false });
// });

// test("Ship factory creates ships with custom parameters", () => {
//   expect(new Ship(3, 2, true)).toEqual({ length: 3, hits: 2, isSunk: true });
// });

// test("hit() increases number of hits", () => {
//   expect(new Ship(2).getHits()).toBe(0);
//   expect(new Ship(2).hit().getHits()).toBe(1);
//   expect(new Ship(2).hit().hit().getHits()).toBe(2);
//   expect(new Ship(2).hit().hit().hit().getHits()).toBe(2);
// });

test("Ship factory creates ships with default parameters", () => {
  const ship = ShipFactory();

  expect(ship.getLength()).toBe(0);
  expect(ship.getHits()).toBe(0);
});

test("Ship factory creates ships with custom parameters", () => {
  const ship = ShipFactory(3, 2);

  expect(ship.getLength()).toBe(3);
  expect(ship.getHits()).toBe(2);
});

test("hit() increases number of hits", () => {
  const ship = ShipFactory(5);

  expect(ship.getHits()).toBe(0);
  expect(ship.hit().getHits()).toBe(1);
  expect(ship.hit().getHits()).toBe(2);
  expect(ship.hit().hit().hit().getHits()).toBe(5);
});

test("checks if a ship is sunk based on hits and length", () => {
  const ship = ShipFactory(2);
  expect(ship.isSunk()).toBeFalsy();
  expect(ship.hit().isSunk()).toBeFalsy();
  expect(ship.hit().isSunk()).toBeTruthy();
});
