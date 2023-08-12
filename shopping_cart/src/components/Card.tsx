import styles from "./Card.module.scss";

import { CartContext } from "../App";
import { useContext } from "react";
import { Product } from "../types/types";
import { Link } from "react-router-dom";
import { Button } from "./Button";

// product type was Product
export function Card(product: Product) {
  const { addCartItem, removeCartItem, cartItems } = useContext(CartContext);

  const { id, title, price, image } = product;
  const item = cartItems.find((item) => item.id === id);

  return (
    <div className={styles.card} id={String(id)}>
      <div className={styles.title}>{title}</div>
      <img className={styles.image} src={image} alt="" srcSet="" />
      <div className={styles.price}>$ {price}</div>

      <div className={styles.cartControls}>
        {item && (
          <Button
            onClick={() => removeCartItem(item)}
            disabled={item && item.amount <= 1}>
            -
          </Button>
          // <button
          //   className={styles.addRemove}
          //   disabled={item && item.amount <= 1}
          //   onClick={() => removeCartItem(product)}>
          //   -
          // </button>
        )}
        {item && <div className={styles.amount}>{item.amount}</div>}
        <Button
          disabled={item && item.amount >= 10}
          onClick={() => addCartItem(product)}>
          {item ? "+" : "Add to cart"}
        </Button>

        {item && (
          <Link to="/theodinproject/shopping_cart/cart">
            <div className={styles.toCart}>To cart</div>
          </Link>
        )}
      </div>

      {/* {item?.amount > 0 && (
        <button onClick={() => addCartItem(product)}>+</button>
      )} */}
      {/* <button onClick={() => removeCartItem(product)}>+</button> */}
    </div>
  );
}
