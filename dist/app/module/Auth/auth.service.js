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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../User/user.model");
const user_constant_1 = require("../User/user.constant");
const tokenGenerateFunction_1 = require("../../utils/tokenGenerateFunction");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const sendEmail_1 = require("../../utils/sendEmail");
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User already exist");
    }
    payload.role = user_constant_1.USER_ROLE.USER;
    const newUser = yield user_model_1.User.create(payload);
    const jwtPayload = {
        _id: newUser === null || newUser === void 0 ? void 0 : newUser._id,
        role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
        name: newUser === null || newUser === void 0 ? void 0 : newUser.name,
        email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
    };
    const accessToken = (0, tokenGenerateFunction_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.JWT_EXPIRES_IN);
    const refreshToken = (0, tokenGenerateFunction_1.createToken)(jwtPayload, config_1.default.JWT_REFRESH_SECRET_KEY, config_1.default.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield user_model_1.User.isUserExistByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (!(yield user_model_1.User.isPasswordMatched((_a = payload === null || payload === void 0 ? void 0 : payload.password) !== null && _a !== void 0 ? _a : '', (_b = user === null || user === void 0 ? void 0 : user.password) !== null && _b !== void 0 ? _b : ''))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password does not match");
    }
    const jwtPayload = {
        _id: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
    };
    const accessToken = (0, tokenGenerateFunction_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.JWT_EXPIRES_IN);
    const refreshToken = (0, tokenGenerateFunction_1.createToken)(jwtPayload, config_1.default.JWT_REFRESH_SECRET_KEY, config_1.default.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
        user
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
});
const forgetPassword = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistByEmail(userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const resetToken = (0, tokenGenerateFunction_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
    const resetUILink = `${config_1.default.reset_pass_ui_link}/reset-password/${user._id}/${resetToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetUILink);
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByCustomId(payload === null || payload === void 0 ? void 0 : payload.id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    const decoded = jsonwebtoken_1.default.verify(payload.token, config_1.default.jwt_access_secret);
    if (payload.id !== (decoded === null || decoded === void 0 ? void 0 : decoded.userId)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User does not exist");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.password, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        _id: decoded === null || decoded === void 0 ? void 0 : decoded.userId,
        role: decoded === null || decoded === void 0 ? void 0 : decoded.role
    }, {
        password: newHashedPassword,
    });
});
const getUserInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    return user;
});
exports.AuthServices = {
    registerUser,
    loginUser,
    changePassword,
    refreshToken, forgetPassword, resetPassword, getUserInfo
};
