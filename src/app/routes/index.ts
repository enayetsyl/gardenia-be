import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route';
import { AuthRoutes } from '../module/Auth/auth.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },  
  {
    path: '/auth',
    route: AuthRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));  // This will automatically loop your routes that you will add in the moduleRoutes array

export default router;