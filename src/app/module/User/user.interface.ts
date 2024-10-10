/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';


export interface TUser {
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  userImage?: string; 
  coverImage?: string;
  password: string;
  passwordChangedAt?: Date;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  cratedAt?: Date;
  updatedAt?: Date;
  isVerified: boolean;
  favoritePosts?: string[];
  followerCount?: number;
  followersId?: string[];
  followingCount?: number;
  followingId?: string[];
  bio?: string;
  study?: string;
  location?: string;
  maritalStatus?: string;
  website?: string;
}

export interface IUserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistByEmail(email: string): Promise<TUser>;
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

