const gameBoard = (() => {
  const chosenCell = [];

  function chooseCell(e) {
    if (this.chosenCell.includes(+e.target.dataset.id)) {
      console.log("already chosen");
      return true;
    }
    this.chosenCell.push(+e.target.dataset.id);
    return false;
  }

  return {
    chosenCell,
    chooseCell,
  };
})();

const game = (() => {
  const winConditions = [
    new Set([0, 1, 2]),
    new Set([3, 4, 5]),
    new Set([6, 7, 8]),
    new Set([0, 3, 6]),
    new Set([1, 4, 7]),
    new Set([2, 5, 8]),
    new Set([0, 4, 8]),
    new Set([2, 4, 6]),
  ];
  const x = document.querySelector(".x");
  const o = document.querySelector(".o");

  const cells = document.querySelectorAll(".cell");
  let currentPlayer;
  let player1;
  let player2;

  function isSuperset(set, subset) {
    // console.log("subset:", subset);
    for (const elem of subset) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }

  function check(chosenCells) {
    // console.log("check:", chosenCells);
    for (const cond of winConditions) {
      if (isSuperset(chosenCells, cond)) {
        return cond;
      }
    }
    return null;
  }

  function processGame(e) {
    // console.log(gameBoard);
    if (gameBoard.chooseCell(e)) return;
    console.log("GAME current:", currentPlayer);
    currentPlayer.chooseCell(e);
    e.target.textContent = currentPlayer.marker;

    const cond = check(currentPlayer.chosenCell);

    if (cond) {
      console.log("winner:", currentPlayer);
      for (const c of cond) {
        console.log("winning cell:", c);
        document.querySelector(`[data-id="${c}"]`).style.backgroundColor =
          "dodgerblue";
      }
      document.querySelector(".winner-title").textContent = "Winner";
      document.querySelector(".winner").textContent = currentPlayer.name;
      document.querySelector(".winner-box").style.display = "grid";
      return;
    }
    if (gameBoard.chosenCell.length === 9) {
      console.log("TIE");
      document.querySelector(".winner-title").textContent = "Tie";
      document.querySelector(".winner").textContent = "";
      document.querySelector(".winner-box").style.display = "grid";
      return;
    }
    if (currentPlayer.name === "Player 1") {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  }
  function finishGame() {
    document.querySelector(".winner-box").style.display = "none";
    for (const cell of cells) {
      cell.style.backgroundColor = "white";
      cell.textContent = "";
    }
    console.log(gameBoard.chosenCell);
    gameBoard.chosenCell = [];
    console.log(gameBoard.chosenCell);
    player1.chosenCell = new Set();
    player2.chosenCell = new Set();
    document.querySelector(
      ".marker-player"
    ).textContent = `${currentPlayer.name}`;
    document.querySelector(".marker").style.display = "grid";
    // console.log(gameBoard.chosenCell);
    game.start();
  }

  function init(p1, p2) {
    player1 = p1;
    player2 = p2;
    currentPlayer = player1;
    for (const cell of cells) {
      cell.addEventListener("click", processGame.bind(this));
    }
    document
      .querySelector(".x")
      .addEventListener(
        "click",
        currentPlayer.chooseMarker.bind(currentPlayer, "X")
      );
    document
      .querySelector(".o")
      .addEventListener(
        "click",
        currentPlayer.chooseMarker.bind(currentPlayer, "O")
      );

    document.querySelector(".ok").addEventListener("click", finishGame);
  }
  function start() {
    console.log("start current player:", currentPlayer);
    if (currentPlayer.name === "Player 1") {
      if (currentPlayer.marker === "X") {
        player2.marker = "O";
      } else {
        player2.marker = "X";
      }
    } else if (currentPlayer.name === "Player 2") {
      if (currentPlayer.marker === "X") {
        player1.marker = "O";
      } else {
        player1.marker = "X";
      }
    }
  }

  return {
    init,
    winConditions,
    start,
  };
})();

// function cellFactory() {}

function playerFactory(name) {
  let marker;

  const chosenCell = new Set();

  function chooseMarker(a) {
    this.marker = a;
    // console.log(this);
    document.querySelector(".marker").style.display = "none";
    game.start();
  }

  function chooseCell(e) {
    this.chosenCell.add(+e.target.dataset.id);
  }

  return {
    name,
    marker,
    chosenCell,
    chooseCell,
    chooseMarker,
  };
}

const player1 = playerFactory("Player 1");
const player2 = playerFactory("Player 2");

// console.log(game.winConditions);
game.init(player1, player2);
