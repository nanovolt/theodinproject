import { useNumber } from "../App";
import "./Cart.module.scss";

export function Cart() {
  const { cartNumber } = useNumber();

  return (
    <>
      <h1> Cart</h1>
      <div>Total items: {cartNumber}</div>
    </>
  );
}
