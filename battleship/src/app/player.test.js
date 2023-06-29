import Player from "./player";
// import GameboardFactory from "./gameboard";

test("creates player", () => {
  const player1 = Player();
  // const obj = {
  //   attack() {},
  //   findSubArray() {},
  //   madeAttacks: [],
  //   rememberLastAttack() {},
  //   smartAttack() {},
  // };

  const obj = {
    attack: expect.any(Function),
    findSubArray: expect.any(Function),
    madeAttacks: [],
    rememberLastAttack: expect.any(Function),
    smartAttack: expect.any(Function),
  };

  expect(player1).toEqual(obj);
});
