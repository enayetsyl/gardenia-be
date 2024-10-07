/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TUser } from "./user.interface";
import { User } from "./user.model";
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUser = async(payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async(query: Record<string, unknown>) => {
};


const getSingleUserFromDB = async(id: string) => {
  const result = await User.findById( id);
  return result;
};


const uploadUserImage = async(id: string, file: Express.Multer.File) => {
  console.log('user id', id)

  const user = await User.findById(id);
  console.log('user', user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No image file provided');
  }

  // Generate a unique image name
  const imageName = `user_${id}_${Date.now()}`;

  // Upload image to Cloudinary
  const result = await sendImageToCloudinary(imageName, file.path);
  console.log('result', result)

  // Update user with new image URL
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { userImage: result.secure_url },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found after update');
  }
  console.log('updatedUser', updatedUser)
  return updatedUser;
};

const uploadUserCoverImage = async(id: string, file: Express.Multer.File) => {
  console.log('user id', id)

  const user = await User.findById(id);
  console.log('user', user)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No image file provided');
  }

  // Generate a unique image name
  const imageName = `user_${id}_${Date.now()}`;

  // Upload image to Cloudinary
  const result = await sendImageToCloudinary(imageName, file.path);
  console.log('result', result)   

  // Update user cover image with new image URL
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { coverImage: result.secure_url },
    { new: true }
  );

  if (!updatedUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found after update');
  }
  console.log('updatedUser', updatedUser)
  return updatedUser;
}

export const UserServices = {
  getSingleUserFromDB, getAllUsersFromDB,createUser, uploadUserImage, uploadUserCoverImage
};