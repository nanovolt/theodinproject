import styles from "./Register.module.css";
import { useTitle } from "../hooks/useTitle";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";
import { Navigate, useLocation } from "react-router-dom";
import { RouterLocation } from "../types/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { navigationActions, selectInitialRoute } from "../features/routerNavigation/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormItemInput } from "../components/FormItemInput";
import { FormItemPassword } from "../components/FormItemPassword";
import { FormError } from "../components/FormError";
import { useEffect } from "react";

const RegisterInputSchema = z
  .object({
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
      .min(1, "Confirm password is required")
      .min(2, "Confirm password must be at least 2 characters"),
  })
  .superRefine((values, context) => {
    if (values.password !== values.confirm_password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        message: `Confirm password in not correct`,
      });
    }
    // idk what it does
    // return z.NEVER;
  });

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

type RegisterInputs = z.infer<typeof RegisterInputSchema>;

export const Register = () => {
  useTitle("Register | Blog CMS");

  const formContext = useForm<RegisterInputs>({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: zodResolver(RegisterInputSchema),
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

  const [registerUser, { isError, error: registerError, reset }] =
    currentUserApiSlice.useRegisterMutation();

  const { data: currentUser, isLoading } = currentUserApiSlice.useMeQuery();

  const location = useLocation() as RouterLocation;
  const initialRoute = useAppSelector(selectInitialRoute);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const { username, password, confirm_password } = data;

    try {
      await registerUser({ username, password, confirm_password }).unwrap();
    } catch {
      reset();
    }
  };

  const onInvalid = () => {
    type inputKey = keyof RegisterInputs;
    Object.keys(getValues()).map((inputName) => {
      if (!Object.keys(touchedFields).includes(inputName)) {
        setValue(inputName as inputKey, "", { shouldTouch: true });
      }
    });
  };

  useEffect(() => {
    if (!initialRoute) {
      let newRoute;
      if (location.state?.type === "url") {
        newRoute = location.state.from;
      } else {
        newRoute = location.pathname;
      }
      dispatch(navigationActions.setInitialRoute(newRoute));
    }

    const serverValidationErrorResult = ServerValidationErrorSchema.safeParse(registerError);
    const serverErrorResult = ServerErrorSchema.safeParse(registerError);

    // if got validation errors from server
    // here we get an array of errors
    if (isError && serverValidationErrorResult.success) {
      // if reset() is called, server-side not-validation error will be erased by next form revalidation,
      // see reValidateMode: "onBlur" on useForm params
      reset();
      const errors = serverValidationErrorResult.data.data.errors;
      type inputKey = keyof RegisterInputs;

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
    location.pathname,
    location.state.from,
    location.state?.type,
    registerError,
    reset,
    setError,
  ]);

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

  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>

      <FormProvider {...formContext}>
        <form
          className={styles.registerForm}
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          autoComplete="off"
        >
          <FormItemInput label="Username" name="username" showErrors={true} />
          <FormItemPassword label="Password" name="password" />
          <FormItemPassword label="Confirm password" name="confirm_password" />
          <FormError />

          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            Register
          </button>
        </form>
      </FormProvider>
    </div>
  );
};
