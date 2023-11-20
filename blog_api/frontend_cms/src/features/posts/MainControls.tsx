import { useCurrentEditor } from "@tiptap/react";
import styles from "./MainControls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faPowerOff, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorActions, selectIsEdit, selectPost, selectPostId } from "./EditorSlice";
import { postsApiSlice } from "./postsApiSlice";
import toast from "react-hot-toast";
import { validateEditor } from "./EditorValidator";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bundlePayload } from "./bundlePayload";

export const MainControls = () => {
  const { editor } = useCurrentEditor();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(selectIsEdit);

  const [createPost, { reset }] = postsApiSlice.useCreatePostMutation({
    fixedCacheKey: "sharedCreatePostKey",
  });

  const [update] = postsApiSlice.useUpdatePostMutation();

  const postId = useAppSelector(selectPostId);
  const post = useAppSelector(selectPost);

  const { data: fetchedPost } = postsApiSlice.useGetPostByIdQuery({ id: postId });

  useEffect(() => {
    // imperatively tell editor to load content,
    // otherwise tiptap doesn't load content from selectPost selector
    // when editing for some reason
    editor?.commands.setContent(post.content);
  }, [editor, post.content]);

  if (!editor) {
    return null;
  }

  if (!fetchedPost) {
    return;
  }

  async function handlePublish(html: string) {
    const isValid = validateEditor(post, html);

    if (!isValid) {
      return;
    }

    try {
      toast.loading("Creating post...", { id: "editor" });
      await createPost({ ...post, content: html, isPublished: true }).unwrap();

      editor?.chain().focus().clearContent().run();

      navigate("/posts");

      toast.success("Post created", { id: "editor" });
    } catch (err) {
      reset();
      toast.error("Failed to create post", { id: "editor" });
    }
  }

  async function handlePublishEdit(html: string) {
    const isValid = validateEditor(post, html);

    if (!isValid || !fetchedPost) {
      return;
    }

    try {
      toast.loading("Editing post...", { id: "editor" });

      const { hasPayload, payload } = bundlePayload(post, html, fetchedPost);

      if (hasPayload) {
        await update({ id: postId, payload });
      }

      editor?.chain().focus().clearContent().run();

      navigate("/posts", { replace: true });

      if (hasPayload) {
        toast.success("Post edited", { id: "editor" });
        return;
      }

      toast.error("Edit had no changes", { id: "editor" });
    } catch (err) {
      reset();
      toast.error("Failed to edit post", { id: "editor" });
    }
  }

  return (
    <div className={styles.mainControls}>
      {isEdit && (
        <div className={styles.cancel}>
          <Link to="/posts" className={styles.button} replace>
            Cancel
            <FontAwesomeIcon icon={faPowerOff} style={{ marginLeft: "8px" }} />
          </Link>
        </div>
      )}
      <div>
        <button
          className={styles.button}
          onClick={() => {
            const html = editor.getHTML();
            if (isEdit) {
              handlePublishEdit(html);
              return;
            }
            handlePublish(html);
          }}
        >
          {isEdit ? "Publish Edit" : "Publish"}
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
