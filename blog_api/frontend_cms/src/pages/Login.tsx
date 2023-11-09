import styles from "./Login.module.css";
import { useTitle } from "../hooks/useTitle";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { Navigate, useLocation } from "react-router-dom";
import { RouterLocation } from "../types/types";
import { navigationActions, selectInitialRoute } from "../features/routerNavigation/navigation";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheckCircle,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const LoginInputSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(2, "Password must be at least 2 characters"),
});
// .superRefine((values, contenxt) => {});

const ServerValidationErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    message: z.string(),
    errors: z.array(
      z.object({
        location: z.string(),
        msg: z.string(),
        path: z.string(),
        type: z.string(),
        value: z.string(),
      })
    ),
  }),
});

const ServerErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    message: z.string(),
    error: z.string(),
  }),
});

type LoginInputs = z.infer<typeof LoginInputSchema>;

type ServerError = z.infer<typeof ServerErrorSchema>;
type ServerValidationError = z.infer<typeof ServerValidationErrorSchema>;

export const Login = () => {
  useTitle("Log In | Blog CMS");
  const [seePassword, setSeePassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    getFieldState,
    formState: { errors, isSubmitting, touchedFields, isDirty, isSubmitted },
  } = useForm<LoginInputs>({
    mode: "onTouched",
    reValidateMode: "onBlur",
    resolver: zodResolver(LoginInputSchema),
  });

  const [login, { isError, error: loginError, reset }] = currentUserApiSlice.useLoginMutation();
  const { data: currentUser, isLoading } = currentUserApiSlice.useMeQuery();

  const location = useLocation() as RouterLocation;
  const initialRoute = useAppSelector(selectInitialRoute);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { username, password } = data;
    await login({ username, password });
  };

  const onInvalid = () => {
    type inputKey = keyof LoginInputs;

    Object.keys(getValues()).map((inputName) => {
      if (!Object.keys(touchedFields).includes(inputName)) {
        setValue(inputName as inputKey, "", { shouldTouch: true });
      }
    });
  };

  // useEffect(() => {
  //   // console.log("effect");

  //   ///////////////////////////////////////////////////////////////////////////////////////////////
  //   ///////////////////////////////////////////////////////////////////////////////////////////////

  //   const serverValidationErrorResult = ServerValidationErrorSchema.safeParse(error);
  //   const serverErrorResult = ServerErrorSchema.safeParse(error);

  //   // if got validation errors from server
  //   // here we get an array of errors
  //   if (isError && serverValidationErrorResult.success) {
  //     // console.log("validation error");
  //     const errors = serverValidationErrorResult.data.data.errors;
  //     type inputKey = keyof LoginInputs;

  //     errors.map((err) => {
  //       setError(err.path as inputKey, { message: err.msg });
  //     });

  //     // console.log(serverValidationErrorResult.data.data);
  //   }

  //   // here server validation passes
  //   // but still returns error
  //   // in this case we can't identify individual form input
  //   // so we show general error message at the bottom of form
  //   // or you can you use any error toaster
  //   else if (isError && serverErrorResult.success) {
  //     // console.log("server error");
  //     const errorMessage = serverErrorResult.data.data.error;
  //     // const httpStatusCode = serverErrorResult.data.status;

  //     // console.log(errorMessage);

  //     // console.log("root:", errors.root);
  //     if (!errors.root) {
  //       // reset();
  //       // type inputKey = keyof LoginInputs;
  //       // setError("root.serverError");
  //       // console.log(getValues());
  //       // Object.entries(getValues()).map((inputName) => {
  //       //   resetField(inputName[0] as inputKey, { defaultValue: inputName[1], keepTouched: true });
  //       //   setError(inputName[0] as inputKey, { message: "" });
  //       // });
  //       setError("root.serverError", { message: errorMessage });
  //       // setError("username", { message: "" });
  //       // setError("password", );
  //       // trigger("password");
  //     }
  //   } else if (isError) {
  //     setError("root.serverError", { message: "Unexpected Error" });
  //   }

  //   ///////////////////////////////////////////////////////////////////////////////////////////////
  //   ///////////////////////////////////////////////////////////////////////////////////////////////

  //   // return (
  //   //   <div>
  //   //     <pre>{JSON.stringify(error, null, 2)}</pre>
  //   //   </div>
  //   // );
  //   // error, errors.root, getValues, isError, isSubmitted, resetField, setError,
  // }, [submitCount]);

  // additional logic if form submitted with an empty field,
  // validation stars working funny withiout dirty checking
  // validation disables errors on each input for some reason,
  // even though we configured it to trigger only on blur
  // try to comment out the if (isDirty) block to see the faulty behavior

  // found more elegant workaround,
  // if submitted and not ditry (not touched), do the touch
  if (isSubmitted && !isDirty) {
    // clearErrors();
    // console.log("asdf");
    // console.log(touchedFields);
    // console.log(getValues());
    // type inputKey = keyof LoginInputs;
    // Object.keys(getValues()).map((inputName) => {
    //   // console.log(inputName);
    //   // console.log(Object.keys(touchedFields));
    //   // console.log(Object.keys(touchedFields).includes(inputName));
    //   if (!Object.keys(touchedFields).includes(inputName)) {
    //     setValue(inputName as inputKey, "", { shouldTouch: true });
    //   }
    // });
    // getValues().map((value) => {
    // });
    // Object.entries(touchedFields).map((item) => {
    //   // console.log("item:", item);
    //   console.log("name:", item[0]);
    //   console.log("touched:", item[1]);
    //   type a = keyof Inputs;
    //   // console.log(keyof typeof Inputs);
    //   if (!item[1]) {
    //     setValue(item[0] as a, "", { shouldTouch: true });
    //   }
    // });
    // if (!touchedFields.username) {
    //   setValue("username", "", { shouldTouch: true });
    // }
    // if (!touchedFields.password) {
    //   setValue("password", "", { shouldTouch: true });
    // }
    // console.log(touchedFields);
    // const { isDirty: isUsernameDirty } = getFieldState("username");
    // const username = getValues("username");
    // if (isUsernameDirty && username) {
    // console.log("set username");
    // setValue("username", username, { shouldTouch: true });
    // }
    // const { isDirty: isPasswordDirty } = getFieldState("password");
    // const password = getValues("password");
    // if (isPasswordDirty && password) {
    // console.log("set password");
    // setValue("password", password, { shouldTouch: true });
    // }
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

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

  const serverValidationErrorResult = ServerValidationErrorSchema.safeParse(loginError);
  const serverErrorResult = ServerErrorSchema.safeParse(loginError);

  // console.log(errors);

  // if got validation errors from server
  // here we get an array of errors
  if (isError && serverValidationErrorResult.success) {
    // if reset() is called, server-side not-validation error will be erased by next form revalidation,
    // see reValidateMode: "onBlur" on useForm params
    reset();
    // console.log("validation error");
    const errors = serverValidationErrorResult.data.data.errors;
    type inputKey = keyof LoginInputs;

    errors.map((err) => {
      // console.log(getFieldState("username"));
      if (!getFieldState(err.path as inputKey).error)
        setError(err.path as inputKey, { message: err.msg });
    });

    // console.log(serverValidationErrorResult.data.data);
  }

  // here server validation is passed
  // if server still returns an error
  // in this case we can't identify individual form input
  // so we show general error message at the bottom of form
  // or use any notification toaster
  else if (isError && serverErrorResult.success) {
    // console.log("server error");
    const errorMessage = serverErrorResult.data.data.error;
    // const httpStatusCode = serverErrorResult.data.status;

    // console.log(errorMessage);

    // console.log("root:", errors.root);
    if (!errors.root) {
      // reset();
      // type inputKey = keyof LoginInputs;
      // setError("root.serverError");
      // console.log(getValues());
      // Object.entries(getValues()).map((inputName) => {
      //   resetField(inputName[0] as inputKey, { defaultValue: inputName[1], keepTouched: true });
      //   setError(inputName[0] as inputKey, { message: "" });
      // });
      setError("root.serverError", { message: errorMessage });
      // setError("username", { message: "" });
      // setError("password", );
      // trigger("password");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

  // const serverError = null;

  // console.log("isSubmitting:", isSubmitting);
  // console.log("errors.root :", errors.root);
  // console.log("touchedFields.username:", touchedFields.username);
  // console.log("errors.username:", errors.username);

  // const usernameCn = classNames(styles.inputAndSymbol, {
  //   [styles.invalid]: errors.username,
  //   [styles.valid]: touchedFields.username && !errors.username && !isSubmitted,
  // });

  // const passwordCn = classNames(styles.inputAndSymbol, {
  //   [styles.invalid]: errors.password,
  //   [styles.valid]: touchedFields.password && !errors.password && !isSubmitted,
  // });

  return (
    <div className={styles.formContainer}>
      <h2>Log In</h2>

      <form
        className={styles.loginForm}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        autoComplete="off"
      >
        <div className={styles.formItem}>
          <label htmlFor="username">Username</label>

          <div className={styles.inputAndSymbol}>
            <div className={styles.inputBox}>
              <input className={styles.input} type="text" id="username" {...register("username")} />
            </div>

            <span className={styles.iconBox}>
              {errors.username && (
                <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />
              )}

              {!errors.username && touchedFields.username && !isSubmitting && !errors.root && (
                <FontAwesomeIcon icon={faCheckCircle} className={styles.green} />
              )}
            </span>
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
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                type={seePassword ? "text" : "password"}
                id="password"
                {...register("password")}
              />

              <button
                className={styles.seePassword}
                type="button"
                onClick={() => {
                  // setFocus("password");

                  // focus is broken,
                  // can't use two refs on the same input element
                  // if (passwordRef.current) {
                  // passwordRef.current.focus();
                  // passwordRef.current.setSelectionRange(0, 0);
                  // }

                  setSeePassword((prev) => !prev);
                }}
              >
                {seePassword ? (
                  <FontAwesomeIcon icon={faLockOpen} className={styles.iconColor} />
                ) : (
                  <FontAwesomeIcon icon={faLock} className={styles.iconColor} />
                )}
              </button>
            </div>

            <span className={styles.iconBox}>
              {errors.password && (
                <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />
              )}

              {!errors.password && !isSubmitting && touchedFields.password && !errors.root && (
                <FontAwesomeIcon icon={faCheckCircle} className={styles.green} />
              )}
            </span>
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

        {errors.root?.serverError && (
          <div className={styles.serverError}>
            <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />
            <p>{errors.root.serverError.message}</p>
          </div>
        )}

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          Log In
        </button>
      </form>
    </div>
  );
};
