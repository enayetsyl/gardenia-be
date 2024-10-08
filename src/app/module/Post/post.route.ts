import express from 'express';
import { PostControllers } from './post.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get("/getUpvote/:id", PostControllers.getUpvote);
router.post("/create", upload.array('images', 5), PostControllers.createPost);
router.get("/getPosts/:id", PostControllers.getPost);
router.get("/getNewsFeed", PostControllers.getNewsFeed);
router.post("/upvote/:postId", PostControllers.upvotePost);
router.post("/removeUpvote/:postId", PostControllers.removeUpvote);

export const PostRoutes = router;
