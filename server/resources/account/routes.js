"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("./controllers"));
const middleware_1 = __importDefault(require("../../resources/auth/middleware"));
class AccountRoutes {
    static route(router) {
        router
            .route('/account/connect')
            .post(middleware_1.default.authenticate, controllers_1.default.connect);
        router
            .route('/account/:accountId/disconnect')
            .post(middleware_1.default.authenticate, controllers_1.default.disconnect);
        router
            .route('/account/:accountId/transactions')
            .get(middleware_1.default.authenticate, controllers_1.default.retrieveTxns);
        router
            .route('/account/accounts')
            .get(middleware_1.default.authenticate, controllers_1.default.retrieveAccts);
    }
}
exports.default = AccountRoutes;
