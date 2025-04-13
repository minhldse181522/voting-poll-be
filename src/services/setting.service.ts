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
	}

	static async createSettingService(
		bgDesktop: string,
		bgPhone?: string,
		textColor?: string,
		buttonColor?: string,
	) {
		const newSetting = await prisma.systemSetting.create({
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
	}

	static async updateSettingService(
		id: string,
		bgDesktop?: string,
		bgPhone?: string,
		textColor?: string,
		buttonColor?: string,
	) {
		const setting = await prisma.systemSetting.update({
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
	}

	static async deleteSettingService(id: string) {
		return await prisma.systemSetting.delete({
			where: { id: Number(id) },
		});
	}
}
