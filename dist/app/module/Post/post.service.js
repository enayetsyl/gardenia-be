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
exports.PostServices = void 0;
const post_model_1 = require("./post.model");
const user_model_1 = require("../User/user.model");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getUpvote = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({ userId: userId });
    if (posts.length === 0) {
        return false; // No posts found, return false
    }
    // Check if any post has at least one upvote
    return posts.some(post => { var _a; return ((_a = post.upvoteCount) !== null && _a !== void 0 ? _a : 0) > 0; });
});
const createPost = (postData, files) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exists
    console.log('post data', postData);
    const user = yield user_model_1.User.findById(postData.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Handle image uploads
    const imageUrls = [];
    console.log('user', user);
    if (files && files.length > 0) {
        for (const file of files) {
            const imageName = file.filename;
            const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
            if (result && typeof result === 'object' && 'secure_url' in result) {
                imageUrls.push(result.secure_url);
            }
        }
    }
    console.log('imageUrls', imageUrls);
    // Create new post
    const newPost = yield post_model_1.Post.create(Object.assign(Object.assign({}, postData), { images: imageUrls }));
    console.log('newPost', newPost);
    return newPost;
});
const getPost = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({ userId: userId });
    return posts;
});
exports.PostServices = {
    getUpvote,
    createPost,
    getPost
};
