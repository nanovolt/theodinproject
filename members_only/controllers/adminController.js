const log = require("debug")("controller:admin");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.get = asyncHandler(async (req, res, next) => {
  log("user:", req.user);
  if (!req.user) {
    next();
    return;
  }

  res.locals.title = "Admin page | Members only";
  res.locals.user = req.user;
  res.render("admin");
});

exports.post = [
  body("secretcode")
    .trim()
    .notEmpty()
    .withMessage("code field is required")
    .bail()
    .escape()
    // eslint-disable-next-line no-unused-vars
    .custom(async (value, { req }) => {
      if (value !== "iambatman") {
        throw new Error("incorrect code");
      }
    }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    // log("errors:", errors.array());

    if (!errors.isEmpty()) {
      res.locals.title = "Admin page | Members only";
      res.locals.errors = errors.array();

      res.render("admin");
      return;
    }

    if (!req.user.admin) {
      await User.findByIdAndUpdate(req.user.id, { admin: true });
    } else {
      await User.findByIdAndUpdate(req.user.id, { admin: false });
    }

    res.locals.title = "Admin page | Members only";
    res.locals.user = await User.findById(req.user.id);

    // log("req.user:", req.user);
    // log("result:", result);
    // log("res.locals.user:", res.locals.user);

    res.render("admin");
  }),
];
