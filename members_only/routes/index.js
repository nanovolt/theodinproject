const log = require("debug")("routes:index");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  log("res.session:", req.session);
  res.locals.title = "Home | Members only";
  res.render("index");
});

module.exports = router;
