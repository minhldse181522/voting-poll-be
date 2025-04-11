/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import websocketService from "../socket/websocket.service";

const prisma = new PrismaClient();

export class CategoryService {
  static async toggleVoting(id: string, enabled: boolean) {
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        votingEnabled: enabled,
      },
    });

    websocketService.sendToAll("votingStateChanged", {
      id: updatedCategory.id.toString(),
      enabled,
    });
  }

  static async getCategoryService() {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        categoryName: true,
        description: true,
        votingEnabled: true,
      },
    });
    return categories.map((category) => ({
      id: category.id.toString(),
      categoryName: category.categoryName,
      description: category.description,
      enabled: category.votingEnabled,
    }));
  }

  static async createCategoryService(categories: { categoryName: string; description?: string }[]) {
    const createdCategories = [];

    const performances = await prisma.performance.findMany({
      select: { id: true },
    });

    for (const { categoryName, description } of categories) {
      const category = await prisma.category.create({
        data: { categoryName, description },
      });

      const categoryData = {
        id: category.id.toString(),
        categoryName: category.categoryName,
        description: category.description,
      };

      const dataToInsert = performances.map((per) => ({
        category_id: Number(categoryData.id),
        performance_id: per.id,
        vote: 0,
      }));

      await prisma.performanceCategory.createMany({
        data: dataToInsert,
        skipDuplicates: true,
      });

      createdCategories.push(categoryData);
    }

    return createdCategories;
  }

  static async updateCategoryService(id: string, categoryName?: string, description?: string) {
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        categoryName,
        description,
      },
    });
    return {
      id: category.id.toString(),
      categoryName: category.categoryName,
      description: category.description,
    };
  }

  static async deleteCategoryService(id: string) {
    return await prisma.category.delete({
      where: { id: Number(id) },
    });
  }
}
