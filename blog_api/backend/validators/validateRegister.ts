import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { UserModel } from "../models/user";
import { NextFunction, Request, Response } from "express";

export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username field is required")
    .bail()
    .isString()
    .withMessage("username is not a string")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 16 })
    .withMessage("Maximum length: 16")
    .bail()
    .escape()
    .custom(async (input) => {
      const user = await UserModel.findOne({ username: input });
      if (user) {
        throw Error("can't use this username");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password field is required")
    .bail()
    .isString()
    .withMessage("password is not a string")
    .bail()
    .isStrongPassword({
      minLength: 4,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 4 characters and contain at least 1 uppercase letter, 1 lowercase letter and 1 number"
    ),
  body("confirm_password")
    .trim()
    .notEmpty()
    .withMessage("password confirmation field is required")
    .bail()
    .isString()
    .withMessage("password confirmation is not a string")
    .bail()
    .custom(async (input, { req }) => {
      if (input !== req.body.password) {
        throw Error("password confirmation is incorrect");
      }
    }),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createHttpError(400, "Validation error", { errors: errors.array() }));
    }

    next();
  },
];
