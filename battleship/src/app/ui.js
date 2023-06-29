import DragAndDrop from "./drag_and_drop";

export default function UI(dragAndDropObservable) {
  let dragNDrop5;
  let dragNDrop4;
  let dragNDrop31;
  let dragNDrop32;
  let dragNDrop21;

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

  // function removeShip(ship) {
  //   ship.remove();
  // }

  // function placeShipsByCoordinates(boardName, coordinates) {
  //   const board = document.querySelector(boardName);

  //   for (const coordinate of coordinates) {
  //     const cell = board.querySelector(
  //       `[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`
  //     );
  //     cell.classList.add("ship");
  //   }
  // }

  // function placeShip(boardName, ship) {
  //   const board = document.querySelector(boardName);

  //   for (const shipCell of ship.children) {
  //     const cell = board.querySelector(
  //       `[data-x="${shipCell.dataset.x}"][data-y="${shipCell.dataset.y}"]`
  //     );
  //     cell.classList.add("ship");
  //     removeShip(ship);
  //   }
  // }

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
      cell.style.backgroundColor = "#999";

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

  function displayWinPopup() {}

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

  // function drawShip(coordinates) {
  //   for (const c of coordinates) {
  //     const shipCell = document.querySelector(
  //       `[data-x="${c[0]}"][data-y="${c[1]}"]`
  //     );
  //     shipCell.classList.add("ship");
  //   }
  // }

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

  // function drawDisabledCells(coordinates) {
  //   for (const c of coordinates) {
  //     const shipCell = document.querySelector(
  //       `[data-x="${c[0]}"][data-y="${c[1]}"]`
  //     );
  //     shipCell.classList.remove("droppable");
  //     shipCell.classList.add("disabled");
  //     // shipCell.innerHTML = '<i class="fa-solid fa-ban"></i>';
  //   }
  // }

  function clearSymbols() {
    // const board = document.querySelector(".Player");
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
    // console.log(ships);

    const top =
      shipEl.getBoundingClientRect().top + document.documentElement.scrollTop;
    const { left } = shipEl.getBoundingClientRect();
    // console.log("top:", top);
    // console.log("left:", left);

    const index = playerBoard.ships.indexOf(ship);
    if (coordinates[0][0] === coordinates[1][0]) {
      ships[index].classList.add("vertical");
    } else {
      ships[index].classList.remove("vertical");
    }

    ships[index].style.position = "absolute";
    ships[index].style.zIndex = 0;

    ships[index].style.top = `${top}px`;
    ships[index].style.left = `${left}px`;

    // console.log
    const dropTargets = [];
    for (const c of ship.coordinates) {
      // console.log(c);
      const target = document.querySelector(
        `[data-x="${c[0]}"][data-y="${c[1]}"]`
      );

      dropTargets.push(target);
    }

    // console.log(index);
    // console.log(dropTargets);
    if (index === 0) {
      dragNDrop5.setDropTargets(dropTargets);
    }
    if (index === 1) {
      dragNDrop4.setDropTargets(dropTargets);
    }
    if (index === 2) {
      dragNDrop31.setDropTargets(dropTargets);
    }
    if (index === 3) {
      dragNDrop32.setDropTargets(dropTargets);
    }
    if (index === 4) {
      dragNDrop21.setDropTargets(dropTargets);
    }
  }

  function createShipYard() {
    const shipYardContainer = document.querySelector(".shipYardContainer");

    const shipYard = document.createElement("div");
    shipYard.classList.add("shipYard");

    const ship5 = document.createElement("div");
    ship5.classList.add("ship");

    // const ship5cell1 = document.createElement("div");
    // ship5cell1.dataset.x = 3;
    // ship5cell1.dataset.y = 7;
    // const ship5cell2 = document.createElement("div");
    // ship5cell2.dataset.x = 4;
    // ship5cell2.dataset.y = 7;
    // const ship5cell3 = document.createElement("div");
    // ship5cell3.dataset.x = 5;
    // ship5cell3.dataset.y = 7;
    // const ship5cell4 = document.createElement("div");
    // ship5cell4.dataset.x = 6;
    // ship5cell4.dataset.y = 7;
    // const ship5cell5 = document.createElement("div");
    // ship5cell5.dataset.x = 7;
    // ship5cell5.dataset.y = 7;

    const ship4 = document.createElement("div");
    ship4.classList.add("ship");

    // const ship4cell1 = document.createElement("div");
    // ship4cell1.dataset.x = 9;
    // ship4cell1.dataset.y = 3;
    // const ship4cell2 = document.createElement("div");
    // ship4cell2.dataset.x = 9;
    // ship4cell2.dataset.y = 4;
    // const ship4cell3 = document.createElement("div");
    // ship4cell3.dataset.x = 9;
    // ship4cell3.dataset.y = 5;
    // const ship4cell4 = document.createElement("div");
    // ship4cell4.dataset.x = 9;
    // ship4cell4.dataset.y = 6;

    const ship31 = document.createElement("div");
    ship31.classList.add("ship");

    // const ship31cell1 = document.createElement("div");
    // ship31cell1.dataset.x = 2;
    // ship31cell1.dataset.y = 4;
    // const ship31cell2 = document.createElement("div");
    // ship31cell2.dataset.x = 3;
    // ship31cell2.dataset.y = 4;
    // const ship31cell3 = document.createElement("div");
    // ship31cell3.dataset.x = 4;
    // ship31cell3.dataset.y = 4;

    const ship32 = document.createElement("div");
    ship32.classList.add("ship");

    // const ship32cell1 = document.createElement("div");
    // ship32cell1.dataset.x = 4;
    // ship32cell1.dataset.y = 2;
    // const ship32cell2 = document.createElement("div");
    // ship32cell2.dataset.x = 5;
    // ship32cell2.dataset.y = 2;
    // const ship32cell3 = document.createElement("div");
    // ship32cell3.dataset.x = 6;
    // ship32cell3.dataset.y = 2;

    const ship21 = document.createElement("div");
    ship21.classList.add("ship");

    // const ship21cell1 = document.createElement("div");
    // ship21cell1.dataset.x = 1;
    // ship21cell1.dataset.y = 1;
    // const ship21cell2 = document.createElement("div");
    // ship21cell2.dataset.x = 2;
    // ship21cell2.dataset.y = 1;

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
    // ship5.appendChild(ship5cell1);
    // ship5.appendChild(ship5cell2);
    // ship5.appendChild(ship5cell3);
    // ship5.appendChild(ship5cell4);
    // ship5.appendChild(ship5cell5);

    // ship4.appendChild(ship4cell1);
    // ship4.appendChild(ship4cell2);
    // ship4.appendChild(ship4cell3);
    // ship4.appendChild(ship4cell4);

    // ship31.appendChild(ship31cell1);
    // ship31.appendChild(ship31cell2);
    // ship31.appendChild(ship31cell3);

    // ship32.appendChild(ship32cell1);
    // ship32.appendChild(ship32cell2);
    // ship32.appendChild(ship32cell3);

    // ship21.appendChild(ship21cell1);
    // ship21.appendChild(ship21cell2);

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

    dragNDrop5 = DragAndDrop(ship5, dragAndDropObservable);
    dragNDrop4 = DragAndDrop(ship4, dragAndDropObservable);
    dragNDrop31 = DragAndDrop(ship31, dragAndDropObservable);
    dragNDrop32 = DragAndDrop(ship32, dragAndDropObservable);
    dragNDrop21 = DragAndDrop(ship21, dragAndDropObservable);

    dragNDrop5.init();
    dragNDrop4.init();
    dragNDrop31.init();
    dragNDrop32.init();
    dragNDrop21.init();
  }

  return {
    createBoard,
    receiveAttack,
    createShipYard,
    // placeShip,
    // removeShip,
    clear,
    hideUI,
    showUI,
    // placeShipsByCoordinates,
    // hideShipYard,
    clearCells,
    // drawDisabledCells,
    removeDisabledCells,
    // drawShip,
    addClasses,
    removeClasses,
    clearSymbols,
    showDisabledSymbols,
    hideDisabledSymbols,
    dropShip,
  };
}
