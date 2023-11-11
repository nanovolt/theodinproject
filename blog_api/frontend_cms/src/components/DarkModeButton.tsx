import styles from "./DarkModeButton.module.css";
import classNames from "classnames";
import { useDarkModeContext, useDarkModeDispatchContext } from "../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export function DarkModeButton() {
  const mode = useDarkModeContext();
  const dispatch = useDarkModeDispatchContext();

  const cn = classNames("fa-2x", styles.toggleIcon);

  return (
    <button
      onClick={() => {
        dispatch({ type: "toggle" });
      }}
      className={styles.darkModeToggle}
      data-testid="darkModeToggle"
      aria-label="Dark mode toggle switch"
    >
      <FontAwesomeIcon icon={mode === "light" ? faMoon : faSun} className={cn} />
    </button>
  );
}
