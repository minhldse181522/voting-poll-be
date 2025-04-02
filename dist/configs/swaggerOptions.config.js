"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Poll Voting Real Time",
            version: "1.0.0",
            description: "API documentation for Poll Voting Real Time",
        },
        servers: [
            {
                url: process.env.API_BASE_URL || "http://localhost:8080",
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};
exports.default = swaggerOptions;
