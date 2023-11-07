// import debug from "debug";
// const log = debug("controllers:posts");

import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { PostModel } from "../models/post";
import { DateTime } from "luxon";
import mongoose from "mongoose";

export const postsController = {
  createPost: asyncHandler(async (req, res) => {
    const newPost = await PostModel.create({
      ...req.body,
      date: DateTime.fromISO(req.body.date).toJSDate(),
      author: req.user!.id,
    });

    res.json(newPost);
  }),

  readPosts: asyncHandler(async (req, res, next) => {
    const posts = await PostModel.find()
      .populate("category", "title")
      .populate("author", "username");

    if (posts.length === 0) {
      return next(createError(404, { error: "posts not found" }));
    }

    res.json(posts);
  }),

  readPost: asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, { error: "post not found" }));
    }

    const post = await PostModel.findById(id)
      .populate("category", "title")
      .populate("author", "username");

    if (!post) {
      return next(createError(404, { error: "post not found" }));
    }

    res.json(post);
  }),

  updatePost: asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, { error: "post not found" }));
    }

    const post = await PostModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
      .populate("category", "title")
      .populate("author", "username");

    if (!post) {
      return next(createError(404, { error: "post not found" }));
    }

    res.json(post);
  }),

  deletePost: asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, { error: "post not found" }));
    }

    const post = await PostModel.findByIdAndRemove(id);

    if (!post) {
      return next(createError(404, { error: "post not found" }));
    }

    res.json(post);
  }),
};
