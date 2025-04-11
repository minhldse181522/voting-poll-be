"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subClient = exports.pubClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Redis hỗ trợ pub/sub -> liên quan đén socket
// Tạo Redis client chuyên để publish các sự kiện.
exports.pubClient = new ioredis_1.default({
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
exports.subClient = exports.pubClient.duplicate();
