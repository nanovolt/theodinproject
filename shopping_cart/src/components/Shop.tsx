import { Outlet } from "react-router-dom";
import styles from "./Shop.module.scss";
import { useTitle } from "../hooks/useTitle";
import { CategoryList } from "./CategoryList";

export function Shop() {
  useTitle("Shopping cart | Shop");

  return (
    <div className={styles.shop}>
      <div className={styles.left}>
        <CategoryList
          list={[
            { id: 1, category: "All", to: "all" },
            { id: 2, category: "Men's clothing", to: "men's-clothing" },
            { id: 3, category: "Women's clothing", to: "women's-clothing" },
            { id: 4, category: "Jewelery", to: "jewelery" },
            { id: 5, category: "Electronics", to: "electronics" },
          ]}
        />
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}
