import { Server, Socket } from "socket.io";
import { initRedisAdapter } from "../redis/redisAdapter";
import { pubClient } from "../redis/redisClient";
import { PerformanceService } from "../services/performance.service";

class WebSocketService {
  // Đảm bảo rằng chỉ có một instance của WebSocketService trong toàn app
  private static instance: WebSocketService;
  // khởi tạo ban đầu biến io chứa WebSocker Server là null
  private io: Server | null = null;

  // Mô hình Singleton
  private constructor() {}

  // Phương thức để lấy instance của WebSocketService
  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  // Khởi tạo WebSocket server
  public async initialize(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:5173", // FE dev
          "https://voting-poll-fe.vercel.app", // FE deploy trên Vercel
        ],
        // methods: ["GET", "POST"],
      },
    });

    // Gắn Redis adapter vào instance io của Socket.IO
    await initRedisAdapter(this.io);

    // Lắng nghe sự kiện client kết nối
    this.io.on("connection", (socket: Socket) => {
      console.log("Client connected:", socket.id);

      socket.on("register", async (data) => {
        socket.data.deviceId = data.deviceId;
        socket.data.categoryId = data.categoryId;
      });

      socket.on("vote", async (voteData) => {
        const { performanceId, categoryId } = voteData;
        const deviceId = socket.data.deviceId;
        const voteKey = `vote:${deviceId}:cat:${categoryId}`;

        const alreadyVote = await pubClient.get(voteKey);
        if (alreadyVote) {
          socket.emit("vote-denied", "Bạn đã vote ở hạng mục này rồi.");
          return;
        }

        const result = await PerformanceService.votePerformanceService(performanceId, categoryId);
        await pubClient.set(voteKey, "true", "EX", 60 * 60 * 24);

        socket.emit("vote-success", "Vote thành công!");
        socket.emit("vote-updated", result);
      });

      // Lắng nghe sự kiện client ngắt kết nối
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    console.log("WebSocket Server Initialized with Redis");
  }

  // Hàm để phát sự kiện từ server đến tất cả client
  public sendToAll(event: string, data: any) {
    if (this.io) {
      this.io.emit(event, data);
    }
  }

  // Phát sự kiện từ server đén một client cụ thể
  public sendToClient(clientId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(clientId).emit(event, data);
    }
  }
}

export default WebSocketService.getInstance();
