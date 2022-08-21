import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './model';
import { ErrorHandler } from '../../helpers/ErrorHelpers';
import config from '../../config/index';

import type { NextFunction, Response } from 'express';
import { IUser, IRequest } from '../../types/defined-interfaces';

class Profile {
  static generateToken(user: IUser) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.firstname + ' ' + user.lastname,
      },
      config.secret
    );
  }

  static async signUp(req: IRequest, res: Response, next: NextFunction) {
    const { email, password, firstname, lastname } = req.body;

    let user = await User.findOne({ email });

    // error
    if (user?.isActive) {
      return next(
        new ErrorHandler(
          'Sorry, this user already exists, try signing in instead',
          409
        )
      );
    }

    // create new user if none is found
    if (!user) {
      user = new User({ email, password, firstname, lastname });
      await user.save();

      res.status(201).json({
        response: 'Success',
        data: {
          token: Profile.generateToken(user),
          user: user,
        },
      });
    }

    // reactivate user account if previously deleted
    if (!user?.isActive) {
      res.status(201).json({
        response: 'Success',
        data: {
          token: Profile.generateToken(user),
          user: user,
        },
      });
    }
  }

  static async signIn(req: IRequest, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user?.isActive || !user) {
      return next(
        new ErrorHandler(
          'Sorry, looks like you do not have an account with us, try signing up instead',
          404
        )
      );
    }

    const valid = await bcrypt.compare(String(password), user.password);

    if (!valid) {
      return next(new ErrorHandler('Username or password is invalid', 401));
    }

    res.status(200).json({
      response: 'Success',
      data: {
        token: Profile.generateToken(user),
        user
      },
    });
  }

  static async deleteUser(req: IRequest, res: Response, next: NextFunction) {
    const userObj = req.user as IUser;

    const user = await User.findById(userObj.id);

    if (!user) {
      return next(new ErrorHandler('Sorry, this user does not exist', 404));
    }

    user.isActive = false;
    await user.save();

    res.status(201).json({
      response: 'Success',
      data: {
        message: 'Account successfully deleted',
      },
    });
  }
}

export default Profile;
