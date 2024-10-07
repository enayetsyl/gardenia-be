import mongoose from "mongoose";


export type IPost = {
  title?: string;
  content?: string;
  images?: string[];
  category: string;
  isPremium?: boolean;
  userId: mongoose.Schema.Types.ObjectId;
  upvotes?: { type: Number, default: 0 },
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}
