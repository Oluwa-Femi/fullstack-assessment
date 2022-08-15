import { User } from "../users/model";
import { signup } from '../auth/auth';
import { success, failure } from '../../resources/helpers/response';
import asyncWrapper from '../helpers/asyncWrapper';

export const createUserAccount = asyncWrapper(async (req, res) => {
    const { 
        body: { firstname, lastname, email, password }
    } = req;

    const newUserDetails = {
      firstname, 
      lastname, 
      email, 
      password
    };

    const newUser = await signup(User, newUserDetails);
    if (newUser.error) {
      return failure(400, 'fail', `${newUser.error}`, res);
    }
  
    const data = {
      token: newUser.token
    };
  
    return success(res, 201, data);
    });
  