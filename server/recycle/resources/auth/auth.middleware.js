import jwt from 'jsonwebtoken';
import config from '../../config';
import { findByField, getOneByEmailUser } from '../../utils/crud';
import { User } from "../users/model";
import { failure } from '../helpers/response';

export const newToken = (user) => {
    const tokenResult = jwt.sign(
      {
        id: user._id,
        email: user.email,
        isVerified: user.isVerified
      },
      config.secrets.jwt,
      {
        expiresIn: config.secrets.jwtExp
      }
    );
    return tokenResult;
  };

  export const checkExistingValues = async (req, res, next) => {
    const {
      body: { email }
    } = req;
    const result = await findByField(User, email);
    const inputEmail = result.find((item) => item.email === email);
    if (result.length > 0 && inputEmail !== undefined && [inputEmail].length > 0) {
      return failure(400, 'fail', `email: ${email} already exists`, res);
    }
    next();
  };
