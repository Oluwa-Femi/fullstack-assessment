"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("./model"));
const ErrorHelpers_1 = require("../../helpers/ErrorHelpers");
const index_1 = __importDefault(require("../../config/index"));
class Profile {
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
            name: user.firstname + ' ' + user.lastname,
        }, index_1.default.secret);
    }
    static signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, firstname, lastname } = req.body;
            let user = yield model_1.default.findOne({ email });
            // error
            if (user === null || user === void 0 ? void 0 : user.isActive) {
                return next(new ErrorHelpers_1.ErrorHandler('Sorry, this user already exists, try signing in instead', 409));
            }
            // create new user if none is found
            if (!user) {
                user = new model_1.default({ email, password, firstname, lastname });
                yield user.save();
                res.status(201).json({
                    response: 'Success',
                    data: {
                        token: Profile.generateToken(user),
                        user: user,
                    },
                });
            }
            // reactivate user account if previously deleted
            if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
                res.status(201).json({
                    response: 'Success',
                    data: {
                        token: Profile.generateToken(user),
                        user: user,
                    },
                });
            }
        });
    }
    static signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield model_1.default.findOne({ email });
            if (!(user === null || user === void 0 ? void 0 : user.isActive) || !user) {
                return next(new ErrorHelpers_1.ErrorHandler('Sorry, looks like you do not have an account with us, try signing up instead', 404));
            }
            const valid = yield bcrypt_1.default.compare(String(password), user.password);
            if (!valid) {
                return next(new ErrorHelpers_1.ErrorHandler('Username or password is invalid', 401));
            }
            res.status(200).json({
                response: 'Success',
                data: {
                    token: Profile.generateToken(user),
                    user
                },
            });
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userObj = req.user;
            const user = yield model_1.default.findById(userObj.id);
            if (!user) {
                return next(new ErrorHelpers_1.ErrorHandler('Sorry, this user does not exist', 404));
            }
            user.isActive = false;
            yield user.save();
            res.status(201).json({
                response: 'Success',
                data: {
                    message: 'Account successfully deleted',
                },
            });
        });
    }
}
exports.default = Profile;
