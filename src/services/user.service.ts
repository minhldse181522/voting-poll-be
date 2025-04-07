/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "../prisma";

export class UserService {
  static async getUserService() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    return users.map((user) => ({
      user_id: user.id.toString(),
      username: user.username,
    }));
  }

  static async getUserByIdService(id: number) {
    const user = await prisma.user.findUnique({
      where: { id: BigInt(id) },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id.toString(),
      username: user.username,
    };
  }

  static async loginUser(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username, password },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return {
      id: user.id.toString(),
      username: user.username,
    };
  }
}