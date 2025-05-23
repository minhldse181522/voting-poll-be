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
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const prisma_1 = __importDefault(require("../prisma"));
class UserService {
    static getUserService() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.default.user.findMany({
                select: {
                    id: true,
                    username: true,
                },
            });
            return users.map((user) => ({
                user_id: user.id.toString(),
                username: user.username,
            }));
        });
    }
    static getUserByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: { id: BigInt(id) },
            });
            if (!user) {
                throw new Error("User not found");
            }
            return {
                id: user.id.toString(),
                username: user.username,
            };
        });
    }
    static loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: { username, password },
            });
            if (!user) {
                throw new Error("User not found");
            }
            return {
                id: user.id.toString(),
                username: user.username,
            };
        });
    }
}
exports.UserService = UserService;
