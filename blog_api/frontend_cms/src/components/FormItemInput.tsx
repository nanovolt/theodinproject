import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "@hookform/error-message";
import styles from "./FormItemInput.module.css";
import { useFormContext } from "react-hook-form";

type Props = {
  label?: string;
  name: string;
  showErrors?: boolean;
};

export const FormItemInput = ({ label, name, showErrors }: Props) => {
  const {
    register,
    formState: { touchedFields, isSubmitting, errors },
  } = useFormContext();

  return (
    <div className={styles.formItem}>
      {label && <label htmlFor={name}>{label}</label>}

      <div className={styles.inputAndSymbol}>
        <div className={styles.inputBox}>
          <input className={styles.input} type="text" id={name} {...register(name)} />
        </div>

        {showErrors && (
          <span className={styles.iconBox}>
            {errors[name] && (
              <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />
            )}

            {!errors[name] && touchedFields[name] && !isSubmitting && !errors.root && (
              <FontAwesomeIcon icon={faCheckCircle} className={styles.green} />
            )}
          </span>
        )}
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <div>
            <span className={styles.errorMessage}>{message}</span>
          </div>
        )}
      />
    </div>
  );
};
