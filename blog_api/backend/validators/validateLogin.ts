import { Result, body, validationResult } from "express-validator";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";

export const validateLogin = [
  body("username")
    .exists({ values: "falsy" })
    .withMessage("Username is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .trim()
    .isString()
    .withMessage("Username is not a string")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail(),

  body("password")
    .exists({ values: "falsy" })
    .withMessage("Password is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .trim()
    .isString()
    .withMessage("Password is not a string")
    .bail()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return next(createError(400, "Validation error", { errors: errors.array() }));
    }
    next();
  },
];
