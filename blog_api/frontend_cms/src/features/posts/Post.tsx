import { DateTime } from "luxon";
import styles from "./Post.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postsApiSlice } from "./postsApiSlice";
import parse from "html-react-parser";
import { currentUserApiSlice } from "../currentUser/currentUserSlice";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import hljs from "highlight.js/lib/core";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faPenToSquare, faSync, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/Button/Button";
import { toast } from "react-hot-toast";

hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("typescript", ts);

hljs.highlightAll();

export const Post = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: post, isLoading } = postsApiSlice.useGetPostByIdQuery({ id: id ?? "" });
  const { data: currentUser } = currentUserApiSlice.useMeQuery();

  const [deletePost, { isLoading: isDeleting, originalArgs }] =
    postsApiSlice.useDeletePostMutation();

  useEffect(() => {
    const highlightedBlock = document.querySelector("[data-highlighted=yes]");

    if (!highlightedBlock) {
      hljs.highlightAll();
    }
  }, [post]);

  async function handleDeletePost(_id: string) {
    try {
      toast.loading("Deleting post...", { id: "posts" });
      await deletePost({ id: _id }).unwrap();
      navigate("/posts");
      toast.success("Post deleted", { id: "posts" });
    } catch (err) {
      toast.error("Failed to delete post", { id: "posts" });
    }
  }

  if (isLoading) {
    return (
      <div className={styles.center}>
        <span>
          Loading...
          <FontAwesomeIcon icon={faSync} className={classNames("fa-fw", "fa-spin")} />
        </span>
      </div>
    );
  }

  if (!post) {
    throw Error("Post not found");
  }

  return (
    <div className={styles.post}>
      <div className={styles.postControls}>
        <Button
          options={{ isIcon: true }}
          onClick={() => {
            navigate(`/edit/${post._id}`);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} className={classNames("fa-fw")} />
        </Button>
        <Button
          disabled={(isDeleting || isLoading) && originalArgs?.id === post._id}
          options={{ isIcon: true }}
          onClick={() => {
            handleDeletePost(post._id);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} className={classNames("fa-fw")} />
        </Button>
      </div>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postDate}>
        {DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_MED)}
      </p>
      <p className={styles.postAuthor}>by {currentUser!.user.username}</p>
      <Link to={`/categories/${post.categoryId?._id}`} className={styles.postCategory}>
        {post.categoryId?.title ?? "No category"}
      </Link>
      <article>{parse(post.content)}</article>
    </div>
  );
};
