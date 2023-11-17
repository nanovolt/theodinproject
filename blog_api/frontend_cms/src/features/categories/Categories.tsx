import styles from "./Categories.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { categoriesApiSlice } from "./categoriesApiSlice";
import { Button } from "../../components/Button/Button";
import { useTitle } from "../../hooks/useTitle";
import toast from "react-hot-toast";

export const Categories = () => {
  useTitle("Categories | Blog CMS");

  const [input, setInput] = useState("");

  const {
    data: categories,
    isError: isQueryError,
    error: queryError,
    isLoading: isCategoriesLoading,
    isSuccess: haveCategories,
  } = categoriesApiSlice.useGetCategoriesQuery();

  const [createCategory, { isLoading: isCreating, reset }] =
    categoriesApiSlice.useCreateCategoryMutation();

  const [deleteCategory, { isLoading: isDeleting, originalArgs }] =
    categoriesApiSlice.useDeleteCategoryMutation();

  async function handleCreateCategory() {
    if (!input) {
      return;
    }
    setInput("");
    try {
      toast.loading("Creating category...", { id: "category" });
      await createCategory({ title: input }).unwrap();
      toast.success("Category created", { id: "category" });
    } catch (err) {
      reset();
      toast.error("Failed to create category", { id: "category" });
    }
  }

  async function handleDeleteCategory(_id: string) {
    try {
      toast.loading("Deleting category...", { id: "category" });
      await deleteCategory({ _id }).unwrap();
      toast.success("Category deleted", { id: "category" });
    } catch (err) {
      toast.error("Failed to delete category", { id: "category" });
    }
  }

  let categoryList = null;
  if (isCategoriesLoading) {
    categoryList = (
      <div className={styles.loading}>
        <span>
          Loading...
          <FontAwesomeIcon icon={faSync} className={classNames("fa-fw", "fa-spin")} />
        </span>
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
              disabled={isDeleting && originalArgs?._id === category._id}
              options={{ isIcon: true }}
              onClick={() => {
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

  if (isQueryError) {
    console.log(queryError);
    // console.log("reset");
    toast.error("Failed to load category", { id: "category" });
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
          // and inside the same closest parent with className "inputAndSubmit"
          onBlur={(e) => {
            const isFormClosestOfRelatedTarget = e.relatedTarget?.closest(
              `.${styles.inputAndSubmit}`
            );
            const isRelatedTargetButton = e.relatedTarget?.tagName === "BUTTON";
            if (!isFormClosestOfRelatedTarget && !isRelatedTargetButton) {
              setInput("");
            }
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
