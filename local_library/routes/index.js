const express = require("express");

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get("/", (req, res, next) => {
  // res.render("index", { title: "Local library" });
  res.redirect("/catalog");
});

module.exports = router;
