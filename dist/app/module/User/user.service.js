"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const uploadUserImage = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No image file provided');
    }
    // Generate a unique image name
    const imageName = `user_${id}_${Date.now()}`;
    // Upload image to Cloudinary
    const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
    // Update user with new image URL
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { userImage: result.secure_url }, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found after update');
    }
    return updatedUser;
});
const uploadUserCoverImage = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No image file provided');
    }
    // Generate a unique image name
    const imageName = `user_${id}_${Date.now()}`;
    // Upload image to Cloudinary
    const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
    // Update user cover image with new image URL
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { coverImage: result.secure_url }, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found after update');
    }
    return updatedUser;
});
exports.UserServices = {
    getSingleUserFromDB, getAllUsersFromDB, createUser, uploadUserImage, uploadUserCoverImage
};
