import express from "express";
const router = express.Router();
import { postsController } from "../../controllers/postsController";
import { validateCreateCategory } from "../../validators/categoriesValidators";
import { validateCreatePost, validateUpdatePost } from "../../validators/postsValidators";
import { categoriesController } from "../../controllers/categoriesController";

// categories CR-D
router.post("/categories", validateCreateCategory, categoriesController.createCategory);
router.get("/categories", categoriesController.readCategories);
router.delete("/categories/:id", categoriesController.deleteCategory);

// posts CRUD
router.post("/posts", validateCreatePost, postsController.createPost);
router.get("/posts", postsController.readPosts);
router.get("/posts/:id", postsController.readPost);
router.put("/posts/:id", validateUpdatePost, postsController.updatePost);
router.delete("/posts/:id", postsController.deletePost);

export { router as cmsRoute };
