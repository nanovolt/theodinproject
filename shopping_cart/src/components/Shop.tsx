import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Shop.module.scss";

export function Shop() {
  useEffect(() => {
    document.title = "Shopping cart | Shop";
  }, []);

  return (
    <div className={styles.shop}>
      <div className={styles.left}>
        <h2>Category</h2>
        <div className={styles.categories}>
          <div className="category">
            <NavLink
              to="all"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
            >
              All
            </NavLink>
          </div>
          <div className="category">
            <NavLink
              to="men's-clothing"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
            >
              Men's clothing
            </NavLink>
          </div>
          <div className="category">
            <NavLink
              to="women's-clothing"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
            >
              Women's clothing
            </NavLink>
          </div>
          <div className="category">
            <NavLink
              to="jewelery"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
            >
              Jewelery
            </NavLink>
          </div>
          <div className="category">
            <NavLink
              to="electronics"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? styles.active : ""
              }
            >
              Electronics
            </NavLink>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
}
