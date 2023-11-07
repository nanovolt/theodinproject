import "dotenv/config";
import debug from "debug";
import asyncHandler from "express-async-handler";

import createError from "http-errors";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import { UserModel } from "../models/user";
import { passport } from "../config/passport";
const log = debug("controllers:auth");

export const authController = {
  getMe: [
    asyncHandler(async (req, res, next) => {
      if (req.isAuthenticated()) {
        res.json({
          message: "user authenticated",
          user: req.user,
        });
        return;
      }

      next(createError(401, { error: "user not authenticated" }));
    }),
  ],
  postRegister: [
    asyncHandler(async (req, res, next) => {
      if (req.isAuthenticated()) {
        next(createError(400, { error: "already logged in" }));
        return;
      }

      try {
        // bcrypt.getnSaltSync in the old days it was 8
        const hashedPassword = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));
        const apiKey = nanoid(32);

        await UserModel.create({
          username: req.body.username,
          password: hashedPassword,
          apiKey: apiKey,
        });

        // i copy and pasted this authentication from login, so that user gets authenticated right away
        passport.authenticate(
          "local",
          async (err: unknown, user: Express.User, info: { message: string }) => {
            log("info:", info);
            if (err || !user) {
              log("err:", err);
              return next(createError(401, { error: info ? info.message : "Login failed" }));
            }

            req.login(user, (e) => {
              if (e) {
                log("login error:", e);
                return next(createError(500, { error: e }));
              }

              log("user authorized");
              return res.json({ message: "user authorized", user });
            });
          }
        )(req, res, next);

        // or just responde with 201
        // res.status(201).json({ message: "user created", apiKey: apiKey });
      } catch (e) {
        return next(e);
      }
    }),
  ],
  postLogin: [
    asyncHandler(async (req, res, next) => {
      if (req.isAuthenticated()) {
        next(createError(400, { error: "already logged in" }));
        return;
      }

      // return;
      // user: admin
      // password: Admin123
      passport.authenticate(
        "local",
        async (err: unknown, user: Express.User, info: { message: string }) => {
          log("info:", info);
          if (err || !user) {
            log("err:", err);
            return next(createError(400, { error: info ? info.message : "Login failed" }));
          }

          req.login(user, (e) => {
            if (e) {
              log("login error:", e);
              return next(createError(500, { error: e }));
            }

            log("user authorized");
            res.json({ message: "user authorized", user });
          });
        }
      )(req, res, next);
    }),
  ],
  getLogout: [
    asyncHandler(async (req, res, next) => {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        return res.json({ message: "user logged out" });
      });
    }),
  ],
};
