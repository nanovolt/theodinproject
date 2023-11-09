import mongoose, { Schema } from "mongoose";
import { Category } from "../types/models";

const categorySchema = new Schema<Category>(
  {
    title: { type: String, required: true, unique: true, maxlength: 64 },
  },
  { versionKey: false }
);

// // Handler **must** take 3 parameters: the error that occurred, the document
// // in question, and the `next()` function
// categorySchema.post("save", function (error:unknown, doc:Category, next):void {
//   // console.log(typeof error);
//   next();
//   // if (error.name === "MongoServerError" && error.code === 11000) {
//   //   next(new Error("There was a duplicate key error"));
//   // } else {
//   //   next();
//   // }
// });

export const CategoryModel = mongoose.model<Category>("Category", categorySchema);
