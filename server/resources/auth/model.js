"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const shortid_1 = __importDefault(require("shortid"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: shortid_1.default.generate,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    accountsCount: {
        type: Number,
        default: 0
    },
    hashedPassword: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});
userSchema.virtual('password').get(function () {
    return this.hashedPassword;
});
userSchema.virtual('password').set(function (plainText) {
    const salt = bcrypt_1.default.genSaltSync(10);
    this.hashedPassword = bcrypt_1.default.hashSync(plainText, salt);
});
exports.default = (0, mongoose_1.model)('User', userSchema);
