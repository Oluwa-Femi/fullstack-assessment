import express from 'express';
import { Router } from 'express';
import userRouter from '../resources/users/router';

export const app = express();
const router = Router();

router.use('/users', userRouter);

export default router;