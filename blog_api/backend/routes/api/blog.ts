import express from "express";
import { categoriesController } from "../../controllers/categoriesController";
import { postsController } from "../../controllers/postsController";

const router = express.Router();

router.get("/categories", categoriesController.readCategories);

router.get("/posts", postsController.readPosts);
router.get("/posts/:id", postsController.readPost);

export { router as blogRoute };
