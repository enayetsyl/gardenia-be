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
router.post("/addFavorite/:postId", PostControllers.addFavorite);
router.post("/removeFavorite/:postId", PostControllers.removeFavorite);
router.delete("/delete/:id", PostControllers.deletePost);
router.post("/addComment/:postId", PostControllers.commentOnPost);
router.put("/update/:id", upload.array('images', 5), PostControllers.updatePost);
router.delete("/delete/:postId/comments/:commentId", PostControllers.deleteComment);
router.put("/updateComment/:postId", PostControllers.updateComment);
router.get("/getSinglePost/:id", PostControllers.getSinglePost);
router.get('/searchAndFilterPosts', PostControllers.searchAndFilterPosts);
router.get("/getUserSpecificPosts/:userId", PostControllers.getUserSpecificPosts);

export const PostRoutes = router;
