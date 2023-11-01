import styles from "./AuthButtons.module.scss";
import { NavLink } from "react-router-dom";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";

export const AuthButtons = () => {
  const { data: currentUser } = currentUserApiSlice.useMeQuery();

  return (
    <div className={styles.authButtons}>
      {currentUser ? (
        <>
          <NavLink to="logout">Log Out</NavLink>
        </>
      ) : (
        <>
          <NavLink to="login" replace state={{ from: "link", type: "link" }}>
            Log In
          </NavLink>
          <NavLink to="register" replace state={{ from: "link", type: "link" }}>
            Register
          </NavLink>
        </>
      )}
    </div>
  );
};
