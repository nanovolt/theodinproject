// import { useAddCartItem } from "../App";
import styles from "./Cart.module.scss";
import { useContext } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useCart, useCartDispatch } from "../context/CartContext";
import { CartItem } from "./CartItem";

export function Cart() {
  const cart = useCart();
  const cartDispatch = useCartDispatch();

  if (cart.itemsAmount === 0) {
    return (
      <div className={styles.empty}>
        <h2>Cart is empty</h2>
        <Link to="/theodinproject/shopping_cart/shop/all">To shop</Link>
      </div>
    );
  }

  return (
    <section className={styles.cart}>
      <div className={styles.left}>
        <h2>Cart</h2>

        <div>Total items: {cart.itemsAmount}</div>
        <div className={styles.items}>
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className={styles.purchase}>
        <h2>Payment</h2>
        <div className={styles.grandTotal}>Total: $ {cart.grandTotal}</div>
        <Button
          onClick={() => {
            cartDispatch({
              type: "cleared_cart",
            });
          }}
          className={styles.purchaseButton}>
          Purchase
        </Button>
      </div>
    </section>
  );
}
