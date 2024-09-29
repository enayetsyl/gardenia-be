import { z } from "zod";


const registerValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required"
        }),
        email: z.string({
            required_error: "Email is required"
        }).email("Invalid email"),
        password: z.string({
            required_error: "Password is required"
        })
        
    })
})

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required"
        }).email("Invalid email"),
        password: z.string({
            required_error: "Password is required"
        })
    })
})

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: "Old password is required"
        }),
        newPassword: z.string({
            required_error: "New password is required"
        })
    })
})

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: "Refresh token is required"
        })
    })
})


export const AuthValidation = {
    registerValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema
}