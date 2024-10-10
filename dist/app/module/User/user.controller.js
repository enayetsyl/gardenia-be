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
exports.UserControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const userRegister = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.createUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User created successfully!',
        data: user,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.UserServices.getAllUsersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrieved successfully!',
        data: users,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.getSingleUserFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: user,
    });
}));
const uploadUserImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.uploadUserImage(req.params.id, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User image uploaded successfully!',
        data: user,
    });
}));
const uploadUserCoverImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserServices.uploadUserCoverImage(req.params.id, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User cover image uploaded successfully!',
        data: user,
    });
}));
const verifyAccount = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield user_service_1.UserServices.verifyAccount(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Account verified successfully!',
        data: user,
    });
}));
const followUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { followerId, followedId } = req.body;
    const user = yield user_service_1.UserServices.followUser(followerId, followedId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User followed successfully!',
        data: user,
    });
}));
const getFollowers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log('user id in the controller', userId);
    const user = yield user_service_1.UserServices.getFollowers(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Followers retrieved successfully!',
        data: user,
    });
}));
exports.UserControllers = {
    userRegister, getAllUsers, getSingleUser, uploadUserImage, uploadUserCoverImage, verifyAccount, followUser, getFollowers
};
