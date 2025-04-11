"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const setting_controller_1 = require("../controllers/setting.controller");
const router = (0, express_1.Router)();
router.get("/settings", setting_controller_1.SystemSettingController.getAllSettings);
router.post("/setting", setting_controller_1.SystemSettingController.createSetting);
router.put("/setting/:id", setting_controller_1.SystemSettingController.updateSetting);
router.delete("/setting/:id", setting_controller_1.SystemSettingController.deletePerformance);
exports.default = router;
