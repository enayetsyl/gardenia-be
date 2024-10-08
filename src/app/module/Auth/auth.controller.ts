import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errors/AppError";


const registerUser = catchAsync(async (req, res) => {
    const result = await AuthServices.registerUser(req.body);
    const { accessToken, refreshToken } = result;
    
    res.cookie("refreshToken", refreshToken, {

      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully",
        data: {
          accessToken,
          refreshToken
        },
    })
  
});

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken, refreshToken, user } = result;

    res.cookie("refreshToken", refreshToken, {  
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully",
        data: {
          accessToken,
          refreshToken, user
        }
})
})

const changePassword = catchAsync(async (req, res) => {
    const {...passwordData} = req.body;
  const result = await AuthServices.changePassword(req.body, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Token refreshed successfully",
    data: result,
  });
})

const forgetPassword = catchAsync(async (req, res) => {
  const userEmail = req.body.email;
  const result = await AuthServices.forgetPassword(userEmail);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset password link sent successfully',
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
 

  const result = await AuthServices.resetPassword(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  })
})

const getUserInfo = catchAsync(async (req, res) => {
  const result = await AuthServices.getUserInfo(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User info fetched successfully',
    data: result,
  })
})

export const AuthControllers = {
    registerUser,
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword, resetPassword, getUserInfo
}