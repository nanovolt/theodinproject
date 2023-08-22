import styles from "./CartItem.module.scss";
import { CartItemType } from "../types/types";
import { Button } from "./Button";
import { useCart, useCartDispatch } from "../context/CartContext";

export function CartItem({ item }: { item: CartItemType }) {
  const cart = useCart();
  const cartDispatch = useCartDispatch();
  const cartItem = cart.items.find((i) => i.id === item.id) as CartItemType;

  if (cartItem) {
    return (
      <div key={cartItem.id} className={styles.item}>
        <div className={styles.imageBox}>
          <img className={styles.image} src={cartItem.image} alt="" />
        </div>
        <div className={styles.title}>{cartItem.title}</div>
        <div className={styles.price}>
          <div>Price</div>
          <div>$ {cartItem.price}</div>
        </div>
        <div className={styles.total} aria-label="Total">
          <div>Total </div>
          <div aria-label={`Total: ${cartItem.total}`}>${cartItem.total}</div>
        </div>
        <div className={styles.controls}>
          <Button
            disabled={cartItem.amount <= 1}
            onClick={() => {
              cartDispatch({
                type: "removed_item",
                product: { id: item.id, title: item.title, price: item.price, image: item.image },
              });
            }}
          >
            -
          </Button>
          <div className={styles.amount} aria-label={`amount: ${cartItem.amount}`}>
            {cartItem.amount}
          </div>
          <Button
            disabled={cartItem.amount >= 10}
            onClick={() => {
              cartDispatch({
                type: "added_item",
                product: { id: item.id, title: item.title, price: item.price, image: item.image },
              });
            }}
          >
            +
          </Button>
        </div>

        <div className={styles.delete}>
          <Button
            style={{ backgroundColor: "#fb2d2d" }}
            onClick={() =>
              cartDispatch({
                type: "deleted_item",
                product: {
                  id: cartItem.id,
                  title: cartItem.title,
                  price: cartItem.price,
                  image: cartItem.image,
                },
              })
            }
          >
            Delete X
          </Button>
        </div>
      </div>
    );
  }

  return <>cart item id:{item.id} not found</>;
}
