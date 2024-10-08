import mongoose from "mongoose";

export type IPost = {
  title?: string;
  content?: string;
  images?: string[];
  category: string;
  isPremium?: boolean;
  userId: mongoose.Schema.Types.ObjectId;
  upvoteCount?: number;
  upvotedBy?: mongoose.Schema.Types.ObjectId[];
  comments?: IComment[];
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IComment = {
  userId: mongoose.Schema.Types.ObjectId;
  postId: mongoose.Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
