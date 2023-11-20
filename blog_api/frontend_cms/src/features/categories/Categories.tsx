import styles from "./Categories.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { categoriesApiSlice } from "./categoriesApiSlice";
import { Button } from "../../components/Button/Button";
import { useTitle } from "../../hooks/useTitle";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Categories = () => {
  useTitle("Categories | Blog CMS");

  const [input, setInput] = useState("");

  const {
    data: categories,
    isError: isQueryError,
    isLoading: isCategoriesLoading,
    isFetching,
    isSuccess: haveCategories,
  } = categoriesApiSlice.useGetCategoriesQuery();

  const [createCategory, { isLoading: isCreating, reset }] =
    categoriesApiSlice.useCreateCategoryMutation();

  const [deleteCategory, { isLoading: isDeleting, originalArgs }] =
    categoriesApiSlice.useDeleteCategoryMutation();

  useEffect(() => {
    if (isQueryError) {
      toast.error("Failed to load categories", { id: "categories" });
    }
  }, [isQueryError]);

  async function handleCreateCategory() {
    if (!input) {
      return;
    }
    setInput("");
    try {
      toast.loading("Creating category...", { id: "categories" });
      await createCategory({ title: input }).unwrap();
      toast.success("Category created", { id: "categories" });
    } catch (err) {
      reset();
      toast.error("Failed to create category", { id: "categories" });
    }
  }

  async function handleDeleteCategory(_id: string) {
    try {
      toast.loading("Deleting category...", { id: "categories" });
      await deleteCategory({ _id }).unwrap();
      toast.success("Category deleted", { id: "categories" });
    } catch (err) {
      toast.error("Failed to delete category", { id: "categories" });
    }
  }

  let categoryList = null;

  if (isQueryError) {
    categoryList = <p className={styles.center}>Failed to load categories</p>;
  }

  if (isCategoriesLoading) {
    categoryList = (
      <div className={styles.center}>
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
            <Link to={`/categories/${category._id}`} className={styles.category}>
              {category.title}
            </Link>
            <Button
              disabled={(isDeleting || isFetching) && originalArgs?._id === category._id}
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
