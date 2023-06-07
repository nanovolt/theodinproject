function SquareFactory(xArg, yArg) {
  const x = xArg;
  const y = yArg;

  let top;
  let right;
  let bottom;
  let left;

  const targets = [];

  let renderString = `[${x}     ${y}]`;
  function render() {
    return renderString;
  }

  function removePiece() {
    renderString = `[${x}     ${y}]`;
  }

  function placePiece(piece) {
    renderString = `[${x} ${piece} ${y}]`;
  }

  function setTop(t) {
    top = t;
  }

  function setRight(r) {
    right = r;
  }

  function setBottom(b) {
    bottom = b;
  }

  function setLeft(l) {
    left = l;
  }

  function getTop() {
    return top;
  }

  function getRight() {
    return right;
  }

  function getBottom() {
    return bottom;
  }

  function getLeft() {
    return left;
  }

  function showSides() {
    let topXY = null;
    let rightXY = null;
    let bottomXY = null;
    let leftXY = null;

    if (top !== null) {
      topXY = [top.x, top.y];
    }
    if (right !== null) {
      rightXY = [right.x, right.y];
    }
    if (bottom !== null) {
      bottomXY = [bottom.x, bottom.y];
    }
    if (left !== null) {
      leftXY = [left.x, left.y];
    }

    console.log(
      `[${x} ${y}]`,
      "top:",
      topXY,
      "right:",
      rightXY,
      "bottom:",
      bottomXY,
      "left:",
      leftXY
    );
  }

  function setTargets() {
    let targetX = x;
    let targetY = y;

    for (let i = 0; i < 8; i += 1) {
      if (i === 0) {
        targetY += 2;
        targetX -= 1;
      }

      if (i === 1) {
        targetY += 2;
        targetX += 1;
      }

      if (i === 2) {
        targetY += 1;
        targetX += 2;
      }

      if (i === 3) {
        targetY -= 1;
        targetX += 2;
      }

      if (i === 4) {
        targetY -= 2;
        targetX -= 1;
      }

      if (i === 5) {
        targetY -= 2;
        targetX += 1;
      }

      if (i === 6) {
        targetY += 1;
        targetX -= 2;
      }

      if (i === 7) {
        targetY -= 1;
        targetX -= 2;
      }

      if (targetX >= 1 && targetX <= 8 && targetY >= 1 && targetY <= 8) {
        // console.log(`[${targetX} ${targetY}]`);
        targets.push([targetX, targetY]);
      }

      targetX = x;
      targetY = y;
    }

    // console.log(`targets for node [${x} ${y}]:`);
    // targets.forEach((target) => console.log(target));
    // console.log(targets);
    // console.log("--------");
  }

  return {
    x,
    y,
    targets,
    render,
    placePiece,
    removePiece,
    setTop,
    setRight,
    setBottom,
    setLeft,
    showSides,
    getTop,
    getRight,
    getBottom,
    getLeft,
    setTargets,
  };
}

