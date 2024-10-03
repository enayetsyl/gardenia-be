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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const tokenGenerateFunction_1 = require("../utils/tokenGenerateFunction");
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../module/User/user.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        const decoded = (0, tokenGenerateFunction_1.verifyToken)(token, config_1.default.jwt_access_secret);
        const { role, email, iat } = decoded;
        const user = yield user_model_1.User.isUserExistByEmail(email);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found");
        }
        if (user.passwordChangedAt && user_model_1.User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
