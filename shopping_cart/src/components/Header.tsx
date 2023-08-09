import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

type Props = {
  number: number;
  handleToggle: () => void;
};

export function Header({ number, handleToggle }: Props) {
  return (
    <div className={styles.wrapper}>
      <header>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/theodinproject/shopping_cart">Home</Link>
            </li>
            <li>
              <Link to="/theodinproject/shopping_cart/shop">Shop</Link>
            </li>
            <li>
              <Link to="/theodinproject/shopping_cart/about">About</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.cart}>
          {number > 0 && <div className={styles.number}>{number}</div>}
          <Link to="/theodinproject/shopping_cart/cart">
            <button className={styles.cartButton}></button>
          </Link>
        </div>
        <button onClick={handleToggle} className={styles.darkModeToggle}>
          toggle dark mode
        </button>
      </header>
    </div>
  );
}
