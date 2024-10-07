import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { AuthControllers } from './auth.controller';


const router = express.Router();

router.post('/register', 
    validateRequest(AuthValidation.registerValidationSchema),
    AuthControllers.registerUser);

router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser);

router.post('/forget-password',
    validateRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthControllers.forgetPassword);


router.post('/change-password',
    // auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    validateRequest(AuthValidation.changePasswordValidationSchema),
    AuthControllers.changePassword);

router.post('/reset-password', 
    validateRequest(AuthValidation.resetPasswordValidationSchema),
    AuthControllers.resetPassword
)

router.post('/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken);
    
router.get("/me/:id", AuthControllers.getUserInfo)
export const AuthRoutes = router;