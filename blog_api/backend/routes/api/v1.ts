import debug from "debug";
import express from "express";
import { authController } from "../../controllers/authController";
import { refreshController } from "../../controllers/refreshController";
import { accessController } from "../../controllers/accessController";

const log = debug("routes:api:v1");

const router = express.Router();

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);
router.get("/refresh-token", refreshController.getRefreshToken);

router.use(accessController.authorize);

router.get("/protected", (req, res) => {
  res.send("welcome to protected route");
});

export default router;
