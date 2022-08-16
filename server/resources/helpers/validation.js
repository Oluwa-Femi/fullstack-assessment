import validate from 'validate.js';
import {
  firstnameRule,
  lastnameRule,
  emailRule,
  passwordRule,
} from './rule/rules';
import { failure } from '../helpers/response';

export default (req, res, next) => {
  const { body } = req;
  const signupConstraint = {
    ...firstnameRule('firstname'),
    ...lastnameRule('lastname'),
    ...emailRule,
    ...passwordRule,
  };
  let validationError = validate(body, signupConstraint);

  if (validationError === undefined) validationError = {};

  if (Object.keys(validationError).length > 0) {
    return failure(400, 'fail', validationError, res);
  }
  return next();
};
