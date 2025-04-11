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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SettingService {
    static getSettingService() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield prisma.systemSetting.findMany({
                select: {
                    id: true,
                    bgDesktop: true,
                    bgPhone: true,
                },
            });
            return settings.map((setting) => ({
                id: setting.id.toString(),
                bgDesktop: setting.bgDesktop,
                bgPhone: setting.bgPhone,
            }));
        });
    }
    static createSettingService(bgDesktop, bgPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSetting = yield prisma.systemSetting.create({
                data: {
                    bgDesktop,
                    bgPhone,
                },
            });
            return {
                id: newSetting.id.toString(),
                bgDesktop: newSetting.bgDesktop,
                bgPhone: newSetting.bgPhone,
            };
        });
    }
    static updateSettingService(id, bgDesktop, bgPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            const setting = yield prisma.systemSetting.update({
                where: { id: Number(id) },
                data: {
                    bgDesktop,
                    bgPhone,
                },
            });
            return {
                id: setting.id.toString(),
                bgDesktop: setting.bgDesktop,
                bgPhone: setting.bgPhone,
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
}
exports.SettingService = SettingService;
