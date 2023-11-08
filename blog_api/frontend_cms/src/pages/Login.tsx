import styles from "./Login.module.scss";
import { useTitle } from "../hooks/useTitle";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { Navigate, useLocation } from "react-router-dom";
import { RouterLocation } from "../types/types";
import { navigationActions, selectInitialRoute } from "../features/routerNavigation/navigation";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

type Inputs = {
  username: string;
  password: string;
};

const LoginInputSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(2, "Password must be at least 2 characters"),
});
// .superRefine((values, contenxt) => {});

// const LoginServerErrorSchema = z.object({
//   status: z.number(),
//   data: z.object({
//     message: z.string(),
//     errors: z.array(z.string()).optional(),
//   }),
// });

// type LoginInputs = z.infer<typeof LoginInputSchema>;
// type LoginServerErrors = z.infer<typeof LoginServerErrorSchema>;

export const Login = () => {
  useTitle("Log In | Blog CMS");

  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(LoginInputSchema),
  });

  const [login, { isError, error }] = currentUserApiSlice.useLoginMutation();

  const { data: currentUser, isLoading } = currentUserApiSlice.useMeQuery();

  const location = useLocation() as RouterLocation;
  const initialRoute = useAppSelector(selectInitialRoute);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, password } = data;

    await login({ username, password });
    console.log(data);
  };

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

    // if (error) {
    //   if (error?.data) {
    //     console.log(error.data);
    //   }
    // }

    // return (
    //   <div>
    //     <pre>{JSON.stringify(error, null, 2)}</pre>
    //   </div>
    // );
  }

  const usernameCn = classNames({
    [styles.invalid]: errors.username,
    [styles.valid]: touchedFields.username && !errors.username,
  });

  const passwordCn = classNames({
    [styles.invalid]: errors.password,
    [styles.valid]: touchedFields.password && !errors.password,
  });

  return (
    <div className={styles.formContainer}>
      <h2>Log In</h2>

      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
                <span>{message}</span>
              </div>
            )}
          />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="password">password</label>
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
                <span>{message}</span>
              </div>
            )}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          Log In
        </button>
      </form>
    </div>
  );
};
