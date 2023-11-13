import styles from "./Categories.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { categoriesApiSlice } from "./categoriesSlice";
import { Button } from "../../components/Button/Button";
import { useTitle } from "../../hooks/useTitle";

export const Categories = () => {
  useTitle("Categories | Blog CMS");

  const [input, setInput] = useState("");

  const {
    data: categories,
    isError: isQueryError,
    error,
    isLoading: isCategoriesLoading,
    isSuccess: haveCategories,
  } = categoriesApiSlice.useGetCategoriesQuery();

  const [
    createCategory,
    { isError: isCreateError, isLoading: isCreating, isSuccess: isCreated, reset },
  ] = categoriesApiSlice.useCreateCategoryMutation();

  const [deleteCategory, { isError: isDeleteError, isLoading: isDeleting }] =
    categoriesApiSlice.useDeleteCategoryMutation();

  async function handleCreateCategory() {
    if (!input) {
      return;
    }
    setInput("");
    await createCategory({ title: input });
  }

  async function handleDeleteCategory(_id: string) {
    await deleteCategory({ _id });
  }

  let categoryList = null;
  if (isCategoriesLoading) {
    categoryList = (
      <div className={styles.loading}>
        <FontAwesomeIcon icon={faSync} className={classNames("fa-fw", "fa-spin")} />
      </div>
    );
  }

  if (haveCategories) {
    categoryList = (
      <ul className={styles.categoryList}>
        {categories.map((category) => (
          <li key={category._id} className={styles.listItem}>
            <p>{category.title}</p>
            <Button
              options={{ isIcon: true }}
              onClick={() => {
                console.log("delete", category._id);
                handleDeleteCategory(category._id);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className={classNames("fa-fw")} />
            </Button>
          </li>
        ))}
      </ul>
    );
  }

  if (isCreateError) {
    // console.log("create error");
  }

  if (isQueryError) {
    // console.log(error);
    // console.log("reset");
    categoryList = <p>Category list is empty</p>;
  }

  return (
    <div className={styles.categoriesContainer}>
      <h1>Categories</h1>

      <form
        className={styles.inputAndSubmit}
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCategory();
        }}
      >
        <input
          type="text"
          value={input}
          className={styles.input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.code === "Escape") {
              setInput("");
            }
          }}
          // smart onBlur hanlder
          // clear input only if next click target is not a submit button
          // inside the same closest parent with className "inputAndSubmit"
          onBlur={(e) => {
            const isFormClosestOfRelatedTarget = e.relatedTarget?.closest(
              `.${styles.inputAndSubmit}`
            );
            const isRelatedTargetButton = e.relatedTarget?.tagName === "BUTTON";
            if (!isFormClosestOfRelatedTarget && !isRelatedTargetButton) setInput("");
          }}
        />
        <Button type="submit" options={{ isIcon: true }} disabled={isCreating}>
          Create
        </Button>
      </form>
      {categoryList}
    </div>
  );
};
