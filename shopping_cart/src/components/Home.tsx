import { useEffect } from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

export function Home() {
  useEffect(() => {
    document.title = "Shopping cart | Home";
  }, []);

  return (
    <>
      <div className={styles.backgroundImage}>
        <div className={styles.homeHeadings}>
          <h1>Style & fashion</h1>
          <h2>Get some fancy clothes now!</h2>
        </div>
        <Link to="/theodinproject/shopping_cart/shop">
          <button className={styles.shopNow}>Shop now</button>
        </Link>
      </div>
    </>
  );
}
