import { DateTime } from "luxon";
import styles from "./Post.module.css";
import { Link, useParams } from "react-router-dom";
import { postsApiSlice } from "./postsApiSlice";
import parse from "html-react-parser";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import hljs from "highlight.js/lib/core";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faSync } from "@fortawesome/free-solid-svg-icons";

hljs.registerLanguage("html", html);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("typescript", ts);

hljs.highlightAll();

export const Post = () => {
  const { id } = useParams();

  const { data: post, isLoading } = postsApiSlice.useGetPostByIdQuery({ id: id ?? "" });

  useEffect(() => {
    const highlightedBlock = document.querySelector("[data-highlighted=yes]");

    if (!highlightedBlock) {
      hljs.highlightAll();
    }
  }, [post]);

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
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postDate}>
        {DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_MED)}
      </p>
      <p className={styles.postAuthor}>by {post.authorId?.username}</p>
      <Link to={`/categories/${post.categoryId?._id}`} className={styles.postCategory}>
        {post.categoryId?.title ?? "No category"}
      </Link>
      <article>{parse(post.content)}</article>
    </div>
  );
};
