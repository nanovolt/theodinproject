import { useEffect } from "react";
import styles from "./About.module.scss";

export function About() {
  useEffect(() => {
    document.title = "Shopping cart | About";
  }, []);

  return (
    <div className={styles.about}>
      <h2 aria-label="About us">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quo obcaecati expedita
        voluptate magni amet voluptates consequatur beatae ex dignissimos.
      </h2>
      <div>API used:</div>
      <a href="https://fakestoreapi.com/">https://fakestoreapi.com/</a>
    </div>
  );
}
