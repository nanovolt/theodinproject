import debug from "debug";
import express from "express";

import { accessController } from "../../controllers/accessController";
import { blogRoute } from "./blog";
import { cmsRoute } from "./cms";
import { authController } from "../../controllers/authController";
import { validateLogin } from "../../validators/validateLogin";
import { validateRegister } from "../../validators/validateRegister";

const log = debug("routes:api:v1");

const router = express.Router();

// these 2 routes don't use authentication, they're always public
router.post("/register", validateRegister, authController.postRegister);
router.post("/login", validateLogin, authController.postLogin);

// frontend that requests blog route doesn't use authentication nor api key, but protected by CORS
router.use("/blog/", blogRoute);

// frontend that requests cms route uses a cookie session and an api key
// API route protection is done in "accessController"
router.use(accessController.authorize);
router.get("/logout", authController.getLogout);
router.use("/cms/", cmsRoute);

// all routes below are protected by passport
router.get("/protected", (req, res) => {
  res.send("welcome to protected route");
});

router.get("/session", (req, res) => {
  log("session user:", req.user);
  res.json({
    cookie: req.cookies,
    session: req.session,
    sessionid: req.sessionID,
    user: req.user,
  });
});

export default router;
