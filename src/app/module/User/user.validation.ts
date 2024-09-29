import { z } from "zod";
import { USER_ROLE } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    role: z.nativeEnum(USER_ROLE),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

// You can read my following blog to get deeper understanding about creating different types of zod validation https://dev.to/md_enayeturrahman_2560e3/how-to-create-api-in-an-industry-standard-app-44ck

export const UserValidation = {
  createUserValidationSchema,
};
