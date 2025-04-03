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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CategoryService {
    static getCategoryService() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.category.findMany({
                select: {
                    id: true,
                    categoryName: true,
                    description: true,
                },
            });
            return categories.map((category) => ({
                id: category.id.toString(),
                categoryName: category.categoryName,
                description: category.description,
            }));
        });
    }
}
exports.CategoryService = CategoryService;