function GameBoardFactory() {
  const size = 64;
  const side = 8;

  const squares = [];

  function findSquare(x, y) {
    return squares.find((item) => item.x === x && item.y === y);
  }

  function initSquares() {
    for (let y = side; y >= 1; y -= 1) {
      for (let x = 1; x <= side; x += 1) {
        const square = SquareFactory(x, y);
        squares.push(square);
      }
    }
  }

  function setNodes() {
    let i = 0;
    for (let y = side; y >= 1; y -= 1) {
      for (let x = 1; x <= side; x += 1) {
        const square = squares[i];
        i += 1;
        // console.log("square i:", square);

        // console.log("nodes i:", i);
        // console.log("x y:", x, y);

        if (y === 8) {
          square.setTop(null);
        }
        if (x === 8) {
          square.setRight(null);
        }

        if (y === 1) {
          square.setBottom(null);
        }

        if (x === 1) {
          square.setLeft(null);
        }

        if (square.getTop() !== null) {
          square.setTop(findSquare(x, y + 1));
        }

        if (square.getRight() !== null) {
          square.setRight(findSquare(x + 1, y));
        }

        if (square.getBottom() !== null) {
          square.setBottom(findSquare(x, y - 1));
        }

        if (square.getLeft() !== null) {
          square.setLeft(findSquare(x - 1, y));
        }
      }
    }
  }

  function isEnqued(queue, x, y) {
    return queue.find((target) => target.node[0] === x && target.node[1] === y);
  }

  function findParent(queue, x, y, parents = []) {
    if (x === null && y === null) {
      return [];
    }

    const parent = queue.find(
      (target) => target.node[0] === x && target.node[1] === y
    );
    // console.log("found parent:", parent);
    parents.push(parent);

    findParent(queue, parent.parent[0], parent.parent[1], parents);

    return parents;
  }

  function drawBoard() {
    // console.clear();
    for (let i = 0; i < size; i += 1) {
      process.stdout.write(squares[i].render());

      if ((i + 1) % 8 === 0) {
        console.log("");
      }
    }

    for (let i = 0; i < size + 16; i += 1) {
      process.stdout.write("-");
    }
    console.log("");
  }

  function bfs(sourceArr, destinationArr) {
    // const sourceSquare = findSquare(source[0], source[1]);
    // const destination = [4, 3];

    const source = findSquare(sourceArr[0], sourceArr[1]);
    const destination = findSquare(destinationArr[0], destinationArr[1]);

    console.log("source:", [source.x, source.y]);
    console.log("destination:", [destination.x, destination.y]);

    const sourceNode = { node: [source.x, source.y], parent: [null, null] };
    let target;
    const queue = [];
    queue.push(sourceNode);

    let current = 0;
    let found = false;

    // console.log(`queue[current]:`, queue[current]);
    // console.log("---------------------------------------------------------");

    while (!found) {
      if (
        queue[current].node[0] === destination.x &&
        queue[current].node[1] === destination.y
      ) {
        found = true;
        // console.log("found destination:", destination);
        // console.log(`queue[current]:`, queue[current]);

        const parents = findParent(
          queue,
          queue[current].parent[0],
          queue[current].parent[1]
        );

        console.log(
          `You made it in ${parents.length} moves! Here's your path:`
        );

        const path = [];

        for (let i = parents.length - 1; i >= 0; i -= 1) {
          if (i === parents.length - 1) {
            const start = findSquare(parents[i].node[0], parents[i].node[1]);
            start.placePiece(" o ");

            console.log(parents[i].node, "start");
          } else {
            console.log(parents[i].node);
            path.push(findSquare(parents[i].node[0], parents[i].node[1]));
            path.forEach((p, index) => {
              p.placePiece(`#${index + 1}#`);
            });
          }
        }

        console.log(queue[current].node, "finish");

        for (let i = 0; i < size + 16; i += 1) {
          process.stdout.write("-");
        }
        console.log();
        console.log("o - start, x - finish, #number# - path");

        const finish = findSquare(
          queue[current].node[0],
          queue[current].node[1]
        );
        finish.placePiece(" x ");
        drawBoard();

        // console.log("queue:", queue);
        break;
      } else {
        target = findSquare(queue[current].node[0], queue[current].node[1]);
      }

      // console.log(`queue[current]:`, queue[current]);

      for (const t of target.targets) {
        // console.log("t:", t);
        // console.log("queue[current]:", queue[current]);

        // console.log("inEnqued:", isEnqued([t[0], t[1]]));
        const node = {
          node: [t[0], t[1]],
          parent: [queue[current].node[0], queue[current].node[1]],
        };
        // console.log("t:", [t[0], t[1]], "destination:", destination);
        if (!isEnqued(queue, t.x, t.y)) {
          queue.push(node);
          // console.log(node, "enqueued");
        } else {
          // console.log(node, "skipped X");
        }
      }
      current += 1;
      // target.targets.forEach((t) => {

      // });
      // console.log("---------------------------------------------------------");
    }
  }

  function setTargets() {
    // squares.forEach((s) => s.showSides());
    squares.forEach((s) => s.setTargets());
  }

  return {
    size,
    initSquares,
    drawBoard,
    findSquare,
    setTargets,
    setNodes,
    bfs,
  };
}

function Knight(gameBoard) {
  const position = { x: 1, y: 1 };

  function move(x, y) {
    position.x = x;
    position.y = y;
    const target = gameBoard.findSquare(x, y);

    target.placePiece("X");
    // targets.forEach((target) => {
    // });
    // console.log("target:", target);
    gameBoard.drawBoard();
  }
  return { position, move };
}

const gameBoard = GameBoardFactory();
gameBoard.initSquares();
gameBoard.setNodes();
// gameBoard.drawBoard();

// eslint-disable-next-line no-unused-vars
const knight = Knight(gameBoard);

// knight.move(3, 3);

gameBoard.setTargets();
gameBoard.bfs([3, 3], [4, 3]);

// gameBoard.drawBoard();
// from 33 to 43: 33 52 31 43
