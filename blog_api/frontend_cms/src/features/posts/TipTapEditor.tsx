import { EditorProvider, FloatingMenu, BubbleMenu } from "@tiptap/react";

import { MenuBar } from "./MenuBar";
import styles from "./TipTapEditor.module.css";
import "./TipTapEditor.css";
import { extensions } from "./Extentions";
import { Post } from "./EditorSlice";

type TipTapEditorProps = {
  post: Post;
};

export const TipTapEditor = ({ post }: TipTapEditorProps) => {
  return (
    <div className={styles.editor}>
      <EditorProvider
        injectCSS={false}
        editorProps={{
          attributes: {
            spellcheck: "true",
          },
        }}
        extensions={extensions}
        content={post.content}
        slotBefore={<MenuBar />}
      >
        {/* <StateHandler /> */}
        <FloatingMenu>menu</FloatingMenu>
        <BubbleMenu>menu</BubbleMenu>
      </EditorProvider>
    </div>
  );
};
