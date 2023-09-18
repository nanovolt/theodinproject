const log = require("debug")("router:index");
const express = require("express");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Message = require("../models/message");
const Club = require("../models/club");

const router = express.Router();

router.get("/", async (req, res) => {
  let messages;
  let isMember = false;
  if (req.user) {
    messages = await Message.find().populate("author").sort("-date").exec();
    isMember = await Club.findOne({ member: req.user._id }).exec();
  } else {
    messages = await Message.find({}, "message").sort("-date").exec();
  }

  res.locals.messages = messages;
  res.locals.title = "Home | Members only";
  res.locals.user = req.user;
  res.locals.isMember = isMember;
  res.render("index");
});

router.post("/", [
  body("message").trim().notEmpty().withMessage("message is required").bail().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    log("errors:", errors.array());

    if (!errors.isEmpty()) {
      res.locals.errors = errors.array();
      res.locals.title = "Home | Members only";
      res.locals.user = req.user;
      res.render("index");
      return;
    }

    await Message.create({
      message: req.body.message,
      author: req.user._id,
      date: new Date(),
    });

    res.redirect("/");
  }),
]);

router.get("/delete/:id", async (req, res) => {
  console.log("delete:", req.params.id);

  await Message.findByIdAndRemove(req.params.id);
  res.redirect("/");
});

module.exports = router;
