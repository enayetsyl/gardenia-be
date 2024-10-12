import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.get("/stats/overview", AdminControllers.getOverview);
router.get("/stats/monthly", AdminControllers.getMonthlyStats);
router.get("/stats/daily", AdminControllers.getDailyStats);



export const AdminRoutes = router;