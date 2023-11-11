import styles from "./AuthButtons.module.css";
import { NavLink } from "react-router-dom";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import classNames from "classnames";

export const AuthButtons = () => {
  const { data: currentUser } = currentUserApiSlice.useMeQuery();

  const cn = classNames(styles.link);
  const active = classNames(styles.link, styles.active);

  if (currentUser) {
    return (
      <div className={styles.authButtons}>
        <NavLink to="logout"> Log Out</NavLink>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className={styles.authButtons}>
        <NavLink
          to="login"
          replace
          state={{ from: "link", type: "link" }}
          className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
        >
          Log In
        </NavLink>
        <NavLink
          to="register"
          replace
          state={{ from: "link", type: "link" }}
          className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
        >
          Register
        </NavLink>
      </div>
    );
  }
};
