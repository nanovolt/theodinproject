import styles from "./Login.module.scss";
import { useTitle } from "../hooks/useTitle";
import { FormEvent, useState } from "react";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { Navigate, useLocation } from "react-router-dom";
import { RouterLocation } from "../types/types";
import { navigationActions, selectInitialRoute } from "../features/routerNavigation/navigation";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const Login = () => {
  useTitle("Log In | Blog CMS");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //

  const [isSent, setIsSent] = useState(false);

  const [login, { isError, error }] = currentUserApiSlice.useLoginMutation();

  const { data: currentUser, isLoading } = currentUserApiSlice.useMeQuery();

  const location = useLocation() as RouterLocation;
  const initialRoute = useAppSelector(selectInitialRoute);
  const dispatch = useAppDispatch();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setUsername("");
    setPassword("");
    //

    setIsSent(true);

    await login({ username, password });
  }

  if (!initialRoute) {
    let newRoute;
    if (location.state?.type === "url") {
      newRoute = location.state.from === "/logout" ? "/" : location.state.from;
    } else {
      newRoute = location.pathname;
    }

    dispatch(navigationActions.setInitialRoute(newRoute));
  }

  if (isLoading) {
    if (location.state?.type === "url") {
      return <></>;
    }

    if (initialRoute === "/login" && location.state?.type !== "link") {
      return <></>;
    }
  }

  if (currentUser) {
    if (initialRoute === "/login" || initialRoute === "/register") {
      return <Navigate to="/" replace />;
    }

    return <Navigate to={initialRoute} replace={true} />;
  }

  if (isError) {
    console.log(error);
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h2>Log In</h2>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isSent}>
          Log In
        </button>
      </form>
    </div>
  );
};
