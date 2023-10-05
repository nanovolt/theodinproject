import debug from "debug";
import express from "express";
import { authController } from "../../controllers/authController";
import { accessController } from "../../controllers/accessController";

const log = debug("routes:api:v1");

const router = express.Router();

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);

router.use(accessController.authorize);

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
