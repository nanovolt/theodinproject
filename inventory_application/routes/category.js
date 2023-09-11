const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

// create
router.get("/create", categoryController.getCreate);
router.post("/create", categoryController.postCreate);

// read
router.get("/:id", categoryController.getCategory);

// update
router.get("/:id/update", categoryController.getUpdate);
router.post("/:id/update", categoryController.postUpdate);

// delete
router.get("/:id/delete", categoryController.getDelete);
router.post("/:id/delete", categoryController.postDelete);

module.exports = router;
