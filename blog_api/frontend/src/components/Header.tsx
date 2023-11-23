import styles from "./Header.module.css";
import "./Header.css";

import { DarkModeButton } from "./DarkModeButton";
import { Logo } from "./Logo";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Navigation } from "./Navigation";
import { Button } from "./Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Drawer } from "../features/drawer/Drawer";
import { drawerActions, selectDrawer } from "../features/drawer/drawerSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(selectDrawer);

  useEffect(() => {
    if (!isMobile && isDrawerOpen) {
      dispatch(drawerActions.close());
      document.body.classList.remove("hide");
    }
  }, [dispatch, isDrawerOpen, isMobile]);

  return (
    <div className={styles.headerWrapper}>
      <header>
        <div className={styles.left}>
          <Logo title="Blog" />
        </div>
        <div className={styles.right}>
          {isMobile ? (
            <>
              <DarkModeButton />
              <Button
                options={{
                  isIcon: true,
                }}
                onClick={() => {
                  dispatch(drawerActions.open());
                  document.body.classList.add("hide");
                }}
              >
                <FontAwesomeIcon icon={faBars} className="fa-fw" />
              </Button>
            </>
          ) : (
            <>
              {<Navigation />}
              <DarkModeButton />
            </>
          )}
        </div>
        {isDrawerOpen && isMobile && <Drawer />}
      </header>
    </div>
  );
}
