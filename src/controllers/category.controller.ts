/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { CATEGORIES_MESSAGES } from "../constants/messages";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async toggleVotingCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { enabled } = req.body;
      const categoryVote = await CategoryService.toggleVoting(id, enabled);
      res.status(HTTP_STATUS.OK).json({
        message: CATEGORIES_MESSAGES.VOTE_UPDATE_SUCCESS,
        data: categoryVote,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORIES_MESSAGES.VOTE_UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryService.getCategoryService();
      res.status(HTTP_STATUS.OK).json({
        message: CATEGORIES_MESSAGES.RETRIEVE_SUCCESS,
        data: categories,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: CATEGORIES_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const categories = req.body; // Should be an array
      if (!Array.isArray(categories)) {
        res.status(400).json({ message: "Invalid input: expected an array" });
      }

      const createdCategory = await CategoryService.createCategoryService(categories);

      res.status(HTTP_STATUS.CREATED).json({
        message: CATEGORIES_MESSAGES.CREATE_SUCCESS,
        data: createdCategory,
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
      const category = await CategoryService.updateCategoryService(id, categoryName, description);
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
