import express from "express";
import { Router } from "express";
import { createUserAccount, login, sendPasswordVerifyLink } from '../resources/users/controllers';
import { checkExistingValues } from '../resources/auth/auth.middleware';
import signupValidation from "../resources/helpers/validations/signupValidation";
import loginValidation from "../resources/helpers/validations/loginValidation";

export const app = express();
const router = Router();

router.post( "/register", signupValidation, checkExistingValues, createUserAccount );
router.post("/login", loginValidation, login);
router.post('/forget-password', sendPasswordVerifyLink);

export default router;
