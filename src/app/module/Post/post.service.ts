import { Post } from "./post.model";
import { IPost } from "./post.interface";
import { User } from "../User/user.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import mongoose, { Types } from "mongoose";

const getUpvote = async (userId: string): Promise<boolean> => {
  const posts = await Post.find({ userId: userId });

  if (posts.length === 0) {
    return false; // No posts found, return false
  }

  // Check if any post has at least one upvote
  return posts.some((post) => (post.upvoteCount ?? 0) > 0);
};

const createPost = async (
  postData: IPost,
  files: Express.Multer.File[]
): Promise<IPost> => {
  // Check if user exists
  console.log("post data", postData);
  const user = await User.findById(postData.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Handle image uploads
  const imageUrls = [];
  console.log("user", user);
  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = file.filename;
      const result = await sendImageToCloudinary(imageName, file.path);
      if (result && typeof result === "object" && "secure_url" in result) {
        imageUrls.push(result.secure_url as string);
      }
    }
  }

  console.log("imageUrls", imageUrls);
  // Create new post
  const newPost = await Post.create({
    ...postData,
    images: imageUrls,
  });
  console.log("newPost", newPost);
  return newPost;
};

const getPost = async (userId: string): Promise<IPost[]> => {
  const posts = await Post.find({ userId: userId });
  return posts;
};

const getNewsFeed = async (): Promise<IPost[]> => {
  const posts = await Post.find({}).populate("userId");
  return posts;
};

const upvotePost = async (postId: string, userId: string): Promise<IPost> => {
  const post = await Post.findById(postId);
  console.log("post ", post);
  // Check if user has already upvoted the post
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  // if (post.upvotedBy && !post.upvotedBy.some((id) => id === userId.toString())){
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "User has already upvoted this post"
  //   );
  // }
  post.upvoteCount = (post.upvoteCount ?? 0) + 1;
  post.upvotedBy = [...(post.upvotedBy ?? []), userId];
  await post.save();
  return post;
};

const removeUpvote = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  // Check if user has upvoted the post
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  // if (post.upvotedBy && !post.upvotedBy.some((id) => id === userId.toString())) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "User has not upvoted this post"
  //   );
  // }

  // Decrement upvote count and remove userId from upvotedBy array
  post.upvoteCount = Math.max((post.upvoteCount ?? 1) - 1, 0); // Ensures upvote count doesn't go below 0
  if (post.upvotedBy) {
    post.upvotedBy = post.upvotedBy.filter(id => id !== userId.toString());
  }

  await post.save();
  return post;
};

export const PostServices = {
  getUpvote,
  createPost,
  getPost,
  getNewsFeed,
  upvotePost,
  removeUpvote,
};
