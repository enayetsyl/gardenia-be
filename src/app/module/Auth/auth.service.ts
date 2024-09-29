import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { User } from "../User/user.model"
import { TLoginUser, TRegisterUser } from "./auth.interface"
import { USER_ROLE } from "../User/user.constant"
import { createToken } from "../../utils/tokenGenerateFunction"
import { JwtPayload } from "jsonwebtoken"
import config from "../../../config"


const registerUser = async (payload: TRegisterUser) =>{
    const user = await User.isUserExistByEmail(payload?.email)

    console.log('user in service', user)

    if(user){
        throw new AppError(httpStatus.NOT_FOUND, "User already exist")
    }

    payload.role = USER_ROLE.USER;

    const newUser = await User.create(payload)

    console.log('newUser', newUser)
    const jwtPayload = {
        _id: newUser?._id,
        role: newUser?.role,
        name: newUser?.name,
        email: newUser?.email,
    }
    console.log('jwtPayload', jwtPayload)
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.JWT_EXPIRES_IN as string)
    console.log('jwt access secret', config.jwt_access_secret)
    console.log('accessToken', accessToken)

    const refreshToken = createToken(jwtPayload, config.JWT_REFRESH_SECRET_KEY as string, config.JWT_REFRESH_EXPIRES_IN as string)

    console.log('refreshToken', refreshToken)

    return {
        accessToken,
        refreshToken,
    }
}


const loginUser = async (payload: TLoginUser) =>{
    const user = await User.isUserExistByEmail(payload?.email)

    console.log('user in service', user)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
    }

    if(!(await User.isPasswordMatched(payload?.password, user?.password))){
        throw new AppError(httpStatus.FORBIDDEN, "Password does not match")
    }

    const jwtPayload = {
        _id: user?._id,
        role: user?.role,
        name: user?.name,
        email: user?.email,
    }

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.JWT_EXPIRES_IN as string)

    const refreshToken = createToken(jwtPayload, config.JWT_REFRESH_SECRET_KEY as string, config.JWT_REFRESH_EXPIRES_IN as string)


    return {
        accessToken,
        refreshToken,
    }
}

const changePassword = async (userData:JwtPayload, payload: {oldPassword: string, newPassword: string}) =>{
    const user = await User.isUserExistByEmail(userData?.email)

}

const refreshToken = async (token: string) =>{
    

}

export const AuthServices = {
    registerUser,
    loginUser,
    changePassword,
    refreshToken,
}