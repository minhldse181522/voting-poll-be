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
}
