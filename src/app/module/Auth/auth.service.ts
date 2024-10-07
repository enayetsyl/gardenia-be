import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { User } from "../User/user.model"
import { USER_ROLE } from "../User/user.constant"
import { createToken } from "../../utils/tokenGenerateFunction"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../../config"
import { sendEmail } from "../../utils/sendEmail"
import bcrypt from "bcrypt"
import { TUser } from "../User/user.interface"


const registerUser = async (payload: Partial<TUser>) =>{
    const user = await User.isUserExistByEmail(payload?.email as string)


    if(user){
        throw new AppError(httpStatus.NOT_FOUND, "User already exist")
    }

    payload.role = USER_ROLE.USER;

    const newUser = await User.create(payload)

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


const loginUser = async (payload: Partial<TUser>) =>{
    const user = await User.isUserExistByEmail(payload?.email as string)

    console.log('user in service', user)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
    }

    if (!(await User.isPasswordMatched(payload?.password ?? '', user?.password ?? ''))) {
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
        user
    }
}

const changePassword = async (userData:JwtPayload, payload: {oldPassword: string, newPassword: string}) =>{
    const user = await User.isUserExistByEmail(userData?.email)

}

const refreshToken = async (token: string) =>{
    

}


const forgetPassword = async(userEmail: string) => {
  const user = await User.isUserExistByEmail(userEmail)

  if(!user){
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
  }

  const jwtPayload = {
    userId: user?._id,
    role : user?.role,
  }

  const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, '10m')

  const resetUILink = `${config.reset_pass_ui_link}/reset-password/${user._id}/${resetToken}`

  sendEmail(user.email, resetUILink)

}


const resetPassword = async(payload:{ id: string; token: string; password: string } ) => {
  console.log('id, token, password', payload)
  const user = await User.isUserExistsByCustomId(payload?.id)

   if(!user){
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
  }

  const decoded = jwt.verify(payload.token, config.jwt_access_secret as string) as JwtPayload

  if(payload.id !== decoded?.userId){
    throw new AppError(httpStatus.FORBIDDEN, "User does not exist")
  }

  const newHashedPassword = await bcrypt.hash(payload?.password, Number(config.bcrypt_salt_rounds))

  console.log('user, decoded, hashed password', user, decoded, newHashedPassword)
  
  await User.findOneAndUpdate({
    _id:decoded?.userId,
    role: decoded?.role
  }, 
  {
    password: newHashedPassword,

  }
)


}

export const AuthServices = {
    registerUser,
    loginUser,
    changePassword,
    refreshToken,forgetPassword, resetPassword
}