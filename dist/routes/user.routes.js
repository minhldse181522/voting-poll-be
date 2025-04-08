"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// Có thể dùng cách này để tạo swagger cho các route (hoặc dùng docs/user.swagger.ts)
// /**
//  * @swagger
//  * /api/users:
//  *   get:
//  *     summary: Get all users
//  *     responses:
//  *       200:
//  *         description: A list of users
//  */
router.get("/users", user_controller_1.UserController.getAllUsersHandler);
router.get("/public/users/:id", user_controller_1.UserController.getUserByIdHandler);
router.post("/public/login", user_controller_1.UserController.validateBusinessUser);
exports.default = router;
