import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swagger from "./swagger";
import userRoutes from "./routes/user.routes";

dotenv.config();

async function bootstrap() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(cors());

  app.use(express.json());

  // Routes
  app.use("/api", userRoutes);

  // Swagger
  swagger(app);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("Error during app initialization:", err);
});
