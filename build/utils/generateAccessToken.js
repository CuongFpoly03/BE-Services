"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (data) => {
    const accessTokenKey = process.env.accessTokenKey;
    if (accessTokenKey) {
        return jsonwebtoken_1.default.sign(data, accessTokenKey, {
            expiresIn: '50s',
        });
    }
};
exports.default = generateAccessToken;
