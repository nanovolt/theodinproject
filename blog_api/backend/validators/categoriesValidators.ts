import { body, validationResult } from "express-validator";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../models/category";

export const validateCreateCategory = [
  body("title")
    .exists({ values: "falsy" })
    .withMessage("title is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("title is not a string")
    .bail()
    .trim()
    .isLength({ max: 64 })
    .withMessage("Maximum length: 64")
    .bail()
    .escape()
    .custom(async (input) => {
      const category = await CategoryModel.findOne({ title: input });
      console.log("cat:", category);
      if (category) {
        throw Error("this category already exists");
      }
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(createError(400, "Validation error", { errors: errors.array() }));
    }
    next();
  },
];
