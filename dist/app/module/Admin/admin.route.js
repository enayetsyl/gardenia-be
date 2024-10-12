"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.get("/stats/overview", admin_controller_1.AdminControllers.getOverview);
router.get("/stats/monthly", admin_controller_1.AdminControllers.getMonthlyStats);
router.get("/stats/daily", admin_controller_1.AdminControllers.getDailyStats);
exports.AdminRoutes = router;
