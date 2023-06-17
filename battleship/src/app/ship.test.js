import ShipFactory from "./ship";

test("Ship factory instantiates an object", () => {
  const ship = ShipFactory();

  const obj = {
    hit() {},
    getLength() {},
    getHits() {},
    isSunk() {},
  };

  expect(JSON.stringify(ship)).toBe(JSON.stringify(obj));
});

test("Ship factory instantiates a ship object with some length and hits", () => {
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
