/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUserModel, TUser } from './user.interface';
import config from '../../../config';
import { USER_ROLE } from './user.constant';



const userSchema = new Schema<TUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
      match:[
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please enter a valid email address'
      ]
    },
    userImage: {
      type: String,
      default: 'https://res.cloudinary.com/dj3qabx11/image/upload/v1728698356/user_6707a0e06e6ec4950584dce6_1728698355759.png'
          },
    coverImage: {
      type: String,
      default: 'https://res.cloudinary.com/dj3qabx11/image/upload/v1728570563/user_6707a0e06e6ec4950584dce6_1728570562213.webp'
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      required: true,
    },
   
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    favoritePosts: [String],
    followerCount: {
      type: Number,
      default: 0,
    },
    followersId: [String],
    followingCount: {
      type: Number,
      default: 0,
    },  
    followingId: [String],
    bio: {
      type: String,
      default: 'Write something about yourself',
    },
    study: {
      type: String,
      default: 'Write your study',
    },
    location: {
      type: String,
      default: 'Write your location',
    },
    maritalStatus: {
      type: String,
      default: 'Write your marital status',
    },
    website: {
      type: String,
      default: 'Write your website link',
    },
  },
  {
    timestamps: true,
    virtuals: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this; 

  // Hash the password only if it's new or has been modified
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }

  next();
});


// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findById(id).select('+password');
};

userSchema.statics.isUserExistByEmail = async function (
  email: string,
){
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, IUserModel>('User', userSchema);