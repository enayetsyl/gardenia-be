/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

// Todo. Everything in this file need to customize according to your requirement

const router = express.Router();

router.post('/create-user', 
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
)


router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);



export const UserRoutes = router;