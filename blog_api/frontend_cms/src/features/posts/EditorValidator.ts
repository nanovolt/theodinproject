import { toast } from "react-hot-toast";
import { Post } from "./EditorSlice";

export function validateEditor(post: Post, html: string) {
  let isValid = true;

  // const result = {
  //   isDetailsEmpty: false,
  //   isContentEmpty: false,
  // };

  const isDetailsEmpty = Object.entries(post).some((item) => {
    if (item[0] === "content") {
      return false;
    }

    if (item[1] === "") {
      return true;
    }
  });

  const isContentEmpty = html === "<p></p>";

  if (isDetailsEmpty) {
    // console.log("isDetailsEmpty");
    // result.isDetailsEmpty = true;
    toast.error("Details not provided", { id: "post" });
    isValid = false;
  }

  if (isContentEmpty) {
    // result.isContentEmpty = true;
    toast.error("Content not provided", { id: "post" });
    isValid = false;
  }

  // if (isDetailsEmpty) {
  //   return;
  // }

  // if (isContentEmpty) {
  //   return;
  // }

  return isValid;
}
