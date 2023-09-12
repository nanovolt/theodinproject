const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

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

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const isCategoryExists = await Category.findOne({
      name: req.body.category,
      parent: req.body.parent === "" ? null : req.body.parent,
    })
      .collation({ locale: "en", strength: 2 })
      .exec();

    // console.log("category:", req.body.category);
    // console.log("parent:", req.body.parent);
    // console.log(isCategoryExists);

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

    // if have errors
    if (!errors.isEmpty()) {
      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Create category";
      res.locals.categoryValue = req.body.category;
      res.locals.selected_parent = req.body.parent;
      res.locals.errors = errors.array();
      res.render("category_form");
    } else {
      const category = await Category.create({
        name: req.body.category,
        parent: req.body.parent === "" ? null : req.body.parent,
      });
      // await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const childCategories = await Category.find({ parent: category.name }).exec();

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.locals.title = category.name;
  res.locals.category = category;
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

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

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

    // console.log("category:", req.body.category);
    // console.log("parent:", req.body.parent);
    // console.log(isCategoryExists);

    if (isCategoryExists) {
      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Update category";
      res.locals.categoryValue = req.body.category;
      res.locals.selected_parent = req.body.parent;
      res.locals.isCategoryPresent = true;
      res.locals.errors = errors.array();
      console.log(res.locals.errors);
      res.render("category_form");
      // console.log("cat exists");
      // res.redirect(category.url);
      return;
    }

    // if have errors
    if (!errors.isEmpty()) {
      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Update category";
      res.locals.categoryValue = req.body.category;
      res.locals.selected_parent = req.body.parent;
      res.locals.errors = errors.array();
      console.log(res.locals.errors);
      res.render("category_form");
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

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.locals.title = "Delete category";
  res.locals.category = category;
  res.locals.childCategories = childCategories;
  res.locals.method = "POST";
  res.render("category_delete");
  return null;
});

exports.postDelete = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.categoryID).exec();

  if (category === null) {
    res.redirect("/categories");
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories");
  }
});
