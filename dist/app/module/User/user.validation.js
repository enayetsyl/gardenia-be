"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .email({
            message: "Invalid email address",
        }),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
// You can read my following blog to get deeper understanding about creating different types of zod validation https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck
exports.UserValidation = {
    createUserValidationSchema,
};
