import styles from "./Card.module.scss";

import { Product } from "../types/types";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useCart, useCartDispatch } from "../context/CartContext";

type Props = {
  product: Product;
};

export function Card({ product }: Props) {
  const cart = useCart();
  const cartDispatch = useCartDispatch();

  // console.log("cart:", cart);
  const { id, title, price, image } = product;
  const cartItem = cart.items.find((item) => item.id === id);

  return (
    <section className={styles.card} aria-label="Product">
      <h3 className={styles.title}>{title}</h3>
      <img className={styles.image} src={image} alt="" srcSet="" />
      <div className={styles.price} aria-label={`Price: $${price}`}>
        $ {price}
      </div>

      <div className={styles.cartControls}>
        {cartItem && (
          <Button
            onClick={() => {
              cartDispatch({
                type: "removed_item",
                product: product,
              });
            }}
            disabled={cartItem && cartItem.amount <= 1}>
            -
          </Button>
        )}

        {cartItem && (
          <div
            className={styles.amount}
            aria-label={`In the cart: ${cartItem.amount}`}
            aria-live="assertive">
            {cartItem.amount}
          </div>
        )}

        <Button
          disabled={cartItem && cartItem.amount >= 10}
          onClick={() => {
            cartDispatch({
              type: "added_item",
              product: product,
            });
          }}>
          {cartItem ? "+" : "Add to cart"}
        </Button>

        {cartItem && (
          <Link to="/theodinproject/shopping_cart/cart">
            <div className={styles.toCart}>To cart</div>
          </Link>
        )}
      </div>
    </section>
  );
}
