import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swagger from "./swagger";
import userRoutes from "./routes/user.routes";
import performanceRoutes from "./routes/performance.routes";
import http from "http";
import websocketService from "./socket/websocket.service";

dotenv.config();

async function bootstrap() {
  const app = express();
  const server = http.createServer(app);
  const PORT = process.env.PORT || 8080;

  app.use(cors());
  app.use(express.json());

  // Routes
  app.use("/api", userRoutes);
  app.use("/api", performanceRoutes);

  // Swagger
  swagger(app);

  // Khởi tạo WebSocket
  websocketService.initialize(server);

  // Start server
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Error during app initialization:", err);
});
