import { body, validationResult } from "express-validator";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";

export const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username field is required")
    .bail()
    .isString()
    .withMessage("username is not a string")
    .bail()
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password field is required")
    .bail()
    .isString()
    .withMessage("password is not a string")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(createError(400, "Validation error", { errors: errors.array() }));
    }
    next();
  },
];
