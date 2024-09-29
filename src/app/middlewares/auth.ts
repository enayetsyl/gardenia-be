import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../module/User/user.constant";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../utils/tokenGenerateFunction";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

import { User } from "../module/User/user.model";

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[])=>{
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        const decoded = verifyToken(
            token, 
            config.jwt_access_secret as string
        ) as JwtPayload;

        const {role, email, iat} = decoded

        const user = await User.isUserExistByEmail(email);

        if(!user){
            throw new AppError(httpStatus.NOT_FOUND, "This user is not found");
        }

        
        if(user.passwordChangedAt && User.isJWTIssuedBeforePasswordChange(
            user.passwordChangedAt,
            iat as number
        )
    ){
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }

        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }

        req.user = decoded as JwtPayload

        next();
    })
}


export default auth;