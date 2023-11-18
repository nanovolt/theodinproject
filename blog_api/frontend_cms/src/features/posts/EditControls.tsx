import { useCurrentEditor } from "@tiptap/react";
import styles from "./EditControls.module.css";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faCode,
  faEraser,
  faFileCode,
  faHeading,
  faItalic,
  faLink,
  faLinkSlash,
  faListOl,
  faListUl,
  faMinus,
  faQuoteLeft,
  faRedo,
  faStrikethrough,
  faUnderline,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../app/hooks";
import { editorActions } from "./EditorSlice";
import { useCallback } from "react";

export const EditControls = () => {
  const { editor } = useCurrentEditor();

  const dispatch = useAppDispatch();

  const setLink = useCallback(() => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  if (!editor) {
    return null;
  }

  const bold = classNames({ [styles.active]: editor.isActive("bold") });
  const italic = classNames({ [styles.active]: editor.isActive("italic") });
  const underline = classNames({ [styles.active]: editor.isActive("underline") });
  const strike = classNames({ [styles.active]: editor.isActive("strike") });
  const quote = classNames({ [styles.active]: editor.isActive("blockquote") });
  const bulletList = classNames({ [styles.active]: editor.isActive("bulletList") });
  const orderedList = classNames({ [styles.active]: editor.isActive("orderedList") });
  const link = classNames({ [styles.active]: editor.isActive("link") });

  const h1 = classNames({ [styles.active]: editor.isActive("heading", { level: 1 }) });
  const h2 = classNames({ [styles.active]: editor.isActive("heading", { level: 2 }) });
  const h3 = classNames({ [styles.active]: editor.isActive("heading", { level: 3 }) });
  const h4 = classNames({ [styles.active]: editor.isActive("heading", { level: 4 }) });

  const left = classNames({ [styles.active]: editor.isActive({ textAlign: "left" }) });
  const center = classNames({ [styles.active]: editor.isActive({ textAlign: "center" }) });
  const right = classNames({ [styles.active]: editor.isActive({ textAlign: "right" }) });

  const code = classNames({ [styles.active]: editor.isActive("code") });

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
      {/* <hr /> */}
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
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={underline}
        >
          <FontAwesomeIcon icon={faUnderline} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={strike}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          className={quote}
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
        </button>
      </div>
      {/* <hr /> */}
      <div className={styles.group}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={bulletList}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={orderedList}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
        <button onClick={setLink} className={link}>
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
        >
          <FontAwesomeIcon icon={faLinkSlash} />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </div>
      {/* <hr /> */}
      <div className={styles.group}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={h1}
        >
          <FontAwesomeIcon icon={faHeading} />1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={h2}
        >
          <FontAwesomeIcon icon={faHeading} />2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={h3}
        >
          <FontAwesomeIcon icon={faHeading} />3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={h4}
        >
          <FontAwesomeIcon icon={faHeading} />4
        </button>
      </div>

      <div className={styles.group}>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={left}>
          <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={center}
        >
          <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={right}
        >
          <FontAwesomeIcon icon={faAlignRight} />
        </button>
      </div>
      <div className={styles.group}>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={code}>
          <FontAwesomeIcon icon={faCode} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <FontAwesomeIcon icon={faFileCode} />
        </button>
      </div>
      <div className={styles.group}>
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
      {/* <div className={styles.group}></div> */}
    </div>
  );
};
