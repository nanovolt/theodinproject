import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

export function Home() {
  useTitle("Shopping cart | Home");

  return (
    <>
      <div className={styles.backgroundImage}>
        <div className={styles.homeHeadings}>
          <h1>Style & fashion</h1>
          <h2>Get some fancy clothes now!</h2>
        </div>
        <Link to="/theodinproject/shopping_cart/shop/all">
          <button className={styles.shopNow}>Shop now</button>
        </Link>
      </div>
    </>
  );
}
