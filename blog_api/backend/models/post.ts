import { Schema } from "mongoose";
import { mongoConn } from "../config/mongodb";
import { Post } from "../types/models";
import { DateTime } from "luxon";

const postSchema = new Schema<Post>(
  {
    title: { type: String, required: true, maxlength: 16 },
    text: { type: String, required: true, maxlength: 5000 },
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

export const PostModel = mongoConn.model<Post>("Post", postSchema);
