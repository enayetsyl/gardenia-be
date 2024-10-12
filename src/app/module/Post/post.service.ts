import { Post } from "./post.model";
import { IComment, IPost } from "./post.interface";
import { User } from "../User/user.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";

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
  const user = await User.findById(postData.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Handle image uploads
  const imageUrls = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = file.filename;
      const result = await sendImageToCloudinary(imageName, file.path);
      if (result && typeof result === "object" && "secure_url" in result) {
        imageUrls.push(result.secure_url as string);
      }
    }
  }

  // Create new post
  const newPost = await Post.create({
    ...postData,
    images: imageUrls,
  });
  return newPost;
};

const getPost = async (userId: string): Promise<IPost[]> => {
  const posts = await Post.find({ userId: userId }).populate({
    path: "userId",
  }).populate({
    path: "comments.userId",
  });;
  return posts;
};

const getNewsFeed = async (): Promise<IPost[]> => {
  const posts = await Post.find({}).populate({
    path: "userId",
  }).populate({
    path: "comments.userId",
    
  });
  return posts;
};

const upvotePost = async (postId: string, userId: string): Promise<IPost> => {
  const post = await Post.findById(postId);
  // Check if user has already upvoted the post
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  
  post.upvoteCount = (post.upvoteCount ?? 0) + 1;
  post.upvotedBy = [...(post.upvotedBy ?? []), userId];
  await post.save();
  const populatedPost = await Post.findById(postId).populate({
    path: 'comments.userId',
  }).populate({
    path: 'userId',
  });

  if (!populatedPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found after saving comment");
  }

  return populatedPost;
};

const addFavorite = async (postId: string, userId: string) => {
 
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  post.favoriteCount = (post.favoriteCount ?? 0) + 1;
  post.favoritedBy = [...(post.favoritedBy ?? []), userId];
  await post.save();


  user.favoritePosts = [...(user.favoritePosts ?? []), postId];
  await user.save();

  const populatedPost = await Post.findById(postId).populate({
    path: 'comments.userId',
  }).populate({
    path: 'userId',
  });

  if (!populatedPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found after saving comment");
  }

  return populatedPost;
};

const removeFavorite = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }


  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  post.favoriteCount = Math.max((post.favoriteCount ?? 1) - 1, 0); 

  if (post.favoritedBy) {
    post.favoritedBy = post.favoritedBy.filter(id => id !== userId.toString());
  }

  await post.save();

  user.favoritePosts = user.favoritePosts?.filter(id => id !== postId.toString());
  await user.save();

  const populatedPost = await Post.findById(postId).populate({
    path: 'comments.userId',
  }).populate({
    path: 'userId',
  });

  if (!populatedPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found after saving comment");
  }

  return populatedPost;
}

const removeUpvote = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  // Check if user has upvoted the post
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }

  
  post.upvoteCount = Math.max((post.upvoteCount ?? 1) - 1, 0); // Ensures upvote count doesn't go below 0
  if (post.upvotedBy) {
    post.upvotedBy = post.upvotedBy.filter(id => id !== userId.toString());
  }

  await post.save();
  const populatedPost = await Post.findById(postId).populate({
    path: 'comments.userId',
  }).populate({
    path: 'userId',
  });

  if (!populatedPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found after saving comment");
  }

  return populatedPost;
  
};

const deletePost = async (postId: string): Promise<IPost> => {
  const post = await Post.findByIdAndDelete(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};


const commentOnPost = async (postId: string, userId: string, content: string): Promise<IPost> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  
  // Convert postId and userId to ObjectId
  const postObjectId = new mongoose.Types.ObjectId(postId);
  const userObjectId = new mongoose.Types.ObjectId(userId);


  const newComment: IComment = {
    userId: userObjectId,  
    postId: postObjectId,  
    content,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  post.comments = [...(post.comments ?? []), newComment];
  await post.save();
  const populatedPost = await Post.findById(postId).populate({
    path: 'comments.userId',
  }).populate({
    path: 'userId',
  });

  if (!populatedPost) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found after saving comment");
  }

  return populatedPost;
};  

const updatePost = async (postId: string, postData: IPost, files: Express.Multer.File[]): Promise<IPost> => { 
  const imageUrls = [];
  if (files && files.length > 0) {
    for (const file of files) {
      const imageName = file.filename;
      const result = await sendImageToCloudinary(imageName, file.path);
      if (result && typeof result === "object" && "secure_url" in result) {
        imageUrls.push(result.secure_url as string);
      }
    }
  }

  const updatedPostData = {
    ...postData,
    images: imageUrls
  }
  
  const post = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true }); 

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  return post;

  

 
};

const deleteComment = async (postId: string, commentId: string): Promise<IPost> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  
  if (post.comments) {
    post.comments = post.comments.filter(comment => comment?._id?.toString() !== commentId);
  }

  await post.save();
  return post;
};


const updateComment = async (postId: string, commentId: string, content: string): Promise<IPost> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  
  const comment = post.comments?.find(comment => comment?._id?.toString() === commentId);
  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, "Comment not found");  
  }

  comment.content = content;
  await post.save();
  return post;
};

const getSinglePost = async (postId: string): Promise<IPost> => {
  const post = await Post.findById(postId).populate({
    path: 'comments.userId',
  }).populate({
    path: 'userId',
  });

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "Post not found");
  }
  return post;
};


const searchAndFilterPosts = async (search?: string, category?: string, page?: number): Promise<IPost[]> => {
  const limit = 10;
  const query: any = {};
  if (search) {
    query['$or'] = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) {
    query['category'] = category;
  }
  
  // Pagination logic
  const skip = (Number(page) - 1) * Number(limit); 

  const posts = await Post.find(query)
    .skip(skip)
    .limit(Number(limit))
    .sort({ upvoteCount: -1 })
    .populate({
      path: 'comments.userId',
    }).populate({
      path: 'userId',
    })


  return posts;
};

const getUserSpecificPosts = async (userId: string): Promise<IPost[]> => {
  
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const userPosts = await Post.find({ userId: userObjectId });

 

  if (userPosts.length === 0) {
    // Step 2: If the user has no posts, send the posts with the most upvotes
    const mostUpvotedPosts = await Post.find()
      .sort({ upvoteCount: -1 }) // Sort posts by upvoteCount in descending order
      .limit(10); // Limit to 10 posts or any other number

    return mostUpvotedPosts;
  }

  // Step 3: If the user has posts, categorize them and fetch max 5 posts per category
  const categories = [...new Set(userPosts.map(post => post.category))];
  

  const personalizedPosts: IPost[] = [];

  // Fetch up to 5 posts for each category
  for (const category of categories) {
    const postsInCategory = await Post.find({ category })
      .sort({ createdAt: -1 }) // Sort by latest posts, you can customize the sorting
      .limit(5);

    personalizedPosts.push(...postsInCategory);
  }

  return personalizedPosts;
};

export const PostServices = {
  getUpvote,
  createPost,
  getPost,
  getNewsFeed,
  upvotePost,
  removeUpvote,
  deletePost,
  commentOnPost, 
  updatePost,
  deleteComment,
  updateComment,
  addFavorite,
  removeFavorite,
  getSinglePost,
  searchAndFilterPosts,
  getUserSpecificPosts
};
