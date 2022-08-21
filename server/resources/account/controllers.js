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
const accounts_1 = __importDefault(require("./models/accounts"));
const transactions_1 = __importDefault(require("./models/transactions"));
const model_1 = __importDefault(require("../auth/model"));
const helpers_1 = require("../../helpers");
const ErrorHelpers_1 = require("../../helpers/ErrorHelpers");
class AccountControllers {
    static connect(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            const userObj = req.user;
            const user = yield model_1.default.findById(userObj.id);
            if (!user) {
                return next(new ErrorHelpers_1.ErrorHandler('Sorry, this user does not exist', 404));
            }
            try {
                // verify code and get accountId
                const response1 = yield helpers_1.RequestHelpers.request({
                    url: 'https://api.withmono.com/account/auth',
                    method: 'POST',
                    data: { code },
                });
                // get account information using accountId
                const response2 = yield helpers_1.RequestHelpers.request({
                    url: `https://api.withmono.com/accounts/${response1.data.id}`,
                    method: 'GET',
                });
                // get all transactions for above account
                //TODO: Remove limit query
                const response3 = yield helpers_1.RequestHelpers.request({
                    url: `https://api.withmono.com/accounts/${response1.data.id}/transactions?paginate=false`,
                    method: 'GET',
                });
                const { meta, account } = response2.data;
                const { data } = response3.data;
                const acct = new accounts_1.default({ meta, account, user: user._id });
                // modify transaction data to include accountID and category
                const txns = data.map((txn) => (Object.assign(Object.assign({}, txn), { account: response1.data.id, category: helpers_1.TransactionHelpers.generateCategory() })));
                // increment count for users accounts
                user.accountsCount += 1;
                // save account and transactions to database
                yield transactions_1.default.insertMany(txns);
                yield user.save();
                yield acct.save();
                res.status(200).json({
                    response: 'Success',
                    data: {
                        message: 'Account successfully linked',
                        account: acct,
                        transactions: txns.slice(0, 5),
                    },
                });
            }
            catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const message = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Oops looks like something went wrong, please try again later';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const status = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500;
                return next(new ErrorHelpers_1.ErrorHandler(message, status));
            }
        });
    }
    static disconnect(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { accountId } = req.params;
            const userObj = req.user;
            const user = yield model_1.default.findById(userObj.id);
            const account = yield accounts_1.default.findOneAndDelete({
                user: userObj.id,
                'account._id': accountId,
            });
            if (!user) {
                return next(new ErrorHelpers_1.ErrorHandler('User not found', 404));
            }
            if (!account) {
                return next(new ErrorHelpers_1.ErrorHandler(`Sorry, you have no account with the id: ${accountId}`, 404));
            }
            try {
                yield helpers_1.RequestHelpers.request({
                    url: `https://api.withmono.com/accounts/${accountId}/unlink`,
                    method: 'POST',
                });
            }
            catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const message = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Oops looks like something went wrong, please try again later';
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                const status = ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500;
                return next(new ErrorHelpers_1.ErrorHandler(message, status));
            }
            // update account count information for user model
            user.accountsCount = user.accountsCount - 1;
            // fetch updated accounts 
            const accounts = yield accounts_1.default.find({ user: userObj.id });
            yield user.save();
            res.status(200).json({
                response: 'Success',
                data: {
                    message: 'Account has been successfully deleted',
                    accounts: accounts
                },
            });
        });
    }
    static retrieveAccts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offset = 0, limit = 10 } = req.query;
            const skip = +offset;
            const take = +limit;
            const userObj = req.user;
            const accounts = yield accounts_1.default.find({ user: userObj.id })
                .skip(skip)
                .limit(take);
            const accountsCount = yield accounts_1.default.count({ user: userObj.id });
            res.status(200).json({
                response: 'Success',
                maxPage: accountsCount <= 10 ? 1 : Math.round(accountsCount / take),
                currentPage: skip / take + 1,
                accounts: accounts,
            });
        });
    }
    static retrieveTxns(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { offset = 0, limit = 10 } = req.query;
            const skip = +offset;
            const take = +limit;
            const { accountId } = req.params;
            const transactions = yield transactions_1.default.find({ account: accountId })
                .skip(skip)
                .limit(take);
            const transactionsCount = yield transactions_1.default.count({ account: accountId });
            res.status(200).json({
                response: 'Success',
                maxPage: transactionsCount <= 10 ? 1 : Math.round(transactionsCount / take),
                currentPage: skip / take + 1,
                transactions: transactions,
            });
        });
    }
}
exports.default = AccountControllers;
