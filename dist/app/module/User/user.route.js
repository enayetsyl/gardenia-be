"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.post('/create-user', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), user_controller_1.UserControllers.userRegister);
router.post('/upload-image/:id', 
// auth(USER_ROLE.USER, USER_ROLE.ADMIN),
sendImageToCloudinary_1.upload.single('image'), user_controller_1.UserControllers.uploadUserImage);
router.get('/', user_controller_1.UserControllers.getAllUsers);
router.get('/:id', user_controller_1.UserControllers.getSingleUser);
exports.UserRoutes = router;
