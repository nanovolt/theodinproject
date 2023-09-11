const express = require("express");
const inventoryController = require("../controllers/inventoryController");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", inventoryController.getStats);
router.get("/categories", categoryController.getCategories);

module.exports = router;
