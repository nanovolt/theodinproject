const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

exports.getStats = asyncHandler(async (req, res) => {
  const totalCategories = await Category.countDocuments().exec();
  res.locals.title = "Green stock | Inventory Application";
  res.locals.totalCategories = totalCategories;
  res.render("index");
});
