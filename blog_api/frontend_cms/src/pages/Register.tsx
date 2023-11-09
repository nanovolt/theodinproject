import styles from "./RegisterForm.module.css";
import { useTitle } from "../hooks/useTitle";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { Navigate, useLocation } from "react-router-dom";
import { RouterLocation } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { navigationActions, selectInitialRoute } from "../features/routerNavigation/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";

type Inputs = {
  username: string;
  password: string;
  confirm_password: string;
};

const RegisterInputSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(2, "Password must be at least 2 characters"),
  confirm_password: z
    .string()
    .min(1, "Password is required")
    .min(2, "Password must be at least 2 characters"),
});

export const Register = () => {
  useTitle("Register | Blog CMS");

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(RegisterInputSchema),
  });

  const [registerUser, { isError, error }] = currentUserApiSlice.useRegisterMutation();

  const { data: currentUser, isLoading } = currentUserApiSlice.useMeQuery();

  const location = useLocation() as RouterLocation;
  const initialRoute = useAppSelector(selectInitialRoute);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, password, confirm_password } = data;

    await registerUser({ username, password, confirm_password });
  };

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

  const usernameCn = classNames(styles.input, {
    [styles.invalid]: errors.username,
    [styles.valid]: touchedFields.username && !errors.username,
  });

  const passwordCn = classNames(styles.input, {
    [styles.invalid]: errors.password,
    [styles.valid]: touchedFields.password && !errors.password,
  });

  const confirmPasswordCn = classNames(styles.input, {
    [styles.invalid]: errors.confirm_password,
    [styles.valid]: touchedFields.confirm_password && !errors.confirm_password,
  });

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formItem}>
          <label htmlFor="username">Username</label>

          <div className={styles.inputAndSymbol}>
            <input className={usernameCn} type="text" id="username" {...register("username")} />

            {errors.username && (
              <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />
            )}
            {touchedFields.username && !errors.username && (
              <FontAwesomeIcon icon={faCheckCircle} className={styles.green} />
            )}
          </div>

          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => (
              <div>
                <span className={styles.errorMessage}>{message}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputAndSymbol}>
            <input className={passwordCn} type="password" id="password" {...register("password")} />

            {errors.password && (
              <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />
            )}
            {touchedFields.password && !errors.password && (
              <FontAwesomeIcon icon={faCheckCircle} className={styles.green} />
            )}
          </div>

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <div>
                <span className={styles.errorMessage}>{message}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="confirm_password">Confirm password</label>
          <div className={styles.inputAndSymbol}>
            <input
              className={confirmPasswordCn}
              type="password"
              id="confirm_password"
              {...register("confirm_password")}
            />

            {errors.confirm_password && (
              <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />
            )}
            {touchedFields.confirm_password && !errors.confirm_password && (
              <FontAwesomeIcon icon={faCheckCircle} className={styles.green} />
            )}
          </div>

          <ErrorMessage
            errors={errors}
            name="confirm_password"
            render={({ message }) => (
              <div>
                <span className={styles.errorMessage}>{message}</span>
              </div>
            )}
          />
        </div>

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          Register
        </button>
      </form>
    </div>
  );
};
