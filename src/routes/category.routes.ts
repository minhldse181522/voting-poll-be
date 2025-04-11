import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const router = Router();

router.get("/categories", CategoryController.getAllCategories);
router.post("/category", CategoryController.createCategory);
router.put("/category/:id", CategoryController.updateCategory);
router.delete("/category/:id", CategoryController.deleteCategory);
router.put("/categoryVote/:id", CategoryController.toggleVotingCategory);

export default router;
