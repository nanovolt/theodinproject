import { Link, useRouteError } from "react-router-dom";
import styles from "./Error.module.scss";

export function Error() {
  const e: any = useRouteError();

  return (
    <div className={styles.error}>
      <h1>{e.status}</h1>
      <h2>{e.statusText}</h2>
      <Link to="/theodinproject/shopping_cart">To home</Link>
    </div>
  );
}
