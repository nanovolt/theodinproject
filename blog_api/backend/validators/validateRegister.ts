import { Result, body, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { UserModel } from "../models/user";
import { NextFunction, Request, Response } from "express";

export const validateRegister = [
  body("username")
    .exists({ values: "falsy" })
    .withMessage("Password is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .trim()
    .isString()
    .withMessage("Username is not a string")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 16 })
    .withMessage("Maximum length: 16")
    .bail()
    //if input doesn't math regex return 400 response with validation error
    .custom(async (input: string) => {
      if (!input.match(/^[a-zA-Z0-9_-]*$/)) {
        throw Error(`Only letters, numbers, '-'(dash), '_'(underscore) allowed`);
      }
    })
    .bail()
    .custom(async (input) => {
      const user = await UserModel.findOne({ username: input });
      if (user) {
        throw Error("Can't use this username");
      }
    }),
  body("password")
    .exists({ values: "falsy" })
    .withMessage("Password is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .trim()
    .isString()
    .withMessage("Password is not a string")
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
    .exists({ values: "falsy" })
    .withMessage("Password is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .trim()
    .isString()
    .withMessage("Password confirmation is not a string")
    .bail()
    .custom(async (input, { req }) => {
      if (input !== req.body.password) {
        throw Error("Password confirmation is incorrect");
      }
    }),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createHttpError(400, "Validation error", { errors: errors.array() }));
    }

    next();
  },
];
