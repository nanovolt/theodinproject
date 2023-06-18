export default function Player(b, computer = false) {
  const board = b;

  const compareArrays = (a, b) => a.every((item, i) => item === b[i]);

  const madeAttacks = [];
  let newRandom = true;

  function findSubArray(arr, sub) {
    for (const item of arr) {
      // console.log("comparing:", item, "and", sub);
      if (compareArrays(item, sub)) {
        // console.log("found");
        return true;
      }
    }
    return false;
  }

  function getRandomInteger(low, high) {
    const r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
  }

  function attack(coordinates = []) {
    if (computer) {
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
      // console.log("random:", random);
      return board.receiveAttack(random);
    }

    return board.receiveAttack(coordinates);
  }
  return { attack };
}
