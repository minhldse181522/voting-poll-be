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
exports.PerformanceController = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const performance_service_1 = require("../services/performance.service");
class PerformanceController {
    static getAllPerformances(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const performances = yield performance_service_1.PerformanceService.getPerformanceService();
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.PERFORMANCES_MESSAGES.RETRIEVE_SUCCESS,
                    data: performances,
                });
            }
            catch (error) {
                console.error(error);
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.PERFORMANCES_MESSAGES.RETRIEVE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
    static getAllPerformanceCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = Number(req.params.id);
                const performances = yield performance_service_1.PerformanceService.getPerformancesByCategoryService(categoryId);
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.PERFORMANCES_MESSAGES.RETRIEVE_SUCCESS,
                    data: performances,
                });
            }
            catch (error) {
                console.error(error);
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.PERFORMANCES_MESSAGES.RETRIEVE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
    static updateVotePerformance(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { categoryId } = req.body;
                const updatedPerformance = yield performance_service_1.PerformanceService.votePerformanceService(Number(id), Number(categoryId));
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.PERFORMANCES_MESSAGES.UPDATE_SUCCESS,
                    data: updatedPerformance,
                });
            }
            catch (error) {
                console.error(error);
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.PERFORMANCES_MESSAGES.UPDATE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
}
exports.PerformanceController = PerformanceController;
