// import debug from "debug";
// const log = debug("controllers:cms");

import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { CategoryModel } from "../models/category";
import mongoose from "mongoose";
import { PostModel } from "../models/post";

export const categoriesController = {
  createCategory: asyncHandler(async (req, res, next) => {
    const { title } = req.body;

    const newCategory = await CategoryModel.create({ title: title });

    if (!newCategory) {
      return next(createError(400, { error: "could not create category" }));
    }

    res.json(newCategory);
  }),

  readCategories: asyncHandler(async (req, res, next) => {
    const categories = await CategoryModel.find();

    if (categories.length === 0) {
      return next(createError(404, { error: "categories not found" }));
    }
    res.json(categories);
  }),

  deleteCategory: asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, { error: "category not found" }));
    }

    const [category, postsWithCategory] = await Promise.all([
      CategoryModel.findById(id),
      PostModel.find({ category: id }).populate("category", "title").populate("author", "username"),
    ]);

    if (!category) {
      return next(createError(404, { error: "category not found" }));
    }

    if (postsWithCategory.length > 0) {
      return next(
        createError(400, {
          error: "before deleting this category delete dependencies",
          dependencies: postsWithCategory,
        })
      );
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    res.json(deletedCategory);
  }),
};
