import { Router } from "express";
import { PerformanceController } from "../controllers/performance.controller";

const router = Router();

router.get("/performances", PerformanceController.getAllPerformances);
router.get("/performanceByCategory/:id", PerformanceController.getAllPerformanceCategories);
router.put("/performances/:id", PerformanceController.updateVotePerformance);

export default router;
