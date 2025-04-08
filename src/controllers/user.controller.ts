/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { USERS_MESSAGES } from "../constants/messages";
import { UserService } from "../services/user.service";


export class UserController {
  static async getAllUsersHandler(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getUserService();
      res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.RETRIEVE_SUCCESS,
        data: users,
      });
    } catch (error: any) {
      console.error(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: USERS_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getUserByIdHandler(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Invalid user ID format",
        });
        return;
      }

      const user = await UserService.getUserByIdService(id);

      res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      if (error.message === "User not found") {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: USERS_MESSAGES.NOT_FOUND,
        });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          message: USERS_MESSAGES.RETRIEVE_SINGLE_FAILURE,
          error: error.message,
        });
      }
    }
  }

  static async validateBusinessUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await UserService.loginUser(username, password);
      res.status(HTTP_STATUS.OK).json({
        message: USERS_MESSAGES.RETRIEVE_SUCCESS,
        data: user,
      });
    } catch (error: any) {
      console.error(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: USERS_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }
}
