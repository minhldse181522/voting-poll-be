/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { CATEGORIES_MESSAGES } from "../constants/messages";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryService.getCategoryService();
      res.status(HTTP_STATUS.OK).json({
        message: CATEGORIES_MESSAGES.RETRIEVE_SUCCESS,
        data: categories,
      });
    } catch (error: any) {
      console.error(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORIES_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }
}
