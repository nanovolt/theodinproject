import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { DarkModeButton } from "./DarkModeButton";
import { AuthButtons } from "./AuthButtons";
import { Logo } from "./Logo";
import { currentUserApiSlice } from "../features/currentUser/currentUserSlice";

export function Header() {
  const { data: currentUser } = currentUserApiSlice.useMeQuery();

  return (
    <div className={styles.headerWrapper}>
      <header>
        <Logo title="Blog CMS" />
        <nav className={styles.nav}>
          <ul>
            {currentUser && (
              <>
                <li>
                  <Link to="/posts" className={styles.link}>
                    Posts
                  </Link>
                </li>
                <li>
                  <Link to="/create" className={styles.link}>
                    Create
                  </Link>
                </li>
                <li>
                  <Link to="/getuser" className={styles.link}>
                    Get user
                  </Link>
                </li>
              </>
            )}
            <li>
              <AuthButtons />
            </li>
          </ul>
        </nav>

        <DarkModeButton />
      </header>
    </div>
  );
}
