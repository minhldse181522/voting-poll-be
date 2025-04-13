/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import websocketService from "../socket/websocket.service";

const prisma = new PrismaClient();

export class PerformanceService {
  // Chỉ lấy performances
  static async getPerformanceService() {
    const performances = await prisma.performance.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return performances.map((performance) => ({
      id: performance.id.toString(),
      name: performance.name,
    }));
  }

  // Lấy performance theo category
  static async getPerformancesByCategoryService(categoryId: number) {
    const performanceCate = await prisma.performanceCategory.findMany({
      where: { category_id: BigInt(categoryId) },
      select: {
        performances: { select: { id: true, name: true } },
        vote: true,
      },
    });
    return performanceCate.map((performance) => ({
      id: performance.performances.id.toString(),
      name: performance.performances.name,
      vote: performance.vote,
    }));
  }

  static async votePerformanceService(performanceId: number, categoryId: number) {
    const [_, totalVotes] = await prisma.$transaction([
      prisma.performanceCategory.updateMany({
        where: {
          performance_id: performanceId,
          category_id: categoryId,
        },
        data: { vote: { increment: 1 } },
      }),
      prisma.performanceCategory.aggregate({
        _sum: { vote: true },
        where: {
          performance_id: performanceId,
          category_id: categoryId,
        },
      }),
    ]);

    // Gửi dữ liệu cập nhật qua WebSocket
    websocketService.sendToAll("voteUpdate", {
      id: performanceId.toString(),
      categoryId: categoryId.toString(),
      vote: totalVotes._sum.vote || 0,
    });

    return {
      id: performanceId.toString(),
      categoryId: categoryId.toString(),
      vote: totalVotes._sum.vote || 0,
    };
  }

  static async unVotePerformanceService(oldPerformanceId: number, categoryId: number) {
    const [_, totalVotes] = await prisma.$transaction([
      prisma.performanceCategory.updateMany({
        where: {
          performance_id: oldPerformanceId,
          category_id: categoryId,
        },
        data: { vote: { decrement: 1 } },
      }),
      prisma.performanceCategory.aggregate({
        _sum: { vote: true },
        where: {
          performance_id: oldPerformanceId,
          category_id: categoryId,
        },
      }),
    ]);

    // Gửi dữ liệu cập nhật qua WebSocket
    websocketService.sendToAll("voteUpdate", {
      id: oldPerformanceId.toString(),
      categoryId: categoryId.toString(),
      vote: totalVotes._sum.vote || 0,
    });

    return {
      id: oldPerformanceId.toString(),
      categoryId: categoryId.toString(),
      vote: totalVotes._sum.vote || 0,
    };
  }

  static async createPerformanceService(performances: { name: string }[]) {
    const createdPerformances = [];

    for (const { name } of performances) {
      const performance = await prisma.performance.create({
        data: { name },
      });

      const performanceData = {
        id: performance.id.toString(),
        name: performance.name,
      };

      const categories = await prisma.category.findMany({ select: { id: true } });

      const dataToInsert = categories.map((cat) => ({
        performance_id: Number(performanceData.id),
        category_id: cat.id,
        vote: 0,
      }));

      await prisma.performanceCategory.createMany({
        data: dataToInsert,
        skipDuplicates: true,
      });

      createdPerformances.push(performanceData);
    }

    return createdPerformances;
  }

  static async updatePerformanceService(id: string, name?: string) {
    const performance = await prisma.performance.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    return {
      id: performance.id.toString(),
      name: performance.name,
    };
  }

  static async deletePerformanceService(id: string) {
    return await prisma.performance.delete({
      where: { id: Number(id) },
    });
  }
}
