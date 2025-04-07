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

  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryName, description } = req.body;
      if (!categoryName) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: CATEGORIES_MESSAGES.CATEGORY_NAME_REQUIRED,
        });
        return;
      }

      const category = await CategoryService.createCategoryService(
        categoryName,
        description
      );
      res.status(HTTP_STATUS.CREATED).json({
        message: CATEGORIES_MESSAGES.CREATE_SUCCESS,
        data: category,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORIES_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { categoryName, description } = req.body;
      const category = await CategoryService.updateCategoryService(
        id,
        categoryName,
        description
      )
      res.status(HTTP_STATUS.OK).json({
        message: CATEGORIES_MESSAGES.UPDATE_SUCCESS,
        data: category,
      });
    } catch (error: any) {
       res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORIES_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategoryService(id);
      res.status(HTTP_STATUS.OK).json({
        message: CATEGORIES_MESSAGES.DELETE_SUCCESS,
      });
      
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORIES_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
