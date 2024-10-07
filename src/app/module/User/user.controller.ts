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

export const UserControllers = {
  userRegister, getAllUsers, getSingleUser, uploadUserImage, uploadUserCoverImage
 };