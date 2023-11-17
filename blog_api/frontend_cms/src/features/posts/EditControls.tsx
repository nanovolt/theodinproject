import { useCurrentEditor } from "@tiptap/react";
import styles from "./EditControls.module.css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faEraser, faItalic, faStrikethrough } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { editorActions } from "./EditorSlice";

export const EditControls = () => {
  const { editor } = useCurrentEditor();

  const dispatch = useAppDispatch();

  if (!editor) {
    return null;
  }

  const bold = classNames({ [styles.active]: editor.isActive("bold") });
  const italic = classNames({ [styles.active]: editor.isActive("italic") });
  const strike = classNames({ [styles.active]: editor.isActive("strike") });

  return (
    <div className={styles.editControls}>
      <div className={styles.group}>
        <button
          onClick={() => {
            editor.chain().focus().clearContent().run();
            dispatch(editorActions.clearPost());
          }}
        >
          <FontAwesomeIcon icon={faEraser} />
        </button>
      </div>
      <hr />
      <div className={styles.group}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={bold}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={italic}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={strike}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
      </div>
      <hr />

      <div className={styles.group}></div>
    </div>
  );
};
