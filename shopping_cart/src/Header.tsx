import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

type Props = {
  handleToggle: () => void;
};

export function Header({ handleToggle }: Props) {
  return (
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
      <button onClick={handleToggle}>toggle dark mode</button>
    </header>
  );
}
