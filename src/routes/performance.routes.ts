import { Router } from "express";
import { PerformanceController } from "../controllers/performance.controller";

const router = Router();

router.get("/performances", PerformanceController.getAllPerformances);
router.put("/performances/:id", PerformanceController.updateVotePerformance);

export default router;
