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

    const categoryData = {
      id: category.id.toString(),
      categoryName: category.categoryName,
      description: category.description,
    };

    const performances = await prisma.performance.findMany({
      select: {
        id: true,
      }
    })

    const dataToInsert = performances.map(per => ({
      category_id: Number(categoryData.id),
      performance_id: per.id,
      vote: 0
    }))

    await prisma.performanceCategory.createMany({
      data: dataToInsert,
      skipDuplicates: true
    })
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
