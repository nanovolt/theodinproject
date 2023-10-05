import "dotenv/config";
import debug from "debug";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import { User } from "../models/user";
import { passport } from "../config/passport";
const log = debug("controllers:auth");

export const authController = {
  postRegister: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username field is required")
      .bail()
      .isLength({ min: 1 })
      .withMessage("Minimum length: 1")
      .bail()
      .isLength({ max: 16 })
      .withMessage("Maximum length: 16")
      .bail()
      .escape()
      .custom(async (input) => {
        const user = await User.findOne({ username: input });
        if (user) {
          throw Error("this username already exists");
        }
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password field is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Minimum length: 3")
      .bail()
      .isLength({ max: 64 })
      .withMessage("Maximum length: 64")
      .bail(),
    body("confirm_password")
      .trim()
      .notEmpty()
      .withMessage("confirm_password field is required")
      .bail()
      .custom(async (input, { req }) => {
        if (input !== req.body.password) {
          throw Error("password confirmation is incorrect");
        }
      }),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(createError(400, "Validation failed", { validationErrors: errors.array() }));
      }

      try {
        const hashedPassword = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));
        const apiKey = nanoid(32);
        await User.create({
          username: req.body.username,
          password: hashedPassword,
          apiKey: apiKey,
        });

        res.status(201).json({ message: "user created", apiKey: apiKey });
      } catch (e) {
        return next(e);
      }
    }),
  ],
  postLogin: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username field is required")
      .bail()
      .isLength({ min: 1 })
      .withMessage("Minimum length: 1")
      .bail()
      .isLength({ max: 16 })
      .withMessage("Maximum length: 16")
      .bail()
      .escape()
      .custom(async (input) => {
        const user = await User.findOne({ username: input });
        if (!user) {
          throw Error("username not found");
        }
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password field is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Minimum length: 3")
      .bail()
      .isLength({ max: 64 })
      .withMessage("Maximum length: 64")
      .bail(),
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(createError(400, "Validation failed", { validationErrors: errors.array() }));
      }

      // user: admin
      // password: 1234
      passport.authenticate(
        "local",
        async (err: unknown, user: Express.User, info: { message: string }) => {
          log(info);
          if (err || !user) {
            return next(createError(400, { message: info ? info.message : "Login failed" }));
          }

          req.login(user, (e) => {
            if (e) {
              log("login error:", e);
              return next(createError(500, { message: e }));
            }

            log("user authorized");
            res.json({ message: "user authorized", user });
          });
        }
      )(req, res, next);
    }),
  ],
};
