export default function Player(isComputer = false) {
  const compareArrays = (a, b) => a.every((item, i) => item === b[i]);

  const madeAttacks = [];
  let newRandom = true;

  let lastHit = false;
  let lastSink = false;

  let findAjacent = false;

  let ajacent = [];

  let detectedHits = [];

  const findRow = false;

  // let rowAjacent = [];

  function rememberLastAttack(hit, sunk, coordinates) {
    if (hit) {
      lastHit = true;
      lastSink = false;

      detectedHits.push(coordinates);

      // console.log("player 2 hit a ship");
      if (sunk) {
        // console.log("player 2 sunk a ship");
        lastSink = true;

        detectedHits = [];
      }
    } else {
      // console.log("player 2 missed");
      lastHit = false;
      lastSink = false;
    }
  }

  function findSubArray(arr, sub) {
    for (const item of arr) {
      if (compareArrays(item, sub)) {
        return true;
      }
    }
    return false;
  }

  function getRandomInteger(low, high) {
    const r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
  }

  function smartAttack() {
    if (lastSink) {
      findAjacent = false;
      lastHit = false;
      // rowAjacent = [];
    }

    if (detectedHits.length === 2) {
      // findRow = true;
    }

    if (findRow) {
      // console.log("find row");

      if (detectedHits[0][1] === detectedHits[1][1]) {
        // console.log("row is vertical");
      } else {
        // console.log("row is horizontal");
      }
    }

    if (lastHit && !findRow) {
      // console.log("last hit, try find ajacent");
      findAjacent = true;
      const lastShot = madeAttacks.at(-1);

      let coordinate;
      ajacent = [];

      coordinate = lastShot[1] + 1;
      if (coordinate <= 10) {
        ajacent.push([lastShot[0], coordinate]);
      }

      coordinate = lastShot[0] + 1;
      if (coordinate <= 10) {
        ajacent.push([coordinate, lastShot[1]]);
      }

      coordinate = lastShot[1] - 1;
      if (coordinate >= 1) {
        ajacent.push([lastShot[0], coordinate]);
      }

      coordinate = lastShot[0] - 1;
      if (coordinate >= 1) {
        ajacent.push([coordinate, lastShot[1]]);
      }
    }

    if (findAjacent && !findRow) {
      lastHit = false;
      // console.log("finding ajacent:", JSON.stringify(ajacent));

      const temp = [...ajacent];

      for (let i = 0; i < ajacent.length; i += 1) {
        // console.log("find aj:", ajacent[i]);
        if (!findSubArray(madeAttacks, ajacent[i])) {
          madeAttacks.push(ajacent[i]);
          // console.log("return aj:", ajacent[i]);
          return ajacent[i];
        }

        temp.splice(i, 1);
      }

      ajacent = temp;
    }

    // console.log("random attack");
    let random;
    newRandom = true;
    while (newRandom) {
      const random1 = getRandomInteger(1, 10);
      const random2 = getRandomInteger(1, 10);
      random = [random1, random2];

      if (!findSubArray(madeAttacks, random)) {
        newRandom = false;
        madeAttacks.push(random);
      }
    }
    return random;
  }

  function attack(coordinates = []) {
    if (isComputer) {
      let random;
      newRandom = true;
      while (newRandom) {
        const random1 = getRandomInteger(1, 10);
        const random2 = getRandomInteger(1, 10);
        random = [random1, random2];

        if (!findSubArray(madeAttacks, random)) {
          newRandom = false;
          madeAttacks.push(random);
        }
      }
      return random;
    }

    if (!findSubArray(madeAttacks, coordinates)) {
      madeAttacks.push(coordinates);
    }
    return coordinates;
  }

  return {
    attack,
    smartAttack,
    findSubArray,
    rememberLastAttack,
    get madeAttacks() {
      return madeAttacks;
    },
  };
}
