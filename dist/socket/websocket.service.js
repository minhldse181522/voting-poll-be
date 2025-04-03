"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
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
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: [
                    "http://localhost:5173", // FE dev
                    "https://voting-poll-fe.vercel.app", // FE deploy trên Vercel
                ],
                // methods: ["GET", "POST"],
            },
        });
        // Lắng nghe sự kiện client kết nối
        this.io.on("connection", (socket) => {
            console.log("Client connected:", socket.id);
            // Lắng nghe sự kiện client ngắt kết nối
            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });
        });
        console.log("WebSocket Server Initialized");
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
