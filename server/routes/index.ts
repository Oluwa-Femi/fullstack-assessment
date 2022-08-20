import AccountRoutes from '../resources/account/routes';
import AuthRoutes from '../resources/auth/routes';

import type { IRouter } from 'express';

class Routes {
    static route(router: IRouter): IRouter {
        AuthRoutes.route(router);
        AccountRoutes.route(router);

    return router;
    }
}

export default Routes;  