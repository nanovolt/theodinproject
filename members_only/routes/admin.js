// const log = require("debug")("routes:admin");
const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/", adminController.get);
router.post("/", adminController.post);

module.exports = router;
