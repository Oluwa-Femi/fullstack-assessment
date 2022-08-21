"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../resources/account/routes"));
const routes_2 = __importDefault(require("../resources/auth/routes"));
class Routes {
    static route(router) {
        routes_2.default.route(router);
        routes_1.default.route(router);
        return router;
    }
}
exports.default = Routes;
