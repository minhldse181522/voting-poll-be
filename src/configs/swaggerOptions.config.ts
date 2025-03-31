import { Options } from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();
const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Poll Voting Real Time",
      version: "1.0.0",
      description:
        "API documentation for Poll Voting Real Time",
    },
    servers: [
      {
        url: process.env.API_BASE_URL || "http://localhost:8080",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

export default swaggerOptions;
