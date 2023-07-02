export default function UI() {
  let ship5;
  let ship4;
  let ship31;
  let ship32;
  let ship21;

  const startButton = document.querySelector(".start");
  const restartButton = document.querySelector(".restart");
  const randomizeButton = document.querySelector(".randomize");

  function createBoard(name) {
    const boards = document.querySelector(".boards");

    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boardContainer");

    const playerName = document.createElement("div");
    playerName.classList.add("playerName");
    playerName.textContent = name;

    const board = document.createElement("div");
    board.classList.add("board");
    board.classList.add(`${name}`);

    boardContainer.appendChild(playerName);
    boardContainer.appendChild(board);
    boards.appendChild(boardContainer);

    for (let y = 1; y <= 10; y += 1) {
      for (let x = 1; x <= 10; x += 1) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add("droppable");
        cell.dataset.x = x;
        cell.dataset.y = y;

        const symbol = document.createElement("div");
        symbol.classList.add("symbol");
        symbol.classList.add("symbolDisabled");
        symbol.classList.add("hidden");

        symbol.innerHTML = '<i class="fa-solid fa-ban"></i>';

        cell.appendChild(symbol);

        board.appendChild(cell);
      }
    }
  }

  function clearCells() {
    const cells = document.querySelectorAll(".cell");
    for (const c of cells) {
      c.classList.remove("ship");
      c.classList.remove("disabled");
      c.classList.add("droppable");
    }
  }

  function clear() {
    const boards = document.querySelectorAll(".boardContainer");
    for (const b of boards) {
      b.remove();
    }

    document.querySelector(".shipYard").remove();

    const winMessageElement = document.querySelector(".winMessage");
    winMessageElement.classList.add("hidden");
  }

  function hideShipYard() {
    const shipYardContainer = document.querySelector(".shipYardContainer");
    shipYardContainer.classList.add("none");
  }

  function showShipYard() {
    const shipYardContainer = document.querySelector(".shipYardContainer");
    shipYardContainer.classList.remove("none");
  }

  function hideControls() {
    const start = document.querySelector(".start");
    start.classList.add("none");

    const rando = document.querySelector(".randomize");
    rando.classList.add("none");
  }

  function showControls() {
    const start = document.querySelector(".start");
    start.classList.remove("none");

    const rando = document.querySelector(".randomize");
    rando.classList.remove("none");
  }

  function hideUI() {
    hideControls();
    hideShipYard();
  }

  function showUI() {
    showControls();
    showShipYard();
  }

  function sinkShip(boardElement, ship) {
    for (const coordinate of ship.coordinates) {
      const shipCell = boardElement.querySelector(
        `[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`
      );

      const symbol = document.createElement("div");
      symbol.innerHTML = `<i class="fa-solid fa-skull"></i>`;
      symbol.classList.add("skull");

      const oldHit = shipCell.querySelector(".hit");
      oldHit.remove();
      shipCell.appendChild(symbol);
    }
  }

  function receiveAttack(boardName, coordinates, hit, sunk, ship) {
    const boardElement = document.querySelector(`.${boardName}`);

    const cell = boardElement.querySelector(
      `[data-x="${coordinates[0]}"][data-y="${coordinates[1]}"]`
    );

    if (hit) {
      const symbol = document.createElement("div");
      symbol.innerHTML = `<i class="fa-solid fa-explosion"></i>`;
      symbol.classList.add("hit");
      cell.style.backgroundColor = "#555";

      cell.appendChild(symbol);

      if (sunk) {
        sinkShip(boardElement, ship);
      }
    } else {
      const symbol = document.createElement("div");
      symbol.classList.add("miss");
      symbol.innerHTML = `<i class="fa-regular fa-circle-dot"></i>`;

      cell.appendChild(symbol);
    }
  }

  function addClasses(coordinates, classes, computer = false) {
    let board;
    if (computer) {
      board = ".Computer";
    } else {
      board = ".Player";
    }

    for (const coordinate of coordinates) {
      for (const cl of classes) {
        const cell = document.querySelector(
          `${board} [data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`
        );
        cell.classList.add(cl);
      }
    }
  }

  function removeClasses(coordinates, classes, computer = false) {
    let board;
    if (computer) {
      board = ".Computer";
    } else {
      board = ".Player";
    }

    for (const coordinate of coordinates) {
      for (const cl of classes) {
        const cell = document.querySelector(
          `${board} [data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`
        );
        cell.classList.remove(cl);
      }
    }
  }

  function showDisabledSymbols(coordinates) {
    for (const c of coordinates) {
      const symbol = document.querySelector(
        `[data-x="${c[0]}"][data-y="${c[1]}"] .symbolDisabled`
      );
      symbol.classList.remove("hidden");
    }
  }

  function hideDisabledSymbols(coordinates) {
    for (const c of coordinates) {
      const symbol = document.querySelector(
        `[data-x="${c[0]}"][data-y="${c[1]}"] .symbolDisabled`
      );
      symbol.classList.add("hidden");
    }
  }

  function clearSymbols() {
    const cells = document.querySelectorAll(".cell");

    for (const cell of cells) {
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
    }
  }

  function removeDisabledCells(coordinates) {
    if (!coordinates) {
      return;
    }

    for (const c of coordinates) {
      const shipCell = document.querySelector(
        `[data-x="${c[0]}"][data-y="${c[1]}"]`
      );
      shipCell.classList.add("droppable");
      shipCell.classList.remove("disabled");
    }
  }

  function dropShip(coordinates, playerBoard, ship) {
    const shipEl = document.querySelector(
      `[data-x="${coordinates[0][0]}"][data-y="${coordinates[0][1]}"]`
    );

    const ships = document.querySelectorAll(".shipYard .ship");

    const top =
      shipEl.getBoundingClientRect().top + document.documentElement.scrollTop;
    const { left } = shipEl.getBoundingClientRect();

    const index = playerBoard.ships.indexOf(ship);
    if (coordinates[0][0] === coordinates[1][0]) {
      ships[index].classList.add("vertical");
    } else {
      ships[index].classList.remove("vertical");
    }

    ships[index].style.position = "absolute";
    ships[index].style.zIndex = 0;

    ships[index].style.top = `${top + 1}px`;
    ships[index].style.left = `${left + 1}px`;
  }

  function createShipYard() {
    const shipYardContainer = document.querySelector(".shipYardContainer");

    const shipYard = document.createElement("div");
    shipYard.classList.add("shipYard");

    ship5 = document.createElement("div");
    ship5.classList.add("ship");

    ship4 = document.createElement("div");
    ship4.classList.add("ship");

    ship31 = document.createElement("div");
    ship31.classList.add("ship");

    ship32 = document.createElement("div");
    ship32.classList.add("ship");

    ship21 = document.createElement("div");
    ship21.classList.add("ship");

    for (let i = 0; i < 5; i += 1) {
      ship5.appendChild(document.createElement("div"));
    }
    for (let i = 0; i < 4; i += 1) {
      ship4.appendChild(document.createElement("div"));
    }
    for (let i = 0; i < 3; i += 1) {
      ship31.appendChild(document.createElement("div"));
      ship32.appendChild(document.createElement("div"));
    }
    for (let i = 0; i < 2; i += 1) {
      ship21.appendChild(document.createElement("div"));
    }

    const port5 = document.createElement("div");
    port5.classList.add("port");
    port5.classList.add("port5");

    const port4 = document.createElement("div");
    port4.classList.add("port");
    port4.classList.add("port4");

    const port31 = document.createElement("div");
    port31.classList.add("port");
    port31.classList.add("port31");

    const port32 = document.createElement("div");
    port32.classList.add("port");
    port32.classList.add("port32");

    const port21 = document.createElement("div");
    port21.classList.add("port");
    port21.classList.add("port21");

    port5.appendChild(ship5);
    port4.appendChild(ship4);
    port31.appendChild(ship31);
    port32.appendChild(ship32);
    port21.appendChild(ship21);

    shipYard.appendChild(port5);
    shipYard.appendChild(port4);
    shipYard.appendChild(port31);
    shipYard.appendChild(port32);
    shipYard.appendChild(port21);

    shipYardContainer.appendChild(shipYard);
  }

  function getDraggableShips() {
    return [ship5, ship4, ship31, ship32, ship21];
  }

  function showWinMessage(message) {
    const winMessageElement = document.querySelector(".winMessage");
    winMessageElement.classList.remove("hidden");
    winMessageElement.textContent = message;
  }

  function initEventListeners(start, restart, randomize) {
    startButton.addEventListener("click", start);
    restartButton.addEventListener("click", restart);
    randomizeButton.addEventListener("click", randomize);

    // startButton.addEventListener("click", (e) => {
    //   e.target.classList.add("animate");

    //   console.log("start");
    // });

    // startButton.addEventListener("animationend", (e) => {
    //   e.target.classList.remove("animate");
    //   console.log("start end");
    // });

    // restartButton.addEventListener("click", (e) => {
    //   e.target.classList.add("animate");
    // });
    // restartButton.addEventListener("animationend", (e) => {
    //   e.target.classList.remove("animate");
    // });

    randomizeButton.addEventListener("click", (e) => {
      e.target.classList.add("animate");
    });
    randomizeButton.addEventListener("animationend", (e) => {
      e.target.classList.remove("animate");
    });
  }

  function initComputerBoardClickHandler(callback) {
    const computerBoardElement = document.querySelector(".Computer");
    computerBoardElement.addEventListener("click", callback);
  }

  function removeComputerBoardClickHandler(callback) {
    const computerBoardElement = document.querySelector(".Computer");
    computerBoardElement.removeEventListener("click", callback);
  }

  return {
    createBoard,
    receiveAttack,
    createShipYard,
    clear,
    hideUI,
    showUI,
    clearCells,
    removeDisabledCells,
    addClasses,
    removeClasses,
    clearSymbols,
    showDisabledSymbols,
    hideDisabledSymbols,
    dropShip,
    showWinMessage,
    initEventListeners,
    initComputerBoardClickHandler,
    removeComputerBoardClickHandler,
    getDraggableShips,
  };
}
