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

const unfollowUser = catchAsync(async(req, res) => {
  const { followerId, followedId } = req.body;
  const user = await UserServices.unfollowUser(followerId, followedId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User unfollowed successfully!',
    data: user,
  });
})

const getFollowers = catchAsync(async(req, res) => {
  const { userId } = req.params;
  const user = await UserServices.getFollowers(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Followers retrieved successfully!',
    data: user,
  });
})


const getProfilePhotos = catchAsync(async(req, res) => {
  const { userId } = req.params;
  const images = await UserServices.getProfilePhotos(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile photos retrieved successfully!',
    data: images,
  });
})

const updateBio = catchAsync(async(req, res) => {
  const { userId } = req.params;
  const { bio } = req.body;
  const user = await UserServices.updateBio(userId, bio);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bio updated successfully!',
    data: user,
  });
})

const updateDetails = catchAsync(async(req, res) => {
  const { userId } = req.params;
  const { study, location, maritalStatus, website } = req.body;
  const user = await UserServices.updateDetails(userId, study, location, maritalStatus, website);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Details updated successfully!',
    data: user,
  });
})

export const UserControllers = {
  userRegister, getAllUsers, getSingleUser, uploadUserImage, uploadUserCoverImage, verifyAccount, followUser, getFollowers, getProfilePhotos, updateBio, updateDetails, unfollowUser
 };