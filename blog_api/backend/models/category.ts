import { Schema } from "mongoose";
import { mongoConn } from "../config/mongodb";
import { Category } from "../types/models";

const categorySchema = new Schema<Category>(
  {
    title: { type: String, required: true, unique: true, maxlength: 64 },
  },
  { versionKey: false }
);

export const CategoryModel = mongoConn.model<Category>("Category", categorySchema);
