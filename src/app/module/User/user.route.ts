/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import multer from 'multer';
import path from 'path';



const router = express.Router();

router.post('/create-user', 
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.userRegister
)

router.post('/upload-image/:id',
  // auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  upload.single('image'),
  UserControllers.uploadUserImage
);
router.post('/upload-cover-image/:id',
  // auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  upload.single('image'),
  UserControllers.uploadUserCoverImage
);
router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/verify-account', UserControllers.verifyAccount);
router.post("/follow", UserControllers.followUser);



export const UserRoutes = router;