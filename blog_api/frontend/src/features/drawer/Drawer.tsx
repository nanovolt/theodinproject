import { Navigation } from "../../components/Navigation";
import { useClickTarget } from "../../hooks/useClickTarget";
import styles from "./Drawer.module.css";
import { useEffect, useRef } from "react";
import { drawerActions, selectDrawer } from "./drawerSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button } from "../../components/Button/Button";
import classNames from "classnames";

export const Drawer = () => {
  const isDrawerOpen = useAppSelector(selectDrawer);

  const dispatch = useAppDispatch();

  const backdropRef = useRef(null);
  const target = useClickTarget();

  useEffect(() => {
    if (target && ((target as HTMLElement).closest("a") || target === backdropRef.current)) {
      dispatch(drawerActions.close());
      document.body.classList.remove("hide");
    }
  }, [dispatch, target]);

  return (
    <>
      <div className={styles.backdrop} ref={backdropRef}></div>
      <div className={classNames(styles.drawer, { [styles.open]: isDrawerOpen })}>
        <Button
          options={{
            isIcon: true,
          }}
          onClick={() => {
            dispatch(drawerActions.close());
            document.body.classList.remove("hide");
          }}
        >
          X
        </Button>
        {<Navigation />}
      </div>
    </>
  );
};
