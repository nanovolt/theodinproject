const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.get = asyncHandler(async (req, res) => {
  res.locals.title = "Admin page | Members only";
  res.render("admin");
});

exports.post = [
  body("secretcode")
    .notEmpty()
    .withMessage("code field is required")
    .bail()
    .escape()
    .custom((value, { req }) => {
      if (value !== "iambatman") {
        throw new Error("incorrect code");
      }
      console.log("user:", req.user);
    }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.title = "Admin page | Members only";
      res.locals.errors = errors.array();
      console.log(res.locals.errors);
      res.render("admin");
      return;
    }
    res.locals.title = "Admin page | Members only";
    res.render("admin");
  }),
];
