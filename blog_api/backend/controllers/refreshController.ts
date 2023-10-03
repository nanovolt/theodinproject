import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { passport } from "../config/passport";
import { User } from "../models/user";
import { extractToken, issueJWT } from "../config/jwt";

const log = debug("controllers:refresh");

export const refreshController = {
  getRefreshToken: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("refresh", { session: false }, async (err, user, info, status) => {
      log("user:", user);
      if (err) {
        log("refresh err:", err);
        next(err);
      }

      if (info && info instanceof Error) {
        log("refresh info.message:", info.message);
        // res.send(user);
        if (info.message === "No auth token") {
          return next(
            createError(401, {
              message: "refresh token expired, login again",
            })
          );
        }
        return next(createError(401, { message: info.message }));
      }

      // if no errors remove refresh token from token array in DB
      await User.findByIdAndUpdate(user.id, {
        $pull: { refreshToken: extractToken(req.cookies.refreshToken.token) },
      });

      const accessToken = issueJWT(
        { id: user.id },
        { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: "30s" }
      );

      const refreshToken = issueJWT(
        { id: user.id },
        { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: "180s" }
      );

      // log("accessToken:", accessToken);
      // log("refreshToken:", refreshToken);

      const updatedUser = await User.findByIdAndUpdate(user.id, {
        $push: { refreshToken: extractToken(refreshToken.token) },
      });

      // res.clearCookie("refreshToken");
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 90000 });
      res.json({ updatedUser, accessToken, refreshToken });
    })(req, res, next);
  },
};
