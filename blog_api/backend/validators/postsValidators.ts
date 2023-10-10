import { body, validationResult } from "express-validator";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";

export const validateCreatePost = [
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
    .escape(),
  body("text")
    .exists({ values: "falsy" })
    .withMessage("text is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("text is not a string")
    .bail()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Maximum length: 5000")
    .bail()
    .escape(),
  body("date")
    .exists({ values: "falsy" })
    .withMessage("date is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("category is not a string")
    .bail()
    .trim()
    .isISO8601()
    .withMessage("date is not in ISO8601 format")
    .bail(),
  body("category")
    .exists({ values: "falsy" })
    .withMessage("category is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("category is not a string")
    .bail()
    .trim()
    .isLength({ max: 64 })
    .withMessage("Maximum length: 64")
    .bail()
    .escape(),
  body("isPublished")
    .exists({ values: "null" })
    .withMessage("category is required (received: null | undefined)")
    .bail()
    .isBoolean()
    .withMessage("isPublished is not a boolean"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(createError(400, "Validation error", { errors: errors.array() }));
    }
    next();
  },
];

// the same as validateCreatePost but added optional()
export const validateUpdatePost = [
  body("title")
    .optional()
    .exists({ values: "falsy" })
    .withMessage("title is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("title is not a string")
    .bail()
    .trim()
    .isLength({ max: 16 })
    .withMessage("Maximum length: 16")
    .bail()
    .escape()
    .custom(async (input) => {
      console.log("typeof title === 'string':", typeof input === "string");
    }),
  body("text")
    .optional()
    .exists({ values: "falsy" })
    .withMessage("text is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("text is not a string")
    .bail()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Maximum length: 5000")
    .bail()
    .escape(),
  body("date")
    .optional()
    .exists({ values: "falsy" })
    .withMessage("date is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("text is not a string")
    .bail()
    .trim()
    .isISO8601()
    .withMessage("date is not in ISO8601 format")
    .bail(),
  body("category")
    .optional()
    .exists({ values: "falsy" })
    .withMessage("category is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("category is not a string")
    .bail()
    .trim()
    .isLength({ max: 64 })
    .withMessage("Maximum length: 64")
    .bail()
    .escape(),

  body("isPublished")
    .optional()
    .exists({ values: "null" })
    .withMessage("category is falsy (received: null | undefined)")
    .bail()
    .isBoolean()
    .withMessage("isPublished is not a boolean"),
  body("viewCount")
    .optional()
    .exists({ values: "null" })
    .withMessage("category is falsy (received: null | undefined)")
    .bail()
    .isNumeric()
    .withMessage("viewCount is not a number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(createError(400, "Validation error", { errors: errors.array() }));
    }
    next();
  },
];
