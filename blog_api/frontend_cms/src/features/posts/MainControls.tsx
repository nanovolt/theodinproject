import { useCurrentEditor } from "@tiptap/react";
import styles from "./MainControls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorActions, selectIsEdit, selectPost } from "./EditorSlice";
import { postsApiSlice } from "./postsApiSlice";
import toast from "react-hot-toast";
import { validateEditor } from "./EditorValidator";

export const MainControls = () => {
  const { editor } = useCurrentEditor();

  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(selectIsEdit);

  const [createPost, { reset }] = postsApiSlice.useCreatePostMutation({
    fixedCacheKey: "sharedCreatePostKey",
  });

  const post = useAppSelector(selectPost);

  if (!editor) {
    return null;
  }

  async function handlePublish(html: string) {
    const isValid = validateEditor(post, html);

    if (!isValid) {
      return;
    }

    try {
      // console.log("Creating post:", { ...post, content: html, isPublished: true });
      toast.loading("Creating post...", { id: "post" });
      await createPost({ ...post, content: html, isPublished: true }).unwrap();

      editor?.chain().focus().clearContent().run();

      if (isEdit) {
        // await create({ ...post, content: html, isPublished: true });
      } else {
        dispatch(editorActions.clearPost());
      }

      toast.success("Post created", { id: "post" });
    } catch (err) {
      reset();
      toast.error("Failed to create post", { id: "post" });
    }
  }

  return (
    <div className={styles.mainControls}>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            const html = editor.getHTML();
            handlePublish(html);
          }}
        >
          Publish
          <FontAwesomeIcon icon={faUpload} style={{ marginLeft: "8px" }} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            const html = editor.getHTML();

            const isValid = validateEditor(post, html);

            if (!isValid) {
              return;
            }

            dispatch(editorActions.editPost({ key: "content", value: html }));
            dispatch(editorActions.togglePreview());
          }}
        >
          Preview
          <FontAwesomeIcon icon={faNewspaper} style={{ marginLeft: "8px" }} />
        </button>
      </div>
    </div>
  );
};
