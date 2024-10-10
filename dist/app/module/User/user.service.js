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
const post_model_1 = require("../Post/post.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () { });
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const uploadUserImage = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (!file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "No image file provided");
    }
    // Generate a unique image name
    const imageName = `user_${id}_${Date.now()}`;
    // Upload image to Cloudinary
    const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
    // Update user with new image URL
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { userImage: result.secure_url }, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found after update");
    }
    return updatedUser;
});
const uploadUserCoverImage = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (!file) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "No image file provided");
    }
    // Generate a unique image name
    const imageName = `user_${id}_${Date.now()}`;
    // Upload image to Cloudinary
    const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
    // Update user cover image with new image URL
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { coverImage: result.secure_url }, { new: true });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found after update");
    }
    return updatedUser;
});
const verifyAccount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
    return result;
});
const followUser = (followerId, followedId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const follower = yield user_model_1.User.findById(followerId);
    const followed = yield user_model_1.User.findById(followedId);
    if (!follower || !followed) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Initialize followingId and followersId if they are undefined
    follower.followingId = follower.followingId || [];
    followed.followersId = followed.followersId || [];
    if (follower.followingId.includes(followedId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are already following this user");
    }
    // Increment following and follower counts, defaulting to 0 if undefined
    follower.followingCount = ((_a = follower.followingCount) !== null && _a !== void 0 ? _a : 0) + 1;
    followed.followerCount = ((_b = followed.followerCount) !== null && _b !== void 0 ? _b : 0) + 1;
    // Add followedId and followerId to respective arrays
    follower.followingId.push(followedId);
    followed.followersId.push(followerId);
    // Save both users
    yield follower.save();
    yield followed.save();
    return follower;
});
const getFollowers = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const followers = yield user_model_1.User.find({ _id: { $in: user.followersId } });
    return followers;
});
const getProfilePhotos = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const posts = yield post_model_1.Post.find({ userId }).select('images');
    const allImages = [
        user.userImage,
        user.coverImage,
        ...posts.flatMap(post => post.images || [])
    ].filter(Boolean);
    return allImages;
});
const updateBio = (userId, bio) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(userId, { bio }, { new: true });
    return user;
});
const updateDetails = (userId, study, location, maritalStatus, website) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(userId, { study, location, maritalStatus, website }, { new: true });
    return user;
});
exports.UserServices = {
    getSingleUserFromDB,
    getAllUsersFromDB,
    createUser,
    uploadUserImage,
    uploadUserCoverImage,
    verifyAccount,
    followUser,
    getFollowers,
    getProfilePhotos,
    updateBio,
    updateDetails
};
