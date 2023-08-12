// import { useAddCartItem } from "../App";
import styles from "./Cart.module.scss";
import { useContext } from "react";
import { Button } from "./Button";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartConext";

export function Cart() {
  // const { cartNumber } = useNumber();
  const {
    cartItems,
    addCartItem,
    currentAmount,
    removeCartItem,
    grandTotal,
    deleteCartItem,
    clearCart,
  } = useContext(CartContext);
  // console.log(cartItems);

  if (currentAmount === 0) {
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

        <div>Total items: {currentAmount}</div>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              addCartItem={addCartItem}
              removeCartItem={removeCartItem}
              deleteCartItem={deleteCartItem}
            />
          ))}
        </div>
      </div>
      <div className={styles.purchase}>
        <h2>Payment</h2>
        <div className={styles.grandTotal}>Total: $ {grandTotal}</div>
        <Button onClick={clearCart} className={styles.purchaseButton}>
          Purchase
        </Button>
      </div>
    </section>
  );
}
