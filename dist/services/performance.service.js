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
    static getPerformanceService() {
        return __awaiter(this, void 0, void 0, function* () {
            const performances = yield prisma.performance.findMany({
                select: {
                    id: true,
                    name: true,
                    vote: true,
                },
            });
            return performances.map((performance) => ({
                id: performance.id.toString(),
                name: performance.name,
                vote: performance.vote,
            }));
        });
    }
    static votePerformanceService(performanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedPerformance = yield prisma.performance.update({
                where: { id: performanceId },
                data: { vote: { increment: 1 } },
            });
            websocket_service_1.default.sendToAll("voteUpdate", {
                id: updatedPerformance.id.toString(),
                vote: updatedPerformance.vote,
            });
            return Object.assign(Object.assign({}, updatedPerformance), { id: updatedPerformance.id.toString() });
        });
    }
}
exports.PerformanceService = PerformanceService;
