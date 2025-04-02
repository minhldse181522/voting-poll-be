"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const performance_controller_1 = require("../controllers/performance.controller");
const router = (0, express_1.Router)();
router.get("/performances", performance_controller_1.PerformanceController.getAllPerformances);
router.put("/performances/:id", performance_controller_1.PerformanceController.updateVotePerformance);
exports.default = router;
