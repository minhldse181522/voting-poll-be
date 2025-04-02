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

  static async updateVotePerformance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedPerformance = await PerformanceService.votePerformanceService(Number(id));
      res.status(HTTP_STATUS.OK).json({
        message: PERFORMANCES_MESSAGES.UPDATE_SUCCESS,
        data: updatedPerformance,
      });
    } catch (error: any) {
      console.error(error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: PERFORMANCES_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }
}
