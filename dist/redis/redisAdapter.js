"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRedisAdapter = initRedisAdapter;
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redisClient_1 = require("./redisClient");
// Adapter của Socket.IO để cho phép các server WebSocket giao tiếp thông qua Redis
function initRedisAdapter(io) {
    return __awaiter(this, void 0, void 0, function* () {
        io.adapter((0, redis_adapter_1.createAdapter)(redisClient_1.pubClient, redisClient_1.subClient));
        console.log("Redis Adapter attached to Socket.IO");
    });
}
