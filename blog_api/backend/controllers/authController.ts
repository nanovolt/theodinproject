import "dotenv/config";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { passport } from "../config/passport";
import { issueJWT } from "../config/jwt";

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
        const user = await User.create({ username: req.body.username, password: hashedPassword });
        const token = issueJWT(user.id);
        res.json({ user, token });
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

      passport.authenticate(
        "local",
        { session: false },
        (err: unknown, user: { id: string }, info: { message: string }) => {
          console.log("user:", user);
          if (err || !user) {
            return next(createError(400, { message: info ? info.message : "Login failed" }));
          }
          const token = issueJWT(user);
          res.json({ user, token });
        }
      )(req, res);

      //
    }),
  ],
};

// for login POST instead passport.authenticate can use:

// try {
//   const user = await User.findOne({ username: req.body.username });
//   if (user) {
//     const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

//     if (isPasswordCorrect) {
//       const token = issueJWT(user);
//       res.json({ user, token });
//       return;
//     }

//     next(createError(400, "invalid password"));
//     return;
//   }

//   next(createError(400, "invalid username"));
// } catch (e) {
//   next(e);
// }
