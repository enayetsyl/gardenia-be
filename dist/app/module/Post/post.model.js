"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
    },
    images: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
        required: true,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    upvoteCount: {
        type: Number,
        default: 0,
    },
    upvotedBy: [String],
    favoriteCount: {
        type: Number,
        default: 0,
    },
    favoritedBy: [String],
    comments: [commentSchema],
    link: {
        type: String,
    },
}, {
    timestamps: true,
});
// Creating the Post model
exports.Post = (0, mongoose_1.model)('Post', postSchema);
