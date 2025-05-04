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
exports.SettingService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const client_1 = require("@prisma/client");
const websocket_service_1 = __importDefault(require("../socket/websocket.service"));
const prisma = new client_1.PrismaClient();
class SettingService {
    static getSettingService() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield prisma.systemSetting.findMany({
                select: {
                    id: true,
                    bgDesktop: true,
                    bgPhone: true,
                    textColor: true,
                    buttonColor: true,
                },
            });
            return settings.map((setting) => ({
                id: setting.id.toString(),
                bgDesktop: setting.bgDesktop,
                bgPhone: setting.bgPhone,
                textColor: setting.textColor,
                buttonColor: setting.buttonColor,
            }));
        });
    }
    static createSettingService(bgDesktop, bgPhone, textColor, buttonColor) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSetting = yield prisma.systemSetting.create({
                data: {
                    bgDesktop,
                    bgPhone,
                    textColor,
                    buttonColor,
                },
            });
            return {
                id: newSetting.id.toString(),
                bgDesktop: newSetting.bgDesktop,
                bgPhone: newSetting.bgPhone,
                textColor: newSetting.textColor,
                buttonColor: newSetting.buttonColor,
            };
        });
    }
    static updateSettingService(id, bgDesktop, bgPhone, textColor, buttonColor) {
        return __awaiter(this, void 0, void 0, function* () {
            const setting = yield prisma.systemSetting.update({
                where: { id: Number(id) },
                data: {
                    bgDesktop,
                    bgPhone,
                    textColor,
                    buttonColor,
                },
            });
            return {
                id: setting.id.toString(),
                bgDesktop: setting.bgDesktop,
                bgPhone: setting.bgPhone,
                textColor: setting.textColor,
                buttonColor: setting.buttonColor,
            };
        });
    }
    static deleteSettingService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.systemSetting.delete({
                where: { id: Number(id) },
            });
        });
    }
    static updateLanguageService(id, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedLanguage = yield prisma.systemSetting.update({
                where: {
                    id: Number(id),
                },
                data: {
                    language,
                },
            });
            websocket_service_1.default.sendToAll("languageUpdate", {
                id: id.toString(),
                language: updatedLanguage.language,
            });
            return {
                id: updatedLanguage.id.toString(),
                language: updatedLanguage.language,
            };
        });
    }
}
exports.SettingService = SettingService;
