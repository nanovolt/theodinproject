import { useTitle } from "../../hooks/useTitle";
import { TipTapEditor } from "./TipTapEditor";
import styles from "./Editor.module.css";
import { Preview } from "./Preview";
import { PostDetails } from "./PostDetails";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { editorActions, selectIsEdit, selectIsPreview } from "./EditorSlice";
import { useEffect } from "react";

export const Editor = () => {
  const dispatch = useAppDispatch();

  const isPreview = useAppSelector(selectIsPreview);
  const isEdit = useAppSelector(selectIsEdit);

  useTitle(`${isEdit ? "Edit" : "Create"} | Blog CMS`);

  useEffect(() => {
    return () => {
      dispatch(editorActions.clearPost());
      dispatch(editorActions.unsetPreview());
    };
  }, [dispatch]);

  return (
    <div className={styles.editorContainer}>
      <h1 className={styles.pageTitle}>{isEdit ? "Edit" : "Create"}</h1>

      {isPreview && <Preview />}
      <div className={styles.wrapper}>
        {!isPreview && (
          <>
            <TipTapEditor />
            <PostDetails />
          </>
        )}
      </div>
    </div>
  );
};
