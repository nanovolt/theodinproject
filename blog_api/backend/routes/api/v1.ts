import express from "express";
import { authController } from "../../controllers/authController";
import { passport } from "../../config/passport";

const router = express.Router();

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/protected", (req, res) => {
  res.send("protected");
});
export default router;
