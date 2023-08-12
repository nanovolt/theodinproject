import styles from "./Card.module.scss";

import { useContext } from "react";
import { Product } from "../types/types";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { CartContext } from "../context/CartConext";

export function Card(props: Product) {
  const { addCartItem, removeCartItem, cartItems } = useContext(CartContext);

  const { id, title, price, image } = props;
  const cartItem = cartItems.find((item) => item.id === id);

  return (
    <div className={styles.card} id={String(id)}>
      <div className={styles.title}>{title}</div>
      <img className={styles.image} src={image} alt="" srcSet="" />
      <div className={styles.price}>$ {price}</div>

      <div className={styles.cartControls}>
        {cartItem && (
          <Button
            onClick={() => removeCartItem(props)}
            disabled={cartItem && cartItem.amount <= 1}>
            -
          </Button>
        )}

        {cartItem && <div className={styles.amount}>{cartItem.amount}</div>}

        <Button
          disabled={cartItem && cartItem.amount >= 10}
          onClick={() => addCartItem(props)}>
          {cartItem ? "+" : "Add to cart"}
        </Button>

        {cartItem && (
          <Link to="/theodinproject/shopping_cart/cart">
            <div className={styles.toCart}>To cart</div>
          </Link>
        )}
      </div>
    </div>
  );
}
