"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutes = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.get("/getUpvote/:id", post_controller_1.PostControllers.getUpvote);
router.post("/create", sendImageToCloudinary_1.upload.array('images', 5), post_controller_1.PostControllers.createPost);
router.get("/getPosts/:id", post_controller_1.PostControllers.getPost);
router.get("/getNewsFeed", post_controller_1.PostControllers.getNewsFeed);
router.post("/upvote/:postId", post_controller_1.PostControllers.upvotePost);
router.post("/removeUpvote/:postId", post_controller_1.PostControllers.removeUpvote);
router.post("/addFavorite/:postId", post_controller_1.PostControllers.addFavorite);
router.post("/removeFavorite/:postId", post_controller_1.PostControllers.removeFavorite);
router.delete("/delete/:id", post_controller_1.PostControllers.deletePost);
router.post("/addComment/:postId", post_controller_1.PostControllers.commentOnPost);
router.put("/update/:id", sendImageToCloudinary_1.upload.array('images', 5), post_controller_1.PostControllers.updatePost);
router.delete("/delete/:postId/comments/:commentId", post_controller_1.PostControllers.deleteComment);
router.put("/updateComment/:postId", post_controller_1.PostControllers.updateComment);
exports.PostRoutes = router;
