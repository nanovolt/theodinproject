// const log = require("debug")("router:admin");
const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

router.get("/", adminController.get);
router.post("/", adminController.post);

module.exports = router;
