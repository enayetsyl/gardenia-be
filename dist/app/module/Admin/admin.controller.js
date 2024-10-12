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
exports.AdminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const admin_service_1 = require("./admin.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const getOverview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const overview = yield admin_service_1.AdminServices.getOverview();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Overview fetched successfully',
        data: overview,
    });
}));
const getMonthlyStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const monthlyStats = yield admin_service_1.AdminServices.getMonthlyStats();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Monthly stats fetched successfully',
        data: monthlyStats,
    });
}));
const getDailyStats = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { start, end } = req.query;
    // Parse start and end to Date objects, or use a default range if they're undefined
    const startDate = start ? new Date(start) : new Date();
    const endDate = end ? new Date(end) : new Date();
    // Ensure that both startDate and endDate are valid Date objects
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid date range");
    }
    const dailyStats = yield admin_service_1.AdminServices.getDailyStats(startDate, endDate);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Daily stats fetched successfully',
        data: dailyStats,
    });
}));
exports.AdminControllers = {
    getOverview,
    getMonthlyStats,
    getDailyStats,
};
