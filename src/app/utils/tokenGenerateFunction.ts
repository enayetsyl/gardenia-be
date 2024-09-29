import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_ROLE } from "../module/User/user.constant";

// Todo. This is custom make function to create and verify token. If you need to generate and verify token in more than one place then you can use it. In the jwtPayload i used userId and role. You may use different thing. Adjust the code accordingly.

export const createToken = (
  jwtPayload: { _id?: string; role: keyof typeof USER_ROLE
    name?: string;
    email?: string;
   },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
