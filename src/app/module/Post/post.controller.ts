import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
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
  console.log('body', req.body)
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

export const PostControllers = {
  getUpvote,
  createPost,
  getPost,
  getNewsFeed,
  upvotePost,
  removeUpvote,
  deletePost,
  commentOnPost,
  updatePost
}
