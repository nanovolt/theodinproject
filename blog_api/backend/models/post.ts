import mongoose, { Schema } from "mongoose";
import { Post } from "../types/models";
import { DateTime } from "luxon";
import he from "he";

const postSchema = new Schema<Post>(
  {
    // title at validation allows 128
    // text at validation allows 10 000
    // maxlength multiplied by 10 because saving html-entities
    title: { type: String, required: true, maxlength: 1280 },
    text: { type: String, required: true, maxlength: 100000 },
    date: { type: Date, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    viewCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, required: true },
  },
  { toJSON: { virtuals: true }, versionKey: false }
);

postSchema.virtual("dateFormat").get(function () {
  return this.date ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED) : "";
  // return this.date ? DateTime.fromJSDate(this.date).toFormat("ff") : "";
});

postSchema.post("init", function (doc: Post) {
  doc.title = he.decode(doc.title);
  doc.text = he.decode(doc.text);
});

// postSchema.virtual("url").get(function (): string {
//   const urlTitle = this.title
//     .toLowerCase()
//     //remove any symbol that is not an alphanumeric or underscore or space
//     .replaceAll(/[^\w\s]/gi, "")
//     //replace space of any length with dash
//     .replaceAll(/\s+/g, "-");

//   const urlCategory = await CategoryModel.findById(this.category._id);
//   if (!urlCategory) {
//     return `/general/${urlTitle}-${this._id}`;
//   }
//   return `/${urlCategory.title}/${urlTitle}-${this._id}`;
// });

export const PostModel = mongoose.model<Post>("Post", postSchema);
