const log = require("debug")("router:club");
const express = require("express");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Club = require("../models/club");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // log("req.user.id:", req.user.id);
  // log("req.user._id:", req.user._id);
  if (!req.user) {
    next();
    return;
  }
  // log("res.session:", req.session);

  const isMember = await Club.findOne({ member: req.user._id }).exec();

  log("isMember:", isMember);

  if (!isMember) {
    res.redirect("/club/join");
    return;
  }

  const members = await Club.find().populate("member").exec();
  // console.log("members:", members);
  res.locals.members = members;
  res.locals.title = "Club | Members only";
  res.render("club");
});

router.get("/join", (req, res, next) => {
  log("req.session:", req.session);
  log("req.user:", req.user);

  if (!req.user) {
    next();
    return;
  }

  res.locals.title = "Join the club | Members only";
  res.render("club_form");
});

router.post("/join", [
  body("secretcode")
    .trim()
    .notEmpty()
    .withMessage("code is required")
    .bail()
    .escape()
    .custom(async (value) => {
      if (value !== "kappa") {
        throw new Error("code is incorrect");
      }
    }),
  asyncHandler(async (req, res) => {
    console.log("req.user:", req.user);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.locals.title = "Join club | Members only";
      res.locals.secretcodeValue = req.body.secretcode;
      res.locals.errors = errors.array();
      res.render("club_form");
      return;
    }

    // log("res.session:", req.session);

    await Club.create({
      member: req.user._id,
    });
    res.redirect("/club");
  }),
]);

router.get("/leave", async (req, res) => {
  const mem = await Club.deleteOne({ member: req.user._id });
  console.log("leave mem:", mem);
  res.redirect("/");
});

module.exports = router;
