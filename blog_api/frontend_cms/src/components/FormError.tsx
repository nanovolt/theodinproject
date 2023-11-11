import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";
import styles from "./FormError.module.css";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export const FormError = () => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {errors.root?.serverError && (
        <div className={styles.serverError}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p>{errors.root.serverError.message}</p>
        </div>
      )}
    </>
  );
};
