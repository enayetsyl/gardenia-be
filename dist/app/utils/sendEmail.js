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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a transporter
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for port 465
            auth: {
                user: config_1.default.EMAIL_USER, // Use environment variables for sensitive information
                pass: config_1.default.EMAIL_PASS, // Use environment variables for sensitive information
            },
        });
        // Send mail with defined transporter object
        yield transporter.sendMail({
            from: '"Gardenia Support" <enayetflweb@gmail.com>', // Sender address
            to, // List of receivers
            subject: 'Reset Password within 10 minutes', // Subject line
            text: '', // Plain text body (optional)
            html, // HTML body content
        });
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent'); // Optionally throw to handle this error elsewhere
    }
});
exports.sendEmail = sendEmail;
