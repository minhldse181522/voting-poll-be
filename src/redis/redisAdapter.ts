import { createAdapter } from "@socket.io/redis-adapter";
import { pubClient, subClient } from "./redisClient";

// Adapter của Socket.IO để cho phép các server WebSocket giao tiếp thông qua Redis
export async function initRedisAdapter(io: any) {
  io.adapter(createAdapter(pubClient, subClient));
  console.log("Redis Adapter attached to Socket.IO");
}
