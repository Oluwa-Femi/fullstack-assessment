"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const ErrorHelpers_1 = require("../../helpers/ErrorHelpers");
class Auth {
    static authenticate(req, res, next) {
        const token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!token) {
            return next(new ErrorHelpers_1.ErrorHandler('Access Denied. A token is required', 400));
        }
        const indexOfBearer = token.indexOf('Bearer');
        const parsedToken = indexOfBearer === -1 ? token : Auth.configureParse(token);
        try {
            const decoded = jsonwebtoken_1.default.verify(parsedToken, config_1.default.secret);
            if (!decoded) {
                return next(new ErrorHelpers_1.ErrorHandler('Access denied. Invalid token.', 401));
            }
            req.user = decoded;
            next();
        }
        catch (err) {
            return next(new ErrorHelpers_1.ErrorHandler('Invalid Token', 401));
        }
    }
    // middleware to catch invalid properties on auth routes to avoid trip to database
    static verifySignUpProps(req, res, next) {
        const { body } = req;
        if (Object.keys(body).length < 1) {
            return next(new ErrorHelpers_1.ErrorHandler('Access denied, please provide a payload to access this route', 400));
        }
        ['email', 'password', 'lastname', 'firstname'].forEach((item) => {
            const prop = Object.keys(body).find(prop => prop === item);
            if (!prop || !body[prop]) {
                return next(new ErrorHelpers_1.ErrorHandler(`please provide a ${item} to your payload`, 400));
            }
        });
        next();
    }
    static verifySignInProps(req, res, next) {
        const { body } = req;
        if (Object.keys(body).length < 1) {
            return next(new ErrorHelpers_1.ErrorHandler('Access denied, please provide a payload to access this route', 400));
        }
        ['email', 'password'].forEach((item) => {
            const prop = Object.keys(body).find(prop => prop === item);
            if (!prop || !body[prop]) {
                return next(new ErrorHelpers_1.ErrorHandler(`please provide a ${item} to your payload`, 400));
            }
        });
        next();
    }
    static configureParse(token) {
        if (typeof token === 'object') {
            token = token.join('');
        }
        return token.substring(7, token.length);
    }
}
exports.default = Auth;
