import debug from "debug";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { User } from "../models/user";
const log = debug("controllers:access");

export const accessController = {
  authorize: asyncHandler(async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next(createError(401, "not authenticated"));
    }

    if (!req.headers.authorization) {
      return next(createError(401, "no api key"));
    }

    log("access: header:", req.headers.authorization);
    const user = await User.findOne({ apiKey: req.headers.authorization });
    if (!user) {
      return next(createError(401, "incorrect api key"));
    }
    return next();
  }),
};
