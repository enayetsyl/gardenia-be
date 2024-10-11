import mongoose from "mongoose";

export type IPost = {
  title?: string;
  content?: string;
  images?: string[];
  category: string;
  isPremium?: boolean;
  userId: mongoose.Types.ObjectId;
  upvoteCount?: number;
  upvotedBy?: string[];
  favoriteCount?: number;
  favoritedBy?: string[];
  comments?: IComment[];
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IComment = {
  _id?: string;
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
