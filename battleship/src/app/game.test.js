import startGameVSComputer from "./game";
import UI from "./ui";

jest.mock("./ui", () => {
  const mock = {
    createBoard: jest.fn(),
    placeAllShips: jest.fn(),
    receiveAttack: jest.fn(),
    // targetCell: jest.fn(),
    targetCell: () => Promise.resolve(),
    // targetCell: jest.fn(),
  };
  return jest.fn(() => mock);
});

beforeAll(async () => {
  await startGameVSComputer();
});

it("calles makeField methods twice", async () => {
  const ui = UI();
  await expect(ui.createBoard).toHaveBeenCalledTimes(2);
});

// it("calls placeShips methods twice", () => {
//   const ui = UI();
//   expect(ui.placeAllShips).toHaveBeenCalledTimes(2);
// });

// it("board receives attack", () => {
//   const ui = UI();
//   expect(ui.receiveAttack).toHaveBeenCalled();
// });
