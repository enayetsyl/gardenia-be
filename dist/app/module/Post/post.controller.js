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
exports.PostControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const post_service_1 = require("./post.service");
const http_status_1 = __importDefault(require("http-status"));
const getUpvote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upvote = yield post_service_1.PostServices.getUpvote(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Upvote fetched successfully",
        data: upvote,
    });
}));
const createPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = req.body;
    const files = req.files;
    const post = yield post_service_1.PostServices.createPost(postData, files);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Post created successfully",
        data: post,
    });
}));
const getPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_service_1.PostServices.getPost(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Posts fetched successfully",
        data: posts,
    });
}));
const getNewsFeed = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_service_1.PostServices.getNewsFeed();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Posts fetched successfully",
        data: posts,
    });
}));
const upvotePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const userId = req.body.userId;
    const post = yield post_service_1.PostServices.upvotePost(postId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Post upvoted successfully",
        data: post,
    });
}));
const removeUpvote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const userId = req.body.userId;
    const post = yield post_service_1.PostServices.removeUpvote(postId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Post un-upvoted successfully",
        data: post,
    });
}));
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const post = yield post_service_1.PostServices.deletePost(postId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Post deleted successfully",
        data: post,
    });
}));
const commentOnPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const userId = req.body.userId;
    const comment = req.body.content;
    const post = yield post_service_1.PostServices.commentOnPost(postId, userId, comment);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Comment added successfully",
        data: post,
    });
}));
const updatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const postData = req.body;
    const files = req.files;
    const post = yield post_service_1.PostServices.updatePost(postId, postData, files);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Post updated successfully",
        data: post,
    });
}));
const deleteComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    console.log('postId', postId, 'commentId', commentId);
    const post = yield post_service_1.PostServices.deleteComment(postId, commentId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Comment deleted successfully",
        data: post,
    });
}));
exports.PostControllers = {
    getUpvote,
    createPost,
    getPost,
    getNewsFeed,
    upvotePost,
    removeUpvote,
    deletePost,
    commentOnPost,
    updatePost,
    deleteComment
};
