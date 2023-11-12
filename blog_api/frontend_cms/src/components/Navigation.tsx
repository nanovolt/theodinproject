import classNames from "classnames";
import styles from "./Navigation.module.css";

import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const cn = classNames(styles.link);
  const active = classNames(styles.link, styles.active);

  return (
    <nav>
      <ul className={styles.linkList}>
        <li>
          <NavLink
            to="/create"
            className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
          >
            Create
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/posts"
            className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
          >
            Categories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
