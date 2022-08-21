"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middleware_1 = __importDefault(require("./middleware"));
const controllers_1 = __importDefault(require("./controllers"));
class AuthRoutes {
    static route(router) {
        router
            .route('/auth/register')
            .post(middleware_1.default.verifySignUpProps, controllers_1.default.signUp);
        router
            .route('/auth/login')
            .post(middleware_1.default.verifySignInProps, controllers_1.default.signIn);
        router.route('/auth/delete').delete(controllers_1.default.deleteUser);
    }
}
exports.default = AuthRoutes;
