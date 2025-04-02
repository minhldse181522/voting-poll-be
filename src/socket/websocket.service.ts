import { Server, Socket } from "socket.io";

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
  public initialize(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: [
          "http://localhost:5173", // FE dev
          "https://voting-poll-fe.vercel.app", // FE deploy trên Vercel
        ],
        // methods: ["GET", "POST"],
      },
    });
    // Lắng nghe sự kiện client kết nối
    this.io.on("connection", (socket: Socket) => {
      console.log("Client connected:", socket.id);

      // Lắng nghe sự kiện client ngắt kết nối
      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    console.log("WebSocket Server Initialized");
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
