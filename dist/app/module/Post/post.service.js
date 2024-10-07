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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServices = void 0;
const post_model_1 = require("./post.model");
const getUpvote = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_model_1.Post.find({ userId: userId });
    if (posts.length === 0) {
        return false; // No posts found, return false
    }
    // Check if any post has at least one upvote
    return posts.some(post => { var _a, _b; return ((_b = (_a = post.upvotes) === null || _a === void 0 ? void 0 : _a.default) !== null && _b !== void 0 ? _b : 0) > 0; });
});
exports.PostServices = {
    getUpvote
};
