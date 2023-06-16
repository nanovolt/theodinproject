// export default class Ship {
//   constructor(length = 0, hits = 0, isSunk = false) {
//     this.length = length;
//     this.hits = hits;
//     this.isSunk = isSunk;
//   }

//   hit() {
//     if (this.hits < this.length) {
//       this.hits += 1;
//     }
//     return this;
//   }

//   getHits() {
//     return this.hits;
//   }
// }

export default function ShipFactory(
  lengthArg = 0,
  hitsArg = 0,
  isSunkArg = false
) {
  const length = lengthArg;
  let hits = hitsArg;
  let isSunkState = isSunkArg;

  function sink() {
    isSunkState = true;
  }

  function hit() {
    if (hits < length) {
      hits += 1;
    }

    if (hits >= length) {
      sink();
    }

    return this;
  }

  const getLength = () => length;
  const getHits = () => hits;
  const isSunk = () => isSunkState;

  return { hit, getLength, getHits, isSunk };
}
