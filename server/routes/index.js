import express from "express";
import { Router } from "express";
// import userRouter from '../resources/users/router';
import { User } from "../resources/users/model";

export const app = express();
const router = Router();

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req;
  // console.log(req.body)
  // res.json({ status: "ok"})
});

export default router;
