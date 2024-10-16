"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// You can read the following blog to learn more about the code https://dev.to/md_enayeturrahman_2560e3/how-to-set-up-eslint-and-prettier-1nk6
exports.default = {
    port: process.env.PORT,
    database_url: process.env.database_url,
    NODE_ENV: process.env.NODE_ENV,
    cloudinary_cloud_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_SECRET,
    bcrypt_salt_rounds: process.env.bcrypt_salt_rounds,
    jwt_access_secret: process.env.jwt_access_secret,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    RESET_PASS_UI_LINK: process.env.RESET_PASS_UI_LINK,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
