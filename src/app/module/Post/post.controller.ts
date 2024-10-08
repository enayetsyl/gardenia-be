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

export const PostControllers = {
  getUpvote,
  createPost,
  getPost
}
