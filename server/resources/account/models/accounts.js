"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shortid_1 = __importDefault(require("shortid"));
const accountSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: shortid_1.default.generate,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    meta: {
        "data_status": {
            type: String
        },
        "auth_method": {
            type: String
        }
    },
    account: {
        _id: {
            type: String,
            unique: true
        },
        name: {
            type: String
        },
        currency: {
            type: String,
            enum: ['NGN', 'GHS', 'KES', 'ZAR'],
            default: 'NGN'
        },
        type: {
            type: String
        },
        accountNumber: {
            type: String
        },
        balance: {
            type: String
        },
        institution: {
            name: {
                type: String
            },
            bankCode: {
                type: String
            },
            type: {
                type: String
            }
        },
        bvn: {
            type: String
        }
    },
});
exports.default = (0, mongoose_1.model)('Account', accountSchema);
