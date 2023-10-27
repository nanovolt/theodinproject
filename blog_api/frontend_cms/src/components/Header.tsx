import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { DarkModeButton } from "./DarkModeButton";

export function Header() {
  return (
    <div className={styles.headerWrapper}>
      <header>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
        <DarkModeButton />
      </header>
    </div>
  );
}
