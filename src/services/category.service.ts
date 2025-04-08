/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryService {
  static async getCategoryService() {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        categoryName: true,
        description: true,
      },
    });
    return categories.map((category) => ({
      id: category.id.toString(),
      categoryName: category.categoryName,
      description: category.description,
    }));
  }

  static async createCategoryService(categoryName: string, description?: string) {
    const category = await prisma.category.create({
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

  static async updateCategoryService(id: string, categoryName?: string, description?: string) {
    const category = await prisma.category.update({
      where: {id: Number(id)},
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
    })
  }
}
