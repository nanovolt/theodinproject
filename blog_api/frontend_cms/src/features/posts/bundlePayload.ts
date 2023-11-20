import { DateTime } from "luxon";
import { Post } from "./EditorSlice";
import { FetchPost } from "./postsApiSlice";

export function bundlePayload(post: Post, html: string, fetchedPost: FetchPost) {
  const payload: Partial<Post> = {};

  for (const key in fetchedPost) {
    const postValue = post[key as keyof Post];

    // skip comparing rich text editor content and date
    if (!postValue || key === "content" || key === "date") {
      continue;
    }

    let fetchedPostValue = fetchedPost[key as keyof typeof fetchedPost];
    if (fetchedPostValue && typeof fetchedPostValue === "object") {
      fetchedPostValue = fetchedPostValue._id;
    }
    console.log("key:", key);
    console.log(`fetched.${key}:`, fetchedPostValue);
    console.log(`post.${key}:`, postValue);
    if (fetchedPostValue !== postValue) {
      payload[key as keyof Post] = postValue;
    }
  }

  // compare dates
  console.log("fetchedPost:", fetchedPost.date);
  console.log("post:", post.date);

  const dtFetched = DateTime.fromISO(fetchedPost.date);
  const dtOffset = DateTime.fromISO(post.date);
  const dtEquals = dtFetched.equals(dtOffset);

  console.log("dates equals:", dtEquals);

  if (!dtEquals) {
    payload.date = post.date;
  }

  // compare rich text editor content
  console.log("fetchedPost.content:", fetchedPost.content);
  console.log("html:", html);
  if (fetchedPost.content !== html) {
    payload.content = html;
  }

  const hasPayload = Object.entries(payload).length > 0;
  console.log("payload has payload:", hasPayload);
  console.log("payload:", payload);

  return { hasPayload, payload };
}
