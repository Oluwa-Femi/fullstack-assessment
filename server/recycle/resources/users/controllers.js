import { User } from "../users/model";
import { signup } from "../auth/auth";
import { success, failure } from "../../resources/helpers/response";
import asyncWrapper from "../helpers/asyncWrapper";
import {
  getOneByEmail,
} from "../../utils/crud";
import { newToken } from "../auth/auth.middleware";

export const createUserAccount = asyncWrapper(async (req, res) => {
  const {
    body: { firstname, lastname, email, password },
  } = req;

  const newUserDetails = {
    firstname,
    lastname,
    email,
    password,
  };

  const newUser = await signup(User, newUserDetails);
  if (newUser.error) {
    return failure(400, "fail", `${newUser.error}`, res);
  }

  const data = {
    token: newUser.token,
  };

  return success(res, 201, data);
});

export const login = asyncWrapper(async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  const user = await getOneByEmail(User, email);
  if (user === null) {
    return failure(401, "fail", "Invalid email or password!", res);
  }
  const validPassword = await user.checkPassword(password);

  if (!validPassword) {
    return failure(404, "fail", "Invalid email or password", res);
  }

  const token = newToken(user);
  user.password = undefined;

  return success(res, 200, {
    token,
  });
});

export const sendPasswordVerifyLink = async (req, res) => {
  const {
    body: { email }
  } = req;
  const user = await User.findOne({ email });
  if (!user) return failure(403, 'Invalid input', res);
  const { id } = user;
  const token = await newToken({ id });
  await saveToken(token, email);
  return success(res, 200, 'Password reset link sent successfully. Kindly check your email', null);
};