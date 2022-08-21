import jwt from 'jsonwebtoken';
import config from '../../config';
import { ErrorHandler } from '../../helpers/ErrorHelpers';
import { IRequest } from '../../types/defined-interfaces';

import type { Response, NextFunction } from 'express';

class Auth {
  static authenticate(req: IRequest, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
      return next(new ErrorHandler('Access Denied. A token is required', 400));
    }

    const indexOfBearer = token.indexOf('Bearer');
    const parsedToken   = indexOfBearer === -1 ? token as string : Auth.configureParse(token);

    try {
      const decoded = jwt.verify(parsedToken, config.secret);

      if (!decoded) {
        return next(new ErrorHandler('Access denied. Invalid token.', 401));
      }

      req.user = decoded;

      next();
    } catch (err) {
      return next(new ErrorHandler('Invalid Token', 401));
    }
  }

  // middleware to catch invalid properties on auth routes to avoid trip to database
  static verifySignUpProps(req: IRequest, res: Response, next: NextFunction) {
    const { body } = req;

    if(Object.keys(body).length < 1) {
      return next(new ErrorHandler('Access denied, please provide a payload to access this route', 400));
    }

    ['email', 'password', 'lastname', 'firstname'].forEach((item) => {
      const prop = Object.keys(body).find(prop => prop === item);
      if (!prop || !body[prop]) {
        return next(new ErrorHandler(`please provide a ${item} to your payload`, 400));
      }
    });

    next();
  }

  static verifySignInProps(req: IRequest, res: Response, next: NextFunction) {
    const { body } = req;

    if(Object.keys(body).length < 1) {
      return next(new ErrorHandler('Access denied, please provide a payload to access this route', 400));
    }

    ['email', 'password'].forEach((item) => {
      const prop = Object.keys(body).find(prop => prop === item);
      if (!prop || !body[prop]) {
        return next(new ErrorHandler(`please provide a ${item} to your payload`, 400));
      }
    });

    next();
  }

  static configureParse(token: string | string[]) {
    if(typeof token ===  'object') {
        token = token.join('');
    }

    return token.substring(7, token.length);
  }
}

export default Auth;