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


export const PostControllers = {
  getUpvote
}
