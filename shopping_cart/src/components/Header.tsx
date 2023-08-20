import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { CartButton } from "./CartButton";
import { DarkModeButton } from "./DarkModeButton";

export function Header() {
  return (
    <div className={styles.wrapper}>
      <header>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/theodinproject/shopping_cart">Home</Link>
            </li>
            <li>
              <Link to="/theodinproject/shopping_cart/shop/all">Shop</Link>
            </li>
            <li>
              <Link to="/theodinproject/shopping_cart/about">About</Link>
            </li>
          </ul>
        </nav>
        <CartButton />
        <DarkModeButton />
      </header>
    </div>
  );
}
