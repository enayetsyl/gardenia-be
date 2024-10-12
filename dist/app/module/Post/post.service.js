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
const mongoose_1 = __importDefault(require("mongoose"));
const getUpvote = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({ userId: userId });
    if (posts.length === 0) {
        return false; // No posts found, return false
    }
    // Check if any post has at least one upvote
    return posts.some((post) => { var _a; return ((_a = post.upvoteCount) !== null && _a !== void 0 ? _a : 0) > 0; });
});
const createPost = (postData, files) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if user exists
    const user = yield user_model_1.User.findById(postData.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Handle image uploads
    const imageUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const imageName = file.filename;
            const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
            if (result && typeof result === "object" && "secure_url" in result) {
                imageUrls.push(result.secure_url);
            }
        }
    }
    // Create new post
    const newPost = yield post_model_1.Post.create(Object.assign(Object.assign({}, postData), { images: imageUrls }));
    return newPost;
});
const getPost = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({ userId: userId }).populate({
        path: "userId",
    }).populate({
        path: "comments.userId",
    });
    ;
    return posts;
});
const getNewsFeed = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({}).populate({
        path: "userId",
    }).populate({
        path: "comments.userId",
    });
    return posts;
});
const upvotePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const post = yield post_model_1.Post.findById(postId);
    // Check if user has already upvoted the post
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    post.upvoteCount = ((_a = post.upvoteCount) !== null && _a !== void 0 ? _a : 0) + 1;
    post.upvotedBy = [...((_b = post.upvotedBy) !== null && _b !== void 0 ? _b : []), userId];
    yield post.save();
    const populatedPost = yield post_model_1.Post.findById(postId).populate({
        path: 'comments.userId',
    }).populate({
        path: 'userId',
    });
    if (!populatedPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found after saving comment");
    }
    return populatedPost;
});
const addFavorite = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    post.favoriteCount = ((_a = post.favoriteCount) !== null && _a !== void 0 ? _a : 0) + 1;
    post.favoritedBy = [...((_b = post.favoritedBy) !== null && _b !== void 0 ? _b : []), userId];
    yield post.save();
    user.favoritePosts = [...((_c = user.favoritePosts) !== null && _c !== void 0 ? _c : []), postId];
    yield user.save();
    const populatedPost = yield post_model_1.Post.findById(postId).populate({
        path: 'comments.userId',
    }).populate({
        path: 'userId',
    });
    if (!populatedPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found after saving comment");
    }
    return populatedPost;
});
const removeFavorite = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    post.favoriteCount = Math.max(((_a = post.favoriteCount) !== null && _a !== void 0 ? _a : 1) - 1, 0);
    if (post.favoritedBy) {
        post.favoritedBy = post.favoritedBy.filter(id => id !== userId.toString());
    }
    yield post.save();
    user.favoritePosts = (_b = user.favoritePosts) === null || _b === void 0 ? void 0 : _b.filter(id => id !== postId.toString());
    yield user.save();
    const populatedPost = yield post_model_1.Post.findById(postId).populate({
        path: 'comments.userId',
    }).populate({
        path: 'userId',
    });
    if (!populatedPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found after saving comment");
    }
    return populatedPost;
});
const removeUpvote = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const post = yield post_model_1.Post.findById(postId);
    // Check if user has upvoted the post
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    post.upvoteCount = Math.max(((_a = post.upvoteCount) !== null && _a !== void 0 ? _a : 1) - 1, 0); // Ensures upvote count doesn't go below 0
    if (post.upvotedBy) {
        post.upvotedBy = post.upvotedBy.filter(id => id !== userId.toString());
    }
    yield post.save();
    const populatedPost = yield post_model_1.Post.findById(postId).populate({
        path: 'comments.userId',
    }).populate({
        path: 'userId',
    });
    if (!populatedPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found after saving comment");
    }
    return populatedPost;
});
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findByIdAndDelete(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
});
const commentOnPost = (postId, userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    // Convert postId and userId to ObjectId
    const postObjectId = new mongoose_1.default.Types.ObjectId(postId);
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    const newComment = {
        userId: userObjectId,
        postId: postObjectId,
        content,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    post.comments = [...((_a = post.comments) !== null && _a !== void 0 ? _a : []), newComment];
    yield post.save();
    const populatedPost = yield post_model_1.Post.findById(postId).populate({
        path: 'comments.userId',
    }).populate({
        path: 'userId',
    });
    if (!populatedPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found after saving comment");
    }
    return populatedPost;
});
const updatePost = (postId, postData, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imageUrls = [];
    if (files && files.length > 0) {
        for (const file of files) {
            const imageName = file.filename;
            const result = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.path);
            if (result && typeof result === "object" && "secure_url" in result) {
                imageUrls.push(result.secure_url);
            }
        }
    }
    const updatedPostData = Object.assign(Object.assign({}, postData), { images: imageUrls });
    const post = yield post_model_1.Post.findByIdAndUpdate(postId, updatedPostData, { new: true });
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    return post;
});
const deleteComment = (postId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    if (post.comments) {
        post.comments = post.comments.filter(comment => { var _a; return ((_a = comment === null || comment === void 0 ? void 0 : comment._id) === null || _a === void 0 ? void 0 : _a.toString()) !== commentId; });
    }
    yield post.save();
    return post;
});
const updateComment = (postId, commentId, content) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const post = yield post_model_1.Post.findById(postId);
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    const comment = (_a = post.comments) === null || _a === void 0 ? void 0 : _a.find(comment => { var _a; return ((_a = comment === null || comment === void 0 ? void 0 : comment._id) === null || _a === void 0 ? void 0 : _a.toString()) === commentId; });
    if (!comment) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Comment not found");
    }
    comment.content = content;
    yield post.save();
    return post;
});
const getSinglePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(postId).populate({
        path: 'comments.userId',
    }).populate({
        path: 'userId',
    });
    if (!post) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Post not found");
    }
    return post;
});
const searchAndFilterPosts = (search, category, page) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 10;
    const query = {};
    if (search) {
        query['$or'] = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } }
        ];
    }
    if (category) {
        query['category'] = category;
    }
    // Pagination logic
    const skip = (Number(page) - 1) * Number(limit);
    const posts = yield post_model_1.Post.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ upvoteCount: -1 })
        .populate({
        path: 'comments.userId',
    }).populate({
        path: 'userId',
    });
    return posts;
});
const getUserSpecificPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
    const userPosts = yield post_model_1.Post.find({ userId: userObjectId });
    if (userPosts.length === 0) {
        // Step 2: If the user has no posts, send the posts with the most upvotes
        const mostUpvotedPosts = yield post_model_1.Post.find()
            .sort({ upvoteCount: -1 }) // Sort posts by upvoteCount in descending order
            .limit(10); // Limit to 10 posts or any other number
        return mostUpvotedPosts;
    }
    // Step 3: If the user has posts, categorize them and fetch max 5 posts per category
    const categories = [...new Set(userPosts.map(post => post.category))];
    const personalizedPosts = [];
    // Fetch up to 5 posts for each category
    for (const category of categories) {
        const postsInCategory = yield post_model_1.Post.find({ category })
            .sort({ createdAt: -1 }) // Sort by latest posts, you can customize the sorting
            .limit(5);
        personalizedPosts.push(...postsInCategory);
    }
    return personalizedPosts;
});
exports.PostServices = {
    getUpvote,
    createPost,
    getPost,
    getNewsFeed,
    upvotePost,
    removeUpvote,
    deletePost,
    commentOnPost,
    updatePost,
    deleteComment,
    updateComment,
    addFavorite,
    removeFavorite,
    getSinglePost,
    searchAndFilterPosts,
    getUserSpecificPosts
};
