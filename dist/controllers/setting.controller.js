"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettingController = void 0;
const setting_service_1 = require("./../services/setting.service");
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
class SystemSettingController {
    static getAllSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setting = yield setting_service_1.SettingService.getSettingService();
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.SETTING_MESSAGES.RETRIEVE_SUCCESS,
                    data: setting,
                });
            }
            catch (error) {
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.SETTING_MESSAGES.RETRIEVE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
    static createSetting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { bgDesktop, bgPhone, textColor, buttonColor } = req.body;
                const createdsetting = yield setting_service_1.SettingService.createSettingService(bgDesktop, bgPhone, textColor, buttonColor);
                res.status(httpStatus_1.default.CREATED).json({
                    message: messages_1.SETTING_MESSAGES.CREATE_SUCCESS,
                    data: createdsetting,
                });
            }
            catch (error) {
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.SETTING_MESSAGES.CREATE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
    static updateSetting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { bgDesktop, bgPhone, buttonColor, textColor } = req.body;
                const updatedSetting = yield setting_service_1.SettingService.updateSettingService(id, bgDesktop, bgPhone, textColor, buttonColor);
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.SETTING_MESSAGES.UPDATE_SUCCESS,
                    data: updatedSetting,
                });
            }
            catch (error) {
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.SETTING_MESSAGES.UPDATE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
    static deletePerformance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield setting_service_1.SettingService.deleteSettingService(id);
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.SETTING_MESSAGES.DELETE_SUCCESS,
                });
            }
            catch (error) {
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.SETTING_MESSAGES.DELETE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
    static updateSettingLanguage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { language } = req.body;
                const updatedSetting = yield setting_service_1.SettingService.updateLanguageService(id, language);
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.SETTING_MESSAGES.UPDATE_SUCCESS,
                    data: updatedSetting,
                });
            }
            catch (error) {
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.SETTING_MESSAGES.UPDATE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
}
exports.SystemSettingController = SystemSettingController;
