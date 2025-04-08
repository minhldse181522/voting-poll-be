import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

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
router.get("/users", UserController.getAllUsersHandler);
router.get("/public/users/:id", UserController.getUserByIdHandler);
router.post("/public/login", UserController.validateBusinessUser);

export default router;
