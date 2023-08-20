import styles from "./CartItem.module.scss";
import { CartItemType } from "../types/types";
import { Button } from "./Button";
import { useCartDispatch } from "../context/CartContext";

export function CartItem({ item }: { item: CartItemType }) {
  const cartDispatch = useCartDispatch();

  return (
    <div key={item.id} className={styles.item}>
      <div className={styles.imageBox}>
        <img className={styles.image} src={item.image} alt="" />
      </div>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.price}>
        <div>Price</div>
        <div>$ {item.price}</div>
      </div>
      <div className={styles.total}>
        <div>Total</div>
        <div>$ {item.total}</div>
      </div>
      <div className={styles.controls}>
        <Button
          disabled={item.amount <= 1}
          onClick={() => {
            cartDispatch({
              type: "removed_item",
              product: { id: item.id, title: item.title, price: item.price, image: item.image },
            });
          }}
        >
          -
        </Button>
        <div className={styles.amount}>{item.amount}</div>
        <Button
          disabled={item.amount >= 10}
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
              product: { id: item.id, title: item.title, price: item.price, image: item.image },
            })
          }
        >
          Delete X
        </Button>
      </div>
    </div>
  );
}
