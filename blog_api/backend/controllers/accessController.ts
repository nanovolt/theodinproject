// import debug from "debug";
// const log = debug("controllers:access");
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user";

export const accessController = {
  authorize: asyncHandler(async (req, res, next) => {
    // can skip authenticaion for api use, use api key as credentials
    if (!req.isAuthenticated()) {
      return next(createError(401, "not authenticated"));
    }

    if (!req.headers.authorization) {
      return next(createError(401, "no api key"));
    }

    const user = await UserModel.findOne({ apiKey: req.headers.authorization });
    if (!user) {
      return next(createError(401, "incorrect api key"));
    }
    return next();
  }),
};
