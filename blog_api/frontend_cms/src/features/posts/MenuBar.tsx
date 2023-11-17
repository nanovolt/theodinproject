import { useCurrentEditor } from "@tiptap/react";
import styles from "./MenuBar.module.css";
import { MainControls } from "./MainControls";
import { EditControls } from "./EditControls";

export const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.menuBar}>
      <MainControls />
      <EditControls />
    </div>
  );
};
