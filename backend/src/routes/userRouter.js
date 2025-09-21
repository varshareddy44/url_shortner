// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { getProfileofUser, getMyUrls } from '../controllers/userController.js'; // Adjust the path as necessary
import { authMiddleware } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get('/me', authMiddleware, getProfileofUser);
userRouter.get('/my/urls', authMiddleware, getMyUrls);

export default userRouter;
