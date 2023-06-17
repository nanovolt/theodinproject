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
    // istanbul ignore else
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
