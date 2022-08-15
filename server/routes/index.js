import express from "express";
import { Router } from "express";
import { createUserAccount } from '../resources/users/controllers';
import { checkExistingValues } from '../resources/auth/auth.middleware';

export const app = express();
const router = Router();

router.post("/register",
checkExistingValues,
createUserAccount
);

export default router;
