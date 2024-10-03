"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required"
        }),
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email("Invalid email"),
        password: zod_1.z.string({
            required_error: "Password is required"
        })
    })
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email("Invalid email"),
        password: zod_1.z.string({
            required_error: "Password is required"
        })
    })
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: "Old password is required"
        }),
        newPassword: zod_1.z.string({
            required_error: "New password is required"
        })
    })
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh token is required"
        })
    })
});
const forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "Email is required"
        }).email("Invalid email"),
    })
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "id is required"
        }),
        token: zod_1.z.string({
            required_error: "Token is required"
        }),
        password: zod_1.z.string({
            required_error: "Password is required"
        })
    })
});
exports.AuthValidation = {
    registerValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema, resetPasswordValidationSchema
};
