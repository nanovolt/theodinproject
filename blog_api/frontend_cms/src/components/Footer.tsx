import styles from "./Footer.module.scss";
import classNames from "classnames";

export function Footer() {
  const cn = classNames(styles.App, {});

  return (
    <footer className={cn}>
      <div aria-label="made by nanovolt">nanovolt 2023</div>
    </footer>
  );
}
