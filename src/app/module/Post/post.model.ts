import mongoose, { Schema, model } from 'mongoose';
import { IPost } from './post.interface';

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Creating the Post model
export const Post = model<IPost>('Post', postSchema);