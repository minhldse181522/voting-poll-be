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
exports.UserController = void 0;
const httpStatus_1 = __importDefault(require("../constants/httpStatus"));
const messages_1 = require("../constants/messages");
const user_service_1 = require("../services/user.service");
class UserController {
    static getAllUsersHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.UserService.getUserService();
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.USERS_MESSAGES.RETRIEVE_SUCCESS,
                    data: users,
                });
            }
            catch (error) {
                console.error(error);
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.USERS_MESSAGES.RETRIEVE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
    static getUserByIdHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (isNaN(id)) {
                    res.status(httpStatus_1.default.BAD_REQUEST).json({
                        message: "Invalid user ID format",
                    });
                    return;
                }
                const user = yield user_service_1.UserService.getUserByIdService(id);
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.USERS_MESSAGES.RETRIEVE_SINGLE_SUCCESS,
                    data: user,
                });
            }
            catch (error) {
                console.error(error);
                if (error.message === "User not found") {
                    res.status(httpStatus_1.default.NOT_FOUND).json({
                        message: messages_1.USERS_MESSAGES.NOT_FOUND,
                    });
                }
                else {
                    res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                        message: messages_1.USERS_MESSAGES.RETRIEVE_SINGLE_FAILURE,
                        error: error.message,
                    });
                }
            }
        });
    }
    static validateBusinessUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield user_service_1.UserService.loginUser(username, password);
                res.status(httpStatus_1.default.OK).json({
                    message: messages_1.USERS_MESSAGES.RETRIEVE_SUCCESS,
                    data: user,
                });
            }
            catch (error) {
                console.error(error);
                res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                    message: messages_1.USERS_MESSAGES.RETRIEVE_FAILURE,
                    error: error.message,
                });
            }
        });
    }
}
exports.UserController = UserController;
