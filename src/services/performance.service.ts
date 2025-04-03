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
    await prisma.performanceCategory.updateMany({
      where: {
        performance_id: performanceId,
        category_id: categoryId,
      },
      data: { vote: { increment: 1 } },
    });

    const totalVotes = await prisma.performanceCategory.aggregate({
      _sum: { vote: true },
      where: { performance_id: performanceId, category_id: categoryId },
    });

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
}
