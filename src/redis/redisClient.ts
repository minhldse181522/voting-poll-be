import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Redis hỗ trợ pub/sub -> liên quan đén socket

// Tạo Redis client chuyên để publish các sự kiện.
export const pubClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  // family: 4 là IPv4, 6 là IPv6
  family: Number(process.env.REDIS_FAMILY) | 4,
  // Redis sử dụng HTTPS, bật TLS
  tls: process.env.REDIS_TLS === "true" ? {} : undefined,
  connectTimeout: 3000,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

// Tạo Redis client mới để subscribe vào các sự kiện Redis
export const subClient = pubClient.duplicate();
