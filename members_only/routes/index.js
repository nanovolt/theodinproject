const express = require("express");
// const adminController = require("../controllers/adminController");

// const log = require("debug")("routes:index");

const router = express.Router();

router.get("/", (req, res) => {
  // console.log("res.session:", req.session);
  res.locals.title = "Home | Members only";
  // console.log("index router req.user:", req.user);
  res.render("index");
});

// router.get("/admin", adminController.get);
// router.post("/admin", adminController.post);

module.exports = router;
