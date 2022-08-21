import AccountControllers from './controllers';
import Auth from '../../resources/auth/middleware';

import type { IRouter } from 'express';

class AccountRoutes {
  static route(router: IRouter) {
    router
      .route('/account/connect')
      .post(Auth.authenticate, AccountControllers.connect);
    router
      .route('/account/:accountId/disconnect')
      .post(Auth.authenticate, AccountControllers.disconnect);
    router
      .route('/account/:accountId/transactions')
      .get(Auth.authenticate, AccountControllers.retrieveTxns);
    router
      .route('/account/accounts')
      .get(Auth.authenticate, AccountControllers.retrieveAccts);
  }
}

export default AccountRoutes;
