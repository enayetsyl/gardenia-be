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
exports.AdminServices = void 0;
const post_model_1 = require("../Post/post.model");
const user_model_1 = require("../User/user.model");
const moment_1 = __importDefault(require("moment"));
const getOverview = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield user_model_1.User.countDocuments({ isDeleted: false });
    const totalPosts = yield post_model_1.Post.countDocuments({});
    const totalComments = yield post_model_1.Post.aggregate([
        { $unwind: '$comments' },
        { $count: 'totalComments' }
    ]);
    const totalPremiumContent = yield post_model_1.Post.countDocuments({ isPremium: true });
    const result = {
        totalUsers,
        totalPosts,
        totalComments: totalComments.length > 0 ? totalComments[0].totalComments : 0,
        totalPremiumContent,
    };
    return result;
});
const getMonthlyStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const startOfMonth = (0, moment_1.default)().startOf('month').toDate();
    const endOfMonth = (0, moment_1.default)().endOf('month').toDate();
    const newUsersThisMonth = yield user_model_1.User.countDocuments({
        isDeleted: false,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    const newPostsThisMonth = yield post_model_1.Post.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    const newCommentsThisMonth = yield post_model_1.Post.aggregate([
        { $unwind: '$comments' },
        { $match: { 'comments.createdAt': { $gte: startOfMonth, $lte: endOfMonth } } },
        { $count: 'newCommentsThisMonth' }
    ]);
    const newPremiumContentThisMonth = yield post_model_1.Post.countDocuments({
        isPremium: true,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    const result = {
        newUsersThisMonth,
        newPostsThisMonth,
        newCommentsThisMonth: newCommentsThisMonth.length > 0 ? newCommentsThisMonth[0].newCommentsThisMonth : 0,
        newPremiumContentThisMonth,
    };
    return result;
});
const getDailyStats = (start, end) => __awaiter(void 0, void 0, void 0, function* () {
    const dailyNewUsers = yield user_model_1.User.aggregate([
        {
            $match: {
                isDeleted: false,
                createdAt: { $gte: new Date(start), $lte: new Date(end) }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                newUsers: { $sum: 1 }
            }
        }
    ]);
    const dailyNewPosts = yield post_model_1.Post.aggregate([
        {
            $match: {
                createdAt: { $gte: new Date(start), $lte: new Date(end) }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                newPosts: { $sum: 1 }
            }
        }
    ]);
    const dailyNewComments = yield post_model_1.Post.aggregate([
        { $unwind: '$comments' },
        {
            $match: {
                'comments.createdAt': { $gte: new Date(start), $lte: new Date(end) }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$comments.createdAt" } },
                newComments: { $sum: 1 }
            }
        }
    ]);
    const dailyNewPremiumContent = yield post_model_1.Post.aggregate([
        {
            $match: {
                isPremium: true,
                createdAt: { $gte: new Date(start), $lte: new Date(end) }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                newPremiumContent: { $sum: 1 }
            }
        }
    ]);
    const result = {
        dailyNewUsers,
        dailyNewPosts,
        dailyNewComments,
        dailyNewPremiumContent,
    };
    return result;
});
exports.AdminServices = {
    getOverview,
    getMonthlyStats,
    getDailyStats,
};
