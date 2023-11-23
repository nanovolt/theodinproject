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
            to="/posts"
            end
            className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            end
            className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
          >
            Categories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
