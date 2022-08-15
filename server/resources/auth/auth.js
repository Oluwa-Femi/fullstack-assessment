// import { User } from './model';
import { newToken } from './auth.middleware';
// import { success, failure, createError } from '../../../helpers/response';

export const signup = async (Model, body) => {
    try {
      const newUser = await Model.create(body);
      const user = newUser.toObject({ versionKey: false });
      delete user.password;
      const token = newToken(user);
      return { user, token };
    } catch (err) {
      if (err.message.includes('duplicate key')) {
        const errorItem = err.message.split(' ')[11];
        const item = errorItem.split(':')[0];
        return {
          status: 409,
          error: `duplicates error: ${item} already exists`
        };
      } else {
        const errorItem = err.message.split(':')[2];
        return {
          status: 422,
          error: errorItem
        };
      }
    }
  };
  