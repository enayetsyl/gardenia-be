import { USER_ROLE } from "../User/user.constant";

export type TRegisterUser = {
    name: string;
    email: string;
    password: string;
    role: keyof typeof USER_ROLE
}

export type  TLoginUser = {
    email: string;
    password: string;
}