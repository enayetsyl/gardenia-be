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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// Todo. Understand the code. It is a middleware. You will use it in the route file. It will check the req.body and cookies and match with zod validation schema mentioned in the module folder of the respective route. If data matched with the zod schema then it will call next function to perform remaining task. Otherwise it will send error to the frontend. You can read the following blog for a deep understanding. https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck
const validateRequest = (schema) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema.parseAsync({
            body: req.body,
            cookies: req.cookies,
        });
        next();
    }));
};
exports.default = validateRequest;
