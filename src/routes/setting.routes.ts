import { Router } from "express";
import { SystemSettingController } from "../controllers/setting.controller";

const router = Router();

router.get("/settings", SystemSettingController.getAllSettings);
router.post("/setting", SystemSettingController.createSetting);
router.put("/setting/:id", SystemSettingController.updateSetting);
router.delete("/setting/:id", SystemSettingController.deletePerformance);

export default router;
