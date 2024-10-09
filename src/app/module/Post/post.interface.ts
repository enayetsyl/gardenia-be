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

// export interface Comment {
//   userId: string;       // The ID of the user who created the comment
//   postId: string;       // The ID of the post the comment is related to
//   content: string;      // The content of the comment
//   _id: string;          // The ID of the comment
//   createdAt: Date;      // The timestamp of when the comment was created
//   updatedAt: Date;      // The timestamp of when the comment was last updated
// }
