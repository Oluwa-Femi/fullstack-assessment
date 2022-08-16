import { User } from "../users/model";
import { signup } from "../auth/auth";
import { success, failure } from "../../resources/helpers/response";
import asyncWrapper from "../helpers/asyncWrapper";
import {
  getOneByEmail,
  getUserPassword,
  updatePassword,
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

export const updateUserPassword = async (req, res) => {
  const { userId, password: newPassword } = req.body;
  const user = await getUserPassword(User, req.user._id);
  const currentPassword = user.password;
  const comparePwd = await bcrypt.compare(newPassword, currentPassword);
  if (comparePwd) {
    return failure(422, "fail", "Kindly enter a new password", res);
  }
  const hashedPwd = await bcrypt.hash(newPassword, 12);
  const data = {
    _id: req.user._id,
    password: hashedPwd,
  };
  const updatedDoc = await updatePassword(User, data);
  if (hashedPwd == updatedDoc.password) {
    return success(res, 200, { message: "Password updated successfully" });
  }
  return failure(422, "fail", "Operation unsuccessful", res);
};
