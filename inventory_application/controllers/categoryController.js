const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");
const Product = require("../models/product");

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().exec();

  res.locals.title = "Categories";
  res.locals.categories = categories;
  res.render("categories");
});

exports.getCreate = asyncHandler(async (req, res) => {
  const categories = await Category.find({ parent: null }).exec();

  res.locals.title = "Create category";
  res.locals.categories = categories;
  res.locals.selected_parent = "";
  res.locals.method = "POST";
  res.render("category_form");
});

exports.postCreate = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("category field is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("too short, minimum length: 3")
    .isLength({ max: 64 })
    .withMessage("too long, maximum length: 64")
    .escape(),
  // .custom(async (value) => {
  //   const isCategoryExists = await Category.findOne({ name: value })
  //     .collation({ locale: "en", strength: 2 })
  //     .exec();

  //   // console.log("isCategoryExists:", isCategoryExists);
  //   if (isCategoryExists) {
  //     // console.log("isCategoryExists true");
  //     throw new Error("The category already exists");
  //   }
  // }),

  body("parent").trim().isLength({ max: 64 }).withMessage("too long, maximum length: 64").escape(),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Enter Confirmation code")
    .bail()
    .escape()
    .custom(async (value) => {
      if (value !== process.env.CODE) {
        throw new Error("Confirmation code is incorrect, try again");
      }
    }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    // if have errors
    if (!errors.isEmpty()) {
      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Create category";
      res.locals.categoryValue = req.body.category;
      res.locals.selected_parent = req.body.parent;
      res.locals.errors = errors.array();
      res.render("category_form");
      return;
    }

    const isCategoryExists = await Category.findOne({
      name: req.body.category,
      parent: req.body.parent === "" ? null : req.body.parent,
    })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (isCategoryExists) {
      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Create category";
      res.locals.categoryValue = req.body.category;
      res.locals.selected_parent = req.body.parent;
      res.locals.isCategoryPresent = true;
      res.locals.errors = errors.array();
      console.log(res.locals.errors);
      res.render("category_form");
      return;
    }

    const category = await Category.create({
      name: req.body.category,
      parent: req.body.parent === "" ? null : req.body.parent,
    });
    // await category.save();
    res.redirect(category.url);
  }),
];

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const parent = await Category.findOne({ name: category.parent }).exec();
  const childCategories = await Category.find({ parent: category.name }).exec();

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.locals.title = category.name;
  res.locals.category = category;
  res.locals.parent = parent;
  res.locals.childCategories = childCategories;
  res.render("category");
  return null;
});

exports.getUpdate = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  // const categories = await Category.find({ parent: null }).exec();
  const categories = await Category.find({ name: { $ne: category.name }, parent: null }).exec();

  // const categories = await Category.aggregate([
  //   {
  //     $match: { name: { $ne: category.name }, parent: null },
  //   },
  // ]);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.locals.title = "Update category";
  res.locals.categoryValue = category.name;
  res.locals.selected_parent = category.parent;
  res.locals.categories = categories;
  res.locals.method = "POST";
  res.render("category_form");
  return null;
});

exports.postUpdate = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("category field is required")
    .isLength({ min: 3 })
    .withMessage("too short, minimum length: 3")
    .isLength({ max: 64 })
    .withMessage("too long, maximum length: 64")
    .escape(),

  body("parent").trim().isLength({ max: 64 }).withMessage("too long, maximum length: 64").escape(),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Enter Confirmation code")
    .bail()
    .escape()
    .custom(async (value) => {
      if (value !== process.env.CODE) {
        throw new Error("Confirmation code is incorrect, try again");
      }
    }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    // if have errors
    if (!errors.isEmpty()) {
      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Update category";
      res.locals.categoryValue = req.body.category;
      res.locals.selected_parent = req.body.parent;
      res.locals.errors = errors.array();
      res.render("category_form");
      return;
    }

    // DIFFERENCE: added _id
    const category = new Category({
      _id: req.params.id,
      name: req.body.category,
      parent: req.body.parent === "" ? null : req.body.parent,
    });

    const isCategoryExists = await Category.findOne({
      name: req.body.category,
      parent: req.body.parent === "" ? null : req.body.parent,
    })
      .collation({ locale: "en", strength: 2 })
      .exec();

    if (isCategoryExists) {
      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Update category";
      res.locals.categoryValue = req.body.category;
      res.locals.selected_parent = req.body.parent;
      res.locals.isCategoryPresent = true;
      res.locals.errors = errors.array();
      res.render("category_form");
      return;
    }

    // DIFFERENCE: changed to find and update
    const oldCategory = await Category.findById(req.params.id).exec();
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category);
    await Category.updateMany({ parent: oldCategory.name }, { parent: category.name });

    res.redirect(updatedCategory.url);
  }),
];

exports.getDelete = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const childCategories = await Category.find({ parent: category.name }).exec();
  const products = await Product.find({ category }).exec();

  console.log("products:", products);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.locals.title = "Delete category";
  res.locals.category = category;
  res.locals.childCategories = childCategories;
  res.locals.products = products;

  res.render("category_delete");
  return null;
});

exports.postDelete = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Enter Confirmation code")
    .bail()
    .escape()
    .custom(async (value) => {
      if (value !== process.env.CODE) {
        throw new Error("Confirmation code is incorrect, try again");
      }
    }),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const category = await Category.findById(req.body.categoryID).exec();
    const childCategories = await Category.find({ parent: category.name }).exec();
    const products = await Product.find({ category }).exec();

    // if have errors
    if (!errors.isEmpty()) {
      res.locals.title = "Delete category";
      res.locals.category = category;
      res.locals.childCategories = childCategories;
      res.locals.products = products;
      res.locals.errors = errors.array();
      res.render("category_delete");
      return;
    }

    if (category === null) {
      res.redirect("/categories");
    } else {
      await Category.findByIdAndDelete(req.params.id);
      res.redirect("/categories");
    }
  }),
];
