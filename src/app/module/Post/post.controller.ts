import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Post } from "./post.model";
import { PostServices } from "./post.service";
import httpStatus from "http-status";

const getUpvote = catchAsync(async (req, res) => {
  const upvote = await PostServices.getUpvote(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Upvote fetched successfully",
    data: upvote,
  });
});

const createPost = catchAsync(async (req, res) => {
  const postData = req.body;
  const files = req.files as Express.Multer.File[];

  const post = await PostServices.createPost(postData, files);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

const getPost = catchAsync(async (req, res) => {
  const posts = await PostServices.getPost(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts fetched successfully",
    data: posts,
  });
});

const getNewsFeed = catchAsync(async (req, res) => {
  const posts = await PostServices.getNewsFeed();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts fetched successfully",
    data: posts,
  });
});

const upvotePost = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  const post = await PostServices.upvotePost(postId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post upvoted successfully",
    data: post,
  });
});

const removeUpvote = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  const post = await PostServices.removeUpvote(postId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post un-upvoted successfully",
    data: post,
  });
});

const addFavorite = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  
  const post = await PostServices.addFavorite(postId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post added to favorites successfully",
    data: post,
  });
});

const removeFavorite = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  const post = await PostServices.removeFavorite(postId, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post removed from favorites successfully",
    data: post,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const post = await PostServices.deletePost(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted successfully",
    data: post,
  });
});

const commentOnPost = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  const comment = req.body.content;
  const post = await PostServices.commentOnPost(postId, userId, comment);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment added successfully",
    data: post,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const postData = req.body;
  const files = req.files as Express.Multer.File[];
  const post = await PostServices.updatePost(postId, postData, files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const post = await PostServices.deleteComment(postId, commentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
    data: post,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const { content, commentId } = req.body;
  const post = await PostServices.updateComment(postId, commentId, content);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully",
    data: post,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const post = await PostServices.getSinglePost(req.params.id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post fetched successfully",
    data: post,
  });
});

const searchAndFilterPosts = catchAsync(async (req, res) => {
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  const category = typeof req.query.category === 'string' ? req.query.category : undefined;
  const page = req.query.page ? Number(req.query.page) : 1;

  // Call the service with properly typed arguments
  const result = await PostServices.searchAndFilterPosts(search, category, page);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts fetched successfully',
    data: result,
  });
});

const getUserSpecificPosts = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const posts = await PostServices.getUserSpecificPosts(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts fetched successfully',
    data: posts,
  });
});


export const PostControllers = {
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
  getUserSpecificPosts,
};
