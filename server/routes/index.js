import express from "express";
import { Router } from "express";
import { createUserAccount, login, updateUserPassword } from '../resources/users/controllers';
import { checkExistingValues } from '../resources/auth/auth.middleware';
import signupValidation from "../resources/helpers/validations/signupValidation";
import loginValidation from "../resources/helpers/validations/loginValidation";

export const app = express();
const router = Router();

router.post( "/register", signupValidation, checkExistingValues, createUserAccount );
router.post("/login", loginValidation, login);
router.patch('/reset-password', updateUserPassword);

export default router;
