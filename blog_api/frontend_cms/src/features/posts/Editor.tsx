import { useTitle } from "../../hooks/useTitle";
import { TipTapEditor } from "./TipTapEditor";
import styles from "./Editor.module.css";
import { Preview } from "./Preview";
import { PostDetails } from "./PostDetails";
import { useAppSelector } from "../../app/hooks";
import { selectIsEdit, selectIsPreview, selectPost } from "./EditorSlice";

export const Editor = () => {
  const post = useAppSelector(selectPost);

  const isPreview = useAppSelector(selectIsPreview);
  const isEdit = useAppSelector(selectIsEdit);

  useTitle(`${isEdit ? "Edit" : "Create"} | Blog CMS`);

  return (
    <div className={styles.editorContainer}>
      <h1>{isEdit ? "Edit" : "Create"}</h1>

      {isPreview && <Preview />}
      <div className={styles.wrapper}>
        {!isPreview && (
          <>
            <TipTapEditor post={post} />
            <PostDetails post={post} />
          </>
        )}
      </div>
    </div>
  );
};
