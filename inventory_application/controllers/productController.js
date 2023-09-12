const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Product = require("../models/product");
const Category = require("../models/category");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("category").exec();

  res.locals.title = "Products";
  res.locals.products = products;
  res.locals.errors = [];
  res.render("products");

  // <div>Total Sub Categories: <%= totalSubCategories %></div>
  // <div>Total Products items: <%= totalProductItems %></div>
  // <div>Total Products in stock: <%= totalInStock %></div>
  // <div>Total stock worth: <%= totalStockWorth %></div>
});

// CREATE
exports.getCreate = asyncHandler(async (req, res) => {
  const categories = await Category.find().exec();

  res.locals.title = "Create product";
  res.locals.errors = [];
  res.locals.categories = categories;
  res.locals.selectedCategory = "";
  res.render("product_form");
});

exports.postCreate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name field is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("name is too short, minimum length: 3")
    .isLength({ max: 64 })
    .withMessage("name is too long, maximum length: 64")
    .escape(),

  body("description")
    .trim()
    .isLength({ max: 256 })
    .withMessage("too long, maximum length: 256")
    .escape(),

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

  body("price")
    .trim()
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("price is not numeric")
    .bail()
    .toFloat()
    .isFloat({ min: 0.0 })
    .withMessage("price cannot be negative")
    .escape(),

  body("numberInStock")
    .trim()
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("number in stock is not numeric")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("number in stock cannot be negative")
    .escape(),

  asyncHandler(async (req, res) => {
    console.log("body:", req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      console.log("errors", res.locals.errors);

      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Create product";
      res.locals.nameValue = req.body.name;
      res.locals.descriptionValue = req.body.description;
      res.locals.selectedCategory = req.body.category;
      res.locals.priceValue = req.body.price;
      res.locals.numberInStockValue = req.body.numberInStock;
      res.render("product_form");
    }

    const category = await Category.findOne({ name: req.body.category });

    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      category: category.id,
      price: req.body.price === "" ? 0.0 : req.body.price,
      numberInStock: req.body.numberInStock === "" ? 0 : req.body.numberInStock,
    });

    res.redirect(newProduct.url);
  }),
];

// READ
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category").exec();

  if (product === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.locals.title = product.name;
  res.locals.product = product;
  res.render("product");
  return null;
});

// UPDATE
exports.getUpdate = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category").exec();

  if (product === null) {
    const err = new Error("Product not found");
    err.status = 404;
    return next(err);
  }

  const categories = await Category.find().exec();
  res.locals.categories = categories;

  res.locals.title = "Update product";
  res.locals.nameValue = product.name;
  res.locals.descriptionValue = product.description;
  res.locals.selectedCategory = product.category.name;
  res.locals.priceValue = product.price;
  res.locals.numberInStockValue = product.numberInStock;
  res.locals.errors = [];
  res.render("product_form");
  return null;
});

exports.postUpdate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name field is required")
    .bail()
    .isLength({ min: 3 })
    .withMessage("name is too short, minimum length: 3")
    .isLength({ max: 64 })
    .withMessage("name is too long, maximum length: 64")
    .escape(),

  body("description")
    .trim()
    .isLength({ max: 256 })
    .withMessage("too long, maximum length: 256")
    .escape(),

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

  body("price")
    .trim()
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("price is not numeric")
    .bail()
    .toFloat()
    .isFloat({ min: 0.0 })
    .withMessage("price cannot be negative")
    .escape(),

  body("numberInStock")
    .trim()
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("number in stock is not numeric")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("number in stock cannot be negative")
    .escape(),

  asyncHandler(async (req, res) => {
    console.log("body:", req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      console.log("errors", res.locals.errors);

      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Update product";
      res.locals.nameValue = req.body.name;
      res.locals.descriptionValue = req.body.description;
      res.locals.selectedCategory = req.body.category;
      res.locals.priceValue = req.body.price;
      res.locals.numberInStockValue = req.body.numberInStock;
      res.render("product_form");
      return;
    }

    const category = await Category.findOne({ name: req.body.category });

    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      category: category.id,
      price: req.body.price === "" ? 0.0 : req.body.price,
      numberInStock: req.body.numberInStock === "" ? 0 : req.body.numberInStock,
    });

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, product);
    res.redirect(updatedProduct.url);
  }),
];

// DELETE
exports.getDelete = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product === null) {
    const err = new Error("Product not found");
    err.status = 404;
    return next(err);
  }

  res.locals.title = "Delete product";
  res.locals.product = product;
  res.render("product_delete");
  return null;
});

exports.postDelete = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.productID);

  if (product) {
    await Product.findByIdAndRemove(req.params.id);
  }

  res.redirect("/products");
});
