import styles from "./CartButton.module.scss";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

export function CartButton() {
  const cart = useCart();

  return (
    <Link to="/theodinproject/shopping_cart/cart">
      {/* <div className={styles.cartButton}>
        {currentAmount > 0 && (
          <div className={styles.number}>{currentAmount}</div>
        )}
        <button>Cart</button>
      </div> */}
      <span className="fa-layers fa-fw fa-2x">
        <FontAwesomeIcon icon={faShoppingCart} className={styles.cart} />
        <span className="fa-layers-counter fa-layers-top-left" style={{ background: "Tomato" }}>
          {cart.itemsAmount}
        </span>
      </span>
    </Link>
  );
}
