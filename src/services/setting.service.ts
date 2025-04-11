/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SettingService {
  static async getSettingService() {
    const settings = await prisma.systemSetting.findMany({
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
  }

  static async createSettingService(bgDesktop: string, bgPhone?: string) {
    const newSetting = await prisma.systemSetting.create({
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
  }

  static async updateSettingService(id: string, bgDesktop?: string, bgPhone?: string) {
    const setting = await prisma.systemSetting.update({
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
  }

  static async deleteSettingService(id: string) {
    return await prisma.systemSetting.delete({
      where: { id: Number(id) },
    });
  }
}
