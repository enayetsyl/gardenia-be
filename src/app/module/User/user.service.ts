/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async(payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsersFromDB = async(query: Record<string, unknown>) => {
  
 
};


const getSingleUserFromDB = async(id: string) => {
  const result = await User.findById( id);
  return result;
};
export const UserServices = {
  getSingleUserFromDB, getAllUsersFromDB,createUser
};