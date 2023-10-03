import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { passport } from "../config/passport";
import asyncHandler from "express-async-handler";
import { extractTokenFromCookie } from "../config/jwt";

const log = debug("controllers:access");

export const accessController = {
  authorize: asyncHandler(async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info, status) => {
      if (err) {
        log("error:", err);
        return next(err);
      }

      if (info && info instanceof Error) {
        // log("requested url:", req.url);
        log("requested originalUrl:", req.originalUrl);
        log("info.message:", info.message);
        // log("cookies:", req.cookies);

        // const token = extractTokenFromCookie(req.cookies);
        // log("refresh token:", token);

        if (info.message === "jwt expired") {
          return res.redirect("/api/v1/refresh-token");
        }
        return next(createError(401, { message: info.message }));
      }

      return next();
    })(req, res, next);
  }),
};
