import validate from 'validate.js';
import { emailRule, passwordRule } from '../rules';
import { failure } from '../response';

export default (req, res, next) => {
  const { body } = req;
  const loginConstraint = {
    ...emailRule,
    ...passwordRule('password')
  };
  const validationError = validate(body, loginConstraint);
  if (validationError) {
    return failure(422, 'fail', validationError, res);
  }
  return next();
};
