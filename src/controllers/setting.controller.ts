import { SettingService } from "./../services/setting.service";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import HTTP_STATUS from "../constants/httpStatus";
import { SETTING_MESSAGES } from "../constants/messages";

export class SystemSettingController {
  static async getAllSettings(req: Request, res: Response): Promise<void> {
    try {
      const setting = await SettingService.getSettingService();
      res.status(HTTP_STATUS.OK).json({
        message: SETTING_MESSAGES.RETRIEVE_SUCCESS,
        data: setting,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: SETTING_MESSAGES.RETRIEVE_FAILURE,
        error: error.message,
      });
    }
  }

  static async createSetting(req: Request, res: Response): Promise<void> {
    try {
      const { bgDesktop, bgPhone } = req.body;
      const createdsetting = await SettingService.createSettingService(bgDesktop, bgPhone);

      res.status(HTTP_STATUS.CREATED).json({
        message: SETTING_MESSAGES.CREATE_SUCCESS,
        data: createdsetting,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: SETTING_MESSAGES.CREATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async updateSetting(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { bgDesktop, bgPhone } = req.body;
      const updatedSetting = await SettingService.updateSettingService(id, bgDesktop, bgPhone);
      res.status(HTTP_STATUS.OK).json({
        message: SETTING_MESSAGES.UPDATE_SUCCESS,
        data: updatedSetting,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: SETTING_MESSAGES.UPDATE_FAILURE,
        error: error.message,
      });
    }
  }

  static async deletePerformance(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await SettingService.deleteSettingService(id);
      res.status(HTTP_STATUS.OK).json({
        message: SETTING_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message: SETTING_MESSAGES.DELETE_FAILURE,
        error: error.message,
      });
    }
  }
}
