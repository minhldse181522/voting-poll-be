/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { PERFORMANCES_MESSAGES } from "../constants/messages";
import { PerformanceService } from "../services/performance.service";

export class PerformanceController {
  static async getAllPerformances(req: Request, res: Response): Promise<void> {
    try {
      const performances = await PerformanceService.getPerformanceService();
      res.status(HTTP_STATUS.OK).json({
        message: PERFORMANCES_MESSAGES.RETRIEVE_SUCCESS,
        data: performances,
      });
    } catch (error: any) {
      console.error(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PERFORMANCES_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async getAllPerformanceCategories(req: Request, res: Response): Promise<void> {
    try {
      const categoryId = Number(req.params.id);
      const performances = await PerformanceService.getPerformancesByCategoryService(categoryId);
      res.status(HTTP_STATUS.OK).json({
        message: PERFORMANCES_MESSAGES.RETRIEVE_SUCCESS,
        data: performances,
      });
    } catch (error: any) {
      console.error(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PERFORMANCES_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateVotePerformance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { categoryId } = req.body;
      const updatedPerformance = await PerformanceService.votePerformanceService(
        Number(id),
        Number(categoryId),
      );
      res.status(HTTP_STATUS.OK).json({
        message: PERFORMANCES_MESSAGES.UPDATE_SUCCESS,
        data: updatedPerformance,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PERFORMANCES_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async createPerformance(req: Request, res: Response): Promise<void> {
    try {
      const performances = req.body; // Should be an array
      if (!Array.isArray(performances)) {
        res.status(400).json({ message: "Invalid input: expected an array" });
      }

      const createdPerformances = await PerformanceService.createPerformanceService(performances);

      res.status(HTTP_STATUS.CREATED).json({
        message: PERFORMANCES_MESSAGES.CREATE_SUCCESS,
        data: createdPerformances,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PERFORMANCES_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updatePerformance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedPerformance = await PerformanceService.updatePerformanceService(id, name);
      res.status(HTTP_STATUS.OK).json({
        message: PERFORMANCES_MESSAGES.UPDATE_SUCCESS,
        data: updatedPerformance,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PERFORMANCES_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deletePerformance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await PerformanceService.deletePerformanceService(id);
      res.status(HTTP_STATUS.OK).json({
        message: PERFORMANCES_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PERFORMANCES_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
