/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import websocketService from "../socket/websocket.service";

const prisma = new PrismaClient();

export class PerformanceService {
  static async getPerformanceService() {
    const performances = await prisma.performance.findMany({
      select: {
        id: true,
        name: true,
        vote: true,
      },
    });
    return performances.map((performance) => ({
      id: performance.id.toString(),
      name: performance.name,
      vote: performance.vote,
    }));
  }

  static async votePerformanceService(performanceId: number) {
    const updatedPerformance = await prisma.performance.update({
      where: { id: performanceId },
      data: { vote: { increment: 1 } },
    });

    websocketService.sendToAll("voteUpdate", {
      id: updatedPerformance.id.toString(),
      vote: updatedPerformance.vote,
    });
    return {
      ...updatedPerformance,
      id: updatedPerformance.id.toString(), // Convert BigInt to string
    };
  }
}
