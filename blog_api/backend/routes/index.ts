import express from "express";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

const router = express.Router();

router.get(
  "/error",
  asyncHandler(async (req, res, next) => {
    // throw { name: "fff", message: "adf", status: 418 };
    // const err = createError.ImATeapot();
    // throw err;
    // console.log(err);
    // next(err);
    // next(createError(418));
    // next(createError(404, "no such resource"));
    // next(createError.ImATeapot("oops"));
    // next(createError.BadRequest("incorrect request data"));
    return next(createError(401, "Please login to view this page."));
    // res.json(user);
    // throw Error("hi");
    // res.status(403).json({ message: "fff" });
  })
);

export default router;
