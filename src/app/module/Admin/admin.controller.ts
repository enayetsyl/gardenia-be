import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AdminServices } from "./admin.service"
import AppError from "../../errors/AppError";

const getOverview = catchAsync(async (req, res) => {
  const overview = await AdminServices.getOverview();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Overview fetched successfully',
    data: overview,
  });
});

const getMonthlyStats = catchAsync(async (req, res) => {
  const monthlyStats = await AdminServices.getMonthlyStats();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Monthly stats fetched successfully',
    data: monthlyStats,
  });
});

const getDailyStats = catchAsync(async (req, res) => {
  const { start, end } = req.query;

  // Parse start and end to Date objects, or use a default range if they're undefined
  const startDate = start ? new Date(start as string) : new Date();
  const endDate = end ? new Date(end as string) : new Date();

  // Ensure that both startDate and endDate are valid Date objects
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid date range");
  }

  const dailyStats = await AdminServices.getDailyStats(startDate, endDate);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Daily stats fetched successfully',
    data: dailyStats,
  });
});

export const AdminControllers = {
  getOverview,
  getMonthlyStats,
  getDailyStats,
};
