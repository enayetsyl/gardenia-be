import httpStatus from "http-status";
import config from "../../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";


const registerUser = catchAsync(async (req, res) => {
  console.log('register request received',req.body)
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
    const { accessToken, refreshToken } = result;

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
          refreshToken
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

export const AuthControllers = {
    registerUser,
    loginUser,
    changePassword,
    refreshToken
}