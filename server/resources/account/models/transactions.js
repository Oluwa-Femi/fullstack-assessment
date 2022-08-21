"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shortid_1 = __importDefault(require("shortid"));
const transactionSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: shortid_1.default.generate,
    },
    type: {
        type: String,
        enum: ['credit', 'debit']
    },
    amount: {
        type: Number,
    },
    narration: {
        type: String
    },
    date: {
        type: Date
    },
    balance: {
        type: Number
    },
    account: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
exports.default = (0, mongoose_1.model)('Transaction', transactionSchema);
