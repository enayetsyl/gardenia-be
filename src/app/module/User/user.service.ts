/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TUser } from "./user.interface";
import { User } from "./user.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Post } from "../Post/post.model";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const uploadUserImage = async (id: string, file: Express.Multer.File) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, "No image file provided");
  }

  // Generate a unique image name
  const imageName = `user_${id}_${Date.now()}`;

  // Upload image to Cloudinary
  const result = await sendImageToCloudinary(imageName, file.path);

  // Update user with new image URL
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { userImage: result.secure_url },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found after update");
  }
  return updatedUser;
};

const uploadUserCoverImage = async (id: string, file: Express.Multer.File) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, "No image file provided");
  }

  // Generate a unique image name
  const imageName = `user_${id}_${Date.now()}`;

  // Upload image to Cloudinary
  const result = await sendImageToCloudinary(imageName, file.path);

  // Update user cover image with new image URL
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { coverImage: result.secure_url },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found after update");
  }
  return updatedUser;
};

const verifyAccount = async (userId: string): Promise<TUser | null> => {
  const result = await User.findByIdAndUpdate(
    userId,
    { isVerified: true },
    { new: true }
  );
  return result;
};

const followUser = async (followerId: string, followedId: string) => {
  const follower = await User.findById(followerId);
  const followed = await User.findById(followedId);

  if (!follower || !followed) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Initialize followingId and followersId if they are undefined
  follower.followingId = follower.followingId || [];
  followed.followersId = followed.followersId || [];

  if (follower.followingId.includes(followedId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are already following this user");
  }

  // Increment following and follower counts, defaulting to 0 if undefined
  follower.followingCount = (follower.followingCount ?? 0) + 1;
  followed.followerCount = (followed.followerCount ?? 0) + 1;

  // Add followedId and followerId to respective arrays
  follower.followingId.push(followedId);
  followed.followersId.push(followerId);

  // Save both users
  await follower.save();
  await followed.save();

  return follower;
};

const unfollowUser = async (followerId: string, followedId: string) => {  
  const follower = await User.findById(followerId);
  const followed = await User.findById(followedId);

  if (!follower || !followed) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  follower.followingId = follower.followingId || [];
  followed.followersId = followed.followersId || [];

  if (!follower.followingId.includes(followedId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not following this user");
  }

 follower.followingCount = Math.max(0, (follower.followingCount ?? 1) - 1);
 followed.followerCount = Math.max(0, (followed.followerCount ?? 1) - 1);

  // Remove followedId and followerId from respective arrays
  follower.followingId = follower.followingId.filter(id => id !== followedId);
  followed.followersId = followed.followersId.filter(id => id !== followerId);


 await follower.save();
 await followed.save();

 return follower;
}

const getFollowers = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const followers = await User.find({ _id: { $in: user.followersId } });

  return followers;

};

const getProfilePhotos = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const posts = await Post.find({ userId }).select('images');

  const allImages = [
    user.userImage,
    user.coverImage,
    ...posts.flatMap(post => post.images || [])
  ].filter(Boolean) as string[];

  return allImages;
};

const updateBio = async (userId: string, bio: string) => {
  const user = await User.findByIdAndUpdate(userId, { bio }, { new: true });
  return user;
};

const updateDetails = async (userId: string, study: string, location: string, maritalStatus: string, website: string) => {
  const user = await User.findByIdAndUpdate(userId, { study, location, maritalStatus, website }, { new: true });
  return user;
};

export const UserServices = {
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
  updateDetails, 
  unfollowUser
};
