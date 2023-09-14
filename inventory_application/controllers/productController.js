const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const log = require("debug")("controller:product");

const Product = require("../models/product");
const Category = require("../models/category");

// const upload = multer({ dest: "./public/data/uploads/" });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/data/uploads/");
  },
  filename(req, file, cb) {
    console.log("storage file:", file);
    const extenstion = file.mimetype.split("/")[1];
    console.log("extenstion:", extenstion);

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extenstion}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage });

function deleteImageFromFS(url) {
  fs.unlink(path.join(__dirname, `../public/data/uploads/${url}`), (err) => {
    if (err) {
      log(err);
    }
    // log(`${url} upload deleted!`);
  });
}

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
  res.locals.categories = categories;

  res.locals.errors = [];
  res.render("product_form");
});

exports.postCreate = [
  upload.single("image"),
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

  body("deleteImage").trim().escape().toBoolean(),

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
    log("req.body:", req.body);
    log("req.file:", req.file);
    log("req.files:", req.files);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      // log("errors", res.locals.errors);

      const categories = await Category.find().exec();
      res.locals.categories = categories;

      res.locals.title = "Create product";

      const product = {
        name: req.body.name,
        description: req.body.description,
        category: { name: req.body.category },
        price: req.body.price,
        numberInStockValue: req.body.numberInStock,
        imageUrl: "",
      };

      res.locals.product = product;
      res.render("product_form");

      if (req.file) {
        deleteImageFromFS(req.file.filename);
      }
      return;
    }

    const category = await Category.findOne({ name: req.body.category });

    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      category: category.id,
      price: req.body.price === "" ? 0.0 : req.body.price,
      numberInStock: req.body.numberInStock === "" ? 0 : req.body.numberInStock,
      imageUrl: req.file ? req.file.filename : "",
      imageMimeType: req.file ? req.file.mimetype : "",
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
  res.locals.product = product;
  res.locals.errors = [];
  res.render("product_form");
  return null;
});

exports.postUpdate = [
  upload.single("image"),
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
    .toInt()
    .isInt({ min: 0 })
    .withMessage("number in stock cannot be negative")
    .escape(),

  body("deleteImage").trim().escape().toBoolean(),

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

    log("req.body:", req.body);
    log("req.file:", req.file);
    log("deleteImage:", req.body.deleteImage);

    // log("old:", oldProduct);

    if (!errors.isEmpty()) {
      if (req.file) {
        deleteImageFromFS(req.file.filename);
      }

      res.locals.errors = errors.array();

      // log("res.locals.errors:", res.locals.errors);

      const categories = await Category.find().exec();

      const oldProduct = await Product.findById(req.params.id).select("imageUrl");

      const product = {
        id: oldProduct.id,
        name: req.body.name,
        description: req.body.description,
        category: { name: req.body.category },
        price: req.body.price,
        numberInStockValue: req.body.numberInStock,
        imageUrl: oldProduct.imageUrl,
      };

      res.locals.title = "Update product";
      res.locals.categories = categories;
      res.locals.product = product;
      res.locals.deleteImageValue = req.body.deleteImage ? "checked" : "";
      res.render("product_form");
      return;
    }

    const oldProduct = await Product.findById(req.params.id).select("imageUrl");

    let imageUrl = "";
    let imageMimeType = "";

    if (req.body.deleteImage) {
      if (oldProduct.imageUrl !== "") {
        deleteImageFromFS(oldProduct.imageUrl);
      }

      if (req.file) {
        deleteImageFromFS(req.file.filename);
      }

      await Product.findByIdAndUpdate(req.params.id, { imageUrl: "" });
    } else {
      if (req.file) {
        await Product.findByIdAndUpdate(req.params.id, { imageUrl: req.file.filename });
        if (oldProduct.imageUrl !== "") {
          deleteImageFromFS(oldProduct.imageUrl);
        }
      }
      // console.log(342, req.file === true);

      imageUrl = req.file ? req.file.filename : oldProduct.imageUrl;
      imageMimeType = req.file ? req.file.mimetype : oldProduct.imageMimeType;
    }

    const category = await Category.findOne({ name: req.body.category });

    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      category: category.id,
      price: req.body.price === "" ? 0.0 : req.body.price,
      numberInStock: req.body.numberInStock === "" ? 0 : req.body.numberInStock,
      imageUrl,
      imageMimeType,
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

    const product = await Product.findById(req.body.productID);

    // if have errors
    if (!errors.isEmpty()) {
      res.locals.title = "Delete product";
      res.locals.product = product;
      res.locals.errors = errors.array();
      res.render("product_delete");
      return;
    }

    if (product) {
      if (product.imageUrl !== "") {
        deleteImageFromFS(product.imageUrl);
      }
      await Product.findByIdAndRemove(req.params.id);
    }

    res.redirect("/products");
  }),
];
