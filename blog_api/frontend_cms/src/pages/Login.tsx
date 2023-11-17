import styles from "./Login.module.css";
import { useTitle } from "../hooks/useTitle";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { Navigate, useLocation } from "react-router-dom";
import { RouterLocation } from "../types/types";
import { navigationActions, selectInitialRoute } from "../features/routerNavigation/navigation";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormItemInput } from "../components/FormItemInput";
import { FormItemPassword } from "../components/FormItemPassword";
import { FormError } from "../components/FormError";
import { ServerErrorSchema, ServerValidationErrorSchema } from "../zod/serverErrorsValidation";
import { useEffect } from "react";
// import { DevTool } from "@hookform/devtools";

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

type LoginInputs = z.infer<typeof LoginInputSchema>;
// type ServerError = z.infer<typeof ServerErrorSchema>;
// type ServerValidationError = z.infer<typeof ServerValidationErrorSchema>;

export const Login = () => {
  useTitle("Log In | Blog CMS");

  const formContext = useForm<LoginInputs>({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: zodResolver(LoginInputSchema),
  });

  const {
    handleSubmit,
    setError,
    setValue,
    getValues,
    getFieldState,
    // control,
    formState: { errors, isSubmitting, touchedFields },
  } = formContext;

  const [login, { isError, error: loginError, reset }] = currentUserApiSlice.useLoginMutation();
  const { data: currentUser, isLoading } = currentUserApiSlice.useMeQuery();

  const location = useLocation() as RouterLocation;
  const initialRoute = useAppSelector(selectInitialRoute);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { username, password } = data;

    try {
      await login({ username, password }).unwrap();
    } catch {
      // reset();
    }
  };

  const onInvalid = () => {
    type inputKey = keyof LoginInputs;

    Object.keys(getValues()).map((inputName) => {
      if (!Object.keys(touchedFields).includes(inputName)) {
        setValue(inputName as inputKey, "", { shouldTouch: true });
      }
    });
  };

  let newRoute = "";

  useEffect(() => {
    if (!initialRoute) {
      dispatch(navigationActions.setInitialRoute(newRoute));
    }

    const serverValidationErrorResult = ServerValidationErrorSchema.safeParse(loginError);
    const serverErrorResult = ServerErrorSchema.safeParse(loginError);

    // if got validation errors from server
    // here we get an array of errors
    if (isError && serverValidationErrorResult.success) {
      // if reset() is called, server-side not-validation error will be erased by next form revalidation,
      // see reValidateMode: "onBlur" on useForm params
      reset();
      console.log("reset");

      const errors = serverValidationErrorResult.data.data.errors;
      type inputKey = keyof LoginInputs;

      errors.map((err) => {
        if (!getFieldState(err.path as inputKey).error)
          setError(err.path as inputKey, { message: err.msg });
      });
    }

    // here server validation is passed
    // if server still returns an error
    // in this case we can't identify individual form input
    // so we show general error message at the bottom of form
    // or use any notification toaster
    else if (isError && serverErrorResult.success) {
      const errorMessage = serverErrorResult.data.data.error;
      if (!errors.root) {
        setError("root.serverError", { message: errorMessage });
      }
    } else if (isError && !serverValidationErrorResult.success && !serverErrorResult.success) {
      setError("root.serverError", { message: "Unexpected Error. Try again later" });
    }
  }, [
    dispatch,
    errors.root,
    getFieldState,
    initialRoute,
    isError,
    loginError,
    newRoute,
    reset,
    setError,
  ]);

  if (!initialRoute) {
    if (location.state?.type === "url") {
      newRoute = location.state.from === "/logout" ? "/" : location.state.from;
    } else {
      newRoute = location.pathname;
    }

    // console.log("new route:", newRoute);
    // dispatch(navigationActions.setInitialRoute(newRoute));
  }

  if (!isSubmitting && isLoading) {
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

  return (
    <div className={styles.formContainer}>
      {/* <DevTool control={control} /> */}
      <h2>Log In</h2>
      <FormProvider {...formContext}>
        <form
          className={styles.loginForm}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          autoComplete="off"
        >
          <FormItemInput label="Username" name="username" showErrors={true} />
          <FormItemPassword label="Password" name="password" />
          <FormError />

          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            Log In
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
