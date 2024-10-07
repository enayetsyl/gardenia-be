import { Post } from "./post.model";
import { IPost } from "./post.interface";
import { User } from "../User/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getUpvote = async (userId: string): Promise<boolean> => {
  const posts = await Post.find({ userId: userId });
  
  if (posts.length === 0) {
    return false; // No posts found, return false
  }
  
  // Check if any post has at least one upvote
  return posts.some(post => (post.upvotes?.default ?? 0) > 0);
}

export const PostServices = {
  getUpvote
}
