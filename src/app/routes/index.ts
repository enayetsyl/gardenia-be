import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route';
import { AuthRoutes } from '../module/Auth/auth.route';
import { PaymentRoutes } from '../module/Payment/payment.route';
import { PostRoutes } from '../module/Post/post.route';
import { AdminRoutes } from '../module/Admin/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },  
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path:'/admin',
    route: AdminRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));  // This will automatically loop your routes that you will add in the moduleRoutes array

export default router;