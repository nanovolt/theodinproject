/**
 * @jest-environment jsdom
 */

import Game from "./game";

// jest.mock("./ui", () => {
//   const mock = {
//     createBoard: jest.fn(),
//     receiveAttack: jest.fn(),
//     placeAllShips: jest.fn(),
//     createShipYard: jest.fn(),
//     clear: jest.fn(),
//     hideUI: jest.fn(),
//     showUI: jest.fn(),
//     clearCells: jest.fn(),
//     removeDisabledCells: jest.fn(),
//     addClasses: jest.fn(),
//     removeClasses: jest.fn(),
//     clearSymbols: jest.fn(),
//     showDisabledSymbols: jest.fn(),
//     hideDisabledSymbols: jest.fn(),
//     dropShip: jest.fn(),

//     // targetCell: () => Promise.resolve(),
//   };
//   return jest.fn(() => mock);
// });

beforeAll(() => {});

it("creates the game", () => {
  const game = Game();

  document.body.innerHTML = `<main>
      <div class="top">
        <button class="restart">Restart game</button>
        <button class="start">Start game</button>
        <button class="randomize">randomize</button>
        <div class="winMessage"></div>
      </div>

      <div class="container">
        <div class="boards"></div>

        <div class="shipYardContainer">
          <div>Shipyard</div>
        </div>
      </div>
    </main>`;

  game.initButtons();
  const obj = {
    initButtons: expect.any(Function),
    placeShip: expect.any(Function),
    removeShip: expect.any(Function),
    showDisabledSymbols: expect.any(Function),
    hideDisabledSymbols: expect.any(Function),
  };

  expect(game).toEqual(obj);
});
