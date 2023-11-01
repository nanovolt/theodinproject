import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
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
                  <Link to="/posts">Posts</Link>
                </li>
                <li>
                  <Link to="/create">Create</Link>
                </li>
                <li>
                  <Link to="/getuser">Get user</Link>
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
