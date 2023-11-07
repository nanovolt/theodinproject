import { Result, body, validationResult } from "express-validator";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../models/category";

export const validateCreateCategory = [
  body("title")
    .exists({ values: "falsy" })
    .withMessage("Title is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Title is not a string")
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 64 })
    .withMessage("Maximum length: 64")
    .bail()
    .matches(/^[\w]+$/)
    .withMessage("Special characters not allowed, only numbers, letters, _ (underscore)")
    .bail()
    .custom(async (input: string) => {
      const category = await CategoryModel.findOne({ title: input });

      if (category) {
        throw Error("This category already exists");
      }
    }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, "Validation error", { errors: errors.array() }));
    }
    next();
  },
];
