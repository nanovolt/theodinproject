import { EditorProvider } from "@tiptap/react";

import { MenuBar } from "./MenuBar";
import "./TipTapEditor.css";

import styles from "./TipTapEditor.module.css";
import { extensions } from "./Extentions";
import { selectPost } from "./EditorSlice";
import { useAppSelector } from "../../app/hooks";

export const TipTapEditor = () => {
  const post = useAppSelector(selectPost);

  return (
    <div className={styles.editor}>
      <EditorProvider
        injectCSS={false}
        editorProps={{
          attributes: {
            spellcheck: "false",
          },
        }}
        extensions={extensions}
        content={post.content}
        slotBefore={<MenuBar />}
      >
        {}
      </EditorProvider>
    </div>
  );
};
