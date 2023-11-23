import classNames from "classnames";
import { useDarkModeContext, useDarkModeDispatchContext } from "../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button/Button";
import styles from "./DarkModeButton.module.css";

export function DarkModeButton() {
  const mode = useDarkModeContext();
  const dispatch = useDarkModeDispatchContext();

  return (
    <Button
      options={{
        isIcon: true,
      }}
      onClick={() => {
        dispatch({ type: "toggle" });
      }}
      data-testid="darkModeToggle"
      aria-label="Dark mode toggle switch"
    >
      <FontAwesomeIcon
        icon={mode === "light" ? faMoon : faSun}
        className={classNames(styles.toggleIcon, "fa-fw")}
      />
    </Button>
  );
}
