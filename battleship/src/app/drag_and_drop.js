export default function DragAndDrop(s, dragAndDropObservable) {
  const ship = s;
  let shiftX;
  let shiftY;

  let dropTargets = [];

  let isSnappable = false;
  let isDragging = false;
  let hasBeenMoved = false;

  let isDragginShip = false;

  function detectDropTargets() {
    dropTargets = [];
    let DroppableCells = 0;

    for (const cell of ship.children) {
      const { right, bottom } = cell.getBoundingClientRect();

      const centerX = right - 12;
      const centerY = bottom - 12;

      // console.log("center:", centerX, centerY);
      ship.style.display = "none";
      const elemBelow = document.elementFromPoint(centerX, centerY);
      ship.style.display = "grid";

      if (elemBelow && elemBelow.classList.contains("droppable")) {
        // console.log("elemBelow:", elemBelow);
        dropTargets.push(elemBelow);
        DroppableCells += 1;
      }
    }

    if (DroppableCells === ship.children.length) {
      // console.log("can drop");
      isSnappable = true;
      // console.log("drop targets:", dropTargets);
    } else {
      isSnappable = false;
    }
  }

  function snapShip(cell) {
    // console.log("snappable at:", dropTargets);
    const top =
      cell.getBoundingClientRect().top + document.documentElement.scrollTop;
    const { left } = cell.getBoundingClientRect();
    // console.log("top:", top);
    // console.log("left:", left);

    ship.style.top = `${top + 1}px`;
    ship.style.left = `${left + 1}px`;

    // console.log("snapped at:", top, left);
  }

  function moveAt(pageX, pageY) {
    ship.style.left = `${pageX - shiftX}px`;
    ship.style.top = `${pageY - shiftY}px`;
  }

  function detectMove() {
    // console.log("detected move once");
    hasBeenMoved = true;

    if (isDragginShip) {
      // console.log("is dragging ship, show disabled");
      dragAndDropObservable.showDisabledSymbols();
    }
  }

  function onMouseMove(e) {
    // console.log(e);

    // console.log("____________________________________________________________");

    // console.log("dragging ship ...");
    isDragginShip = true;
    moveAt(e.pageX, e.pageY);
    detectDropTargets(e);

    if (isSnappable) {
      snapShip(dropTargets[0]);
      ship.classList.add("snappable");
      // console.log("snap ship");
    } else {
      ship.classList.remove("snappable");
    }
  }

  function onTouchMove(e) {
    // hasBeenMoved = true;

    // console.log("dragging ship ...");
    isDragginShip = true;

    moveAt(e.touches[0].pageX, e.touches[0].pageY);
    detectDropTargets(e);

    if (isSnappable) {
      snapShip(dropTargets[0]);
      // console.log("snap ship");
      ship.classList.add("snappable");
    } else {
      ship.classList.remove("snappable");
    }
  }

  function extractArrayOfCoordinates(targets) {
    const coordinates = [];

    for (const t of targets) {
      coordinates.push([Number(t.dataset.x), Number(t.dataset.y)]);
    }

    return coordinates;
  }

  function rotateShip() {
    // console.clear();
    // console.log("before rotation hasBeenMoved:", hasBeenMoved);

    if (ship.classList.contains("cannotRotate")) {
      // console.log("can't rotate, already rotating");
      return;
    }

    if (hasBeenMoved) {
      // console.log("can't rotate, has been moved");
      return;
    }
    // console.log("rotating ship...");

    document.removeEventListener("mousemove", detectMove);
    document.removeEventListener("touchmove", detectMove);

    // hasBeenMoved = true;

    const cellsBelow = [];
    const rotationTargets = [];

    for (const child of ship.children) {
      const { right, bottom } = child.getBoundingClientRect();

      const centerX = right - 12;
      const centerY = bottom - 12;

      // console.log("center:", centerX, centerY);
      ship.style.display = "none";
      cellsBelow.push(document.elementFromPoint(centerX, centerY));
      ship.style.display = "grid";
    }

    // console.log("cellsBelow:", cellsBelow);
    if (cellsBelow.some((c) => !c.classList.contains("cell"))) {
      // console.log("not a cell");
      return;
    }

    const beforeRotationCoordinates = [];

    for (const c of cellsBelow) {
      beforeRotationCoordinates.push([
        Number(c.dataset.x),
        Number(c.dataset.y),
      ]);
    }

    // console.log("beforeRotationCoordinates:", beforeRotationCoordinates);

    for (const cell of cellsBelow) {
      // console.log("removing old ship, droppable class", cell);
      cell.classList.add("droppable");
      cell.classList.remove("ship");
    }

    const startX = Number(cellsBelow.at(0).dataset.x);
    const startY = Number(cellsBelow.at(0).dataset.y);

    // const endX = Number(cellsBelow.at(-1).dataset.x);
    // const endY = Number(cellsBelow.at(-1).dataset.y);

    // console.log("start:", [startX, startY]);
    // console.log("end:", [endX, endY]);

    rotationTargets.push([startX, startY]);

    if (!ship.classList.contains("vertical")) {
      for (let i = 1; i < ship.children.length; i += 1) {
        rotationTargets.push([Number(startX), Number(startY + i)]);
      }
    } else {
      for (let i = 1; i < ship.children.length; i += 1) {
        rotationTargets.push([Number(startX + i), Number(startY)]);
      }
    }

    // console.log("rotationTargets:", JSON.stringify(rotationTargets));

    if (rotationTargets.some((t) => t[0] > 10 || t[1] > 10)) {
      ship.classList.add("cannotRotate");

      ship.addEventListener("animationend", () => {
        ship.classList.remove("cannotRotate");
      });
      return;
    }

    const targetElements = [];

    for (const t of rotationTargets) {
      targetElements.push(
        document.querySelector(`[data-x="${t[0]}"][data-y="${t[1]}"]`)
      );
    }

    // console.log("targetElements:", targetElements);

    const isAllDroppable = targetElements.every((el) =>
      el.classList.contains("droppable")
    );

    // console.log("all contain droppable:", isAllDroppable);

    if (isAllDroppable) {
      // console.log("rotationTargets:", rotationTargets);
      dropTargets = targetElements;
      ship.classList.toggle("vertical");

      const top =
        targetElements[0].getBoundingClientRect().top +
        document.documentElement.scrollTop;
      const { left } = targetElements[0].getBoundingClientRect();
      // console.log("top:", top);
      // console.log("left:", left);

      ship.style.top = `${top + 1}px`;
      ship.style.left = `${left + 1}px`;
    } else {
      ship.classList.add("cannotRotate");

      ship.addEventListener("animationend", () => {
        ship.classList.remove("cannotRotate");
      });
    }
  }

  function moveAfterResize() {
    const top =
      dropTargets[0].getBoundingClientRect().top +
      document.documentElement.scrollTop;
    const { left } = dropTargets[0].getBoundingClientRect();

    // console.log("resize:", top, left);

    ship.style.top = `${top + 1}px`;
    ship.style.left = `${left + 1}px`;
  }

  function dragStart(e) {
    e.preventDefault();

    if (ship.classList.contains("cannotRotate")) {
      // console.log("can't drag, already rotating");
      return;
    }
    // console.log(e);
    // console.log("dragStart");
    hasBeenMoved = false;

    // console.log("drag start dropTargets:", dropTargets);
    isDragging = true;

    dragAndDropObservable.removeShip(extractArrayOfCoordinates(dropTargets));

    dropTargets.forEach((t) => {
      t.classList.add("droppable");
      t.classList.remove("ship");
    });

    if (e.touches) {
      shiftX = e.touches[0].clientX - ship.getBoundingClientRect().left;
      shiftY = e.touches[0].clientY - ship.getBoundingClientRect().top;

      moveAt(e.touches[0].pageX, e.touches[0].pageY);
    } else {
      shiftX = e.clientX - ship.getBoundingClientRect().left;
      shiftY = e.clientY - ship.getBoundingClientRect().top;
      moveAt(e.pageX, e.pageY);
    }

    // console.log("LISTEN TO MOUSE MOVE");
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);

    document.addEventListener("mousemove", detectMove, { once: true });
    document.addEventListener("touchmove", detectMove, { once: true });

    ship.style.position = "absolute";
    ship.style.zIndex = 1;
  }

  function dragEnd(e) {
    e.preventDefault();

    // console.log("dragEnd");

    isDragging = false;
    isDragginShip = false;

    // console.log("isSnappable:", isSnappable);

    if (!isSnappable) {
      ship.style.position = "static";
      ship.classList.remove("vertical");
    } else {
      ship.style.zIndex = 0;
      ship.classList.remove("snappable");

      dragAndDropObservable.placeShip(extractArrayOfCoordinates(dropTargets));
    }

    dragAndDropObservable.hideDisabledSymbols();

    hasBeenMoved = false;

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);

    if (dropTargets.length > 0) {
      window.addEventListener("resize", moveAfterResize);
    } else {
      window.removeEventListener("resize", moveAfterResize);
    }
  }

  function mouseUpResponse(e) {
    rotateShip();
    dragEnd(e);
  }

  function cancelDrag(e) {
    if (isDragging) {
      // console.log("cancelled drag");
      dragEnd(e);
    }
  }

  function setDropTargets(coordinates) {
    const targets = [];
    for (const c of coordinates) {
      const target = document.querySelector(
        `[data-x="${c[0]}"][data-y="${c[1]}"]`
      );

      targets.push(target);
    }

    isSnappable = true;

    dropTargets = targets;

    window.removeEventListener("resize", moveAfterResize);
    window.addEventListener("resize", moveAfterResize);
  }

  function init() {
    // console.log("init drag and drop:", ship);

    ship.addEventListener("mouseup", mouseUpResponse);
    ship.addEventListener("touchend", mouseUpResponse);

    ship.addEventListener("mousedown", dragStart);
    ship.addEventListener("touchstart", dragStart);

    document.addEventListener("mouseup", cancelDrag);
    document.addEventListener("touchend", cancelDrag);
  }

  return { init, setDropTargets };
}
