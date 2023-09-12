const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// create
router.get("/create", productController.getCreate);
router.post("/create", productController.postCreate);

// read
router.get("/:id", productController.getProduct);

// update
router.get("/:id/update", productController.getUpdate);
router.post("/:id/update", productController.postUpdate);

// delete
router.get("/:id/delete", productController.getDelete);
router.post("/:id/delete", productController.postDelete);

module.exports = router;
