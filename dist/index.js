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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./swagger"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const performance_routes_1 = __importDefault(require("./routes/performance.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const http_1 = __importDefault(require("http"));
const websocket_service_1 = __importDefault(require("./socket/websocket.service"));
dotenv_1.default.config();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const server = http_1.default.createServer(app);
        const PORT = process.env.PORT || 8080;
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        // Routes
        app.use("/api", user_routes_1.default);
        app.use("/api", performance_routes_1.default);
        app.use("/api", category_routes_1.default);
        // Swagger
        (0, swagger_1.default)(app);
        // Khởi tạo WebSocket
        websocket_service_1.default.initialize(server);
        // Start server
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    });
}
bootstrap().catch((err) => {
    console.error("Error during app initialization:", err);
});
