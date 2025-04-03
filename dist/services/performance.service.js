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
exports.PerformanceService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const client_1 = require("@prisma/client");
const websocket_service_1 = __importDefault(require("../socket/websocket.service"));
const prisma = new client_1.PrismaClient();
class PerformanceService {
    // Chỉ lấy performances
    static getPerformanceService() {
        return __awaiter(this, void 0, void 0, function* () {
            const performances = yield prisma.performance.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });
            return performances.map((performance) => ({
                id: performance.id.toString(),
                name: performance.name,
            }));
        });
    }
    // Lấy performance theo category
    static getPerformancesByCategoryService(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const performanceCate = yield prisma.performanceCategory.findMany({
                where: { category_id: BigInt(categoryId) },
                select: {
                    performances: { select: { id: true, name: true } },
                    vote: true,
                },
            });
            return performanceCate.map((performance) => ({
                id: performance.performances.id.toString(),
                name: performance.performances.name,
                vote: performance.vote,
            }));
        });
    }
    static votePerformanceService(performanceId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.performanceCategory.updateMany({
                where: {
                    performance_id: performanceId,
                    category_id: categoryId,
                },
                data: { vote: { increment: 1 } },
            });
            const totalVotes = yield prisma.performanceCategory.aggregate({
                _sum: { vote: true },
                where: { performance_id: performanceId, category_id: categoryId },
            });
            // Gửi dữ liệu cập nhật qua WebSocket
            websocket_service_1.default.sendToAll("voteUpdate", {
                id: performanceId.toString(),
                categoryId: categoryId.toString(),
                vote: totalVotes._sum.vote || 0,
            });
            return {
                id: performanceId.toString(),
                categoryId: categoryId.toString(),
                vote: totalVotes._sum.vote || 0,
            };
        });
    }
}
exports.PerformanceService = PerformanceService;
