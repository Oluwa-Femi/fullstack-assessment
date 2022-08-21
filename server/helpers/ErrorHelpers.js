"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.handleError = exports.ErrorHandler = void 0;
const chalk_1 = __importDefault(require("chalk"));
var ServerErrorCodes;
(function (ServerErrorCodes) {
    ServerErrorCodes[ServerErrorCodes["internalError"] = 500] = "internalError";
    ServerErrorCodes[ServerErrorCodes["notImplemented"] = 501] = "notImplemented";
    ServerErrorCodes[ServerErrorCodes["serviceUnavailable"] = 503] = "serviceUnavailable";
    ServerErrorCodes[ServerErrorCodes["gatewayTimeout"] = 504] = "gatewayTimeout";
})(ServerErrorCodes || (ServerErrorCodes = {}));
// Base Error class
class ErrorHandler extends Error {
    constructor(errorMessage, statusCode = 500) {
        super(errorMessage);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
exports.ErrorHandler = ErrorHandler;
// Error Logger for server generated errors
const errorLogger = (err, req, res) => {
    console.log(`${chalk_1.default.red('Error')}:`);
    console.log(`${chalk_1.default.yellow('Type:')} ${err.constructor.name === 'NodeError' ? 'Unhandled Error' : err.constructor.name}`);
    console.log(`${chalk_1.default.yellow('Path:')} ${req.path}`);
    console.log(`${chalk_1.default.yellow('Status Code:')} ${err.statusCode || 500}`);
    console.log(err.stack);
};
exports.errorLogger = errorLogger;
// General error handler
const handleError = (err, req, res, next) => {
    const customError = err.constructor.name === 'NodeError' || err.constructor.name === 'SyntaxError' ? false : true;
    res.status(err.statusCode || 500).json({
        response: 'Error',
        error: {
            type: customError === false ? 'UnhandledError' : err.constructor.name,
            path: req.path,
            statusCode: err.statusCode || 500,
            message: err.message,
        },
    });
    // LOG ERROR ONLY IF ERROR IS SERVER RELATED
    if (err.statusCode in ServerErrorCodes) {
        errorLogger(err, req, res);
    }
    next();
};
exports.handleError = handleError;
