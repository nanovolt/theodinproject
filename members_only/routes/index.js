const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.locals.title = "Home | Members only";
  res.render("index");
});

module.exports = router;
