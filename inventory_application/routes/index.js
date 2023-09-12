const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", inventoryController.getStats);
router.get("/categories", categoryController.getCategories);
router.get("/products", productController.getProducts);

module.exports = router;
