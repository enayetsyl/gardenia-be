import { Post } from "../Post/post.model";
import { User } from "../User/user.model";
import { IPost, IComment } from "../Post/post.interface";
import { TUser } from "../User/user.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import moment from 'moment';

const getOverview = async (): Promise<any> => {
  const totalUsers = await User.countDocuments({ isDeleted: false });
  const totalPosts = await Post.countDocuments({});
  const totalComments = await Post.aggregate([
    { $unwind: '$comments' },
    { $count: 'totalComments' }
  ]);
  const totalPremiumContent = await Post.countDocuments({ isPremium: true });

  const result ={
    totalUsers,
    totalPosts,
    totalComments: totalComments.length > 0 ? totalComments[0].totalComments : 0,
    totalPremiumContent,
  };

  return result;
};




const getMonthlyStats = async (): Promise<any> => {
  const startOfMonth = moment().startOf('month').toDate();
  const endOfMonth = moment().endOf('month').toDate();

  const newUsersThisMonth = await User.countDocuments({
    isDeleted: false,
    createdAt: { $gte: startOfMonth, $lte: endOfMonth }
  });

  const newPostsThisMonth = await Post.countDocuments({
    createdAt: { $gte: startOfMonth, $lte: endOfMonth }
  });

  const newCommentsThisMonth = await Post.aggregate([
    { $unwind: '$comments' },
    { $match: { 'comments.createdAt': { $gte: startOfMonth, $lte: endOfMonth } } },
    { $count: 'newCommentsThisMonth' }
  ]);

  const newPremiumContentThisMonth = await Post.countDocuments({
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
};


const getDailyStats = async (start: Date, end: Date): Promise<any> => {
  const dailyNewUsers = await User.aggregate([
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

  const dailyNewPosts = await Post.aggregate([
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

  const dailyNewComments = await Post.aggregate([
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

  const dailyNewPremiumContent = await Post.aggregate([
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
};


export const AdminServices = {
  getOverview,
  getMonthlyStats,
  getDailyStats,
};
