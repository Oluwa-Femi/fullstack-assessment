import express from "express";
import { Router } from "express";
import authRouter from '../resources/auth/auth.router';
import accountRouter from '../resources/account/auth.router';

export const app = express();
const router = Router();

router.use('/auth', authRouter);
router.use('/accounts', accountRouter);

export default router;
