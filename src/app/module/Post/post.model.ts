import mongoose, { Schema, model } from 'mongoose';
import { IPost, IComment } from './post.interface';

const commentSchema = new Schema<IComment>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  upvoteCount: {
    type: Number,
    default: 0,
  },
  upvotedBy: [String],
  comments: [commentSchema],
  link: {
    type: String,
  },
}, {
  timestamps: true,
});

// Creating the Post model
export const Post = model<IPost>('Post', postSchema);