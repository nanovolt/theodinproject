export default function DragAndDrop(s, dragAndDropObservable) {
  const ship = s;
  let shiftX;
  let shiftY;

  let dropTargets = [];

  let isSnappable = false;
  let isDragging = false;

  function detectDropTargets(e) {
    dropTargets = [];
    let DroppableCells = 0;

    // const hoveredCells = document.querySelectorAll(".hovered");
    // for (const a of hoveredCells) {
    //   a.classList.remove("hovered");
    // }

    for (const cell of ship.children) {
      // console.log(cell.getBoundingClientRect());
      const { left, right, top, bottom } = cell.getBoundingClientRect();

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
        // elemBelow.classList.add("hovered");
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

  function snapShip() {
    // console.log("snappable at:", dropTargets);
    const top =
      dropTargets[0].getBoundingClientRect().top +
      document.documentElement.scrollTop;
    const { left } = dropTargets[0].getBoundingClientRect();
    // console.log("top:", top);
    // console.log("left:", left);

    ship.style.top = `${top}px`;
    ship.style.left = `${left}px`;

    // console.log("snapped at:", top, left);
  }

  function moveAt(pageX, pageY) {
    ship.style.left = `${pageX - shiftX}px`;
    ship.style.top = `${pageY - shiftY}px`;
  }

  function onMouseMove(e) {
    // console.log(e);
    moveAt(e.pageX, e.pageY);
    detectDropTargets(e);

    if (isSnappable) {
      snapShip();
      ship.classList.add("snappable");
      // console.log("snap ship");
    } else {
      ship.classList.remove("snappable");
    }
  }

  function onTouchMove(e) {
    moveAt(e.touches[0].pageX, e.touches[0].pageY);
    detectDropTargets(e);

    if (isSnappable) {
      snapShip();
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

  function dragStart(e) {
    e.preventDefault();

    // console.log(e);
    // console.log("dragStart");
    // console.log("dropTargets:", dropTargets);
    isDragging = true;

    dragAndDropObservable.removeShip(extractArrayOfCoordinates(dropTargets));

    dropTargets.forEach((t) => {
      t.classList.add("droppable");
      t.classList.remove("ship");
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);

    if (e.touches) {
      shiftX = e.touches[0].clientX - ship.getBoundingClientRect().left;
      shiftY = e.touches[0].clientY - ship.getBoundingClientRect().top;

      moveAt(e.touches[0].pageX, e.touches[0].pageY);
    } else {
      shiftX = e.clientX - ship.getBoundingClientRect().left;
      shiftY = e.clientY - ship.getBoundingClientRect().top;
      moveAt(e.pageX, e.pageY);
    }

    ship.style.position = "absolute";
    ship.style.zIndex = 1;

    return false;
  }

  function dragEnd(e) {
    e.preventDefault();

    console.log("dragEnd");
    isDragging = false;
    if (!isSnappable) {
      ship.style.position = "static";
    } else {
      dropTargets.forEach((t) => {
        t.classList.remove("droppable");
        t.classList.add("ship");
        ship.style.zIndex = 0;
        ship.classList.remove("snappable");
      });

      dragAndDropObservable.placeShip(extractArrayOfCoordinates(dropTargets));
    }

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
  }

  function cancelDrag(e) {
    if (isDragging) {
      console.log("cancelled drag");
      dragEnd(e);
    }
  }

  function init() {
    // console.log("init drag and drop:", ship);

    ship.addEventListener("mousedown", dragStart);
    ship.addEventListener("touchstart", dragStart);

    ship.addEventListener("mouseup", dragEnd);
    ship.addEventListener("touchend", dragEnd);

    document.addEventListener("mouseup", cancelDrag);
    document.addEventListener("touchend", cancelDrag);
  }

  return { init };
}
