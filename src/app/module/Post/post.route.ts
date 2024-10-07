import express from 'express';
import { PostControllers } from './post.controller';

const router = express.Router();

router.get("/getUpvote/:id", PostControllers.getUpvote)

export const PostRoutes = router;
