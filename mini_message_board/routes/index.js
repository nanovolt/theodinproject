const express = require("express");

const router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// eslint-disable-next-line no-unused-vars
router.get("/", (req, res, next) => {
  res.render("index", { title: "Mini message board", messages });
});

// eslint-disable-next-line no-unused-vars
router.get("/new", (req, res, next) => {
  res.render("form");
});

// eslint-disable-next-line no-unused-vars
router.post("/new", (req, res, next) => {
  console.log(req.body.message);
  console.log(req.body.user);
  messages.push({ text: req.body.message, user: req.body.user, added: new Date() });
  res.redirect("/");
});

module.exports = router;
