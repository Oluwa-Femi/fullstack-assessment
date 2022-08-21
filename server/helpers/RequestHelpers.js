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
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("../config/index"));
class RequestHelper {
    static request({ url, method, headers, data, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.request({
                url: url,
                method: method,
                headers: Object.assign({ Accept: 'application/json', 'Content-Type': 'application/json', 'mono-sec-key': index_1.default.mono.secretKey }, headers),
                data: Object.assign({}, data),
            });
            return response;
        });
    }
}
exports.default = RequestHelper;
