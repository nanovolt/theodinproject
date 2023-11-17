import { Result, body, validationResult } from "express-validator";
import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import he from "he";

export const validateCreatePost = [
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
    .isLength({ max: 128 })
    .withMessage("Maximum length: 128")
    .bail()
    .customSanitizer((value) => {
      return he.encode(value);
    }),

  body("content")
    .exists({ values: "falsy" })
    .withMessage("Content is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Content is not a string")
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 10000 })
    .withMessage("Maximum length: 10000")
    .bail()
    .customSanitizer((value) => {
      return he.encode(value);
    }),

  body("date")
    .exists({ values: "falsy" })
    .withMessage("Date is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Date is not a string")
    .bail()
    .trim()
    .isISO8601()
    .withMessage("Date is not in ISO8601 format")
    .bail(),

  body("categoryId")
    .exists({ values: "falsy" })
    .withMessage("Category id is required (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Category id is not a string")
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 64 })
    .withMessage("Maximum length: 64")
    .bail()
    .matches(/^[\w]+$/)
    .withMessage("Category allows letters only"),

  body("isPublished")
    .exists({ values: "null" })
    .withMessage("isPublished is required (received: null | undefined)")
    .bail()
    .isBoolean()
    .withMessage("isPublished is not a boolean"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors: Result = validationResult(req);

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
    .withMessage("Title is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Title is not a string")
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 128 })
    .withMessage("Maximum length: 128")
    .bail()
    .customSanitizer((value) => {
      return he.encode(value);
    }),

  body("content")
    .optional()
    .exists({ values: "falsy" })
    .withMessage("Content is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Content is not a string")
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 10000 })
    .withMessage("Maximum length: 10000")
    .bail()
    .customSanitizer((value) => {
      return he.encode(value);
    }),

  body("date")
    .optional()
    .exists({ values: "falsy" })
    .withMessage("Date is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Date is not a string")
    .bail()
    .trim()
    .isISO8601()
    .withMessage("Date is not in ISO8601 format")
    .bail(),

  body("categoryId")
    .optional()
    .exists({ values: "falsy" })
    .withMessage("Category id is falsy (received: empty string | 0 | false | null | undefined)")
    .bail()
    .isString()
    .withMessage("Category id is not a string")
    .bail()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Minimum length: 1")
    .bail()
    .isLength({ max: 64 })
    .withMessage("Maximum length: 64")
    .bail()
    .matches(/^[\w]+$/)
    .withMessage("Category allows letters only")
    .bail(),

  body("isPublished")
    .optional()
    .exists({ values: "null" })
    .withMessage("Category is falsy (received: null | undefined)")
    .bail()
    .isBoolean()
    .withMessage("isPublished is not a boolean"),

  body("viewCount")
    .optional()
    .exists({ values: "null" })
    .withMessage("Category is falsy (received: null | undefined)")
    .bail()
    .isNumeric()
    .withMessage("View count is not a number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      return next(createError(400, "Validation error", { errors: errors.array() }));
    }
    next();
  },
];
