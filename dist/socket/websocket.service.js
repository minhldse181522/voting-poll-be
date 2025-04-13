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
const socket_io_1 = require("socket.io");
const redisAdapter_1 = require("../redis/redisAdapter");
const redisClient_1 = require("../redis/redisClient");
const performance_service_1 = require("../services/performance.service");
class WebSocketService {
    // Mô hình Singleton
    constructor() {
        // khởi tạo ban đầu biến io chứa WebSocker Server là null
        this.io = null;
    }
    // Phương thức để lấy instance của WebSocketService
    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }
    // Khởi tạo WebSocket server
    initialize(server) {
        return __awaiter(this, void 0, void 0, function* () {
            this.io = new socket_io_1.Server(server, {
                cors: {
                    origin: [
                        "http://localhost:5173", // FE dev
                        "https://voting-poll-fe.vercel.app", // FE deploy trên Vercel
                    ],
                    // methods: ["GET", "POST"],
                },
            });
            // Gắn Redis adapter vào instance io của Socket.IO
            yield (0, redisAdapter_1.initRedisAdapter)(this.io);
            // Lắng nghe sự kiện client kết nối
            this.io.on("connection", (socket) => {
                console.log("Client connected:", socket.id);
                socket.on("register", (data) => __awaiter(this, void 0, void 0, function* () {
                    socket.data.deviceId = data.deviceId;
                    socket.data.categoryId = data.categoryId;
                }));
                socket.on("vote", (voteData) => __awaiter(this, void 0, void 0, function* () {
                    const { performanceId, categoryId } = voteData;
                    const deviceId = socket.data.deviceId;
                    const voteKey = `vote:${deviceId}:cat:${categoryId}`;
                    const alreadyVote = yield redisClient_1.pubClient.get(voteKey);
                    if (alreadyVote) {
                        socket.emit("vote-denied", "Bạn đã vote ở hạng mục này rồi.");
                        return;
                    }
                    const result = yield performance_service_1.PerformanceService.votePerformanceService(performanceId, categoryId);
                    yield redisClient_1.pubClient.set(voteKey, "true", "EX", 60 * 60 * 24);
                    socket.emit("vote-success", "Vote thành công!");
                    socket.emit("vote-updated", result);
                }));
                // Lắng nghe sự kiện client ngắt kết nối
                socket.on("disconnect", () => {
                    console.log("Client disconnected:", socket.id);
                });
            });
            console.log("WebSocket Server Initialized with Redis");
        });
    }
    // Hàm để phát sự kiện từ server đến tất cả client
    sendToAll(event, data) {
        if (this.io) {
            this.io.emit(event, data);
        }
    }
    // Phát sự kiện từ server đén một client cụ thể
    sendToClient(clientId, event, data) {
        if (this.io) {
            this.io.to(clientId).emit(event, data);
        }
    }
}
exports.default = WebSocketService.getInstance();
