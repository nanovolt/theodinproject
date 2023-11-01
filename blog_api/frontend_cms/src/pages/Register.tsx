import styles from "./RegisterForm.module.scss";
import { useTitle } from "../hooks/useTitle";
import { FormEvent, useState } from "react";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { Navigate, useLocation } from "react-router-dom";
import { RouterLocation } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { navigationActions, selectInitialRoute } from "../features/routerNavigation/navigation";

export const Register = () => {
  useTitle("Register | Blog CMS");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSent, setIsSent] = useState(false);

  const [register, { isError, error }] = currentUserApiSlice.useRegisterMutation();

  const { data: currentUser, isLoading } = currentUserApiSlice.useMeQuery();

  const location = useLocation() as RouterLocation;

  const initialRoute = useAppSelector(selectInitialRoute);

  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setUsername("");
    setPassword("");
    setConfirmPassword("");

    setIsSent(true);

    await register({ username, password, confirm_password: confirmPassword });
  }

  if (!initialRoute) {
    let newRoute;
    if (location.state?.type === "url") {
      newRoute = location.state.from;
    } else {
      newRoute = location.pathname;
    }
    dispatch(navigationActions.setInitialRoute(newRoute));
  }

  if (isLoading) {
    if (location.state?.type === "url") {
      return <></>;
    }

    if (initialRoute === "/register" && location.state?.type !== "link") {
      return <></>;
    }
  }

  if (currentUser) {
    if (initialRoute === "/login" || initialRoute === "/register") {
      return <Navigate to="/" replace />;
    }

    return <Navigate to={initialRoute} replace />;
  }

  if (isError) {
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h2>Register</h2>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="password"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="confirmPassword">confirm password</label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isSent}>
          Submit
        </button>
      </form>
    </div>
  );
};
