import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';


const userRegister = catchAsync(async(req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: user,
  });
})

const getAllUsers = catchAsync(async(req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: users,
  });
})

const getSingleUser = catchAsync(async(req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: user,
  });
})

const uploadUserImage = catchAsync(async(req, res) => {
  const user = await UserServices.uploadUserImage(req.params.id, req.file as Express.Multer.File);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User image uploaded successfully!',
    data: user,
  });
})

const uploadUserCoverImage = catchAsync(async(req, res) => {
  const user = await UserServices.uploadUserCoverImage(req.params.id, req.file as Express.Multer.File);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User cover image uploaded successfully!',
    data: user,
  });
})

const verifyAccount = catchAsync(async(req, res) => {
  const { userId } = req.body;
  const user = await UserServices.verifyAccount(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account verified successfully!',
    data: user,
  });
})

const followUser = catchAsync(async(req, res) => {
  const { followerId, followedId } = req.body;
  const user = await UserServices.followUser(followerId, followedId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User followed successfully!',
    data: user,
  });
})

const getFollowers = catchAsync(async(req, res) => {
  const { userId } = req.params;
  console.log('user id in the controller', userId);
  const user = await UserServices.getFollowers(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Followers retrieved successfully!',
    data: user,
  });
})



export const UserControllers = {
  userRegister, getAllUsers, getSingleUser, uploadUserImage, uploadUserCoverImage, verifyAccount, followUser, getFollowers
 };