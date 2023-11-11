import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormContext } from "react-hook-form";
import styles from "./FormItemPassword.module.css";
import { useState } from "react";
import {
  faCheckCircle,
  faExclamationTriangle,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  label: string;
  name: string;
};

export const FormItemPassword = ({ label, name }: Props) => {
  const {
    register,
    formState: { touchedFields, isSubmitting, errors },
  } = useFormContext();

  const [seePassword, setSeePassword] = useState(false);

  return (
    <div className={styles.formItem}>
      <label htmlFor={name}>{label}</label>

      <div className={styles.inputAndSymbol}>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type={seePassword ? "text" : "password"}
            id={name}
            {...register(name)}
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
          {errors[name] && <FontAwesomeIcon icon={faExclamationTriangle} className={styles.red} />}

          {!errors[name] && !isSubmitting && touchedFields[name] && !errors.root && (
            <FontAwesomeIcon icon={faCheckCircle} className={styles.green} />
          )}
        </span>
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
