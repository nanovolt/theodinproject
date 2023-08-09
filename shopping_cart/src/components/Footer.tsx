import styles from "./Footer.module.scss";

import classNames from "classnames";

export function Footer() {
  const cn = classNames(styles.App, {});

  return (
    <footer className={cn}>
      <div>
        Photo by{" "}
        <a href="https://unsplash.com/@mercantile?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Clark Street Mercantile
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/photos/P3pI6xzovu0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </div>
      <div>nanovolt 2023</div>
    </footer>
  );
}
