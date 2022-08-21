import Auth  from './middleware';
import Profile from './controllers';

import type { IRouter } from 'express';

class AuthRoutes {
  static route(router: IRouter) {
    router
      .route('/auth/register')
      .post(Auth.verifySignUpProps, Profile.signUp);
    router
      .route('/auth/login')
      .post(Auth.verifySignInProps, Profile.signIn);
    router.route('/auth/delete').delete(Profile.deleteUser);
  }
}

export default AuthRoutes;
