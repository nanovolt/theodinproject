import styles from "./AuthButtons.module.css";
import { NavLink } from "react-router-dom";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const AuthButtons = () => {
  const { data: currentUser } = currentUserApiSlice.useMeQuery();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const cn = classNames(styles.link);
  const active = classNames(styles.link, styles.active);

  if (currentUser) {
    return (
      <div className={styles.authButtons}>
        <NavLink
          to="logout"
          className={({ isActive }) => ["someclass", isActive ? `${active}` : `${cn}`].join(" ")}
        >
          {/* <FontAwesomeIcon icon={faExit} className={classNames(styles.toggleIcon, "fa-fw")} /> */}
          Logout
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className={classNames(styles.toggleIcon, "fa-fw")}
          />
        </NavLink>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className={classNames(styles.authButtons, { [styles.column]: isMobile })}>
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
